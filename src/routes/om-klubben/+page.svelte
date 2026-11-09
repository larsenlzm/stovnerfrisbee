<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { boardMembers } from '$lib/data/content';
</script>

<svelte:head>
	<title>Om klubben · Stovner Frisbeeklubb</title>
</svelte:head>

<PageHeader eyebrow="Om oss" title="Om klubben" subtitle="En av Norges eldste discidrettsklubber siden 1985" image="/rocker.jpg" alt="Stovner Frisbeeklubb" />

<!-- History -->
<section class="mx-auto max-w-6xl px-4 py-16">
	<div class="grid grid-cols-1 gap-12 md:grid-cols-2">
		<div>
			<h2 class="mb-4 text-xl font-bold text-[var(--color-text)]">Historien vår</h2>
			<div class="space-y-4 text-[var(--color-muted)] leading-relaxed">
				<p>
					Stovner Frisbeeklubb ble stiftet i 1985 og er en av Norges eldste discidrettsklubber.
					Klubben har sitt hjem på Stovner i Oslo, i hjertet av Groruddalen.
				</p>
				<p>
					Gjennom fire tiår har vi bygd opp et sterkt miljø for discgolf, og vi er stolte av å
					tilby baner som passer for alle — fra de aller yngste til erfarne turneringsspillere.
				</p>
				<p>
					I 2025 feiret vi 40-årsjubileum, og ser frem til mange nye tiår med discgolf i Groruddalen.
				</p>
			</div>
		</div>

		<div>
			<h2 class="mb-4 text-xl font-bold text-[var(--color-text)]">Verdier</h2>
			<dl class="space-y-5">
				{#each [
					{ title: 'Inkludering', desc: 'Discgolf er for alle. Vi ønsker alle velkomne uansett alder, bakgrunn og nivå.' },
					{ title: 'Fellesskap', desc: 'Vi er mer enn en idrettsklubb — vi er en gjeng mennesker som elsker å kaste disc.' },
					{ title: 'Friluftsliv', desc: 'Banene våre er midt i naturen. Vi setter pris på å bruke uterommet i Groruddalen.' },
					{ title: 'Engasjement', desc: 'Frivillig innsats er livsnerven i klubben. Uten ildsjeler — ingen klubb.' }
				] as value}
					<div>
						<dt class="font-semibold text-[var(--color-text)]">{value.title}</dt>
						<dd class="mt-1 leading-relaxed text-[var(--color-muted)]">{value.desc}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</section>

<!-- Board -->
<section class="mx-auto max-w-6xl px-4 pb-16">
	<h2 class="mb-8 text-xl font-bold text-[var(--color-text)]">Styret</h2>
	<div class="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
		{#each boardMembers as member}
			<div>
				{#if member.image}
					<img src={member.image} alt={member.name} width="80" height="80" class="mb-3 h-20 w-20 rounded-full object-cover" loading="lazy" decoding="async" />
				{:else}
					<div class="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-surface-2)] text-[var(--color-primary)]">
						<svg width="32" height="32" viewBox="0 0 20 20" fill="none" aria-hidden="true">
							<circle cx="10" cy="7" r="3.5" stroke="currentColor" stroke-width="1.5"/>
							<path d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
						</svg>
					</div>
				{/if}
				<p class="font-semibold text-[var(--color-text)]">{member.name || '—'}</p>
				<p class="text-sm text-[var(--color-primary)]">{member.role}</p>
				{#if member.email}
					<a href="mailto:{member.email}" class="mt-1 block break-words text-[13px] text-[var(--color-muted)] sm:text-sm transition-colors hover:text-[var(--color-primary)]">
						{member.email}
					</a>
				{/if}
			</div>
		{/each}
	</div>
	<p class="mt-10 text-sm text-[var(--color-muted)]">
		For generelle henvendelser: <a href="mailto:kontakt@stovnerfrisbee.no" class="text-[var(--color-primary)] hover:underline">kontakt@stovnerfrisbee.no</a>
	</p>
</section>

