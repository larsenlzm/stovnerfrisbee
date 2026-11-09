export const EVENT_HOST = 'nc.stovnerfrisbee.no';
const MAIN_ORIGIN = 'https://stovnerfrisbee.no';

// Stier som skal bli liggende på arrangementsdomenet
const KEEP = ['/norges-cup-4.ics'];
const KEEP_PREFIXES = ['/sf-data/', '/_app/'];

const onEventHost = (url: URL) => url.hostname.toLowerCase() === EVENT_HOST;

export function eventReroute(url: URL): string | undefined {
	return onEventHost(url) && url.pathname === '/' ? '/norges-cup' : undefined;
}

export function eventHostRedirect(url: URL): string | null {
	if (!onEventHost(url)) return null;
	const { pathname, search } = url;
	if (pathname === '/' || KEEP.includes(pathname) || KEEP_PREFIXES.some((p) => pathname.startsWith(p))) return null;
	return `${MAIN_ORIGIN}${pathname}${search}`;
}
