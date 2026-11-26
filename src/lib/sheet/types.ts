export type Cell = string | number | boolean;

export type SiteEvent = {
	title: string;
	date: string;
	startDate?: string;
	endDate?: string;
	weekday?: number;
	course?: string;
	description: string;
	link: string;
	linkText: string;
	category: string;
	resultsLink?: string;
};

export type BoardMember = { name: string; role: string; email: string; image: string };

export type PublishedBoardRow = {
	id: string;
	order: number;
	name: string;
	role: string;
	email: string;
	imageUrl: string;
};
