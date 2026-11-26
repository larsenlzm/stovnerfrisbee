import type { SiteEvent, PublishedBoardRow } from './types.ts';

export function decideSource(
	env: Record<string, string | undefined>
): 'sheet' | 'snapshot' | { error: string } {
	if (env.GOOGLE_SERVICE_ACCOUNT_JSON && env.CONTENT_SHEET_ID) return 'sheet';
	if (env.VERCEL) {
		return {
			error:
				'GOOGLE_SERVICE_ACCOUNT_JSON og CONTENT_SHEET_ID må være satt på Vercel. Bygget stoppes så forrige deploy beholdes.'
		};
	}
	return 'snapshot';
}

export function assertPublishable(events: SiteEvent[], board: PublishedBoardRow[]): void {
	if (events.length === 0) {
		throw new Error('Publisert – arrangementer har ingen gyldige rader. Bygget stoppes.');
	}
	if (board.length === 0) {
		throw new Error('Publisert – styret har ingen gyldige rader. Bygget stoppes.');
	}
}

export function boardImagePath(id: string): string {
	return `/styret/${id}.jpg`;
}
