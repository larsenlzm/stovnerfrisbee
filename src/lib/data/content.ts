import type { SiteEvent, BoardMember } from '../sheet/types.ts';
import eventsJson from './sheet/events.json';
import boardJson from './sheet/board.json';

export const courses = [
	{
		name: 'Stovner Discgolfpark',
		description:
			'18-hulls bane gjennom variert terreng i Stovnerlia. En av Norges eldste discgolfbaner, etablert i 1993. Byr på tekniske og lengre kast med betydelig høydeforskjell.',
		holes: 18,
		par: 57,
		distanceM: 2034,
		difficulty: 'Vanskelig',
		roundTimeMin: 120,
		established: 1993,
		designer: 'Espen Møkkelgjerd',
		rating: 3.9,
		ratingCount: 3984,
		baskets: 'DISCatcher Pro (28 kjeder)',
		tees: 'Kunstgress',
		amenities: { dogs: true, cart: true, stroller: true, restrooms: false, water: false },
		udiscLink: 'https://udisc.com/courses/stovner-discgolfpark-iohl',
		beginners: [
			'Kort layout med ni av de korteste hullene, laget for nybegynnere.',
			'Treningsområde med driving range ved klubbhuset (containerne).'
		],
		directions: [
			'T-bane linje 5 til Rommen, ca. 6 minutter å gå til banen.',
			'Med bil: parker ved Rommen skole og kultursenter, Karen Platous vei 31. Sjekk skiltingen og følg parkeringsreglene der.'
		],
		coords: { lat: 59.967007, lng: 10.915872 }
	},
	{
		name: 'Forsheimer DiscgolfPark 2023',
		// Navnet arrangementene bruker i `course`
		eventCourse: 'Forsheimer DiskGolfPark',
		description:
			'18-hulls bane ved Forsheimer med utfordrende terreng og stor høydeforskjell.',
		holes: 18,
		par: 57,
		distanceM: 1589,
		difficulty: 'Vanskelig',
		roundTimeMin: 120,
		established: 2012,
		rating: 3.5,
		ratingCount: 834,
		baskets: 'DiscGolfPark Pro',
		tees: 'Kunstgress',
		amenities: { dogs: true, cart: false, stroller: false, restrooms: false, water: false },
		udiscLink: 'https://udisc.com/courses/forsheimer-discgolf-park-2023-NtdI',
		directions: ['T-bane linje 5 til Rommen eller Stovner, ca. 10 minutter å gå til banen.'],
		coords: { lat: 59.957847, lng: 10.9149 }
	}
];

export const events: SiteEvent[] = eventsJson;

export const boardMembers: BoardMember[] = boardJson;

export const socialLinks = [
	{ name: 'Facebook', href: 'https://www.facebook.com/Stovnerfrisbeeklubb', label: 'Følg oss på Facebook' },
	{ name: 'Instagram', href: 'https://www.instagram.com/stovnerfrisbee', label: 'Instagram' },
	{ name: 'UDisc', href: 'https://udisc.com/events?courseId=ZiBrXtmJjmsj8DWRe', label: 'UDisc' },
	{ name: 'DGScene', href: 'https://www.discgolfscene.com/course/2776/stovner-disc-golf-park/tournaments', label: 'PDGA' }
];

export const navLinks = [
{ href: '/om-klubben', label: 'Om klubben' },
	{ href: '/banene', label: 'Banene' },
	{ href: '/arrangementer', label: 'Arrangementer' },
	{ href: '/kontakt', label: 'Kontakt' },
	{ href: '/bli-medlem', label: 'Bli medlem', cta: true }
];
