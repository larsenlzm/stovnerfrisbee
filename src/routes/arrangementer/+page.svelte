<script lang="ts">
	import EventCard from '$lib/components/EventCard.svelte';
	import { events } from '$lib/data/content';
</script>

<svelte:head>
	<title>Arrangementer · Stovner Frisbeeklubb</title>
</svelte:head>

<section class="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 py-16">
	<div class="mx-auto max-w-6xl">
		<p class="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">Kalender</p>
		<h1 class="text-3xl font-bold text-[var(--color-text)] md:text-4xl">Arrangementer</h1>
		<p class="mt-3 text-[var(--color-muted)]">Turneringer, ukentlig golf og ligaspill</p>
	</div>
</section>

<section class="mx-auto max-w-6xl px-4 py-16">
	<div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
		{#each events as event}
			<EventCard {...event} />
		{/each}
	</div>

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
				<img src={platform.logo} alt={platform.name} class="h-10 w-10 shrink-0 rounded-lg object-cover" />
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
