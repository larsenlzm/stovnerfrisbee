<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { boardMembers } from '$lib/data/content';

	const milestones = [
		{ year: 1985, text: 'Stovner Frisbeeklubb stiftes 7. august.' },
		{ year: 1993, text: 'Banen på Stovner bygges med hjemmesveisede kurver, etter ett år med spilling på pinner.' },
		{ year: 2000, text: 'Oslo Open blir Norges første PDGA-sanksjonerte turnering.' },
		{ year: 2001, text: 'Oslo Open arrangeres som EM i discgolf, Norges første B-tier.' },
		{ year: 2012, text: 'Oslo Open blir Norges første A-tier.' },
		{ year: 2012, text: 'Forsheimer DiskGolfPark åpner.' },
		{ year: 2018, text: 'NM i discgolf på Stovner.' },
		{ year: 2021, text: 'Norges første ukesgolf som PDGA League.' },
		{ year: 2022, text: 'NM i discgolf på Stovner.' },
		{ year: 2025, text: 'Klubben fyller 40 år.' },
		{ year: 2027, text: 'Norges Cup #4 på Stovner.' }
	];
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

<!-- Milepæler: en ekte tidslinje, så årstallene får egen kolonne -->
<section class="mx-auto max-w-6xl px-4 pb-16">
	<div class="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:gap-16">
		<div class="max-w-2xl">
			<h2 class="text-xl font-bold text-[var(--color-text)]">Milepæler</h2>
			<p class="mt-3 leading-relaxed text-[var(--color-muted)]">
				Klubben har fostret verdensmestere, europamestere og norgesmestere, men holder fast ved røttene: lave skuldre, alle skal med, og det skal være moro.
			</p>
			<ol class="mt-8 space-y-3.5">
				{#each milestones as m}
					<li class="grid grid-cols-[3.5rem_1fr] gap-x-4">
						<span class="font-bold tabular-nums text-[var(--color-primary)]">{m.year}</span>
						<span class="leading-relaxed text-[var(--color-muted)]">{m.text}</span>
					</li>
				{/each}
			</ol>
			<p class="mt-8 text-sm text-[var(--color-muted)]">
				Nasjonale førstegangsår fra <a href="https://dgno.no/milepaeler" target="_blank" rel="noopener noreferrer" class="text-[var(--color-primary)] hover:underline">dgno.no</a>.
			</p>
		</div>
		<!-- Svart strektegning: alltid på hvit rund bunn, som logoen i menyen, så den leses i begge temaer -->
		<img
			src="/arkiv/stovner-disc-club-logo.png"
			alt="Fra arkivet: et gammelt klubbmerke (Stovner Disc Club, Frisbee Team Oslo, Norway)"
			title="Fra arkivet: et gammelt klubbmerke"
			width="720"
			height="716"
			class="h-40 w-40 rounded-full bg-white p-3 md:mt-12 md:h-52 md:w-52"
			loading="lazy"
			decoding="async"
		/>
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
