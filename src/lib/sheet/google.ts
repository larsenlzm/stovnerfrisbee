import { createSign } from 'node:crypto';
import type { Cell } from './types.ts';

const b64url = (v: string | Buffer) => Buffer.from(v).toString('base64url');

export async function getAccessToken(
	sa: { client_email: string; private_key: string },
	scopes: string[]
): Promise<string> {
	const now = Math.floor(Date.now() / 1000);
	const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
	const claims = b64url(
		JSON.stringify({
			iss: sa.client_email,
			scope: scopes.join(' '),
			aud: 'https://oauth2.googleapis.com/token',
			iat: now,
			exp: now + 3600
		})
	);
	const signer = createSign('RSA-SHA256');
	signer.update(`${header}.${claims}`);
	const signature = signer.sign(sa.private_key.replace(/\\n/g, '\n')).toString('base64url');
	const res = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
			assertion: `${header}.${claims}.${signature}`
		})
	});
	if (!res.ok) {
		let detail = '';
		try {
			const err = (await res.json()) as { error?: string; error_description?: string };
			detail = [err.error, err.error_description].filter(Boolean).join(': ');
		} catch {
			// ingen lesbar feilbeskrivelse
		}
		throw new Error(
			`Kunne ikke hente tilgangstoken fra Google (status ${res.status})${detail ? `: ${detail}` : ''}`
		);
	}
	const json = (await res.json()) as { access_token?: string };
	if (!json.access_token) throw new Error('Google ga ikke noe tilgangstoken');
	return json.access_token;
}

export async function readValues(token: string, sheetId: string, tab: string): Promise<Cell[][]> {
	const range = encodeURIComponent(`'${tab}'!A1:Z`);
	const url =
		`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}/values/${range}` +
		`?valueRenderOption=UNFORMATTED_VALUE&dateTimeRenderOption=SERIAL_NUMBER`;
	const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
	if (!res.ok) throw new Error(`Kunne ikke lese fanen «${tab}» (status ${res.status})`);
	const json = (await res.json()) as { values?: Cell[][] };
	return json.values ?? [];
}

export async function downloadDriveFile(token: string, fileId: string): Promise<Buffer> {
	const url = `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?alt=media&supportsAllDrives=true`;
	const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
	if (!res.ok) throw new Error(`Kunne ikke laste ned Drive-filen ${fileId} (status ${res.status})`);
	return Buffer.from(await res.arrayBuffer());
}
