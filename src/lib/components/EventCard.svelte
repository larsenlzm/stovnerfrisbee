<script lang="ts">
	interface Props {
		title: string;
		date: string;
		description: string;
		link: string;
		linkText: string;
		category: string;
	}

	let { title, date, description, link, linkText, category }: Props = $props();

	const tagStyles: Record<string, string> = {
		'Ukentlig':  'bg-[#1C6B42]/12 text-[#1C6B42]',
		'Liga':      'bg-[#1A5C8A]/12 text-[#1A5C8A]',
		'Turnering': 'bg-[#D4622A]/12 text-[#D4622A]',
		'PDGA':      'bg-[#6B42A0]/12 text-[#6B42A0]',
		'DOUBLES':   'bg-[#1A7A72]/12 text-[#1A7A72]',
	};

	const tags = category.split(',').map(t => t.trim()).filter(Boolean);

	function tagClass(tag: string): string {
		return tagStyles[tag] ?? 'bg-[var(--color-surface-2)] text-[var(--color-muted)]';
	}
</script>

<div class="flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-primary)]/40">
	<div class="mb-3 flex items-start justify-between gap-2">
		<div class="flex flex-wrap gap-1.5">
			{#each tags as tag}
				<span class="inline-block rounded-full px-3 py-1 text-xs font-medium {tagClass(tag)}">
					{tag}
				</span>
			{/each}
		</div>
		<span class="shrink-0 text-xs text-[var(--color-muted)]">{date}</span>
	</div>
	<h3 class="mb-2 text-lg font-semibold text-[var(--color-text)]">{title}</h3>
	<p class="mb-5 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{description}</p>
	<a
		href={link}
		target="_blank"
		rel="noopener noreferrer"
		class="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors"
	>
		{linkText}
		<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
			<path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</a>
</div>
