<svelte:head>
	<title>Bli medlem · Stovner Frisbeeklubb</title>
</svelte:head>

<section class="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 py-16">
	<div class="mx-auto max-w-6xl">
		<p class="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">Medlemskap</p>
		<h1 class="text-3xl font-bold text-[var(--color-text)] md:text-4xl">Bli medlem</h1>
		<p class="mt-3 text-[var(--color-muted)]">Bli en del av fellesskapet</p>
	</div>
</section>

<section class="mx-auto max-w-6xl px-4 py-16">
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
		<!-- Benefits -->
		<div>
			<h2 class="mb-6 text-xl font-bold text-[var(--color-text)]">Hvorfor bli medlem?</h2>
			<ul class="space-y-4">
				{#each [
					{ title: 'Delta i turneringer', desc: 'Spill i torsdagsgolf, vårliga og Stovner Open med rabatterte deltakerpriser.' },
					{ title: 'Støtt banene', desc: 'Medlemskontingenten går direkte til vedlikehold og utvikling av banene våre.' },
					{ title: 'Fellesskap', desc: 'Bli kjent med andre discgolfentusiaster i Groruddalen.' },
					{ title: 'Påvirkning', desc: 'Som medlem har du stemmerett på årsmøtet og kan bidra til å forme klubbens fremtid.' },
					{ title: 'Grasrotandelen', desc: 'Ved å registrere oss som mottaker i Norsk Tipping støtter du klubben uten å betale ekstra.' }
				] as benefit}
					<li class="flex gap-4">
						<span class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)]">
							<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
								<path d="M8 2.5L4 7L2 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</span>
						<div>
							<p class="font-semibold text-[var(--color-text)]">{benefit.title}</p>
							<p class="text-sm text-[var(--color-muted)]">{benefit.desc}</p>
						</div>
					</li>
				{/each}
			</ul>
		</div>

		<!-- How to join -->
		<div>
			<h2 class="mb-6 text-xl font-bold text-[var(--color-text)]">Slik melder du deg inn</h2>

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

				<!-- Spond app note -->
				<div class="rounded-xl border border-[var(--color-primary)]/25 bg-[var(--color-primary)]/5 p-5">
					<p class="text-sm text-[var(--color-muted)]">
						Last ned <strong class="text-[var(--color-text)]">Spond-appen</strong> fra App Store eller Google Play for å motta og betale betalingskravet.
					</p>
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
