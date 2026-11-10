interface DatedEvent {
	startDate?: string;
	endDate?: string;
	course?: string;
	category: string;
}

// Dagens dato i Oslo som YYYY-MM-DD, så «i dag» ikke skifter ved UTC-midnatt.
// sv-SE brukes fordi den lokalen formaterer datoer som YYYY-MM-DD.
export function osloToday(now: Date = new Date()): string {
	return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Oslo' }).format(now);
}

export function nextDay(date: string): string {
	const d = new Date(`${date}T00:00:00Z`);
	d.setUTCDate(d.getUTCDate() + 1);
	return d.toISOString().slice(0, 10);
}

// Turneringer som bruker en av klubbens baner. Ukentlige ligaer teller ikke, de ville vist «stengt» i månedsvis.
function usesCourse(e: DatedEvent): boolean {
	return Boolean(e.course && e.startDate && e.endDate && !e.category.includes('Ukentlig'));
}

// Turnering som går i dag, ellers en som starter i morgen
export function liveEvent<T extends DatedEvent>(
	events: T[],
	today: string
): { event: T; when: 'today' | 'tomorrow' } | undefined {
	const candidates = events.filter(usesCourse);
	const now = candidates.find((e) => e.startDate! <= today && today <= e.endDate!);
	if (now) return { event: now, when: 'today' };
	const tomorrow = nextDay(today);
	const soon = candidates.find((e) => e.startDate === tomorrow);
	return soon ? { event: soon, when: 'tomorrow' } : undefined;
}
