<script lang="ts">
	import EventCard from '$lib/components/EventCard.svelte';
	import { events } from '$lib/data/content';

	const today = new Date().toISOString().slice(0, 10);
	const upcomingEvents = events.filter(e => !e.endDate || e.endDate >= today);

	const quickLinks = [
		{
			href: '/om-klubben',
			title: 'Om klubben',
			description: 'Historien vår, verdier og hvem vi er',
			icon: '🏆'
		},
		{
			href: '/banene',
			title: 'Banene',
			description: 'Discgolfbanene vi driver i Stovner',
			icon: '🥏'
		},
		{
			href: '/arrangementer',
			title: 'Arrangementer',
			description: 'Turneringer, torsdagsgolf og liga',
			icon: '📅'
		},
		{
			href: '/bli-medlem',
			title: 'Bli medlem',
			description: 'Meld deg inn og bli en del av klubben',
			icon: '✨'
		},
		{
			href: '/kontakt',
			title: 'Kontakt oss',
			description: 'Spørsmål eller sponsorsamarbeid',
			icon: '✉️'
		}
	];
</script>

<svelte:head>
	<title>Stovner Frisbeeklubb</title>
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": ["SportsClub", "NonprofitOrganization"],
		"name": "Stovner Frisbeeklubb",
		"alternateName": "Stovner Frisbee",
		"description": "En av Norges eldste discidrettsklubber, stiftet i 1985. Vi driver discgolfbaner i Stovnerlia og arrangerer turneringer og ukentlig golf for alle nivåer.",
		"url": "https://stovnerfrisbee.no",
		"logo": "https://stovnerfrisbee.no/stovnerlogo.jpg",
		"foundingDate": "1985",
		"sport": "Discgolf",
		"address": {
			"@type": "PostalAddress",
			"addressLocality": "Oslo",
			"addressRegion": "Oslo",
			"addressCountry": "NO"
		},
		"sameAs": [
			"https://www.facebook.com/Stovnerfrisbeeklubb",
			"https://www.instagram.com/stovnerfrisbee",
			"https://udisc.com/events?courseId=ZiBrXtmJjmsj8DWRe"
		],
		"memberOf": {
			"@type": "SportsOrganization",
			"name": "Norges amerikanske idretters forbund (NAIF)"
		},
		"offers": {
			"@type": "Offer",
			"name": "Medlemskap i Stovner Frisbeeklubb",
			"description": "Bli medlem og delta i turneringer, ligaspill og ukentlig golf. Støtt banene i Stovnerlia.",
			"url": "https://stovnerfrisbee.no/bli-medlem"
		}
	})}</script>`}
</svelte:head>

<!-- Hero -->
<section class="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 text-center">
	<!-- Background image + overlay -->
	<div class="pointer-events-none absolute inset-0">
		<img src="/homepagebanner.jpg" alt="" class="absolute inset-0 h-full w-full object-cover" />
		<div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/65"></div>
	</div>

	<div class="relative z-10 max-w-3xl">
		<!-- Logo -->
		<div class="mb-8 flex justify-center">
			<img src="/stovnerlogo.jpg" alt="Stovner Frisbee" width="120" height="120" class="rounded-full shadow-md" />
		</div>

		<h1 class="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
			Stovner<br/><span class="text-[var(--color-primary-light,#7dd3fc)]">Frisbeeklubb</span>
		</h1>
		<p class="mb-3 text-xl font-medium text-white/80 sm:text-2xl">
			En discgolfperle nord i Groruddalen
		</p>
		<p class="mb-10 text-base text-white/60">
			Stiftet 1985 · En av Norges eldste discidrettsklubber
		</p>

		<div class="flex flex-col items-center gap-3">
			<!-- Rad 1: to bokstknapper -->
			<div class="flex flex-col sm:flex-row items-center gap-3">
				<a
					href="/bli-medlem"
					class="rounded-lg bg-[var(--color-accent)] px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-[var(--color-accent-dark)] hover:shadow-[var(--color-accent)]/20 hover:shadow-xl"
				>
					Bli medlem
				</a>
				<a
					href="/arrangementer"
					class="rounded-lg border border-white/50 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/10 hover:border-white"
				>
					Kommende arrangementer
				</a>
			</div>
			<!-- Rad 2: ghost-lenke -->
			<a
				href="/banene"
				class="text-sm font-medium text-white/70 transition-colors hover:text-white"
			>
				Se banene →
			</a>
		</div>
	</div>

	<!-- Scroll hint -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
		<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
			<path d="M4 7L10 13L16 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</div>
</section>

<!-- Quick nav cards -->
<section class="mx-auto max-w-6xl px-4 py-16">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
		{#each quickLinks as link}
			<a
				href={link.href}
				class="group flex flex-col items-start rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-all hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-surface-2)]"
			>
				<span class="mb-3 text-2xl" aria-hidden="true">{link.icon}</span>
				<h2 class="mb-1 font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
					{link.title}
				</h2>
				<p class="text-sm text-[var(--color-muted)]">{link.description}</p>
			</a>
		{/each}
	</div>
</section>

<!-- Upcoming events teaser -->
<section class="mx-auto max-w-6xl px-4 py-8">
	<div class="mb-8 flex items-end justify-between">
		<div>
			<h2 class="text-2xl font-bold text-[var(--color-text)]">Kommende arrangementer</h2>
			<p class="mt-1 text-sm text-[var(--color-muted)]">Turneringer, ukentlig golf og mer</p>
		</div>
		<a href="/arrangementer" class="text-sm font-medium text-[var(--color-primary)] hover:underline">
			Se alle →
		</a>
	</div>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
		{#each upcomingEvents as event}
			<EventCard {...event} />
		{/each}
	</div>
</section>

<!-- Grasrotandelen callout -->
<section class="mx-auto max-w-6xl px-4 py-4">
	<div class="flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4">
		<img src="/norsktipping.jpg" alt="Norsk Tipping" width="48" height="48" class="shrink-0 rounded" />
		<div class="min-w-0 flex-1">
			<p class="text-sm font-semibold text-[var(--color-text)]">Støtt oss via Grasrotandelen</p>
			<p class="text-sm text-[var(--color-muted)]">7 % av ditt Norsk Tipping-spill går rett til klubben — gratis for deg.</p>
		</div>
		<a
			href="https://www.norsk-tipping.no/grasrotandelen/din-mottaker/894417382"
			target="_blank"
			rel="noopener noreferrer"
			class="shrink-0 text-sm font-medium text-[var(--color-primary)] hover:underline"
		>
			Velg oss ↗
		</a>
	</div>
</section>

<!-- Brief about -->
<section class="mx-auto max-w-6xl px-4 py-16">
	<div class="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
		<div class="grid grid-cols-1 md:grid-cols-2">
			<div class="p-8 md:p-12">
				<p class="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">Om oss</p>
				<h2 class="mb-4 text-2xl font-bold text-[var(--color-text)] md:text-3xl">
					40 år med discgolf i Groruddalen
				</h2>
				<p class="mb-4 leading-relaxed text-[var(--color-muted)]">
					Stovner Frisbeeklubb ble stiftet i 1985 og er en av Norges eldste discidrettsklubber.
					Vi holder til på Stovner i Oslo, og driver discgolfbaner for alle nivåer — fra nybegynnere til
					erfarne spillere.
				</p>
				<p class="mb-8 leading-relaxed text-[var(--color-muted)]">
					Fellesskap, glede og kjærlighet til sporten er kjernen i alt vi gjør.
				</p>
				<a
					href="/om-klubben"
					class="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline"
				>
					Les mer om klubben →
				</a>
			</div>
			<img src="/rocker.jpg" alt="Stovner Frisbeeklubb" class="h-64 w-full object-cover object-center md:h-full" />
		</div>
	</div>
</section>
