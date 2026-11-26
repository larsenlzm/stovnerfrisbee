<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';

	const BOARD_EMAIL = 'styret@stovnerfrisbee.no';

	const schemes = [
		{
			title: 'Første norgescup eller NM',
			amount: 'Opptil 1 000 kr',
			covers: 'Påmelding.',
			who: 'For deg som aldri har spilt norgescup eller NM, og skal spille en utenfor Oslo.',
			paid: 'Utbetales etter turneringen.'
		},
		{
			title: 'Første turnering i utlandet',
			amount: 'Opptil 3 000 kr',
			covers: 'Påmelding og billigste overnatting.',
			who: 'For deg som aldri har spilt turnering i utlandet. Turneringen må være Eurotour eller høyere.',
			paid: 'Utbetales etter turneringen. Du må dokumentere utgiftene til overnatting.'
		},
		{
			title: 'Inkludering',
			amount: 'Opptil 1 500 kr',
			covers: 'Påmelding, billigste overnatting og reise.',
			who: 'For deg som ellers ikke har råd til å reise på turnering. Du trenger ikke begrunne hvorfor. Ordningen bygger på tillit.',
			paid: 'Kan utbetales på forhånd hvis du sender en oversikt over utgiftene. Du må dokumentere de faktiske utgiftene etterpå.'
		}
	];

	const steps = [
		'Send en søknad til styret før turneringen. Skriv hvilken turnering det gjelder og hvilken ordning du søker på.',
		'Fullfør turneringen, med mindre du blir skadet eller noe akutt skjer.',
		'Send styret en kort rapport om opplevelsen, gjerne med bilder. Rapporten kan bli delt på nettsiden og Facebook.'
	];
</script>

<svelte:head>
	<title>Reisestøtte · Stovner Frisbeeklubb</title>
	<meta name="description" content="Stovner Frisbeeklubb gir medlemmer støtte til første norgescup, NM eller turnering i utlandet, og til deg som ellers ikke har råd til å reise." />
</svelte:head>

<PageHeader
	eyebrow="Medlemskap"
	title="Reisestøtte"
	subtitle="Støtte til din første store turnering"
	backHref="/bli-medlem"
	backLabel="Bli medlem"
/>

<section class="mx-auto max-w-6xl px-4 py-12 md:py-16">
	<div class="max-w-3xl space-y-14">
		<div>
			<p class="leading-relaxed text-[var(--color-muted)]">
				Styret vil at flere medlemmer skal representere Stovner Frisbeeklubb på større turneringer. Hele
				Grasrotandelen fra året før går til reisestøtte. Penger som ikke blir brukt, tas med til neste år.
			</p>
		</div>

		<div>
			<h2 class="text-xl font-semibold text-[var(--color-text)]">Tre ordninger</h2>
			<div class="mt-6 space-y-4">
				{#each schemes as s}
					<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
						<div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
							<h3 class="font-semibold text-[var(--color-text)]">{s.title}</h3>
							<p class="text-sm font-semibold text-[var(--color-primary)]">{s.amount}</p>
						</div>
						<p class="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{s.who}</p>
						<p class="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
							<span class="font-medium text-[var(--color-text)]">Dekker:</span> {s.covers} {s.paid}
						</p>
					</div>
				{/each}
			</div>
		</div>

		<div>
			<h2 class="text-xl font-semibold text-[var(--color-text)]">Slik søker du</h2>
			<ol class="mt-6 space-y-5">
				{#each steps as step, i}
					<li class="grid grid-cols-[2rem_1fr] gap-x-3">
						<span class="text-xl font-bold leading-snug text-[var(--color-primary)] tabular-nums" aria-hidden="true">{i + 1}</span>
						<p class="leading-relaxed text-[var(--color-muted)]">{step}</p>
					</li>
				{/each}
			</ol>
			<a
				href="mailto:{BOARD_EMAIL}?subject=Søknad om reisestøtte"
				class="mt-8 inline-flex items-center gap-2 rounded-lg border border-[var(--color-primary)]/50 px-5 py-2.5 text-sm font-semibold text-[var(--color-primary)] transition-all hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
			>
				Søk om støtte
			</a>
			<p class="mt-3 text-sm text-[var(--color-muted)]">
				Eller send e-post til <a href="mailto:{BOARD_EMAIL}" class="text-[var(--color-primary)] hover:underline">{BOARD_EMAIL}</a>.
			</p>
		</div>
	</div>
</section>
