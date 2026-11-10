import { describe, expect, it } from 'vitest';
import { liveEvent, osloToday } from './live';

const tournament = {
	title: 'Discmas 2026',
	startDate: '2026-11-29',
	endDate: '2026-11-29',
	course: 'Forsheimer DiskGolfPark',
	category: 'Turnering'
};
const twoDays = { ...tournament, title: 'Stovner Open', startDate: '2026-05-30', endDate: '2026-05-31', course: 'Stovner Discgolfpark' };
const league = { title: 'Høstligaen', startDate: '2026-08-12', endDate: '2026-09-16', course: 'Stovner Discgolfpark', category: 'Ukentlig, PDGA' };
const elsewhere = { title: 'Uten bane', startDate: '2026-11-29', endDate: '2026-11-29', category: 'Turnering' };

describe('osloToday', () => {
	it('uses the date in Oslo, not UTC', () => {
		// 23:30 UTC is already the next day in Oslo (UTC+1 in winter)
		expect(osloToday(new Date('2026-11-28T23:30:00Z'))).toBe('2026-11-29');
		expect(osloToday(new Date('2026-11-29T12:00:00Z'))).toBe('2026-11-29');
	});
});

describe('liveEvent', () => {
	it('finds a tournament on its day', () => {
		expect(liveEvent([tournament], '2026-11-29')?.title).toBe('Discmas 2026');
	});

	it('is live on every day of a multi-day event', () => {
		expect(liveEvent([twoDays], '2026-05-30')?.title).toBe('Stovner Open');
		expect(liveEvent([twoDays], '2026-05-31')?.title).toBe('Stovner Open');
	});

	it('is not live before or after', () => {
		expect(liveEvent([tournament, twoDays], '2026-11-28')).toBeUndefined();
		expect(liveEvent([tournament, twoDays], '2026-11-30')).toBeUndefined();
	});

	it('ignores weekly leagues and events without a course', () => {
		expect(liveEvent([league], '2026-09-01')).toBeUndefined();
		expect(liveEvent([elsewhere], '2026-11-29')).toBeUndefined();
	});
});
