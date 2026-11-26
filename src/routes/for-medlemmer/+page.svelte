<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Disclosure from '$lib/components/Disclosure.svelte';

	const BOARD_EMAIL = 'styret@stovnerfrisbee.no';

	const steps = [
		'Send en søknad til styret før turneringen. Skriv hvilken turnering det gjelder og hvilken ordning du søker på.',
		'Fullfør turneringen, med mindre du blir skadet eller noe akutt skjer.',
		'Send styret en kort rapport om opplevelsen, gjerne med bilder. Rapporten kan bli delt på nettsiden og Facebook.'
	];
</script>

<svelte:head>
	<title>For medlemmer · Stovner Frisbeeklubb</title>
	<meta
		name="description"
		content="Dette får du som medlem av Stovner Frisbeeklubb: reisestøtte til turneringer, lån av utstyr, rabatt, klubbtur, klubbmesterskap og stemmerett på årsmøtet."
	/>
</svelte:head>

<PageHeader eyebrow="Medlemskap" title="For medlemmer" subtitle="Dette får du som medlem av Stovner Frisbeeklubb" />

<section class="mx-auto max-w-6xl px-4 py-12 md:py-16">
	<div class="max-w-3xl">
		<div class="border-t border-[var(--color-border)]">
			<Disclosure id="reisestotte" title="Reisestøtte" teaser="Opptil 3 000 kr til din første store turnering">
				<p class="leading-relaxed text-[var(--color-muted)]">
					Klubben vil at flere medlemmer skal spille større turneringer, og hele Grasrotandelen fra året før går til
					reisestøtte.
				</p>

				<div class="mt-6 space-y-4">
					<p class="leading-relaxed text-[var(--color-muted)]">
						<strong class="font-semibold text-[var(--color-text)]">Første norgescup eller NM.</strong>
						Opptil 1 000 kr til påmelding. For deg som aldri har spilt norgescup eller NM, og skal spille en utenfor
						Oslo. Pengene utbetales etter turneringen.
					</p>
					<p class="leading-relaxed text-[var(--color-muted)]">
						<strong class="font-semibold text-[var(--color-text)]">Første turnering i utlandet.</strong>
						Opptil 3 000 kr til påmelding og billigste overnatting. For deg som aldri har spilt turnering i utlandet.
						Turneringen må være Eurotour eller høyere. Pengene utbetales etter turneringen, og du må dokumentere
						utgiftene til overnatting.
					</p>
					<p class="leading-relaxed text-[var(--color-muted)]">
						<strong class="font-semibold text-[var(--color-text)]">Inkludering.</strong>
						Opptil 1 500 kr til påmelding, billigste overnatting og reise. For deg som ellers ikke har råd til å reise
						på turnering. Du trenger ikke begrunne hvorfor. Ordningen bygger på tillit. Sender du en oversikt over
						utgiftene, kan pengene utbetales på forhånd. Etterpå dokumenterer du de faktiske utgiftene.
					</p>
				</div>

				<h3 class="mt-8 font-semibold text-[var(--color-text)]">Slik søker du</h3>
				<ol class="mt-4 space-y-4">
					{#each steps as step, i}
						<li class="grid grid-cols-[2rem_1fr] gap-x-3">
							<span class="text-xl font-bold leading-snug text-[var(--color-primary)] tabular-nums" aria-hidden="true">{i + 1}</span>
							<p class="leading-relaxed text-[var(--color-muted)]">{step}</p>
						</li>
					{/each}
				</ol>
				<p class="mt-6 leading-relaxed text-[var(--color-muted)]">
					Send søknaden til
					<a href="mailto:{BOARD_EMAIL}?subject={encodeURIComponent('Søknad om reisestøtte')}" class="text-[var(--color-primary)] hover:underline">{BOARD_EMAIL}</a>.
				</p>
			</Disclosure>

			<Disclosure id="utstyr" title="Lån utstyr" teaser="Verktøy, stoler, telt, TechDisc og mer">
				<p class="leading-relaxed text-[var(--color-muted)]">
					Klubben har blant annet verktøy, stoler, telt og TechDisc som medlemmer kan låne. Spør noen i
					<a href="/om-klubben#styret" class="text-[var(--color-primary)] hover:underline">styret</a>, eller send e-post til
					<a href="mailto:{BOARD_EMAIL}" class="text-[var(--color-primary)] hover:underline">{BOARD_EMAIL}</a>.
				</p>
			</Disclosure>

			<Disclosure id="rabatt" title="Rabatt på utstyr" teaser="Rabatt hos wearediscgolf">
				<p class="leading-relaxed text-[var(--color-muted)]">
					Medlemmer får rabatt hos wearediscgolf. Si at du er medlem i Stovner Frisbeeklubb ved kassen i den fysiske
					butikken.
				</p>
			</Disclosure>

			<Disclosure id="klubbtur" title="Klubbtur og klubbmesterskap" teaser="Bare for medlemmer, kunngjøres i Spond">
				<p class="leading-relaxed text-[var(--color-muted)]">
					Klubben arrangerer klubbtur og klubbmesterskap bare for medlemmer. Begge kunngjøres i Spond.
				</p>
			</Disclosure>

			<Disclosure id="arsmote" title="Årsmøtet" teaser="Stemmerett, hvert år i februar">
				<p class="leading-relaxed text-[var(--color-muted)]">
					Som medlem har du stemmerett på årsmøtet og kan være med på å forme klubbens fremtid. Årsmøtet holdes i
					februar, og innkallingen kommer i desember.
				</p>
			</Disclosure>
		</div>

		<p class="mt-10 leading-relaxed text-[var(--color-muted)]">
			Spørsmål? Send e-post til
			<a href="mailto:{BOARD_EMAIL}" class="text-[var(--color-primary)] hover:underline">{BOARD_EMAIL}</a>.
		</p>
	</div>
</section>
