<script lang="ts">
	interface Props {
		eyebrow: string;
		title: string;
		subtitle?: string;
		image: string;
		alt: string;
		position?: string;
		backHref?: string;
		backLabel?: string;
	}

	let { eyebrow, title, subtitle, image, alt, position = 'object-center', backHref, backLabel }: Props = $props();
</script>

<header class="mx-auto max-w-6xl px-4 pt-3">
	{#if backHref}
		<a href={backHref} class="mb-3 inline-flex items-center gap-1 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]">
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
				<path d="M10 7H4M4 7L7 4M4 7L7 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
			{backLabel}
		</a>
	{/if}

	<div class="aspect-[16/9] overflow-hidden rounded-2xl bg-[var(--color-surface-2)] md:aspect-[5/2]">
		<img src={image} {alt} class="h-full w-full object-cover {position}" fetchpriority="high" />
	</div>

	<div class="max-w-2xl pt-7 md:pt-10">
		<p class="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">{eyebrow}</p>
		<h1 class="mt-3.5 text-balance text-3xl font-bold leading-[1.08] tracking-tight text-[var(--color-text)] md:text-4xl">{title}</h1>
		{#if subtitle}
			<p class="mt-3 text-base text-[var(--color-muted)] md:text-lg">{subtitle}</p>
		{/if}
	</div>
</header>
