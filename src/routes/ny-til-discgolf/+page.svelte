<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import HoleIllustration from '$lib/components/HoleIllustration.svelte';

	const steps = [
		{ title: 'Utkastet (tee)', text: 'Hvert hull starter fra det oppmerkede utkastet. Den som brukte færrest kast på forrige hull, kaster først.' },
		{ title: 'Spill fra der discen landet (lie)', text: 'Alle kast etter utkastet tar du fra stedet der discen ble liggende. Dette stedet kalles lie.' },
		{ title: 'Hvem kaster neste?', text: 'Den som ligger lengst fra kurven, kaster først, også om det betyr flere kast på rad. Alle andre står bak den som kaster.' },
		{ title: 'Fullfør hullet', text: 'Hullet er ferdig når discen ligger i kurven eller henger fast i kjettingene.' },
		{ title: 'Hvem vinner?', text: 'Målet er å komme gjennom banen på færrest mulig kast. Den som har brukt færrest kast når runden er ferdig, vinner.' }
	];

	const rules = [
		{ term: 'Støttepunkt', text: 'Når du kaster, må du ha ett støttepunkt på bakken rett bak lie.' },
		{ term: '10-metersregelen', text: 'Lenger enn 10 meter fra kurven kan du ta tilløp og gå forbi lie etter at discen er sluppet. Nærmere enn 10 meter må du holde balansen og bli stående bak lie.' },
		{ term: 'Natur og hindringer', text: 'Trær, busker og greiner er en del av banen. Du skal aldri knekke greiner eller fjerne noe for å få et bedre kast.' },
		{ term: 'Utenfor banen (OB)', text: 'Lander discen utenfor banens grenser (out of bounds), får du ett straffekast. Neste kast tar du fra der discen krysset grensen.' }
	];

	const etiquette = [
		'Kast aldri hvis du kan treffe mennesker eller dyr.',
		'Går et kast mot noen, rop «FORE!» så høyt du kan.',
		'Stå stille og vær stille når andre kaster.',
		'Ta med deg søppel og tomgods hjem.'
	];

	const backhand = [
		{ title: 'Utgangsstilling', text: 'Stå med beina i skulderbreddes avstand. Før kastearmen så langt bakover du klarer, i brysthøyde.' },
		{ title: 'Drag', text: 'Trekk armen og discen fram i en rett linje så raskt du kan, fortsatt i brysthøyde.' },
		{ title: 'Gjennomføring', text: 'Følg kastet ved å rotere overkroppen og flytte vekten over på foten foran.' }
	];
</script>

<svelte:head>
	<title>Ny til discgolf · Stovner Frisbeeklubb</title>
</svelte:head>

<PageHeader eyebrow="Kom i gang" title="Ny til discgolf" subtitle="Slik prøver du sporten" image="/rocker.jpg" alt="Discgolfkurv på Stovner" />

{#snippet numbered(items: { title: string; text: string }[])}
	<ol class="mt-6 space-y-6">
		{#each items as item, i}
			<li class="grid grid-cols-[2rem_1fr] gap-x-3">
				<span class="text-xl font-bold leading-snug text-[var(--color-primary)] tabular-nums" aria-hidden="true">{i + 1}</span>
				<div>
					<p class="font-semibold text-[var(--color-text)]">{item.title}</p>
					<p class="mt-1 leading-relaxed text-[var(--color-muted)]">{item.text}</p>
				</div>
			</li>
		{/each}
	</ol>
{/snippet}

<section class="mx-auto max-w-3xl px-4 py-16">
	<div class="space-y-14">
		<div>
			<h2 class="mb-2 text-xl font-semibold text-[var(--color-text)]">Hva er discgolf?</h2>
			<p class="leading-relaxed text-[var(--color-muted)]">
				Discgolf spilles som vanlig golf, men du kaster en disc mot en kurv i stedet for å slå en ball i et hull.
				Målet er å bruke færrest mulig kast gjennom banen.
			</p>
		</div>

		<div>
			<h2 class="mb-2 text-xl font-semibold text-[var(--color-text)]">Hvor kan du spille?</h2>
			<p class="leading-relaxed text-[var(--color-muted)]">
				Stovner Discgolfpark er en 18-hulls bane i Stovnerlia. En runde tar omtrent to timer, og banen er vurdert som vanskelig.
				Banene våre er åpne og gratis for alle. Du kan ha med hund, vogn og barnevogn, men det er ikke toalett eller vann på banen.
			</p>
			<a href="/banene" class="mt-3 inline-block text-sm font-medium text-[var(--color-primary)] hover:underline">Se banene →</a>
		</div>

		<div>
			<h2 class="text-xl font-semibold text-[var(--color-text)]">Slik spiller du</h2>
			<!-- Tegningen står over stegene på mobil og til høyre for dem fra md -->
			<div class="mt-6 grid gap-8 md:grid-cols-[1fr_15rem] md:gap-10">
				<div class="mx-auto w-full max-w-[15rem] md:order-2 md:mt-1">
					<HoleIllustration />
				</div>
				<div class="md:order-1 [&>ol]:mt-0">
					{@render numbered(steps)}
				</div>
			</div>
		</div>

		<div>
			<h2 class="text-xl font-semibold text-[var(--color-text)]">Grunnregler</h2>
			<dl class="mt-6 space-y-5">
				{#each rules as rule}
					<div>
						<dt class="font-semibold text-[var(--color-text)]">{rule.term}</dt>
						<dd class="mt-1 leading-relaxed text-[var(--color-muted)]">{rule.text}</dd>
					</div>
				{/each}
			</dl>
		</div>

		<div>
			<h2 class="text-xl font-semibold text-[var(--color-text)]">Vis hensyn</h2>
			<ul class="mt-5 space-y-2.5">
				{#each etiquette as line}
					<li class="flex gap-3 leading-relaxed text-[var(--color-muted)]">
						<span class="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" aria-hidden="true"></span>
						{line}
					</li>
				{/each}
			</ul>
		</div>

		<div>
			<h2 class="text-xl font-semibold text-[var(--color-text)]">Slik kaster du backhand</h2>
			<p class="mt-2 leading-relaxed text-[var(--color-muted)]">Det vanligste kastet, og det de fleste lærer først.</p>
			{@render numbered(backhand)}
		</div>

		<div>
			<h2 class="mb-2 text-xl font-semibold text-[var(--color-text)]">Prøv sammen med andre</h2>
			<p class="leading-relaxed text-[var(--color-muted)]">
				Gjennom sesongen arrangerer klubben ligaspill og turneringer, og mange av dem passer for alle nivåer.
				Se hva som er satt opp på arrangementssiden.
			</p>
			<a href="/arrangementer" class="mt-3 inline-block text-sm font-medium text-[var(--color-primary)] hover:underline">Se arrangementer →</a>
		</div>

		<div>
			<h2 class="mb-2 text-xl font-semibold text-[var(--color-text)]">Utstyr</h2>
			<p class="leading-relaxed text-[var(--color-muted)]">
				Medlemmer kan låne utstyr fra klubben og får rabatt på discgolfutstyr fra wearediscgolf.
				Lurer du på hva du trenger, er du velkommen til å ta kontakt.
			</p>
			<div class="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
				<a href="/bli-medlem" class="text-[var(--color-primary)] hover:underline">Om medlemskap →</a>
				<a href="/kontakt" class="text-[var(--color-primary)] hover:underline">Kontakt oss →</a>
			</div>
		</div>
	</div>
</section>
