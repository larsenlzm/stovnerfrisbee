// Adresser fra den gamle WordPress-siden (f.eks. /?page_id=1302) som fortsatt besøkes fra bokmerker.
// Sidene på 2024-siden og de mest besøkte eldre sidene sendes til nærmeste side her.
const PAGE_IDS: Record<string, string> = {
	'19': '/banene', // Stovner DiskGolfPark (2016)
	'796': '/om-klubben', // Om Stovner Frisbeeklubb
	'956': '/banene', // Våre anlegg
	'975': '/bli-medlem', // Bli medlem
	'1011': '/om-klubben', // Styret
	'1051': '/arrangementer', // Arrangement
	'1059': '/arrangementer', // Ultimate arrangement
	'1227': '/kontakt', // Kontakt oss
	'1302': '/arrangementer', // Aktuelt
	'1476': '/arrangementer', // DG Arrangement
	'1555': '/om-klubben' // 40 år
};

// Gamle stier og filer som har fått ny adresse (nøkkelen er stien etter dekoding)
const PATHS: Record<string, string> = {
	'/reisestotte': '/for-medlemmer#reisestotte',
	'/reisestotte/': '/for-medlemmer#reisestotte',
	'/wp-content/uploads/2017/04/Stovner-Frisbeeklubb-Turneringsstøtte.pdf': '/for-medlemmer#reisestotte'
};

export function legacyRedirect(url: URL): string | null {
	let path = url.pathname;
	try {
		path = decodeURIComponent(path);
	} catch {
		// Ugyldig prosent-koding: behold stien som den er
	}
	if (PATHS[path]) return PATHS[path];
	if (url.pathname !== '/' && url.pathname !== '/index.php') return null;
	const id = url.searchParams.get('page_id');
	return (id && PAGE_IDS[id]) || null;
}
