import { describe, expect, it } from 'vitest';
import { liveEvent, liveEventAt, nextDay, osloToday } from './live';

const tournament = {
	title: 'Discmas 2026',
	startDate: '2026-11-29',
	endDate: '2026-11-29',
	course: 'Forsheimer DiskGolfPark',
	category: 'Turnering'
};
const twoDays = { ...tournament, title: 'Stovner Open', startDate: '2026-05-30', endDate: '2026-05-31', course: 'Stovner Discgolfpark' };
const league = { title: 'Høstligaen', startDate: '2026-08-12', endDate: '2026-09-16', course: 'Stovner Discgolfpark', category: 'Ukentlig, PDGA', weekday: 3 };
const noWeekday = { ...league, title: 'Uten ukedag', weekday: undefined };
const elsewhere = { title: 'Uten bane', startDate: '2026-11-29', endDate: '2026-11-29', category: 'Turnering' };

describe('osloToday', () => {
	it('uses the date in Oslo, not UTC', () => {
		// 23:30 UTC is already the next day in Oslo (UTC+1 in winter)
		expect(osloToday(new Date('2026-11-28T23:30:00Z'))).toBe('2026-11-29');
		expect(osloToday(new Date('2026-11-29T12:00:00Z'))).toBe('2026-11-29');
		// Sommertid (UTC+2): 22:30 UTC er allerede neste dag i Oslo
		expect(osloToday(new Date('2026-06-14T22:30:00Z'))).toBe('2026-06-15');
	});
});

describe('nextDay', () => {
	it('crosses month and year boundaries', () => {
		expect(nextDay('2026-11-30')).toBe('2026-12-01');
		expect(nextDay('2026-12-31')).toBe('2027-01-01');
	});
});

describe('liveEvent', () => {
	it('finds a tournament on its day', () => {
		expect(liveEvent([tournament], '2026-11-29')?.event.title).toBe('Discmas 2026');
	});

	it('is live on every day of a multi-day event', () => {
		expect(liveEvent([twoDays], '2026-05-30')?.event.title).toBe('Stovner Open');
		expect(liveEvent([twoDays], '2026-05-31')?.event.title).toBe('Stovner Open');
	});

	it('reports today or tomorrow', () => {
		expect(liveEvent([tournament], '2026-11-29')?.when).toBe('today');
		expect(liveEvent([tournament], '2026-11-28')?.when).toBe('tomorrow');
		expect(liveEvent([twoDays], '2026-05-29')?.when).toBe('tomorrow');
		expect(liveEvent([twoDays], '2026-05-31')?.when).toBe('today');
	});

	it('prefers an event today over one tomorrow', () => {
		const tomorrow = { ...tournament, title: 'I morgen', startDate: '2026-11-30', endDate: '2026-11-30' };
		expect(liveEvent([tomorrow, tournament], '2026-11-29')?.event.title).toBe('Discmas 2026');
	});

	it('is not shown two days before or after', () => {
		expect(liveEvent([tournament, twoDays], '2026-11-27')).toBeUndefined();
		expect(liveEvent([tournament, twoDays], '2026-11-30')).toBeUndefined();
	});

	it('ignores weekly events without a weekday and events without a course', () => {
		expect(liveEvent([noWeekday], '2026-09-02')).toBeUndefined();
		expect(liveEvent([elsewhere], '2026-11-29')).toBeUndefined();
	});
});

describe('liveEvent for weekly leagues', () => {
	it('is live on the league weekday and announced the day before', () => {
		expect(liveEvent([league], '2026-09-02')).toMatchObject({ event: { title: 'Høstligaen' }, when: 'today' });
		expect(liveEvent([league], '2026-09-01')).toMatchObject({ event: { title: 'Høstligaen' }, when: 'tomorrow' });
	});

	it('is announced the day before the first round', () => {
		expect(liveEvent([league], '2026-08-11')?.when).toBe('tomorrow');
	});

	it('is not shown on other weekdays or outside the season', () => {
		expect(liveEvent([league], '2026-09-03')).toBeUndefined();
		expect(liveEvent([league], '2026-08-04')).toBeUndefined();
		expect(liveEvent([league], '2026-09-22')).toBeUndefined();
	});

	it('lets a tournament tomorrow show even with a league next week', () => {
		const saturday = { ...tournament, title: 'Lørdagsturnering', startDate: '2026-09-05', endDate: '2026-09-05' };
		expect(liveEvent([league, saturday], '2026-09-04')).toMatchObject({ event: { title: 'Lørdagsturnering' }, when: 'tomorrow' });
	});

	it('prefers a tournament over a league on the same day', () => {
		const wednesday = { ...tournament, title: 'Onsdagsturnering', startDate: '2026-09-02', endDate: '2026-09-02' };
		expect(liveEvent([league, wednesday], '2026-09-01')?.event.title).toBe('Onsdagsturnering');
		expect(liveEvent([league, wednesday], '2026-09-02')?.event.title).toBe('Onsdagsturnering');
	});

	it('prefers anything today over a tournament tomorrow', () => {
		const thursday = { ...tournament, title: 'Torsdagsturnering', startDate: '2026-09-03', endDate: '2026-09-03' };
		expect(liveEvent([thursday, league], '2026-09-02')).toMatchObject({ event: { title: 'Høstligaen' }, when: 'today' });
	});
});

describe('liveEventAt', () => {
	it('only looks at events on the given course', () => {
		expect(liveEventAt([tournament, twoDays], 'Stovner Discgolfpark', '2026-05-30')?.event.title).toBe('Stovner Open');
		expect(liveEventAt([tournament, twoDays], 'Stovner Discgolfpark', '2026-11-29')).toBeUndefined();
		expect(liveEventAt([tournament, twoDays], 'Forsheimer DiskGolfPark', '2026-11-28')).toMatchObject({ event: { title: 'Discmas 2026' }, when: 'tomorrow' });
	});
});
