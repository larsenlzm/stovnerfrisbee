import posthog from 'posthog-js';
import { env } from '$env/dynamic/public';
import { EVENT_HOST } from '$lib/events/hosts';

// Kun det ekte nettstedet teller, så lokal utvikling og forhåndsvisninger havner ikke i statistikken
const PRODUCTION_HOSTS = ['stovnerfrisbee.no', 'www.stovnerfrisbee.no', EVENT_HOST];

const OPT_OUT_KEY = 'sf-notrack';

// ?notrack slår av sporing i denne nettleseren, ?track slår den på igjen
function isOptedOut() {
	try {
		const params = new URLSearchParams(location.search);
		if (params.has('notrack')) localStorage.setItem(OPT_OUT_KEY, '1');
		if (params.has('track')) localStorage.removeItem(OPT_OUT_KEY);
		return localStorage.getItem(OPT_OUT_KEY) === '1';
	} catch {
		return false;
	}
}

export function initAnalytics() {
	if (!env.PUBLIC_POSTHOG_KEY || !PRODUCTION_HOSTS.includes(location.hostname) || isOptedOut()) return;

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

	if (a.dataset.calendar) {
		posthog.capture('calendar_click', { ...props, method: a.dataset.calendar });
		return;
	}

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
