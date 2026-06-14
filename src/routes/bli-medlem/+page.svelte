<svelte:head>
	<title>Bli medlem · Stovner Frisbeeklubb</title>
</svelte:head>

<section class="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 py-16">
	<div class="mx-auto max-w-6xl">
		<p class="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">Medlemskap</p>
		<h1 class="text-3xl font-bold text-[var(--color-text)] md:text-4xl">Bli medlem</h1>
		<p class="mt-3 text-[var(--color-muted)]">Meld deg inn og spill med oss</p>
	</div>
</section>

<!-- Benefits + How to join -->
<section class="mx-auto max-w-6xl px-4 py-16">
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
		<!-- Benefits -->
		<div>
			<h2 class="mb-8 text-xl font-bold text-[var(--color-text)]">Hvorfor bli medlem?</h2>
			<ul class="space-y-6">
				{#each [
					{ title: 'Delta i turneringer', desc: 'Vi arrangerer ligaspill, turnerninger og lavterskel arrangementer.' },
					{ title: 'Støtt banene', desc: 'Medlemskontingenten går direkte til vedlikehold og utvikling av banene våre.' },
					{ title: 'Fellesskap', desc: 'Bli en del av oss — et godt miljø med discgolfentusiaster i Groruddalen.' },
					{ title: 'Klubbtur og klubbmesterskap', desc: 'Bli med på ekslusiv klubbtur og klubbmesterskap kun for medlemmer.' },	
					{ title: 'Påvirkning', desc: 'Som medlem har du stemmerett på årsmøtet og kan bidra til å forme klubbens fremtid.' },
					{ title: 'Rabatt på discgolfutstyr', desc: 'Medlemmer får rabatt på discgolfutstyr fra wearediscgolf.' },
					{ title: 'Lån utstyr fra klubben', desc: 'Klubben har mye utstyr du kan låne, alt fra verktøy, stoler, telt til techdisc.' },
				] as benefit}
					<li class="flex gap-4">
						<span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary)]">
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
								<path d="M11.5 3.5L5.5 10L2.5 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</span>
						<div>
							<p class="font-semibold text-[var(--color-text)]">{benefit.title}</p>
							<p class="mt-0.5 text-sm leading-relaxed text-[var(--color-muted)]">{benefit.desc}</p>
						</div>
					</li>
				{/each}
			</ul>
		</div>

		<!-- How to join -->
		<div>
			<h2 class="mb-8 text-xl font-bold text-[var(--color-text)]">Slik melder du deg inn</h2>

			<div class="space-y-4">

				<!-- Spond signup -->
				<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
					<div class="mb-3 flex items-center gap-3">
						<span class="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white">1</span>
						<h3 class="font-semibold text-[var(--color-text)]">Meld deg inn via Spond</h3>
					</div>
					<p class="mb-4 text-sm text-[var(--color-muted)]">
						Innmelding skjer via Spond. Betalingskrav sendes gjennom Spond-appen etter registrering.
					</p>
					<a
						href="https://club.spond.com/landing/signup/sfrisbeek"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)]"
					>
						Meld deg inn på Spond ↗
					</a>
				</div>

				<!-- Contact -->
				<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
					<div class="mb-3 flex items-center gap-3">
						<span class="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-surface-2)] text-xs font-bold text-[var(--color-primary)] border border-[var(--color-border)]">2</span>
						<h3 class="font-semibold text-[var(--color-text)]">Spørsmål?</h3>
					</div>
					<p class="text-sm text-[var(--color-muted)]">
						Ta gjerne kontakt med oss hvis du lurer på noe.
					</p>
					<a
						href="/kontakt"
						class="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline"
					>
						Gå til kontaktsiden →
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Pricing -->
<section class="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
	<div class="mx-auto max-w-6xl px-4 py-16">
		<h2 class="mb-8 text-xl font-bold text-[var(--color-text)]">Medlemskontingent</h2>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
			<!-- Senior -->
			<div class="rounded-xl border-2 border-[var(--color-primary)] bg-[var(--color-surface)] p-6">
				<p class="mb-1 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">Seniormedlem</p>
				<p class="mb-1 text-3xl font-bold text-[var(--color-text)]">Kr 500,-</p>
				<p class="text-sm text-[var(--color-muted)]">+ kr 105,- NAIF-kontingent*</p>
			</div>
			<!-- Junior -->
			<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
				<p class="mb-1 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">Juniormedlem</p>
				<p class="mb-1 text-3xl font-bold text-[var(--color-text)]">Kr 100,-</p>
				<p class="text-sm text-[var(--color-muted)]">+ kr 105,- NAIF-kontingent*</p>
			</div>
			<!-- Støtte -->
			<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
				<p class="mb-1 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">Støttemedlem</p>
				<p class="mb-1 text-3xl font-bold text-[var(--color-text)]">Kr 100,-</p>
				<p class="text-sm text-[var(--color-muted)]">Støtter klubben uten NAIF-avgift</p>
			</div>
		</div>
		<p class="mt-4 text-xs text-[var(--color-muted)]">* NAIF-kontingenten (kr 105,-) er en nasjonal avgift til Norges Frisbeeidrettsforbund og kommer i tillegg til klubbkontingenten.</p>
	</div>
</section>

<!-- Grasrotandelen -->
<section id="grasrotandelen" class="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
	<div class="mx-auto max-w-6xl px-4 py-16">
		<div class="flex flex-col gap-8 md:flex-row md:items-center md:gap-16">
			<div class="shrink-0">
				<img
					src="/norsktipping.jpg"
					alt="Norsk Tipping logo"
					width="160"
					height="80"
					class="rounded-lg"
				/>
			</div>
			<div>
				<p class="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">Støtt oss gratis</p>
				<h2 class="mb-3 text-2xl font-bold text-[var(--color-text)]">Grasrotandelen</h2>
				<p class="mb-2 leading-relaxed text-[var(--color-muted)]">
					Spiller du hos Norsk Tipping? Da kan du velge Stovner Frisbeeklubb som din Grasrotmottaker.
					Norsk Tipping gir da 7 % av ditt spill direkte til klubben — uten at det koster deg en krone ekstra.
				</p>
				<p class="mb-6 text-sm text-[var(--color-muted)]">
					Søk opp <strong class="text-[var(--color-text)]">Stovner Frisbeeklubb</strong> i Norsk Tippings app eller på nettsiden,
					eller bruk organisasjonsnummeret vårt: <strong class="text-[var(--color-text)]">894 417 382</strong>.
				</p>
				<a
					href="https://www.norsk-tipping.no/grasrotandelen/din-mottaker/894417382"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-lg border border-[var(--color-primary)]/50 px-5 py-2.5 text-sm font-semibold text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)]/10 hover:border-[var(--color-primary)]"
				>
					Registrer oss som din Grasrotmottaker ↗
				</a>
			</div>
		</div>
	</div>
</section>
