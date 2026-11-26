<script lang="ts">
	import { page } from '$app/state';

	const notFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{notFound ? 'Out of bounds' : 'Noe gikk galt'} · Stovner Frisbeeklubb</title>
</svelte:head>

<section class="mx-auto max-w-2xl px-4 py-24 text-center md:py-32">
	<p class="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">{page.status}</p>
	{#if notFound}
		<h1 class="mb-4 text-4xl font-bold text-[var(--color-text)] md:text-5xl">Out of bounds</h1>
		<p class="mb-8 leading-relaxed text-[var(--color-muted)]">
			Du landet utenfor banen. Den finnes ikke, eller har blitt flyttet.
		</p>
	{:else}
		<h1 class="mb-4 text-4xl font-bold text-[var(--color-text)] md:text-5xl">Noe gikk galt</h1>
		<p class="mb-8 leading-relaxed text-[var(--color-muted)]">Prøv igjen om litt.</p>
	{/if}
	<a
		href="/"
		class="inline-flex items-center gap-2 rounded-lg border border-[var(--color-primary)]/50 px-5 py-2.5 text-sm font-semibold text-[var(--color-primary)] transition-all hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
	>
		Ta straffekast og gå tilbake til forsiden
	</a>
</section>
