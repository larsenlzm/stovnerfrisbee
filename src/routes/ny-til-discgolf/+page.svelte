<svelte:head>
	<title>Ny til discgolf · Stovner Frisbeeklubb</title>
</svelte:head>

<section class="relative overflow-hidden bg-[var(--color-surface)] border-b border-[var(--color-border)]">
	<div class="relative h-72">
		<img src="/rocker.jpg" alt="Discgolfkurv på Stovner" class="absolute inset-0 w-full h-full object-cover object-center" fetchpriority="high" />
		<div class="absolute inset-0 bg-black/50"></div>
		<div class="relative z-10 flex h-full items-end px-4 pb-10 mx-auto max-w-6xl">
			<div>
				<p class="mb-2 text-sm font-semibold uppercase tracking-widest text-white/70">Kom i gang</p>
				<h1 class="text-3xl font-bold text-white md:text-4xl">Ny til discgolf</h1>
				<p class="mt-3 text-white/70">Slik prøver du sporten</p>
			</div>
		</div>
	</div>
</section>

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
