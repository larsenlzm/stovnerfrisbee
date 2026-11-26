import { describe, expect, it } from 'vitest';
import { legacyRedirect } from './legacy-redirects';

const u = (s: string) => new URL(s);

describe('legacy WordPress redirects', () => {
	it('sends old page ids to the matching new page', () => {
		expect(legacyRedirect(u('https://www.stovnerfrisbee.no/?page_id=1302'))).toBe('/arrangementer');
		expect(legacyRedirect(u('https://www.stovnerfrisbee.no/?page_id=19'))).toBe('/banene');
		expect(legacyRedirect(u('https://stovnerfrisbee.no/?page_id=975'))).toBe('/bli-medlem');
		expect(legacyRedirect(u('https://stovnerfrisbee.no/?page_id=1227'))).toBe('/kontakt');
		expect(legacyRedirect(u('https://stovnerfrisbee.no/?page_id=796'))).toBe('/om-klubben');
	});
	it('also handles index.php and extra query params', () => {
		expect(legacyRedirect(u('https://stovnerfrisbee.no/index.php?page_id=19'))).toBe('/banene');
		expect(legacyRedirect(u('https://stovnerfrisbee.no/?page_id=1302&fbclid=abc'))).toBe('/arrangementer');
	});
	it('leaves everything else alone', () => {
		expect(legacyRedirect(u('https://stovnerfrisbee.no/'))).toBeNull();
		expect(legacyRedirect(u('https://stovnerfrisbee.no/?page_id=99999'))).toBeNull();
		expect(legacyRedirect(u('https://stovnerfrisbee.no/?notrack'))).toBeNull();
		expect(legacyRedirect(u('https://stovnerfrisbee.no/banene?page_id=1302'))).toBeNull();
	});
});
