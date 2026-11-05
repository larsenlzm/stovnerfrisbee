import type { Handle } from '@sveltejs/kit';

// Videresender PostHog-trafikk via eget domene, så adblockere ikke stopper den
const PROXY_PATH = '/sf-data';

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname, search } = event.url;
	if (!pathname.startsWith(`${PROXY_PATH}/`)) return resolve(event);

	const path = pathname.slice(PROXY_PATH.length);
	const host = path.startsWith('/static/') || path.startsWith('/array/') ? 'eu-assets.i.posthog.com' : 'eu.i.posthog.com';

	const headers = new Headers(event.request.headers);
	headers.delete('cookie');
	headers.delete('host');
	headers.delete('accept-encoding');
	headers.set('x-forwarded-for', event.getClientAddress());

	const method = event.request.method;
	const res = await fetch(`https://${host}${path}${search}`, {
		method,
		headers,
		body: method === 'GET' || method === 'HEAD' ? undefined : await event.request.arrayBuffer()
	});

	// fetch har allerede pakket ut svaret
	const resHeaders = new Headers(res.headers);
	resHeaders.delete('content-encoding');
	resHeaders.delete('content-length');
	return new Response(res.body, { status: res.status, headers: resHeaders });
};
