import { describe, it, expect } from 'vitest';
import { decideSource, assertPublishable, boardImagePath } from './fetch-plan.ts';
import type { SiteEvent, PublishedBoardRow } from './types.ts';

const event: SiteEvent = {
	title: 'A',
	date: '1. mai',
	description: 'd',
	link: '/x',
	linkText: 't',
	category: 'k'
};
const row: PublishedBoardRow = {
	id: 'a1',
	order: 1,
	name: 'N',
	role: 'R',
	email: '',
	imageUrl: 'https://drive.google.com/file/d/abc/view'
};

describe('decideSource', () => {
	it('uses snapshot locally without credentials', () => {
		expect(decideSource({})).toBe('snapshot');
	});
	it('errors on Vercel without credentials', () => {
		const r = decideSource({ VERCEL: '1' });
		expect(typeof r === 'object' && 'error' in r).toBe(true);
	});
	it('uses sheet when both are set, with or without VERCEL', () => {
		const env = { GOOGLE_SERVICE_ACCOUNT_JSON: '{}', CONTENT_SHEET_ID: 'id' };
		expect(decideSource(env)).toBe('sheet');
		expect(decideSource({ ...env, VERCEL: '1' })).toBe('sheet');
	});
	it('errors on Vercel when only one is set', () => {
		expect(decideSource({ VERCEL: '1', CONTENT_SHEET_ID: 'id' })).toHaveProperty('error');
		expect(decideSource({ VERCEL: '1', GOOGLE_SERVICE_ACCOUNT_JSON: '{}' })).toHaveProperty('error');
	});
});

describe('assertPublishable', () => {
	it('throws on empty events or empty board', () => {
		expect(() => assertPublishable([], [row])).toThrow();
		expect(() => assertPublishable([event], [])).toThrow();
	});
	it('passes when both have rows', () => {
		expect(() => assertPublishable([event], [row])).not.toThrow();
	});
});

describe('boardImagePath', () => {
	it('builds the static path', () => {
		expect(boardImagePath('a1b2')).toBe('/styret/a1b2.jpg');
	});
});
