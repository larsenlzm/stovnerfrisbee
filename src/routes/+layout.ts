import { dev } from '$app/environment';
import { injectAnalytics } from '@vercel/analytics/sveltekit';

// Samme ?notrack-bryter som PostHog (sf-notrack i localStorage, settes i $lib/analytics)
function isOptedOut() {
	try {
		return localStorage.getItem('sf-notrack') === '1';
	} catch {
		return false;
	}
}

injectAnalytics({
	mode: dev ? 'development' : 'production',
	beforeSend: (event) => (isOptedOut() ? null : event)
});
