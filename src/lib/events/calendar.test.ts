import { describe, expect, it } from 'vitest';
import { googleCalendarUrl, toIcs } from './calendar';
import { norgesCup4 } from './norges-cup-4';

describe('kalender', () => {
	const ics = toIcs(norgesCup4, new Date('2026-11-09T12:00:00Z'));
	const lines = ics.split('\r\n');

	it('uses CRLF and wraps one VEVENT', () => {
		expect(lines[0]).toBe('BEGIN:VCALENDAR');
		expect(lines).toContain('BEGIN:VEVENT');
		expect(ics.endsWith('END:VCALENDAR\r\n')).toBe(true);
		expect(ics).not.toMatch(/[^\r]\n/);
	});
	it('is an all-day event 6–8 August with exclusive end', () => {
		expect(lines).toContain('DTSTART;VALUE=DATE:20270806');
		expect(lines).toContain('DTEND;VALUE=DATE:20270809');
	});
	it('has a fixed UID and the stamp', () => {
		expect(lines).toContain('UID:norges-cup-4@stovnerfrisbee.no');
		expect(lines).toContain('DTSTAMP:20261109T120000Z');
	});
	it('escapes commas and semicolons', () => {
		expect(lines).toContain('LOCATION:Stovner discgolfpark\\, Oslo');
		expect(lines).toContain('SUMMARY:Norges Cup #4 – Stovner');
		expect(lines).toContain('URL:https://nc.stovnerfrisbee.no/');
	});
	it('builds a Google Calendar link with exclusive end', () => {
		const u = new URL(googleCalendarUrl(norgesCup4));
		expect(u.origin + u.pathname).toBe('https://calendar.google.com/calendar/render');
		expect(u.searchParams.get('action')).toBe('TEMPLATE');
		expect(u.searchParams.get('text')).toBe('Norges Cup #4 – Stovner');
		expect(u.searchParams.get('dates')).toBe('20270806/20270809');
		expect(u.searchParams.get('location')).toBe('Stovner discgolfpark, Oslo');
		expect(u.searchParams.get('details')).toContain('https://nc.stovnerfrisbee.no/');
	});
});
