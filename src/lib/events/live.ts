interface DatedEvent {
	startDate?: string;
	endDate?: string;
	course?: string;
	category: string;
}

// Dagens dato i Oslo som YYYY-MM-DD, så «i dag» ikke skifter ved UTC-midnatt
export function osloToday(now: Date = new Date()): string {
	return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Oslo' }).format(now);
}

// Turnering som går på en av klubbens baner i dag. Ukentlige ligaer teller ikke, de ville vist «stengt» i månedsvis.
export function liveEvent<T extends DatedEvent>(events: T[], today: string): T | undefined {
	return events.find(
		(e) =>
			e.course &&
			e.startDate &&
			e.endDate &&
			!e.category.includes('Ukentlig') &&
			e.startDate <= today &&
			today <= e.endDate
	);
}
