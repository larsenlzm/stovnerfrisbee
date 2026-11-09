<script lang="ts">
	import EventCard from '$lib/components/EventCard.svelte';
	import { events } from '$lib/data/content';

	const today = new Date().toISOString().slice(0, 10);
	const upcomingEvents = events.filter(e => !e.endDate || e.endDate >= today);
	const nextEvent = upcomingEvents[0];

	const cards = [
		{ href: '/ny-til-discgolf', title: 'Ny til discgolf', text: 'Slik prøver du sporten.', image: '/forside/ny-til-discgolf.webp' },
		{ href: '/banene', title: 'Banene', text: 'Hull, lengde og kart.', image: '/forside/banene.webp' },
		{ href: '/arrangementer', title: 'Arrangementer', text: 'Turneringer og ligaspill.', image: '/forside/arrangementer.webp' }
	];
</script>

<svelte:head>
	<title>Stovner Frisbeeklubb</title>
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": ["SportsClub", "NonprofitOrganization"],
		"name": "Stovner Frisbeeklubb",
		"legalName": "Stovner Frisbee Klubb",
		"alternateName": "Stovner Frisbee",
		"description": "En av Norges eldste discidrettsklubber, stiftet i 1985. Vi driver discgolfbaner i Stovnerlia og arrangerer turneringer og ukentlig golf for alle nivåer.",
		"url": "https://stovnerfrisbee.no",
		"logo": "https://stovnerfrisbee.no/stovnerlogo.jpg",
		"foundingDate": "1985",
		"sport": "Discgolf",
		"taxID": "894417382",
		"address": {
			"@type": "PostalAddress",
			"streetAddress": "Idas vei 35",
			"postalCode": "0981",
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
<section class="mx-auto max-w-6xl px-4 pt-3">
	<div class="aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--color-surface-2)] md:aspect-[21/9]">
		<img
			src="/forside/hero.webp"
			alt="Spillere på banen på Stovner, sett gjennom blomstrende busker"
			width="1400"
			height="1050"
			class="h-full w-full object-cover object-[50%_38%]"
			fetchpriority="high"
		/>
	</div>

	<div class="max-w-2xl pb-12 pt-7 md:pb-20 md:pt-12">
		<p class="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
			Stovner Frisbeeklubb · Siden 1985
		</p>
		<h1 class="mb-4 mt-3.5 text-balance text-3xl font-bold leading-[1.08] tracking-tight text-[var(--color-text)] sm:text-4xl md:text-5xl">
			En discgolfperle nord i Groruddalen
		</h1>
		<p class="max-w-lg text-base text-[var(--color-muted)] md:text-lg">
			En av Norges eldste discidrettsklubber. Banene er åpne og gratis for alle.
		</p>
		<div class="mt-7 flex flex-wrap gap-2.5">
			<a
				href="/bli-medlem"
				data-track="frontpage-hero"
				class="rounded-lg bg-[var(--color-accent)] px-[22px] py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)]"
			>
				Bli medlem
			</a>
			<a
				href="/banene"
				class="rounded-lg border border-[var(--color-text)]/25 px-[22px] py-3 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
			>
				Se banene
			</a>
		</div>
	</div>
</section>

<!-- Next event -->
{#if nextEvent}
	<section data-event={nextEvent.title} class="bg-[var(--color-surface-2)] py-14 md:py-20">
		<div class="mx-auto max-w-6xl px-4">
			<div class="grid gap-7 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-16">
				<div>
					<p class="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">Neste arrangement</p>
					<h2 class="mt-2.5 text-balance text-2xl font-bold leading-tight tracking-tight text-[var(--color-text)] md:text-3xl">{nextEvent.title}</h2>
					<p class="mt-3.5 max-w-[30rem] text-[15px] text-[var(--color-muted)]">{nextEvent.description}</p>
				</div>
				<div>
					<p class="text-xl font-semibold tracking-tight text-[var(--color-text)] md:text-2xl">{nextEvent.date}</p>
					<div class="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-[var(--color-primary)]">
						{#if nextEvent.link.startsWith('http')}
							<a href={nextEvent.link} target="_blank" rel="noopener noreferrer" class="hover:underline">{nextEvent.linkText} ↗</a>
						{:else}
							<a href={nextEvent.link} class="hover:underline">{nextEvent.linkText} →</a>
						{/if}
						<a href="/arrangementer" class="hover:underline">Alle arrangementer →</a>
					</div>
				</div>
			</div>
		</div>
	</section>
{/if}

<!-- Get started -->
<section class="py-14 md:py-20">
	<div class="mx-auto max-w-6xl px-4">
		<p class="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">Kom i gang</p>
		<h2 class="mt-2.5 text-balance text-2xl font-bold leading-tight tracking-tight text-[var(--color-text)] md:text-3xl">Alt du trenger for å spille</h2>
		<div class="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
			{#each cards as card}
				<a href={card.href} class="group block">
					<div class="aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--color-surface-2)]">
						<img src={card.image} alt="" class="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]" loading="lazy" decoding="async" />
					</div>
					<h3 class="mb-0.5 mt-3.5 text-[17px] font-semibold tracking-tight text-[var(--color-text)] transition-colors group-hover:text-[var(--color-primary)]">{card.title}</h3>
					<p class="text-sm text-[var(--color-muted)]">{card.text}</p>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Grasrotandelen -->
<section class="bg-[var(--color-surface-2)] py-10 md:py-12">
	<div class="mx-auto flex max-w-6xl flex-col gap-3 px-4 md:flex-row md:items-center md:justify-between md:gap-8">
		<p class="text-[15px] text-[var(--color-text)]">
			<span class="font-semibold">Støtt oss gratis via Grasrotandelen.</span>
			<span class="text-[var(--color-muted)]">7 % av ditt Norsk Tipping-spill går til klubben.</span>
		</p>
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
