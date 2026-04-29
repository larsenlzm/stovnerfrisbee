<script lang="ts">
	import { page } from '$app/stores';
	import { navLinks } from '$lib/data/content';

	let menuOpen = $state(false);
	let theme = $state<'light' | 'dark' | null>(null);

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

<nav class="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-sm">
	<div class="mx-auto max-w-6xl px-4">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-3 font-bold text-[var(--color-text)] hover:opacity-80 transition-opacity" onclick={closeMenu}>
				<img src="/stovnerlogo.jpg" alt="Stovner Frisbee logo" width="40" height="40" class="rounded-full" />
				<span class="text-sm leading-tight">
					<span class="block text-base font-bold">Stovner</span>
					<span class="block text-xs font-normal text-[var(--color-muted)]">Frisbeeklubb</span>
				</span>
			</a>

			<!-- Desktop links -->
			<ul class="hidden md:flex items-center gap-1">
				{#each navLinks as link}
					<li>
						<a
							href={link.href}
							class="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-[var(--color-primary)]
								{$page.url.pathname === link.href
									? 'text-[var(--color-primary)]'
									: 'text-[var(--color-muted)]'}"
						>
							{link.label}
						</a>
					</li>
				{/each}
				<li>
					<button
						onclick={toggleTheme}
						aria-label="Bytt tema"
						class="rounded-md p-2 text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
					>
						{#if theme === 'dark'}
							<!-- Sun icon -->
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<circle cx="12" cy="12" r="4"/>
								<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
							</svg>
						{:else}
							<!-- Moon icon -->
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
							</svg>
						{/if}
					</button>
				</li>
			</ul>

			<!-- Mobile hamburger -->
			<button
				class="md:hidden flex flex-col gap-1.5 p-2 text-[var(--color-text)]"
				onclick={() => (menuOpen = !menuOpen)}
				aria-label="Toggle meny"
			>
				<span class="block h-0.5 w-6 bg-current transition-all {menuOpen ? 'translate-y-2 rotate-45' : ''}"></span>
				<span class="block h-0.5 w-6 bg-current transition-all {menuOpen ? 'opacity-0' : ''}"></span>
				<span class="block h-0.5 w-6 bg-current transition-all {menuOpen ? '-translate-y-2 -rotate-45' : ''}"></span>
			</button>
		</div>
	</div>

	<!-- Mobile menu -->
	{#if menuOpen}
		<div class="md:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
			<ul class="flex flex-col gap-1">
				{#each navLinks as link}
					<li>
						<a
							href={link.href}
							onclick={closeMenu}
							class="block rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-primary)]
								{$page.url.pathname === link.href
									? 'text-[var(--color-primary)] bg-[var(--color-surface-2)]'
									: 'text-[var(--color-muted)]'}"
						>
							{link.label}
						</a>
					</li>
				{/each}
				<li>
					<button
						onclick={toggleTheme}
						aria-label="Bytt tema"
						class="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-[var(--color-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-primary)] transition-colors w-full"
					>
						{#if theme === 'dark'}
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<circle cx="12" cy="12" r="4"/>
								<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
							</svg>
							Lyst tema
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
							</svg>
							Mørkt tema
						{/if}
					</button>
				</li>
			</ul>
		</div>
	{/if}
</nav>
