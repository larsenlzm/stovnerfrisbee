import { describe, it, expect } from 'vitest';
import { events, boardMembers } from './content';
import eventsJson from './sheet/events.json';
import boardJson from './sheet/board.json';

describe('content snapshots', () => {
	it('events', () => {
		expect(events).toHaveLength(12);
		expect(events[0].title).toBe('Torsdagsgolf');
		expect(events.at(-1)?.title).toBe('Norges Cup #4');
		const liga = events.find((e) => e.title.startsWith('Vårligaen'));
		expect(liga?.weekday).toBe(3);
		expect(liga?.resultsLink).toBe('/arrangementer/varligaen-2026');
	});
	it('board', () => {
		expect(boardMembers).toHaveLength(6);
		expect(boardMembers[0]).toEqual({
			name: 'Herman Walther',
			role: 'Leder',
			email: 'herman@stovnerfrisbee.no',
			image: '/mansverk.jpg'
		});
	});
	it('snapshot files back the exports', () => {
		expect(eventsJson).toHaveLength(12);
		expect(boardJson).toHaveLength(6);
	});
});
