export interface EventInfo {
	slug: string;
	name: string;
	number: number;
	title: string;
	dateLabel: string;
	place: string;
	location: string;
	/** Første dag, YYYY-MM-DD */
	start: string;
	/** Siste dag (inkludert), YYYY-MM-DD */
	endInclusive: string;
	url: string;
	intro: string;
	image: { src: string; alt: string; position: string };
	/** Delingsbilde (Open Graph), 1200×630 */
	shareImage: { src: string; alt: string };
}
