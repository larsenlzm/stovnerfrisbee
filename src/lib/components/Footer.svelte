<script lang="ts">
	import { socialLinks } from '$lib/data/content';
</script>

<footer class="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
	<div class="mx-auto max-w-6xl px-4 pb-7 pt-9">
		<div class="flex flex-col gap-6 md:flex-row md:justify-between md:gap-12">
			<!-- Brand -->
			<div class="text-[13px] leading-relaxed text-[var(--color-muted)]">
				<p class="mb-1 text-[15px] font-bold text-[var(--color-text)]">Stovner Frisbeeklubb</p>
				<p>Org.nr. 894 417 382</p>
				<p>Idas vei 35, 0981 Oslo</p>
			</div>

			<!-- Social -->
			<ul class="flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
				{#each socialLinks as link}
					<li>
						<a
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							class="text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
						>
							{link.name} ↗
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<div class="mt-7 flex flex-col justify-between gap-2 border-t border-[var(--color-border)] pt-5 text-xs text-[var(--color-muted)] sm:flex-row">
			<p>© {new Date().getFullYear()} Stovner Frisbeeklubb</p>
			<a
				href="mailto:kontakt@stovnerfrisbee.no"
				class="transition-colors hover:text-[var(--color-primary)]"
			>
				kontakt@stovnerfrisbee.no
			</a>
		</div>
	</div>
</footer>
