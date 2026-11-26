<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	interface Props {
		id: string;
		title: string;
		teaser: string;
		children: Snippet;
	}

	let { id, title, teaser, children }: Props = $props();
	let open = $state(false);

	// En lenke til #id (f.eks. fra «Bli medlem» eller gamle /reisestotte) åpner seksjonen
	onMount(() => {
		const sync = () => {
			if (location.hash === `#${id}`) open = true;
		};
		sync();
		window.addEventListener('hashchange', sync);
		return () => window.removeEventListener('hashchange', sync);
	});
</script>

<details {id} bind:open class="group scroll-mt-24 border-b border-[var(--color-border)]">
	<summary class="flex cursor-pointer list-none items-start justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
		<span>
			<h2 class="text-lg font-semibold text-[var(--color-text)]">{title}</h2>
			<span class="mt-1 block text-sm text-[var(--color-muted)]">{teaser}</span>
		</span>
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			aria-hidden="true"
			class="mt-1.5 shrink-0 text-[var(--color-primary)] transition-transform group-open:rotate-180"
		>
			<path d="M4.5 7l4.5 4.5L13.5 7" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</summary>
	<div class="pb-6">
		{@render children()}
	</div>
</details>
