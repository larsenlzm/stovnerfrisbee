<svelte:head>
	<title>Bli medlem · Stovner Frisbeeklubb</title>
</svelte:head>

<section class="relative overflow-hidden bg-[var(--color-surface)] border-b border-[var(--color-border)]">
	<div class="relative h-72">
		<img src="/wulf.jpg" alt="Stovner Frisbeeklubb" class="absolute inset-0 w-full h-full object-cover object-center" />
		<div class="absolute inset-0 bg-black/50"></div>
		<div class="relative z-10 flex h-full items-end px-4 pb-10 mx-auto max-w-6xl">
			<div>
				<p class="mb-2 text-sm font-semibold uppercase tracking-widest text-white/70">Medlemskap</p>
				<h1 class="text-3xl font-bold text-white md:text-4xl">Bli medlem</h1>
				<p class="mt-3 text-white/70">Meld deg inn og spill med oss</p>
			</div>
		</div>
	</div>
</section>

<!-- Benefits + How to join -->
<section class="mx-auto max-w-6xl px-4 py-16">
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
		<!-- How to join (first on mobile, right on desktop) -->
		<div class="order-first lg:order-last">
			<h2 class="mb-8 text-xl font-bold text-[var(--color-text)]">Slik melder du deg inn</h2>

			<div class="space-y-4">
				<!-- Spond signup -->
				<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
					<h3 class="mb-3 font-semibold text-[var(--color-text)]">Meld deg inn via Spond</h3>
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

				<!-- Pricing -->
				<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
					<h3 class="mb-4 font-semibold text-[var(--color-text)]">Medlemskontingent</h3>
					<div class="space-y-3">
						<div class="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3">
							<span class="text-sm font-semibold text-[var(--color-text)]">Seniormedlem</span>
							<span class="font-bold text-[var(--color-text)]">Kr 500,-</span>
						</div>
						<div class="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3">
							<span class="text-sm font-semibold text-[var(--color-text)]">Juniormedlem</span>
							<span class="font-bold text-[var(--color-text)]">Kr 100,-</span>
						</div>
						<div class="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3">
							<span class="text-sm font-semibold text-[var(--color-text)]">Støttemedlem</span>
							<span class="font-bold text-[var(--color-text)]">Kr 100,-</span>
						</div>
					</div>
					<p class="mt-3 text-xs text-[var(--color-muted)]">Senior og junior betaler i tillegg kr 105,- i NAIF-kontingent til Norges amerikanske idretters forbund (NAIF).</p>
				</div>

				<!-- Contact -->
				<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
					<h3 class="mb-3 font-semibold text-[var(--color-text)]">Spørsmål?</h3>
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

		<!-- Benefits (second on mobile, left on desktop) -->
		<div class="order-last lg:order-first">
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
