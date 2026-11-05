import posthog from 'posthog-js';
import { env } from '$env/dynamic/public';

export function initAnalytics() {
	if (!env.PUBLIC_POSTHOG_KEY) return;

	posthog.init(env.PUBLIC_POSTHOG_KEY, {
		// Proxy i hooks.server.ts
		api_host: '/sf-data',
		ui_host: 'https://eu.posthog.com',
		// Kun i minnet – ingen cookies eller localStorage, så vi trenger ikke samtykkebanner
		persistence: 'memory',
		capture_pageview: 'history_change',
		capture_pageleave: true,
		disable_session_recording: true
	});

	document.addEventListener('click', trackLinkClick, { capture: true });
}

function trackLinkClick(e: MouseEvent) {
	const a = (e.target as Element | null)?.closest('a');
	if (!a?.href) return;

	const url = new URL(a.href);
	const props = {
		href: a.href,
		from_path: location.pathname,
		location: a.dataset.track ?? location.pathname,
		label: a.textContent?.trim().replace(/\s+/g, ' ')
	};

	if (url.origin !== location.origin) {
		posthog.capture('outbound_click', {
			...props,
			destination: url.hostname.replace(/^www\./, ''),
			event_title: a.closest<HTMLElement>('[data-event]')?.dataset.event
		});
	} else if (url.pathname === '/bli-medlem') {
		posthog.capture('member_cta_click', props);
	}
}
