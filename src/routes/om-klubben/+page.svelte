<script lang="ts">
	import { boardMembers } from '$lib/data/content';
</script>

<svelte:head>
	<title>Om klubben · Stovner Frisbeeklubb</title>
</svelte:head>

<!-- Page header -->
<section class="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 py-16">
	<div class="mx-auto max-w-6xl">
		<p class="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">Om oss</p>
		<h1 class="text-3xl font-bold text-[var(--color-text)] md:text-4xl">Om klubben</h1>
		<p class="mt-3 text-[var(--color-muted)]">En av Norges eldste discidrettsklubber siden 1985</p>
	</div>
</section>

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
			<ul class="space-y-4">
				{#each [
					{ title: 'Inkludering', desc: 'Discgolf er for alle. Vi ønsker alle velkomne uansett alder, bakgrunn og nivå.' },
					{ title: 'Fellesskap', desc: 'Vi er mer enn en idrettsklubb — vi er en gjeng mennesker som elsker å kaste disc.' },
					{ title: 'Friluftsliv', desc: 'Banene våre er midt i naturen. Vi setter pris på å bruke uterommet i Groruddalen.' },
					{ title: 'Engasjement', desc: 'Frivillig innsats er livsnerven i klubben. Uten ildsjeler — ingen klubb.' }
				] as value}
					<li class="flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
						<span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)]">
							<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
								<path d="M10 3L5 9L2 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</span>
						<div>
							<p class="font-semibold text-[var(--color-text)]">{value.title}</p>
							<p class="text-sm text-[var(--color-muted)]">{value.desc}</p>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<!-- Board -->
<section class="mx-auto max-w-6xl px-4 pb-16">
	<h2 class="mb-6 text-xl font-bold text-[var(--color-text)]">Styret</h2>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each boardMembers as member}
			<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
				<div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-surface-2)] text-[var(--color-primary)]">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
						<circle cx="10" cy="7" r="3.5" stroke="currentColor" stroke-width="1.5"/>
						<path d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
				</div>
				<p class="font-semibold text-[var(--color-text)]">{member.name || '—'}</p>
				<p class="text-sm text-[var(--color-primary)]">{member.role}</p>
				{#if member.email}
					<a href="mailto:{member.email}" class="mt-1 block text-xs text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
						{member.email}
					</a>
				{/if}
			</div>
		{/each}
	</div>
	<p class="mt-4 text-sm text-[var(--color-muted)]">
		For generelle henvendelser: <a href="mailto:kontakt@stovnerfrisbee.no" class="text-[var(--color-primary)] hover:underline">kontakt@stovnerfrisbee.no</a>
	</p>
</section>
