import type { RequestHandler } from './$types';
import { norgesCup4 } from '$lib/events/norges-cup-4';
import { toIcs } from '$lib/events/calendar';

// Rot-sti med vilje, så lenken virker på både stovnerfrisbee.no og nc.stovnerfrisbee.no
export const GET: RequestHandler = () => {
	return new Response(toIcs(norgesCup4), {
		headers: {
			'Content-Type': 'text/calendar; charset=utf-8',
			'Content-Disposition': 'inline; filename="norges-cup-4.ics"',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
