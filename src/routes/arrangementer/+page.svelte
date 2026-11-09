<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import EventCard from '$lib/components/EventCard.svelte';
	import { events } from '$lib/data/content';

	const today = new Date().toISOString().slice(0, 10);
	const upcoming = events.filter(e => !e.endDate || e.endDate >= today);
	// Sist avsluttede først
	const ended = events
		.filter(e => e.endDate && e.endDate < today)
		.sort((a, b) => b.endDate!.localeCompare(a.endDate!));

	const eventSchema = {
		"@context": "https://schema.org",
		"@graph": upcoming.map(e => ({
			"@type": "SportsEvent",
			"name": e.title,
			"description": e.description,
			"startDate": e.endDate ?? undefined,
			"endDate": e.endDate ?? undefined,
			"eventStatus": "https://schema.org/EventScheduled",
			"eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
			"location": {
				"@type": "Place",
				"name": "Stovner Discgolfpark",
				"address": {
					"@type": "PostalAddress",
					"addressLocality": "Oslo",
					"addressCountry": "NO"
				}
			},
			"organizer": {
				"@type": "SportsClub",
				"name": "Stovner Frisbeeklubb",
				"url": "https://stovnerfrisbee.no"
			},
			"url": e.link
		}))
	};
</script>

<svelte:head>
	<title>Arrangementer · Stovner Frisbeeklubb</title>
	{#if upcoming.length > 0}
		{@html `<script type="application/ld+json">${JSON.stringify(eventSchema)}</script>`}
	{/if}
</svelte:head>

<PageHeader eyebrow="Kalender" title="Arrangementer" subtitle="Turneringer, ukentlig golf og ligaspill" image="/ncmaster.jpg" alt="Sponsor" />

<section class="mx-auto max-w-6xl px-4 py-16">
	<h2 class="mb-6 text-xl font-semibold text-[var(--color-text)]">
		Kommende
		{#if upcoming.length > 0}
			<span class="ml-2 rounded-full bg-[var(--color-primary)]/10 px-2.5 py-0.5 text-sm font-medium text-[var(--color-primary)]">{upcoming.length}</span>
		{/if}
	</h2>
	{#if upcoming.length > 0}
		<div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
			{#each upcoming as event}
				<EventCard {...event} />
			{/each}
		</div>
	{:else}
		<!-- Utenom sesongen: si hva som skjer og hvor man får beskjed, i stedet for en tom liste -->
		<p class="max-w-xl leading-relaxed text-[var(--color-muted)]">
			Ingen arrangementer er satt opp akkurat nå. Nye turneringer legges ut her og på
			<a href="https://www.discgolfscene.com/course/2776/stovner-disc-golf-park/tournaments" target="_blank" rel="noopener noreferrer" class="font-medium text-[var(--color-primary)] hover:underline">DGScene</a>
			så snart de er klare. Følg oss på
			<a href="https://www.facebook.com/Stovnerfrisbeeklubb" target="_blank" rel="noopener noreferrer" class="font-medium text-[var(--color-primary)] hover:underline">Facebook</a>
			for å få beskjed. Banene er åpne og gratis for alle, så du kan spille når du vil.
		</p>
	{/if}

	{#if ended.length > 0}
		<div class="mt-16">
			<div class="mb-6 flex items-center gap-4">
				<h2 class="text-xl font-semibold text-[var(--color-muted)]">Avsluttede</h2>
				<div class="h-px flex-1 bg-[var(--color-border)]"></div>
			</div>
			<div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
				{#each ended as event}
					<EventCard {...event} ended />
				{/each}
			</div>
		</div>
	{/if}

	<!-- External platforms note -->
	<div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
		{#each [
			{ name: 'UDisc', desc: 'Banescorer og klubbturneringer', href: 'https://udisc.com/events?courseId=ZiBrXtmJjmsj8DWRe', logo: '/udisclogo.png' },
			{ name: 'Tjing', desc: 'Ligapåmeldinger og resultater', href: 'https://tjing.se/courses/236c64b2-652b-4b8c-aa41-93e2144877c7', logo: '/tjinglogo.png' },
			{ name: 'DGScene', desc: 'Offisielle turneringer', href: 'https://www.discgolfscene.com/course/2776/stovner-disc-golf-park/tournaments', logo: '/dgscenelogo.jpg' }
		] as platform}
			<a
				href={platform.href}
				target="_blank"
				rel="noopener noreferrer"
				class="group flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-all hover:border-[var(--color-primary)]/40"
			>
				<img src={platform.logo} alt={platform.name} class="h-10 w-10 shrink-0 rounded-lg object-cover" loading="lazy" decoding="async" />
				<div>
					<p class="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
						{platform.name} ↗
					</p>
					<p class="text-xs text-[var(--color-muted)]">{platform.desc}</p>
				</div>
			</a>
		{/each}
	</div>
</section>
