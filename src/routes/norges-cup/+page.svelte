<script lang="ts">
	import { norgesCup4 as event } from '$lib/events/norges-cup-4';
	import { googleCalendarUrl } from '$lib/events/calendar';

	const description = `Stovner Frisbee arrangerer ${event.title} på ${event.place} ${event.dateLabel}. Mer info kommer.`;
	const title = `${event.title} · ${event.dateLabel} · ${event.place}`;
	const image = new URL(event.image.src, event.url).href;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={event.url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={event.url} />
	<meta property="og:image" content={image} />
	<meta property="og:locale" content="nb_NO" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

{#snippet logo(size: string)}
	<!-- Logoen er et rundt merke på hvit firkant; litt forstørret for å skjule hjørnene -->
	<span class="block shrink-0 overflow-hidden rounded-full bg-white {size}">
		<img src="/stovnerlogo.jpg" alt="Stovner Frisbee" class="h-full w-full scale-[1.04] object-cover" />
	</span>
{/snippet}

<div class="min-h-screen bg-[var(--color-bg)]">
	<header class="mx-auto flex max-w-6xl items-center justify-between px-5 py-2 md:px-16 md:py-3">
		<a
			href="https://stovnerfrisbee.no"
			class="flex min-h-11 items-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-dark)] transition-colors hover:text-[var(--color-primary)] md:text-xs"
		>
			Stovner Frisbee
		</a>
		<span class="hidden text-xs text-[var(--color-primary-dark)] sm:block">{event.title}</span>
	</header>

	<main class="mx-auto max-w-6xl pb-14 md:pb-16">
		<section class="flex items-center gap-10 px-5 pb-7 pt-6 md:px-16 md:pb-10 md:pt-12">
			<div class="min-w-0 flex-1">
				<div class="flex items-start justify-between">
					<!-- Vimpler: eneste pynt på siden -->
					<div class="mt-1.5 flex gap-[7px] md:mb-5 md:mt-0" aria-hidden="true">
						{#each [0, 1, 2, 3, 4] as i}
							<span
								class="h-0 w-0 border-x-[6px] border-t-[12px] border-x-transparent {i % 2
									? 'border-t-[var(--color-accent)]'
									: 'border-t-[var(--color-primary-dark)]'}"
							></span>
						{/each}
					</div>
					<div class="md:hidden">{@render logo('h-[84px] w-[84px]')}</div>
				</div>

				<p class="mt-2 text-[11px] uppercase leading-snug tracking-[0.2em] text-[var(--color-muted)] md:mt-0 md:text-[13px]">
					{event.dateLabel} · {event.place}
				</p>
				<h1
					class="mt-2.5 text-[44px] font-extrabold leading-[1.05] tracking-[-0.045em] text-[var(--color-primary-dark)] md:mt-3.5 md:text-[84px]"
				>
					{event.name} <span class="text-[var(--color-accent)]">#{event.number}</span>
				</h1>
				<p class="mt-3 max-w-lg text-sm leading-relaxed text-[var(--color-muted)] md:mt-4 md:text-base">
					{event.intro}
				</p>

				<div class="mt-5 flex flex-col gap-x-6 gap-y-1 sm:flex-row sm:items-center md:mt-7">
					<a
						href="/norges-cup-4.ics"
						data-calendar="ics"
						data-track="nc-ics"
						data-sveltekit-reload
						class="flex min-h-12 items-center justify-center rounded-full bg-[var(--color-primary)] px-7 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-dark)] dark:text-[var(--color-bg)]"
					>
						Legg i kalenderen
					</a>
					<a
						href={googleCalendarUrl(event)}
						data-calendar="google"
						data-track="nc-google"
						target="_blank"
						rel="noopener"
						class="flex min-h-11 items-center justify-center text-sm font-medium text-[var(--color-primary)] underline decoration-1 underline-offset-4 hover:text-[var(--color-primary-dark)] sm:justify-start"
					>
						Google Kalender
					</a>
				</div>
			</div>

			<div class="hidden shrink-0 flex-col items-center md:flex md:w-[190px]">
				{@render logo('h-[180px] w-[180px]')}
				<p class="mt-2.5 text-xs uppercase tracking-[0.1em] text-[var(--color-muted)]">Arrangør</p>
			</div>
		</section>

		<div class="mx-5 h-[240px] overflow-hidden rounded-[18px] bg-[var(--color-surface-2)] md:mx-16 md:h-[440px]">
			<img
				src={event.image.src}
				alt={event.image.alt}
				class="h-full w-full object-cover"
				style:object-position={event.image.position}
				fetchpriority="high"
			/>
		</div>
	</main>
</div>
