import { describe, expect, it } from 'vitest';
import {
	SheetHeaderError,
	dateLabel,
	driveFileId,
	parseBoard,
	parseEvents,
	sortEvents,
	toIsoDate,
	weekdayNumber
} from './parse.ts';
import type { SiteEvent } from './types.ts';

const TAB = 'Publisert – arrangementer';
const BOARD_TAB = 'Publisert – styret';
const eventHeader = [
	'ID', 'Tittel', 'Startdato', 'Sluttdato', 'Ukedag', 'Datotekst', 'Bane', 'Beskrivelse',
	'Lenke', 'Lenketekst', 'Kategori', 'Resultatlenke', 'Publisert av', 'Publisert tidspunkt'
];
function ev(over: Record<string, string | number> = {}): (string | number)[] {
	const base: Record<string, string | number> = {
		ID: 'e1', Tittel: 'Stovner Open 2026', Startdato: '2026-05-30', Sluttdato: '2026-05-31',
		Ukedag: '', Datotekst: '', Bane: 'Stovner Discgolfpark', Beskrivelse: 'Turnering',
		Lenke: 'https://udisc.com/x', Lenketekst: 'Meld deg på', Kategori: 'Turnering',
		Resultatlenke: '', 'Publisert av': 'a@b.no', 'Publisert tidspunkt': '2026-11-26'
	};
	const m = { ...base, ...over };
	return eventHeader.map((h) => m[h]);
}

describe('toIsoDate', () => {
	it('accepts serial numbers and ISO strings only', () => {
		expect(toIsoDate(46172)).toBe('2026-05-30');
		expect(toIsoDate('2026-05-30')).toBe('2026-05-30');
		expect(toIsoDate('30.05.2026')).toBeNull();
		expect(toIsoDate('')).toBeNull();
		expect(toIsoDate(true)).toBeNull();
	});
	it('rejects impossible ISO dates', () => {
		expect(toIsoDate('2026-02-31')).toBeNull();
	});
});

describe('dateLabel', () => {
	it('formats ranges in Norwegian', () => {
		expect(dateLabel('2026-05-30', '2026-05-31')).toBe('30.–31. mai 2026');
		expect(dateLabel('2026-06-15', '2026-06-15')).toBe('15. juni 2026');
		expect(dateLabel('2026-05-30', '2026-06-02')).toBe('30. mai – 2. juni 2026');
		expect(dateLabel('2026-12-30', '2027-01-02')).toBe('30. desember 2026 – 2. januar 2027');
		expect(dateLabel(undefined, '2026-11-05')).toBe('5. november 2026');
	});
});

describe('weekdayNumber', () => {
	it('maps names case-insensitively', () => {
		expect(weekdayNumber('Onsdag')).toBe(3);
		expect(weekdayNumber('søndag')).toBe(0);
		expect(weekdayNumber('lørdag')).toBe(6);
		expect(weekdayNumber('')).toBeUndefined();
	});
});

describe('driveFileId', () => {
	it('extracts the id from the common link forms', () => {
		expect(driveFileId('https://drive.google.com/file/d/abc123/view?usp=sharing')).toBe('abc123');
		expect(driveFileId('https://drive.google.com/open?id=abc123')).toBe('abc123');
		expect(driveFileId('https://drive.google.com/uc?id=abc123&export=download')).toBe('abc123');
		expect(driveFileId('https://example.com/a.jpg')).toBeNull();
		expect(driveFileId('not a url')).toBeNull();
	});
});

describe('parseEvents', () => {
	it('maps a tournament row', () => {
		const { items, warnings } = parseEvents([eventHeader, ev()]);
		expect(warnings).toEqual([]);
		expect(items).toEqual([
			{
				title: 'Stovner Open 2026', date: '30.–31. mai 2026', startDate: '2026-05-30',
				endDate: '2026-05-31', course: 'Stovner Discgolfpark', description: 'Turnering',
				link: 'https://udisc.com/x', linkText: 'Meld deg på', category: 'Turnering'
			}
		]);
		expect('weekday' in items[0]).toBe(false);
		expect('resultsLink' in items[0]).toBe(false);
	});
	it('uses Datotekst and no startDate for a recurring event with only an end date', () => {
		const { items } = parseEvents([
			eventHeader,
			ev({ Tittel: 'Torsdagsgolf', Startdato: '', Sluttdato: '2026-11-05', Datotekst: 'Hver torsdag 17:30–20:30' })
		]);
		expect(items[0].date).toBe('Hver torsdag 17:30–20:30');
		expect(items[0].endDate).toBe('2026-11-05');
		expect('startDate' in items[0]).toBe(false);
	});
	it('parses weekday and resultsLink', () => {
		const { items } = parseEvents([
			eventHeader,
			ev({ Ukedag: 'Onsdag', Resultatlenke: 'https://r.no/x' })
		]);
		expect(items[0].weekday).toBe(3);
		expect(items[0].resultsLink).toBe('https://r.no/x');
	});
	it('sets endDate to startDate when only a start date is given', () => {
		const { items } = parseEvents([eventHeader, ev({ Sluttdato: '' })]);
		expect(items[0].endDate).toBe('2026-05-30');
		expect(items[0].date).toBe('30. mai 2026');
	});
	it('accepts serial-number dates', () => {
		const { items } = parseEvents([eventHeader, ev({ Startdato: 46172, Sluttdato: 46173 })]);
		expect(items[0].startDate).toBe('2026-05-30');
		expect(items[0].endDate).toBe('2026-05-31');
	});
	it('finds columns by name regardless of order', () => {
		const idx = [...eventHeader.keys()].reverse();
		const rev = (r: (string | number)[]) => idx.map((i) => r[i]);
		expect(parseEvents([rev(eventHeader), rev(ev())])).toEqual(parseEvents([eventHeader, ev()]));
	});
	it('throws SheetHeaderError when a required header is missing', () => {
		const h = eventHeader.filter((x) => x !== 'Lenke');
		expect(() => parseEvents([h, ev()])).toThrow(SheetHeaderError);
		expect(() => parseEvents([])).toThrow(SheetHeaderError);
	});
	it.each<[Record<string, string | number>, string]>([
		[{ Tittel: '' }, 'Mangler tittel'],
		[{ Startdato: '', Sluttdato: '', Datotekst: '' }, 'Mangler dato'],
		[{ Startdato: '30.05.2026', Sluttdato: '', Datotekst: '' }, 'Mangler dato'],
		[{ Startdato: '2026-05-31', Sluttdato: '2026-05-30' }, 'Sluttdato før startdato'],
		[{ Beskrivelse: '' }, 'Mangler beskrivelse'],
		[{ Lenke: '' }, 'Mangler lenke'],
		[{ Lenke: 'http://x.no' }, 'Lenken må starte med https:// eller /'],
		[{ Lenketekst: '' }, 'Mangler lenketekst'],
		[{ Kategori: '' }, 'Mangler kategori'],
		[{ Resultatlenke: 'ftp://x' }, 'Resultatlenken må starte med https:// eller /']
	])('skips an invalid row %j with a warning', (over, msg) => {
		const { items, warnings } = parseEvents([eventHeader, ev(over)]);
		expect(items).toEqual([]);
		expect(warnings).toEqual([`${TAB} rad 2 (${over.Tittel ?? 'Stovner Open 2026'}): ${msg}`]);
	});
	it('accepts relative links', () => {
		const { items } = parseEvents([eventHeader, ev({ Lenke: '/om', Resultatlenke: '/res' })]);
		expect(items).toHaveLength(1);
	});
	it('accepts ragged rows and ignores empty rows without warning', () => {
		const full = ev();
		const ragged = full.slice(0, 11); // trailing empty cells cut off
		const { items, warnings } = parseEvents([eventHeader, ragged, [], ['', '', ''], ev({ Tittel: 'B' })]);
		expect(items).toHaveLength(2);
		expect(warnings).toEqual([]);
	});
	it('sorts events', () => {
		const { items } = parseEvents([
			eventHeader,
			ev({ Tittel: 'Stovner Open' }),
			ev({ Tittel: 'Torsdagsgolf', Startdato: '', Sluttdato: '2026-11-05', Datotekst: 'Hver torsdag' }),
			ev({ Tittel: 'Vårligaen', Startdato: '2026-04-29', Sluttdato: '2026-06-01' })
		]);
		expect(items.map((e) => e.title)).toEqual(['Torsdagsgolf', 'Vårligaen', 'Stovner Open']);
	});
});

describe('sortEvents', () => {
	const e = (title: string, startDate?: string): SiteEvent => ({
		title, date: '', ...(startDate ? { startDate } : {}), description: '', link: '', linkText: '', category: ''
	});
	it('puts undated first (stable), then ascending', () => {
		const out = sortEvents([e('c', '2026-05-30'), e('a'), e('d', '2026-04-29'), e('b')]);
		expect(out.map((x) => x.title)).toEqual(['a', 'b', 'd', 'c']);
	});
});

describe('parseBoard', () => {
	const h = ['ID', 'Rekkefølge', 'Navn', 'Rolle', 'E-post', 'Bilde', 'Publisert av', 'Publisert tidspunkt'];
	const drive = 'https://drive.google.com/file/d/abc123/view';
	const row = (over: Record<string, string | number> = {}) => {
		const m: Record<string, string | number> = {
			ID: 'b1', Rekkefølge: 1, Navn: 'Ola', Rolle: 'Leder', 'E-post': 'ola@x.no', Bilde: drive,
			'Publisert av': 'a', 'Publisert tidspunkt': 't', ...over
		};
		return h.map((k) => m[k]);
	};
	it('sorts by order and allows empty email', () => {
		const { items, warnings } = parseBoard([h, row({ ID: 'b2', Rekkefølge: 2, Navn: 'B', 'E-post': '' }), row({ Rekkefølge: 1 })]);
		expect(warnings).toEqual([]);
		expect(items.map((i) => i.name)).toEqual(['Ola', 'B']);
		expect(items[1].email).toBe('');
		expect(items[0]).toEqual({ id: 'b1', order: 1, name: 'Ola', role: 'Leder', email: 'ola@x.no', imageUrl: drive });
	});
	it('throws on missing header', () => {
		expect(() => parseBoard([h.filter((x) => x !== 'Bilde'), []])).toThrow(SheetHeaderError);
	});
	it.each<[Record<string, string | number>, string]>([
		[{ Rekkefølge: '' }, 'Mangler rekkefølge'],
		[{ Rekkefølge: 'x' }, 'Mangler rekkefølge'],
		[{ Navn: '' }, 'Mangler navn'],
		[{ Rolle: '' }, 'Mangler rolle'],
		[{ 'E-post': 'ola' }, 'Ugyldig e-post'],
		[{ Bilde: '' }, 'Mangler bilde'],
		[{ Bilde: 'https://example.com/a.jpg' }, 'Bildet må være en Google Drive-lenke']
	])('skips an invalid row %j', (over, msg) => {
		const { items, warnings } = parseBoard([h, row(over)]);
		expect(items).toEqual([]);
		expect(warnings).toEqual([`${BOARD_TAB} rad 2 (${over.Navn ?? 'Ola'}): ${msg}`]);
	});
	it.each<[string]>([[''], ['../x'], ['a/b'], ['a#b'], ['a?b'], ['a b']])(
		'skips a row with invalid ID %j',
		(id) => {
			const { items, warnings } = parseBoard([h, row({ ID: id })]);
			expect(items).toEqual([]);
			expect(warnings).toEqual([`${BOARD_TAB} rad 2 (Ola): Ugyldig ID`]);
		}
	);
	it('skips a row whose ID was used by an earlier valid row', () => {
		const { items, warnings } = parseBoard([h, row(), row({ Navn: 'B', Rekkefølge: 2 })]);
		expect(items.map((i) => i.name)).toEqual(['Ola']);
		expect(warnings).toEqual([`${BOARD_TAB} rad 3 (B): Duplikat ID`]);
	});
	it('does not let an invalid row claim its ID', () => {
		const { items, warnings } = parseBoard([h, row({ Navn: '' }), row({ Navn: 'B' })]);
		expect(items.map((i) => i.name)).toEqual(['B']);
		expect(warnings).toHaveLength(1);
	});
	it('ignores empty rows', () => {
		expect(parseBoard([h, [], row()]).warnings).toEqual([]);
	});
});
