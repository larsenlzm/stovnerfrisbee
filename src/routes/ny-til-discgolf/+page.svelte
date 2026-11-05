<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<svelte:head>
	<title>Ny til discgolf · Stovner Frisbeeklubb</title>
</svelte:head>

<PageHeader eyebrow="Kom i gang" title="Ny til discgolf" subtitle="Slik prøver du sporten" image="/rocker.jpg" alt="Discgolfkurv på Stovner" />

<section class="mx-auto max-w-3xl px-4 py-16">
	<div class="space-y-12">
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
				Banene våre er åpne og gratis for alle.
			</p>
			<a href="/banene" class="mt-3 inline-block text-sm font-medium text-[var(--color-primary)] hover:underline">Se banene →</a>
		</div>

		<div>
			<h2 class="mb-2 text-xl font-semibold text-[var(--color-text)]">Prøv sammen med andre</h2>
			<p class="leading-relaxed text-[var(--color-muted)]">
				Hver torsdag klokken 17:30–20:30 arrangerer vi Torsdagsgolf, åpent for alle nivåer.
				Banen er reservert for deltakerne i dette tidsrommet.
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

		<div>
			<h2 class="mb-2 text-xl font-semibold text-[var(--color-text)]">Praktisk</h2>
			<p class="leading-relaxed text-[var(--color-muted)]">
				På Stovner Discgolfpark kan du ha med hund, vogn og barnevogn. Det er ikke toalett eller vann på banen.
			</p>
		</div>
	</div>
</section>
