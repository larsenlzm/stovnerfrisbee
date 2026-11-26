import type { Cell, PublishedBoardRow, SiteEvent } from './types.ts';

export class SheetHeaderError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'SheetHeaderError';
	}
}

const EVENTS_TAB = 'Publisert – arrangementer';
const BOARD_TAB = 'Publisert – styret';

const MONTHS = [
	'januar', 'februar', 'mars', 'april', 'mai', 'juni',
	'juli', 'august', 'september', 'oktober', 'november', 'desember'
];
const WEEKDAYS = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];

const text = (v: Cell | undefined): string => (v === undefined ? '' : String(v).trim());

function isoFromUtc(ms: number): string {
	return new Date(ms).toISOString().slice(0, 10);
}

export function toIsoDate(v: Cell): string | null {
	if (typeof v === 'number') {
		if (!Number.isFinite(v)) return null;
		const ms = Date.UTC(1899, 11, 30) + Math.floor(v) * 86400000;
		const year = new Date(ms).getUTCFullYear();
		return year >= 1900 && year <= 2200 ? isoFromUtc(ms) : null;
	}
	if (typeof v !== 'string') return null;
	const s = v.trim();
	if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
	const d = new Date(`${s}T00:00:00Z`);
	return Number.isNaN(d.getTime()) || isoFromUtc(d.getTime()) !== s ? null : s;
}

function parts(iso: string): { y: number; m: number; d: number } {
	const [y, m, d] = iso.split('-').map(Number);
	return { y, m, d };
}

export function dateLabel(start?: string, end?: string): string {
	const s = start || end;
	const e = end || start;
	if (!s || !e) return '';
	const a = parts(s);
	const b = parts(e);
	if (s === e) return `${a.d}. ${MONTHS[a.m - 1]} ${a.y}`;
	if (a.y === b.y && a.m === b.m) return `${a.d}.–${b.d}. ${MONTHS[a.m - 1]} ${a.y}`;
	if (a.y === b.y) return `${a.d}. ${MONTHS[a.m - 1]} – ${b.d}. ${MONTHS[b.m - 1]} ${a.y}`;
	return `${a.d}. ${MONTHS[a.m - 1]} ${a.y} – ${b.d}. ${MONTHS[b.m - 1]} ${b.y}`;
}

export function weekdayNumber(name: string): number | undefined {
	const i = WEEKDAYS.indexOf(name.trim().toLowerCase());
	return i === -1 ? undefined : i;
}

export function driveFileId(url: string): string | null {
	let u: URL;
	try {
		u = new URL(url.trim());
	} catch {
		return null;
	}
	if (u.protocol !== 'https:' || u.hostname !== 'drive.google.com') return null;
	const m = u.pathname.match(/^\/file\/d\/([\w-]+)/);
	if (m) return m[1];
	if (u.pathname === '/open' || u.pathname === '/uc') {
		const id = u.searchParams.get('id');
		if (id && /^[\w-]+$/.test(id)) return id;
	}
	return null;
}

export function sortEvents(events: SiteEvent[]): SiteEvent[] {
	const undated = events.filter((e) => !e.startDate);
	const dated = events
		.filter((e) => e.startDate)
		.sort((a, b) => (a.startDate! < b.startDate! ? -1 : a.startDate! > b.startDate! ? 1 : 0));
	return [...undated, ...dated];
}

function columns(rows: Cell[][], required: string[], tab: string): Map<string, number> {
	const header = (rows[0] ?? []).map(text);
	const index = new Map<string, number>();
	header.forEach((h, i) => {
		if (h && !index.has(h)) index.set(h, i);
	});
	const missing = required.filter((r) => !index.has(r));
	if (missing.length) {
		throw new SheetHeaderError(`${tab}: mangler kolonneoverskrift ${missing.join(', ')}`);
	}
	return index;
}

const isEmptyRow = (row: Cell[]): boolean => row.every((c) => text(c) === '');
const okLink = (s: string): boolean => s.startsWith('https://') || s.startsWith('/');

const EVENT_COLUMNS = [
	'Tittel', 'Startdato', 'Sluttdato', 'Ukedag', 'Datotekst', 'Bane',
	'Beskrivelse', 'Lenke', 'Lenketekst', 'Kategori', 'Resultatlenke'
];

export function parseEvents(rows: Cell[][]): { items: SiteEvent[]; warnings: string[] } {
	const col = columns(rows, EVENT_COLUMNS, EVENTS_TAB);
	const items: SiteEvent[] = [];
	const warnings: string[] = [];
	for (let i = 1; i < rows.length; i++) {
		const row = rows[i];
		if (isEmptyRow(row)) continue;
		const get = (name: string) => text(row[col.get(name)!]);
		const raw = (name: string) => row[col.get(name)!] ?? '';
		const title = get('Tittel');
		const startDate = toIsoDate(raw('Startdato')) ?? undefined;
		let endDate = toIsoDate(raw('Sluttdato')) ?? undefined;
		const dateText = get('Datotekst');
		const link = get('Lenke');
		const resultsLink = get('Resultatlenke');

		let problem: string | null = null;
		if (!title) problem = 'Mangler tittel';
		else if (!startDate && !endDate && !dateText) problem = 'Mangler dato';
		else if (startDate && endDate && endDate < startDate) problem = 'Sluttdato før startdato';
		else if (!get('Beskrivelse')) problem = 'Mangler beskrivelse';
		else if (!link) problem = 'Mangler lenke';
		else if (!okLink(link)) problem = 'Lenken må starte med https:// eller /';
		else if (!get('Lenketekst')) problem = 'Mangler lenketekst';
		else if (!get('Kategori')) problem = 'Mangler kategori';
		else if (resultsLink && !okLink(resultsLink)) problem = 'Resultatlenken må starte med https:// eller /';
		if (problem) {
			warnings.push(`${EVENTS_TAB} rad ${i + 1} (${title}): ${problem}`);
			continue;
		}

		if (startDate && !endDate) endDate = startDate;
		const weekday = weekdayNumber(get('Ukedag'));
		const course = get('Bane');
		const event: SiteEvent = {
			title,
			date: dateText || dateLabel(startDate, endDate),
			...(startDate ? { startDate } : {}),
			...(endDate ? { endDate } : {}),
			...(weekday !== undefined ? { weekday } : {}),
			...(course ? { course } : {}),
			description: get('Beskrivelse'),
			link,
			linkText: get('Lenketekst'),
			category: get('Kategori'),
			...(resultsLink ? { resultsLink } : {})
		};
		items.push(event);
	}
	return { items: sortEvents(items), warnings };
}

const BOARD_COLUMNS = ['ID', 'Rekkefølge', 'Navn', 'Rolle', 'E-post', 'Bilde'];

export function parseBoard(rows: Cell[][]): { items: PublishedBoardRow[]; warnings: string[] } {
	const col = columns(rows, BOARD_COLUMNS, BOARD_TAB);
	const items: PublishedBoardRow[] = [];
	const warnings: string[] = [];
	for (let i = 1; i < rows.length; i++) {
		const row = rows[i];
		if (isEmptyRow(row)) continue;
		const get = (name: string) => text(row[col.get(name)!]);
		const name = get('Navn');
		const orderText = get('Rekkefølge');
		const order = orderText === '' ? NaN : Number(orderText.replace(',', '.'));
		const email = get('E-post');
		const imageUrl = get('Bilde');

		let problem: string | null = null;
		if (!Number.isFinite(order)) problem = 'Mangler rekkefølge';
		else if (!name) problem = 'Mangler navn';
		else if (!get('Rolle')) problem = 'Mangler rolle';
		else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) problem = 'Ugyldig e-post';
		else if (!imageUrl) problem = 'Mangler bilde';
		else if (!driveFileId(imageUrl)) problem = 'Bildet må være en Google Drive-lenke';
		if (problem) {
			warnings.push(`${BOARD_TAB} rad ${i + 1} (${name}): ${problem}`);
			continue;
		}
		items.push({ id: get('ID'), order, name, role: get('Rolle'), email, imageUrl });
	}
	items.sort((a, b) => a.order - b.order);
	return { items, warnings };
}
