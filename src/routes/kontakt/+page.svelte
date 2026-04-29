<svelte:head>
	<title>Kontakt · Stovner Frisbeeklubb</title>
</svelte:head>

<section class="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 py-16">
	<div class="mx-auto max-w-6xl">
		<p class="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">Kontakt</p>
		<h1 class="text-3xl font-bold text-[var(--color-text)] md:text-4xl">Kontakt & sponsorer</h1>
		<p class="mt-3 text-[var(--color-muted)]">Spørsmål, samarbeid eller henvendelser</p>
	</div>
</section>

<section class="mx-auto max-w-6xl px-4 py-16">
	<div class="grid grid-cols-1 gap-10 lg:grid-cols-2">
		<!-- Contact -->
		<div>
			<h2 class="mb-6 text-xl font-bold text-[var(--color-text)]">Ta kontakt</h2>

			<div class="space-y-4">
				<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
					<p class="mb-1 text-sm font-semibold text-[var(--color-text)]">E-post</p>
					<a
						href="mailto:kontakt@stovnerfrisbee.no"
						class="text-[var(--color-primary)] hover:underline"
					>
						kontakt@stovnerfrisbee.no
					</a>
					<p class="mt-2 text-sm text-[var(--color-muted)]">Vi svarer normalt innen et par dager.</p>
				</div>

				<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
					<p class="mb-1 text-sm font-semibold text-[var(--color-text)]">Sosiale medier</p>
					<p class="mb-3 text-sm text-[var(--color-muted)]">
						Følg oss for oppdateringer, bilder og nyheter fra klubben.
					</p>
					<div class="flex gap-3">
						<a
							href='https://www.facebook.com/Stovnerfrisbeeklubb'
							target="_blank"
							rel="noopener noreferrer"
							class="rounded-lg bg-[var(--color-surface-2)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:text-[var(--color-primary)]"
						>
							Facebook ↗
						</a>
						<a
							href="https://www.instagram.com/stovnerfrisbee"
							target="_blank"
							rel="noopener noreferrer"
							class="rounded-lg bg-[var(--color-surface-2)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:text-[var(--color-primary)]"
						>
							Instagram ↗
						</a>
					</div>
				</div>

				<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
					<p class="mb-1 text-sm font-semibold text-[var(--color-text)]">Adresse</p>
					<p class="text-sm text-[var(--color-muted)]">
						Stovnerlia, Stovner<br />
						Oslo, Norge
					</p>
				</div>
			</div>
		</div>

		<!-- Sponsors -->
		<div>
			<h2 class="mb-6 text-xl font-bold text-[var(--color-text)]">Sponsorsamarbeid</h2>

			<div class="rounded-xl border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/5 p-8">
				<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent)]/20 text-[var(--color-accent)]">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
						<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>

				<h3 class="mb-3 text-lg font-bold text-[var(--color-text)]">Støtt lokalt discgolf</h3>
				<p class="mb-4 text-sm leading-relaxed text-[var(--color-muted)]">
					Stovner Frisbeeklubb er en aktiv lokalidrettsklubb med røtter tilbake til 1985.
					Vi arrangerer turneringer, driver baner og skaper aktivitet i Groruddalen.
				</p>
				<p class="mb-4 text-sm leading-relaxed text-[var(--color-muted)]">
					Som sponsor får du synlighet overfor en engasjert og voksende discgolfkommunitet i
					Oslo-regionen. Vi er åpne for ulike former for samarbeid.
				</p>
				<p class="mb-6 text-sm leading-relaxed text-[var(--color-muted)]">
					Ta kontakt, så finner vi ut av noe som fungerer for begge parter.
				</p>

				<a
					href="mailto:kontakt@stovnerfrisbee.no?subject=Sponsorforespørsel"
					class="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)]"
				>
					Send en forespørsel
					<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
						<path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</a>
			</div>

			<!-- Grasrotandelen -->
			<div class="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
				<h3 class="mb-2 font-semibold text-[var(--color-text)]">Grasrotandelen</h3>
				<p class="text-sm leading-relaxed text-[var(--color-muted)]">
					Spiller du på Norsk Tipping? Du kan velge å gi en del av innsatsen din til
					Stovner Frisbeeklubb gjennom Grasrotandelen — helt gratis for deg.
				</p>
				<a
					href="https://www.norsk-tipping.no/grasrotandelen"
					target="_blank"
					rel="noopener noreferrer"
					class="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:underline"
				>
					Les mer om Grasrotandelen ↗
				</a>
			</div>
		</div>
	</div>
</section>
