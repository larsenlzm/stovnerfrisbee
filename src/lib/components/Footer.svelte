<script lang="ts">
	import { socialLinks } from '$lib/data/content';

	const logos: Record<string, string> = {
		UDisc: '/udisclogo.png',
		DGScene: '/dgscenelogo.jpg',
		Tjing: '/tjinglogo.png'
	};
</script>

<footer class="border-t border-[var(--color-border)] bg-[var(--color-surface)] mt-24">
	<div class="mx-auto max-w-6xl px-4 py-12">
		<div class="flex flex-col gap-8 md:flex-row md:justify-between">
			<!-- Brand -->
			<div>
				<p class="font-bold text-[var(--color-text)]">Stovner Frisbeeklubb</p>
				<p class="mt-1 text-sm text-[var(--color-muted)]">Stiftet 1985 · Stovner, Oslo</p>
				<p class="mt-3 text-sm text-[var(--color-muted)]">
					En av Norges eldste discidrettsklubber, med baner i hjertet av Groruddalen.
				</p>
			</div>

			<!-- Social -->
			<div>
				<p class="mb-3 text-sm font-semibold text-[var(--color-text)]">Følg oss</p>
				<ul class="grid grid-cols-2 gap-x-6 gap-y-2">
					{#each socialLinks as link}
						<li>
							<a
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
							>
								{#if logos[link.name]}
									<img src={logos[link.name]} alt="" class="h-4 w-4 rounded object-cover" aria-hidden="true" />
								{/if}
								{link.name} ↗
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="mt-10 border-t border-[var(--color-border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
			<p class="text-xs text-[var(--color-muted)]">
				© {new Date().getFullYear()} Stovner Frisbeeklubb
			</p>
			<a
				href="mailto:kontakt@stovnerfrisbee.no"
				class="text-xs text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
			>
				kontakt@stovnerfrisbee.no
			</a>
		</div>
	</div>
</footer>
