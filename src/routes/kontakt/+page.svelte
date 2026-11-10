<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<svelte:head>
	<title>Kontakt · Stovner Frisbeeklubb</title>
</svelte:head>

<PageHeader eyebrow="Kontakt" title="Kontakt & sponsorer" subtitle="Spørsmål, samarbeid eller henvendelser" image="/sponsor.jpg" alt="Sponsor" />

<section class="mx-auto max-w-6xl px-4 py-16">
	<div class="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
		<div>
			<h2 class="text-xl font-bold text-[var(--color-text)]">Ta kontakt</h2>

			<a
				href="mailto:kontakt@stovnerfrisbee.no"
				class="mt-5 inline-block break-words text-2xl font-semibold tracking-tight text-[var(--color-primary)] hover:underline md:text-3xl"
			>
				kontakt@stovnerfrisbee.no
			</a>
			<p class="mt-2 text-[var(--color-muted)]">Vi svarer normalt innen et par dager.</p>

			<p class="mt-8 max-w-md leading-relaxed text-[var(--color-muted)]">
				Følg oss på
				<a href="https://www.facebook.com/Stovnerfrisbeeklubb" target="_blank" rel="noopener noreferrer" class="font-medium text-[var(--color-primary)] hover:underline">Facebook</a>
				og
				<a href="https://www.instagram.com/stovnerfrisbee" target="_blank" rel="noopener noreferrer" class="font-medium text-[var(--color-primary)] hover:underline">Instagram</a>
				for oppdateringer, bilder og nyheter fra klubben.
			</p>
		</div>

		<div>
			<h2 class="text-xl font-bold text-[var(--color-text)]">Sponsorsamarbeid</h2>

			<div class="mt-5 max-w-lg space-y-4 leading-relaxed text-[var(--color-muted)]">
				<p>
					Stovner Frisbeeklubb er en aktiv lokalidrettsklubb med røtter tilbake til 1985 og medlem av Norges
					idrettsforbund gjennom Oslo idrettskrets. Vi driver to baner og arrangerer ligaer, turneringer og
					klubbmesterskap, i samarbeid med blant andre Sune Sport/WE ARE DISC GOLF, Stovner Rockefabrikk og
					Bydel Stovner.
				</p>
				<p>
					Som sponsor får du synlighet overfor et engasjert og voksende discgolfmiljø i Oslo-regionen. Vi er
					åpne for ulike former for samarbeid, og finner gjerne noe som fungerer for begge parter.
				</p>
			</div>

			<a
				href="mailto:kontakt@stovnerfrisbee.no?subject=Sponsorforespørsel"
				class="mt-7 inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)]"
			>
				Send en forespørsel
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
					<path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</a>
		</div>
	</div>
</section>
