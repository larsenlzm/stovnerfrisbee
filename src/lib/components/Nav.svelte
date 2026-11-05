<script lang="ts">
	import { page } from '$app/stores';
	import { navLinks } from '$lib/data/content';

	let menuOpen = $state(false);
	let theme = $state<'light' | 'dark' | null>(null);

	const links = navLinks.filter((l) => !l.cta);
	const cta = navLinks.find((l) => l.cta);

	$effect(() => {
		const attr = document.documentElement.getAttribute('data-theme');
		if (attr === 'light' || attr === 'dark') {
			theme = attr;
		} else {
			theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}
	});

	function toggleTheme() {
		const next = theme === 'dark' ? 'light' : 'dark';
		theme = next;
		document.documentElement.setAttribute('data-theme', next);
		localStorage.setItem('theme', next);
	}

	function closeMenu() {
		menuOpen = false;
	}
</script>

<nav class="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-sm">
	<div class="mx-auto max-w-6xl px-4">
		<div class="flex h-[68px] items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-3 text-[var(--color-text)] transition-opacity hover:opacity-80" onclick={closeMenu}>
				<img src="/stovnerlogo.jpg" alt="Stovner Frisbee logo" width="40" height="40" class="rounded-full" />
				<span class="leading-tight">
					<span class="block text-[15px] font-bold">Stovner</span>
					<span class="block text-xs font-normal text-[var(--color-muted)]">Frisbeeklubb</span>
				</span>
			</a>

			<!-- Desktop links -->
			<ul class="hidden items-center gap-1 md:flex">
				{#each links as link}
					<li>
						<a
							href={link.href}
							class="block px-3 py-2 text-[11.5px] font-medium uppercase tracking-[0.14em] transition-colors hover:text-[var(--color-primary)]
								{$page.url.pathname === link.href
									? 'text-[var(--color-primary)]'
									: 'text-[var(--color-muted)]'}"
						>
							{link.label}
						</a>
					</li>
				{/each}
				{#if cta}
					<li>
						<a
							href={cta.href}
							data-track="nav-desktop"
							class="ml-3 block rounded-lg bg-[var(--color-accent)] px-[18px] py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)]"
						>
							{cta.label}
						</a>
					</li>
				{/if}
				<li>
					<button
						onclick={toggleTheme}
						aria-label="Bytt tema"
						class="ml-2 grid size-8 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
					>
						{#if theme === 'dark'}
							<!-- Sun icon -->
							<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<circle cx="12" cy="12" r="4"/>
								<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
							</svg>
						{:else}
							<!-- Moon icon -->
							<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
							</svg>
						{/if}
					</button>
				</li>
			</ul>

			<!-- Mobile: hamburger only -->
			<button
				class="-mr-2 flex flex-col gap-1.5 p-2 text-[var(--color-text)] md:hidden"
				onclick={() => (menuOpen = !menuOpen)}
				aria-label="Toggle meny"
				aria-expanded={menuOpen}
			>
				<span class="block h-0.5 w-6 bg-current transition-all {menuOpen ? 'translate-y-2 rotate-45' : ''}"></span>
				<span class="block h-0.5 w-6 bg-current transition-all {menuOpen ? 'opacity-0' : ''}"></span>
				<span class="block h-0.5 w-6 bg-current transition-all {menuOpen ? '-translate-y-2 -rotate-45' : ''}"></span>
			</button>
		</div>
	</div>

	<!-- Mobile menu -->
	{#if menuOpen}
		<div class="border-t border-[var(--color-border)] bg-[var(--color-bg)] pb-6 pt-2 md:hidden">
			<div class="mx-auto max-w-6xl px-4">
				<ul>
					{#each [{ href: '/', label: 'Hjem' }, ...links] as link}
						<li>
							<a
								href={link.href}
								onclick={closeMenu}
								class="block border-b border-[var(--color-border)] py-3.5 text-base transition-colors hover:text-[var(--color-primary)]
									{$page.url.pathname === link.href
										? 'text-[var(--color-primary)]'
										: 'text-[var(--color-text)]'}"
							>
								{link.label}
							</a>
						</li>
					{/each}
					<li>
						<button
							onclick={toggleTheme}
							aria-label="Bytt tema"
							class="block w-full border-b border-[var(--color-border)] py-3.5 text-left text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
						>
							{theme === 'dark' ? 'Lyst tema' : 'Mørkt tema'}
						</button>
					</li>
				</ul>
				{#if cta}
					<a
						href={cta.href}
						data-track="nav-mobile-menu"
						onclick={closeMenu}
						class="mt-5 block rounded-lg bg-[var(--color-accent)] py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)]"
					>
						{cta.label}
					</a>
				{/if}
			</div>
		</div>
	{/if}
</nav>
