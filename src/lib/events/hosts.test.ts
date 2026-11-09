import { describe, expect, it } from 'vitest';
import { eventHostRedirect, eventReroute } from './hosts';

const u = (s: string) => new URL(s);

describe('event host', () => {
	it('reroutes the subdomain root', () => {
		expect(eventReroute(u('https://nc.stovnerfrisbee.no/'))).toBe('/norges-cup');
		expect(eventReroute(u('https://NC.stovnerfrisbee.no/'))).toBe('/norges-cup');
	});
	it('leaves the main site alone', () => {
		expect(eventReroute(u('https://stovnerfrisbee.no/'))).toBeUndefined();
		expect(eventHostRedirect(u('https://stovnerfrisbee.no/om-klubben'))).toBeNull();
	});
	it('keeps the page, calendar file and proxy on the subdomain', () => {
		expect(eventHostRedirect(u('https://nc.stovnerfrisbee.no/'))).toBeNull();
		expect(eventHostRedirect(u('https://nc.stovnerfrisbee.no/norges-cup-4.ics'))).toBeNull();
		expect(eventHostRedirect(u('https://nc.stovnerfrisbee.no/sf-data/e/?ip=1'))).toBeNull();
		expect(eventHostRedirect(u('https://nc.stovnerfrisbee.no/_app/immutable/entry/start.js'))).toBeNull();
	});
	it('sends other subdomain paths to the main site', () => {
		expect(eventHostRedirect(u('https://nc.stovnerfrisbee.no/om-klubben?x=1'))).toBe('https://stovnerfrisbee.no/om-klubben?x=1');
		expect(eventHostRedirect(u('https://nc.stovnerfrisbee.no/norges-cup'))).toBe('https://stovnerfrisbee.no/norges-cup');
	});
});
