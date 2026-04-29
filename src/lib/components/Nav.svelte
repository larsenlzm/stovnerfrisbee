<script lang="ts">
	import { page } from '$app/stores';
	import { navLinks } from '$lib/data/content';

	let menuOpen = $state(false);

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
			</ul>
		</div>
	{/if}
</nav>
