import type { EventInfo } from './types';

const compact = (date: string) => date.replaceAll('-', '');

// Eksklusiv sluttdato (dagen etter), regnet i UTC
function dayAfter(date: string): string {
	const d = new Date(`${date}T00:00:00Z`);
	d.setUTCDate(d.getUTCDate() + 1);
	return d.toISOString().slice(0, 10);
}

function escapeText(value: string): string {
	return value
		.replaceAll('\\', '\\\\')
		.replaceAll(';', '\\;')
		.replaceAll(',', '\\,')
		.replaceAll('\n', '\\n');
}

const summary = (event: EventInfo) => `${event.title} – ${event.place}`;
const description = (event: EventInfo) => `${event.intro} ${event.url}`;

export function toIcs(event: EventInfo, now: Date = new Date()): string {
	const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
	const lines = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//Stovner Frisbee//Norges Cup//NO',
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
		'BEGIN:VEVENT',
		`UID:${event.slug}@stovnerfrisbee.no`,
		`DTSTAMP:${stamp}`,
		`DTSTART;VALUE=DATE:${compact(event.start)}`,
		`DTEND;VALUE=DATE:${compact(dayAfter(event.endInclusive))}`,
		`SUMMARY:${escapeText(summary(event))}`,
		`LOCATION:${escapeText(event.location)}`,
		`DESCRIPTION:${escapeText(description(event))}`,
		`URL:${event.url}`,
		'END:VEVENT',
		'END:VCALENDAR'
	];
	return lines.join('\r\n') + '\r\n';
}

export function googleCalendarUrl(event: EventInfo): string {
	const params = new URLSearchParams({
		action: 'TEMPLATE',
		text: summary(event),
		dates: `${compact(event.start)}/${compact(dayAfter(event.endInclusive))}`,
		location: event.location,
		details: description(event)
	});
	return `https://calendar.google.com/calendar/render?${params}`;
}
