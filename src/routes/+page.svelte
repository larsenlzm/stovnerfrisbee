<script lang="ts">
	import EventCard from '$lib/components/EventCard.svelte';
	import { events } from '$lib/data/content';

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
</svelte:head>

<!-- Hero -->
<section class="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 text-center">
	<!-- Background gradient -->
	<div class="pointer-events-none absolute inset-0">
		<div class="absolute inset-0 bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-bg)]"></div>
		<div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--color-primary)]/8 blur-3xl"></div>
	</div>

	<div class="relative z-10 max-w-3xl">
		<!-- Logo -->
		<div class="mb-8 flex justify-center">
			<img src="/stovnerlogo.jpg" alt="Stovner Frisbee" width="120" height="120" class="rounded-full shadow-md" />
		</div>

		<h1 class="mb-4 text-4xl font-bold tracking-tight text-[var(--color-text)] sm:text-5xl md:text-6xl">
			Stovner<br/><span class="text-[var(--color-primary)]">Frisbeeklubb</span>
		</h1>
		<p class="mb-3 text-xl font-medium text-[var(--color-muted)] sm:text-2xl">
			En discgolfperle nord i Groruddalen
		</p>
		<p class="mb-10 text-base text-[var(--color-muted)]/80">
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
					class="rounded-lg border border-[var(--color-primary)]/50 px-8 py-3.5 text-base font-semibold text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)]/10 hover:border-[var(--color-primary)]"
				>
					Kommende arrangementer
				</a>
			</div>
			<!-- Rad 2: ghost-lenke -->
			<a
				href="/banene"
				class="text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
			>
				Se banene →
			</a>
		</div>
	</div>

	<!-- Scroll hint -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-muted)]/50">
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
		{#each events as event}
			<EventCard {...event} />
		{/each}
	</div>
</section>

<!-- Brief about -->
<section class="mx-auto max-w-6xl px-4 py-16">
	<div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-12">
		<div class="max-w-2xl">
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
	</div>
</section>
