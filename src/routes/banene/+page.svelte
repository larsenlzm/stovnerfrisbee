<script lang="ts">
	import { courses } from '$lib/data/content';

	function formatRoundTime(minutes: number): string {
		const h = Math.floor(minutes / 60);
		const m = minutes % 60;
		return m === 0 ? `~${h} t` : `~${h} t ${m} min`;
	}

	function starFill(rating: number, index: number): string {
		const filled = rating - index;
		if (filled >= 1) return 'full';
		if (filled > 0) return 'half';
		return 'empty';
	}

	const amenityLabels = [
		{ key: 'dogs', label: 'Hund' },
		{ key: 'cart', label: 'Vogn' },
		{ key: 'stroller', label: 'Barnevogn' },
		{ key: 'restrooms', label: 'Toalett' },
		{ key: 'water', label: 'Vann' }
	] as const;
</script>

<svelte:head>
	<title>Banene · Stovner Frisbeeklubb</title>
</svelte:head>

<section class="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 py-16">
	<div class="mx-auto max-w-6xl">
		<p class="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">Baner</p>
		<h1 class="text-3xl font-bold text-[var(--color-text)] md:text-4xl">Banene</h1>
		<p class="mt-3 text-[var(--color-muted)]">Discgolfbanene vi driver på Stovner i Oslo</p>
	</div>
</section>

<section class="mx-auto max-w-6xl px-4 py-16">
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
		{#each courses as course}
			<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8">
				<!-- Header -->
				<div class="mb-1 flex items-start justify-between gap-4">
					<div class="flex-1">
						<div class="flex flex-wrap items-center gap-2">
							<h2 class="text-xl font-bold text-[var(--color-text)]">{course.name}</h2>
						</div>
						<p class="mt-1 text-sm text-[var(--color-muted)]">Est. {course.established}{course.designer ? ` · Design: ${course.designer}` : ''}</p>
					</div>
					<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/15 text-[var(--color-primary)]">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
							<ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" stroke-width="1.5"/>
							<circle cx="12" cy="12" r="3" fill="currentColor"/>
						</svg>
					</span>
				</div>

				<!-- Rating -->
				<div class="mb-4 flex items-center gap-2">
					<span class="flex gap-0.5">
						{#each [0, 1, 2, 3, 4] as i}
							{@const fill = starFill(course.rating, i)}
							<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" class={fill === 'empty' ? 'text-[var(--color-border)]' : 'text-yellow-400'}>
								{#if fill === 'full'}
									<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="currentColor"/>
								{:else if fill === 'half'}
									<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="currentColor" clip-path="inset(0 50% 0 0)"/>
									<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="none" stroke="currentColor" stroke-width="1.5"/>
								{:else}
									<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="none" stroke="currentColor" stroke-width="1.5"/>
								{/if}
							</svg>
						{/each}
					</span>
					<span class="text-sm font-medium text-[var(--color-text)]">{course.rating.toFixed(1)}</span>
					<span class="text-sm text-[var(--color-muted)]">({course.ratingCount.toLocaleString('nb-NO')} anmeldelser)</span>
				</div>

				<p class="mb-6 text-sm leading-relaxed text-[var(--color-muted)]">{course.description}</p>

				<!-- Stats grid -->
				<div class="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
					<div class="rounded-lg bg-[var(--color-surface-2)] px-4 py-3">
						<p class="text-xs text-[var(--color-muted)]">Hull / Par</p>
						<p class="text-lg font-bold text-[var(--color-text)]">{course.holes} / {course.par}</p>
					</div>
					<div class="rounded-lg bg-[var(--color-surface-2)] px-4 py-3">
						<p class="text-xs text-[var(--color-muted)]">Distanse</p>
						<p class="text-lg font-bold text-[var(--color-text)]">{course.distanceM} m</p>
					</div>
					<div class="rounded-lg bg-[var(--color-surface-2)] px-4 py-3">
						<p class="text-xs text-[var(--color-muted)]">Rundetid</p>
						<p class="text-lg font-bold text-[var(--color-text)]">{formatRoundTime(course.roundTimeMin)}</p>
					</div>
					<div class="rounded-lg bg-[var(--color-surface-2)] px-4 py-3">
						<p class="text-xs text-[var(--color-muted)]">Vanskegrad</p>
						<p class="text-lg font-bold text-[var(--color-text)]">{course.difficulty}</p>
					</div>
				</div>

				<!-- Amenities -->
				<div class="mb-6 flex flex-wrap gap-3">
					{#each amenityLabels as { key, label }}
						{@const ok = course.amenities[key]}
						<span class="flex items-center gap-1 text-sm {ok ? 'text-[var(--color-primary)]' : 'text-[var(--color-muted)] opacity-50'}">
							<span>{ok ? '✓' : '✗'}</span>
							<span>{label}</span>
						</span>
					{/each}
				</div>

				<!-- Basket/tee info -->
				<p class="mb-6 text-xs text-[var(--color-muted)]">Kurver: {course.baskets} · Tee: {course.tees}</p>

				<!-- Links -->
				<div class="flex flex-wrap gap-3">
					<a
						href={course.udiscLink}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)]/15 px-4 py-2 text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/25"
					>
						Se på UDisc ↗
					</a>
					<a
						href="https://www.google.com/maps?q={course.coords.lat},{course.coords.lng}"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
					>
						Kart ↗
					</a>
				</div>
			</div>
		{/each}
	</div>

	<!-- Info box -->
	<div class="mt-10 rounded-xl border border-[var(--color-primary)]/25 bg-[var(--color-primary)]/5 p-6">
		<h3 class="mb-2 font-semibold text-[var(--color-text)]">Gratis å spille</h3>
		<p class="text-sm leading-relaxed text-[var(--color-muted)]">
			Banene er åpne og gratis for alle å bruke. Torsdager mellom 17:30 og 20:30 er banen reservert
			for torsdagsgolf-deltakere. Husk å vise hensyn og rydde etter deg.
		</p>
	</div>
</section>
