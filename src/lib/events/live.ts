interface DatedEvent {
	startDate?: string;
	endDate?: string;
	course?: string;
	category: string;
	// Ukedag for ukentlige ligaer, 0 = søndag … 6 = lørdag
	weekday?: number;
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

function weekdayOf(date: string): number {
	return new Date(`${date}T00:00:00Z`).getUTCDay();
}

const isWeekly = (e: DatedEvent) => e.category.includes('Ukentlig');

// Spilles det på en av klubbens baner denne dagen? Ukentlige ligaer teller bare på sin ukedag i sesongen.
function playsOn(e: DatedEvent, date: string): boolean {
	if (!e.course || !e.startDate || !e.endDate) return false;
	if (date < e.startDate || date > e.endDate) return false;
	if (!isWeekly(e)) return true;
	return e.weekday !== undefined && weekdayOf(date) === e.weekday;
}

// I dag går foran i morgen, og på samme dag går en turnering foran en liga
function pick<T extends DatedEvent>(events: T[], date: string): T | undefined {
	const playing = events.filter((e) => playsOn(e, date));
	return playing.find((e) => !isWeekly(e)) ?? playing[0];
}

export function liveEvent<T extends DatedEvent>(
	events: T[],
	today: string
): { event: T; when: 'today' | 'tomorrow' } | undefined {
	const now = pick(events, today);
	if (now) return { event: now, when: 'today' };
	// Turneringer varsles dagen før de starter, ligaer dagen før hver runde
	const tomorrow = nextDay(today);
	const soon = pick(
		events.filter((e) => isWeekly(e) || e.startDate === tomorrow),
		tomorrow
	);
	return soon ? { event: soon, when: 'tomorrow' } : undefined;
}

// Samme som liveEvent, men bare for arrangementer på én bane (status på banekortene)
export function liveEventAt<T extends DatedEvent>(events: T[], course: string, today: string) {
	return liveEvent(
		events.filter((e) => e.course === course),
		today
	);
}
