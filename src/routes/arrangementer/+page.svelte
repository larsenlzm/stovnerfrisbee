<script lang="ts">
	import EventCard from '$lib/components/EventCard.svelte';
	import { events } from '$lib/data/content';

	const today = new Date().toISOString().slice(0, 10);
	const upcoming = events.filter(e => !e.endDate || e.endDate >= today);
	const ended = events.filter(e => e.endDate && e.endDate < today);

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
	{@html `<script type="application/ld+json">${JSON.stringify(eventSchema)}</script>`}
</svelte:head>

<section class="relative overflow-hidden bg-[var(--color-surface)] border-b border-[var(--color-border)]">
	<div class="relative h-72">
		<img src="/ncmaster.jpg" alt="Sponsor" class="absolute inset-0 w-full h-full object-cover object-center" fetchpriority="high" />
		<div class="absolute inset-0 bg-black/55"></div>
		<div class="relative z-10 flex h-full items-end px-4 pb-10 mx-auto max-w-6xl">
			<div>
				<p class="mb-2 text-sm font-semibold uppercase tracking-widest text-white/70">Kalender</p>
				<h1 class="text-3xl font-bold text-white md:text-4xl">Arrangementer</h1>
				<p class="mt-3 text-white/70">Turneringer, ukentlig golf og ligaspill</p>
			</div>
		</div>
	</div>
</section>

<section class="mx-auto max-w-6xl px-4 py-16">
	<h2 class="mb-6 text-xl font-semibold text-[var(--color-text)]">
		Kommende
		<span class="ml-2 rounded-full bg-[var(--color-primary)]/10 px-2.5 py-0.5 text-sm font-medium text-[var(--color-primary)]">{upcoming.length}</span>
	</h2>
	<div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
		{#each upcoming as event}
			<EventCard {...event} />
		{/each}
	</div>

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
			{ name: 'UDisc', desc: 'Torsdagsgolf og banescorer', href: 'https://udisc.com/events?courseId=ZiBrXtmJjmsj8DWRe', logo: '/udisclogo.png' },
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
