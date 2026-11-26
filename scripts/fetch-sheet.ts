import { existsSync } from 'node:fs';
import { mkdir, readdir, unlink, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { parseEvents, parseBoard, driveFileId } from '../src/lib/sheet/parse.ts';
import { decideSource, assertPublishable, boardImagePath } from '../src/lib/sheet/fetch-plan.ts';
import { getAccessToken, readValues, downloadDriveFile } from '../src/lib/sheet/google.ts';
import type { BoardMember } from '../src/lib/sheet/types.ts';

const root = new URL('../', import.meta.url);
const imageDir = new URL('static/styret/', root);
const writeJson = (name: string, data: unknown) =>
	writeFile(new URL(`src/lib/data/sheet/${name}`, root), JSON.stringify(data, null, 2) + '\n');

async function main() {
	const envFile = new URL('.env', root);
	if (existsSync(envFile)) process.loadEnvFile(envFile);

	const source = decideSource(process.env);
	if (typeof source === 'object') throw new Error(source.error);
	if (source === 'snapshot') {
		console.log('Bruker innsjekket snapshot');
		return;
	}

	let sa: { client_email: string; private_key: string };
	try {
		sa = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON as string);
	} catch {
		throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON er ikke gyldig JSON');
	}
	if (!sa.client_email || !sa.private_key) {
		throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON mangler client_email eller private_key');
	}
	const sheetId = process.env.CONTENT_SHEET_ID as string;
	const token = await getAccessToken(sa, [
		'https://www.googleapis.com/auth/spreadsheets.readonly',
		'https://www.googleapis.com/auth/drive.readonly'
	]);

	const events = parseEvents(await readValues(token, sheetId, 'Publisert – arrangementer'));
	const board = parseBoard(await readValues(token, sheetId, 'Publisert – styret'));
	for (const w of [...events.warnings, ...board.warnings]) console.warn(`Advarsel: ${w}`);
	assertPublishable(events.items, board.items);

	await mkdir(imageDir, { recursive: true });
	const members: BoardMember[] = [];
	const keep = new Set<string>();
	for (const row of board.items) {
		const fileId = driveFileId(row.imageUrl);
		if (!fileId) throw new Error(`Ugyldig bildelenke for styremedlem ${row.id}`);
		const original = await downloadDriveFile(token, fileId);
		const jpg = await sharp(original)
			.resize(400, 400, { fit: 'cover' })
			.jpeg({ quality: 82 })
			.toBuffer();
		await writeFile(new URL(`${row.id}.jpg`, imageDir), jpg);
		keep.add(`${row.id}.jpg`);
		members.push({ name: row.name, role: row.role, email: row.email, image: boardImagePath(row.id) });
	}
	for (const f of await readdir(imageDir)) {
		if (!keep.has(f)) await unlink(new URL(f, imageDir));
	}

	await writeJson('events.json', events.items);
	await writeJson('board.json', members);
	console.log(`Hentet ${events.items.length} arrangementer og ${members.length} styremedlemmer`);
}

main().catch((e) => {
	console.error(`sheet:pull feilet: ${e instanceof Error ? e.message : String(e)}`);
	process.exit(1);
});
