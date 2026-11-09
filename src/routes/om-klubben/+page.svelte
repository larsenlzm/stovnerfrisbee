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

<!-- Styret er et fullbredde bånd som går helt ned til footeren, så layoutens luft (pb-24) nulles ut -->
<section class="-mb-24 bg-[var(--color-surface-2)]">
	<div class="mx-auto max-w-6xl px-4 py-16 md:py-20">
		<h2 class="text-xl font-bold text-[var(--color-text)]">Styret</h2>

		<ul class="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
			{#each boardMembers as member}
				<li>
					<img
						src={member.image}
						alt={member.name}
						width="400"
						height="400"
						class="aspect-square w-full rounded-2xl object-cover"
						loading="lazy"
						decoding="async"
					/>
					<p class="mt-4 font-semibold text-[var(--color-text)]">{member.name}</p>
					<p class="text-sm text-[var(--color-primary)]">{member.role}</p>
					{#if member.email}
						<a href="mailto:{member.email}" class="mt-1 block break-words text-[13px] text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]">
							{member.email}
						</a>
					{/if}
				</li>
			{/each}
		</ul>

		<p class="mt-14 text-sm text-[var(--color-muted)]">
			For generelle henvendelser: <a href="mailto:kontakt@stovnerfrisbee.no" class="text-[var(--color-primary)] hover:underline">kontakt@stovnerfrisbee.no</a>
		</p>
	</div>
</section>
