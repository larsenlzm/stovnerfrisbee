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
		coords: { lat: 59.967007, lng: 10.915872 }
	},
	{
		name: 'Forsheimer DiscgolfPark 2023',
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
		coords: { lat: 59.957847, lng: 10.9149 }
	}
];

export const events = [
	{
		title: 'Torsdagsgolf',
		date: 'Hver torsdag 17:30–20:30',
		description:
			'Norges eldste ukentlige turnering! Åpen for alle nivåer.',
		link: 'https://udisc.com/leagues/tordagsgolfen-b4qL0W',
		linkText: 'Mer info på UDisc',
		category: 'Ukentlig'
	},
	{
		title: 'Vårligaen 2026',
		date: 'Onsdager 29. apr – 17. jun',
		endDate: '2026-06-17',
		description:
			'8 runder ligaspill på Stovner, presentert av Stovner Frisbeeklubb og Team Innova Norge.',
		link: 'https://tjing.se/tour/3fa54bea-456c-4e48-b75c-6748ad2a1b00/',
		linkText: 'Mer info på Tjing',
		category: 'Ukentlig, PDGA',
		resultsLink: '/arrangementer/varligaen-2026'
	},
	{
		title: 'Stovner Open 2026',
		date: '30.–31. mai 2026',
		endDate: '2026-05-31',
		description:
			'Årets store turnering på hjemmebanen — PDGA C-tier.',
		link: 'https://www.discgolfscene.com/tournaments/Stovner_Open_2026',
		linkText: 'Mer info på DGScene',
		category: 'Turnering, PDGA'
	},
	{
		title: 'ODGC Flex Start Stovner',
		date: '15. juni 2026',
		endDate: '2026-06-15',
		description:
			'Flex start-turnering på Stovner arrangert av ODGC. Passer godt for å teste formen midt i sesongen.',
		link: 'https://www.discgolfscene.com/tournaments/ODGC_Flex_Start_Stovner_2026',
		linkText: 'Mer info på DGScene',
		category: 'Turnering, PDGA'
	},
	{
		title: 'Oslo Disc Golf Classic 2026',
		date: '20.–21. juni 2026',
		endDate: '2026-06-21',
		description:
			'PDGA B-tier presentert av MVP Disc Sports og Team Nordisc. En runde spilles på Stovner Discgolfpark, en runde på Holmenkollen.',
		link: 'https://www.discgolfscene.com/tournament/Nordisc_Tour_3rd_annual_Oslo_Disc_Golf_Classic_2026',
		linkText: 'Mer info på DGScene',
		category: 'Turnering, PDGA'
	},
	{
		title: 'Stovner Doubles 2026',
		date: '25. juli 2026',
		endDate: '2026-07-25',
		description:
			'Doubles-turnering på Stovner. Finn deg en partner og still til start i sommervarmen!',
		link: 'https://www.discgolfscene.com/tournaments/Stovner_Doubles_2026',
		linkText: 'Mer info på DGScene',
		category: 'Turnering, PDGA, DOUBLES'
	},
	{
		title: 'Høstligaen 2026',
		date: 'Onsdager 12. aug – 16. sep',
		endDate: '2026-09-16',
		description:
			'6 runder ligaspill på Stovner, presentert av Stovner Frisbeeklubb og Team Innova Norge.',
		link: 'https://tjing.se/tour/35f47def-f801-4861-9528-912673606e10/events',
		linkText: 'Mer info på Tjing',
		category: 'Ukentlig, PDGA'
	},
	{
		title: 'HyzerTour Stovner 2026',
		date: '22.–23. august 2026',
		endDate: '2026-08-23',
		description:
			'PDGA C-tier presentert av HyzerShop.no. En av de store sommerturneringene på Stovner Discgolfpark.',
		link: 'https://www.discgolfscene.com/tournaments/HyzerTour_Stovner_2026_presented_by_HyzerShop_no',
		linkText: 'Mer info på DGScene',
		category: 'Turnering, PDGA'
	},
	{
		title: 'Klubbmesterskap 2026',
		date: '30. august 2026',
		endDate: '2026-08-30',
		description:
			'Stovner Frisbeeklubbs klubbmesterskap – 2 runder på hjemmebanen, åpent for alle divisjoner.',
		link: 'https://udisc.com/events/klubbmesterskap-stovner-frisbeeklubb-2026-vv8hhl/about',
		linkText: 'Mer info på UDisc',
		category: 'Turnering'
	},
	{
		title: 'Sesongfinalen på Stovner 2026',
		date: '20. september 2026',
		endDate: '2026-09-20',
		description:
			'PDGA C-tier – sesongens avsluttende turnering på hjemmebanen, to runder med shotgunstart.',
		link: 'https://www.discgolfscene.com/tournament/Sesongfinalen_pa_Stovner_2026',
		linkText: 'Mer info på DGScene',
		category: 'Turnering, PDGA'
	}
];

export const boardMembers = [
	{ name: 'Herman Walther', role: 'Leder', email: 'leder@stovnerfrisbee.no', image: '/mansverk.jpg' },
	{ name: 'Amund Alstad', role: 'Nestleder', email: '', image: '/Mundo.jpg' },
	{ name: 'Henrik Broum', role: 'Styremedlem', email: 'td@stovnerfrisbee.no', image: '/riky.jpg' },
	{ name: 'Sebastian Hagen', role: 'Styremedlem', email: '', image: '/Sebbe.jpg' },
	{ name: 'Jesper Hauge', role: 'Styremedlem', email: '', image: '/jesman.jpg' },
	{ name: 'Elias Larsen', role: 'Styremedlem · Kontaktperson for nettsiden', email: 'eliassagmolarsen@gmail.com', image: '/meg.jpg' }
];

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
