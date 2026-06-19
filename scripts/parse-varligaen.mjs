import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import XLSX from 'xlsx';

const __dirname = dirname(fileURLToPath(import.meta.url));
const resultsDir = join(__dirname, '../results/vårligaen2026');

const HOLE_PARS   = [3, 3, 3, 3, 3, 3, 4, 3, 3, 4, 4, 3, 3, 3, 3, 3, 3, 3];
const HOLE_METERS = [88, 78, 114, 119, 130, 124, 205, 75, 92, 165, 195, 84, 131, 91, 98, 66, 71, 103];

const rounds = [];
for (let i = 1; i <= 8; i++) {
	const wb = XLSX.readFile(join(resultsDir, `VÅRLIGAEN 2026 (${i})-R1-Results.xlsx`));

	const poolRows = XLSX.utils.sheet_to_json(wb.Sheets['Pool Information'], { header: 1 });
	const rawDate = poolRows[1]?.[2];
	const date = typeof rawDate === 'string' ? rawDate.slice(0, 10) : String(rawDate ?? '').slice(0, 10);

	const rows = XLSX.utils.sheet_to_json(wb.Sheets['Results'], { header: 1 });
	const divMap = {};
	for (let r = 1; r < rows.length; r++) {
		const row = rows[r];
		if (!row || row.length < 5) continue;
		const divCode = row[1];
		const firstName = String(row[3] ?? '').trim();
		const lastName = String(row[4] ?? '').trim();
		if (!divMap[divCode]) divMap[divCode] = [];
		divMap[divCode].push({
			place: row[0],
			name: `${firstName} ${lastName}`,
			pdga: row[2],
			scores: row.slice(5, 23).map((s) => (s != null ? Number(s) : null)),
			total: row[23]
		});
	}

	rounds.push({
		roundNumber: i,
		date,
		divisions: Object.entries(divMap).map(([code, players]) => ({ code, players }))
	});
}

const ovWb = XLSX.readFile(join(resultsDir, 'VÅRLIGAEN 2026 overview.xlsx'));
const ovRows = XLSX.utils.sheet_to_json(ovWb.Sheets['Results'], { header: 1 });
const standingsMap = {};
for (let r = 1; r < ovRows.length; r++) {
	const row = ovRows[r];
	if (!row || row.length < 5) continue;
	const divCode = row[1];
	const firstName = String(row[2] ?? '').trim();
	const lastName = String(row[3] ?? '').trim();
	if (!standingsMap[divCode]) standingsMap[divCode] = [];
	standingsMap[divCode].push({
		position: row[0],
		name: `${firstName} ${lastName}`,
		pdga: row[4],
		roundPoints: row.slice(5, 13).map((p) => (p != null ? Number(p) : null)),
		total: row[14] != null ? Number(row[14]) : null
	});
}

const standings = Object.entries(standingsMap).map(([code, players]) => ({ code, players }));

const out = join(__dirname, '../src/lib/data/varligaen2026.json');
writeFileSync(out, JSON.stringify({ holePars: HOLE_PARS, holeMeters: HOLE_METERS, rounds, standings }, null, 2));
console.log('Written to', out);
