<script lang="ts">
	import data from '$lib/data/varligaen2026.json';

	const DIV_ORDER = ['MPO', 'FPO', 'MA3', 'MA4', 'MP40'];

	const NO_MONTHS = ['jan','feb','mar','apr','mai','jun','jul','aug','sep','okt','nov','des'];
	function fmtDate(iso: string) {
		const [, m, d] = iso.split('-');
		return `${parseInt(d)}. ${NO_MONTHS[parseInt(m) - 1]}`;
	}

	function scoreClass(diff: number): string {
		if (diff <= -2) return 'eagle';
		if (diff === -1) return 'birdie';
		if (diff === 0) return 'par';
		if (diff === 1) return 'bogey';
		if (diff === 2) return 'double';
		return 'triple';
	}

	function fmtDiff(diff: number): string {
		if (diff === 0) return 'E';
		return diff > 0 ? `+${diff}` : `${diff}`;
	}

	function medal(pos: number): string {
		if (pos === 1) return '🥇';
		if (pos === 2) return '🥈';
		if (pos === 3) return '🥉';
		return String(pos);
	}

	// Row tint only — no border, border lives on the sticky td so it doesn't scroll away
	function podiumRowClass(pos: number): string {
		if (pos === 1) return 'bg-amber-50 dark:bg-amber-900/15';
		if (pos === 2) return 'bg-slate-50 dark:bg-slate-800/25';
		if (pos === 3) return 'bg-orange-50 dark:bg-orange-900/15';
		return '';
	}

	function podiumCellClass(pos: number): string {
		if (pos === 1) return 'bg-amber-50 dark:bg-amber-900/15';
		if (pos === 2) return 'bg-slate-50 dark:bg-slate-800/25';
		if (pos === 3) return 'bg-orange-50 dark:bg-orange-900/15';
		return '';
	}

	// Fully opaque + colored left border on the first sticky td — stays fixed on scroll
	function podiumStickyClass(pos: number): string {
		if (pos === 1) return 'bg-amber-50 dark:bg-[var(--color-surface)] border-l-[3px] border-l-amber-400';
		if (pos === 2) return 'bg-slate-50 dark:bg-[var(--color-surface)] border-l-[3px] border-l-slate-400';
		if (pos === 3) return 'bg-orange-50 dark:bg-[var(--color-surface)] border-l-[3px] border-l-orange-400';
		return '';
	}

	// Name cell — opaque but no left border (border is on the # cell only)
	function podiumNameStickyClass(pos: number): string {
		if (pos === 1) return 'bg-amber-50 dark:bg-[var(--color-surface)]';
		if (pos === 2) return 'bg-slate-50 dark:bg-[var(--color-surface)]';
		if (pos === 3) return 'bg-orange-50 dark:bg-[var(--color-surface)]';
		return '';
	}

	function podiumNameClass(pos: number): string {
		if (pos === 1) return 'font-bold text-[var(--color-primary)]';
		if (pos === 2) return 'font-semibold text-[var(--color-text)]';
		if (pos === 3) return 'font-semibold text-[var(--color-text)]';
		return 'font-medium text-[var(--color-text)]';
	}

	function calcPot(divCode: string): number {
		return data.rounds.reduce((total, round) => {
			const div = round.divisions.find(d => d.code === divCode);
			return total + (div?.players.length ?? 0) * 20;
		}, 0);
	}

	// Returns the indices of rounds that are dropped (lowest-scoring, outside top 6)
	function droppedIndices(roundPoints: (number | null)[]): Set<number> {
		const played = roundPoints
			.map((pts, i) => ({ pts: pts as number, i }))
			.filter(x => x.pts != null);
		if (played.length <= 6) return new Set();
		played.sort((a, b) => a.pts - b.pts);
		return new Set(played.slice(0, played.length - 6).map(x => x.i));
	}

	const availableDivs = $derived(
		DIV_ORDER.filter(d => data.standings.some(s => s.code === d))
	);

	let selectedDiv = $state('alle');
	let selectedView = $state<'totalt' | 'runder' | 'baner'>('totalt');
	let selectedRound = $state(1);

	const overviewData = $derived(
		availableDivs.map(divCode => {
			const players = data.standings.find(s => s.code === divCode)?.players ?? [];
			return {
				code: divCode,
				pot: calcPot(divCode),
				top3: players.slice(0, 3).map(p => {
					const dropped = droppedIndices(p.roundPoints);
					const total = p.roundPoints.reduce((sum: number, pts, ri) => (!dropped.has(ri) && pts != null) ? sum + pts : sum, 0);
					return { position: p.position, name: p.name, total };
				})
			};
		})
	);

	const standings = $derived(
		data.standings.find(s => s.code === selectedDiv)?.players ?? []
	);

	const roundDivision = $derived(
		data.rounds[selectedRound - 1]?.divisions.find(d => d.code === selectedDiv) ?? null
	);

	const holeStats = $derived.by(() => {
		return data.holePars.map((par, i) => {
			let sum = 0, count = 0;
			for (const round of data.rounds) {
				const div = round.divisions.find(d => d.code === selectedDiv);
				if (!div) continue;
				for (const player of div.players) {
					const s = player.scores[i];
					if (s != null) { sum += s; count++; }
				}
			}
			const avg = count > 0 ? sum / count : null;
			return {
				hole: i + 1,
				par,
				meters: data.holeMeters[i],
				avg,
				avgVsPar: avg != null ? avg - par : null
			};
		});
	});

	const sortedHoleStats = $derived(
		[...holeStats].sort((a, b) => (b.avgVsPar ?? 0) - (a.avgVsPar ?? 0))
	);

	const maxAbsAvgVsPar = $derived(
		Math.max(...holeStats.map(h => Math.abs(h.avgVsPar ?? 0)), 0.01)
	);
</script>

<svelte:head>
	<title>Vårligaen 2026 · Stovner Frisbeeklubb</title>
</svelte:head>

<!-- Hero header -->
<section class="relative overflow-hidden bg-[var(--color-surface)] border-b border-[var(--color-border)]">
	<div class="relative h-64 md:h-72">
		<img src="/bane.jpg" alt="Stovner Discgolfpark" class="absolute inset-0 w-full h-full object-cover object-top" fetchpriority="high" />
		<div class="absolute inset-0 bg-black/55"></div>
		<div class="relative z-10 flex h-full flex-col justify-between px-4 py-6 mx-auto max-w-6xl">
			<a href="/arrangementer" class="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors w-fit">
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
					<path d="M10 7H4M4 7L7 4M4 7L7 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
				Arrangementer
			</a>
			<div>
				<p class="mb-2 text-sm font-semibold uppercase tracking-widest text-white/70">Resultater</p>
				<h1 class="text-3xl font-bold text-white md:text-4xl">Vårligaen 2026</h1>
				<p class="mt-2 text-white/70">8 runder · Stovner Discgolfpark · Layout 2025 · Par 57</p>
			</div>
		</div>
	</div>
</section>

<div class="mx-auto max-w-6xl px-4 py-10 space-y-6">

	<!-- Division tabs -->
	<div class="flex gap-1 overflow-x-auto pb-1">
		<button
			onclick={() => selectedDiv = 'alle'}
			class="shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-colors {selectedDiv === 'alle'
				? 'bg-[var(--color-primary)] text-white'
				: 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)]'}"
		>
			Alle
		</button>
		{#each availableDivs as div}
			<button
				onclick={() => { selectedDiv = div; selectedView = 'totalt'; }}
				class="shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-colors {selectedDiv === div
					? 'bg-[var(--color-primary)] text-white'
					: 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)]'}"
			>
				{div}
			</button>
		{/each}
	</div>

	<!-- ── ALLE DIVISJONER (oversikt) ── -->
	{#if selectedDiv === 'alle'}
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each overviewData as div}
				<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
					<div class="border-b border-[var(--color-border)] bg-[var(--color-surface-2)] px-5 py-3 flex items-center justify-between">
						<span class="font-bold text-[var(--color-text)]">{div.code}</span>
						<button
							onclick={() => { selectedDiv = div.code; selectedView = 'totalt'; }}
							class="text-xs font-medium text-[var(--color-primary)] hover:underline"
						>
							Full stilling →
						</button>
					</div>
					<div class="divide-y divide-[var(--color-border)]">
						{#each div.top3 as player}
							<div class="flex items-center gap-3 px-5 py-3.5">
								<span class="text-xl w-8 shrink-0 text-center">{medal(player.position)}</span>
								<span class="flex-1 text-sm font-medium text-[var(--color-text)] truncate">{player.name}</span>
								<span class="text-sm font-bold text-[var(--color-primary)] shrink-0">{player.total} p</span>
							</div>
						{/each}
					</div>
					<div class="border-t border-[var(--color-border)] bg-[var(--color-surface-2)]/50 px-5 py-3 flex items-center justify-between">
						<span class="text-xs text-[var(--color-muted)]">Sammenlagtpremie</span>
						<span class="text-sm font-bold text-[var(--color-primary)]">{div.pot.toLocaleString('no-NO')} kr</span>
					</div>
				</div>
			{/each}
		</div>

	{:else}
		<!-- View toggle — only shown when a specific division is selected -->
		<div class="flex border-b border-[var(--color-border)]">
			{#each [['totalt', 'Poengstilling'], ['runder', 'Runder'], ['baner', 'Baner']] as [v, label]}
				<button
					onclick={() => selectedView = v as 'totalt' | 'runder' | 'baner'}
					class="px-5 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px {selectedView === v
						? 'border-[var(--color-primary)] text-[var(--color-primary)]'
						: 'border-transparent text-[var(--color-muted)] hover:text-[var(--color-text)]'}"
				>
					{label}
				</button>
			{/each}
		</div>

	<!-- ── POENGSTILLING ── -->
	{#if selectedView === 'totalt'}
		<div class="flex items-start gap-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-muted)]">
			<svg class="mt-0.5 shrink-0 text-[var(--color-primary)]" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
				<circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor"/>
				<path d="M7.5 5V7.5M7.5 10V10.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
			</svg>
			<span>Topp 6 av 8 runder teller. Sammenlagtpremie: <strong class="text-[var(--color-primary)]">{calcPot(selectedDiv).toLocaleString('no-NO')} kr</strong></span>
		</div>
		<div class="overflow-x-auto rounded-xl border border-[var(--color-border)]">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
							<th class="sticky left-0 z-10 bg-[var(--color-surface-2)] w-10 px-4 py-3 text-left font-semibold text-[var(--color-text)]">#</th>
							<th class="sticky left-10 z-10 bg-[var(--color-surface-2)] px-4 py-3 text-left font-semibold text-[var(--color-text)] min-w-36">Navn</th>
							{#each data.rounds as round}
								<th class="px-3 py-3 text-center font-semibold text-[var(--color-text)] min-w-16">
									<div>R{round.roundNumber}</div>
									<div class="text-xs font-normal text-[var(--color-muted)]">{fmtDate(round.date)}</div>
								</th>
							{/each}
							<th class="px-4 py-3 text-center font-bold text-[var(--color-text)] min-w-20">Totalt</th>
						</tr>
					</thead>
					<tbody>
						{#each standings as player, i}
							{@const isPodium = player.position <= 3}
							{@const dropped = droppedIndices(player.roundPoints)}
							{@const computedTotal = player.roundPoints.reduce((sum: number, pts, ri) => (!dropped.has(ri) && pts != null) ? sum + pts : sum, 0)}
							<tr class="border-b border-[var(--color-border)] last:border-0 {isPodium ? podiumRowClass(player.position) : (i % 2 === 0 ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-surface-2)]/40')}">
								<td class="sticky left-0 z-10 px-4 py-3 text-center text-base {isPodium ? podiumStickyClass(player.position) : (i % 2 === 0 ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-surface-2)]')}">
									{medal(player.position)}
								</td>
								<td class="sticky left-10 z-10 px-4 py-3 {isPodium ? podiumNameClass(player.position) + ' ' + podiumNameStickyClass(player.position) : 'font-medium text-[var(--color-text)] ' + (i % 2 === 0 ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-surface-2)]')}">
									{player.name}
								</td>
								{#each player.roundPoints as pts, ri}
									<td class="px-3 py-3 text-center {dropped.has(ri) ? 'text-[var(--color-muted)] opacity-50' : pts != null ? 'text-[var(--color-text)]' : 'text-[var(--color-muted)]'}">
										{#if dropped.has(ri) && pts != null}
											<span class="line-through">({pts})</span>
										{:else}
											{pts ?? '–'}
										{/if}
									</td>
								{/each}
								<td class="px-4 py-3 text-center font-bold {isPodium ? 'text-[var(--color-primary)] text-base' : 'text-[var(--color-primary)]'}">{computedTotal}</td>
							</tr>
						{/each}
					</tbody>
				</table>
		</div>
		<p class="text-xs text-[var(--color-muted)]">Poengene er beregnet av Tjing. Vinneren av en runde får 100 poeng, øvrige proporsjonal under.</p>

	<!-- ── RUNDER ── -->
	{:else if selectedView === 'runder'}
		<div class="flex gap-1.5 overflow-x-auto pb-1">
			{#each data.rounds as round}
				<button
					onclick={() => selectedRound = round.roundNumber}
					class="shrink-0 flex flex-col items-center rounded-lg px-3 py-2 text-xs transition-colors {selectedRound === round.roundNumber
						? 'bg-[var(--color-primary)] text-white'
						: 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)]'}"
				>
					<span class="font-semibold">R{round.roundNumber}</span>
					<span class="opacity-80">{fmtDate(round.date)}</span>
				</button>
			{/each}
		</div>

		{#if roundDivision}
			{@const roundPrize = roundDivision.players.length * 30}
			<div class="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm">
				<div class="flex items-center gap-2 text-[var(--color-muted)]">
					<svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" class="shrink-0 text-[var(--color-primary)]">
						<path d="M3 2h9v5a4.5 4.5 0 0 1-9 0V2Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
						<path d="M7.5 11.5V13M5 13h5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
						<path d="M3 4H1.5a1.5 1.5 0 0 0 0 3H3M12 4h1.5a1.5 1.5 0 0 1 0 3H12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
					</svg>
					<span>Rundevinnerpremie</span>
				</div>
				<div class="text-right">
					<span class="font-bold text-[var(--color-primary)]">{roundPrize} kr</span>
					<p class="text-xs text-[var(--color-muted)]">{roundDivision.players.length} påmeldte × 30 kr · faktisk beløp kan avvike noe grunnet gebyrer</p>
				</div>
			</div>
			<div class="overflow-x-auto rounded-xl border border-[var(--color-border)]">
					<table class="w-full text-sm">
						<thead>
							<tr class="border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
								<th class="sticky left-0 z-10 bg-[var(--color-surface-2)] w-10 px-3 py-3 text-center font-semibold text-[var(--color-text)]">#</th>
								<th class="sticky left-10 z-10 bg-[var(--color-surface-2)] px-4 py-3 text-left font-semibold text-[var(--color-text)] min-w-36">Navn</th>
								{#each data.holePars as par, i}
									<th class="px-1.5 py-3 text-center min-w-11">
										<div class="font-semibold text-[var(--color-text)]">{i + 1}</div>
										<div class="text-xs font-normal text-[var(--color-muted)]">p{par}</div>
										<div class="text-xs font-normal text-[var(--color-muted)]">{data.holeMeters[i]}m</div>
									</th>
								{/each}
								<th class="px-3 py-3 text-center font-semibold text-[var(--color-text)] min-w-16">Total</th>
								<th class="px-3 py-3 text-center font-semibold text-[var(--color-text)] min-w-14">±par</th>
							</tr>
						</thead>
						<tbody>
							{#each roundDivision.players as player, i}
								{@const totalDiff = player.scores.reduce((acc, s, hi) => s != null ? acc + s - data.holePars[hi] : acc, 0)}
								<tr class="border-b border-[var(--color-border)] last:border-0 {i % 2 === 0 ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-surface-2)]/40'}">
									<td class="sticky left-0 z-10 px-3 py-2.5 font-semibold text-[var(--color-muted)] text-center {i % 2 === 0 ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-surface-2)]'}">{player.place}</td>
									<td class="sticky left-10 z-10 px-4 py-2.5 font-medium text-[var(--color-text)] {i % 2 === 0 ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-surface-2)]'}">{player.name}</td>
									{#each player.scores as score, hi}
										{@const diff = score != null ? score - data.holePars[hi] : null}
										<td class="px-1 py-2.5 text-center">
											{#if score != null && diff != null}
												<span class="inline-flex items-center justify-center w-7 h-7 rounded text-xs font-semibold score-{scoreClass(diff)}">
													{score}
												</span>
											{:else}
												<span class="text-[var(--color-muted)]">–</span>
											{/if}
										</td>
									{/each}
									<td class="px-3 py-2.5 text-center font-semibold text-[var(--color-text)]">{player.total}</td>
									<td class="px-3 py-2.5 text-center font-semibold {totalDiff < 0 ? 'text-[var(--color-primary)]' : totalDiff > 0 ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]'}">
										{fmtDiff(totalDiff)}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
			</div>

			<div class="flex flex-wrap gap-3 text-xs text-[var(--color-muted)]">
				<span class="flex items-center gap-1.5"><span class="inline-block w-4 h-4 rounded score-eagle"></span> Eagle</span>
				<span class="flex items-center gap-1.5"><span class="inline-block w-4 h-4 rounded score-birdie"></span> Birdie</span>
				<span class="flex items-center gap-1.5"><span class="inline-block w-4 h-4 rounded border border-[var(--color-border)] score-par"></span> Par</span>
				<span class="flex items-center gap-1.5"><span class="inline-block w-4 h-4 rounded score-bogey"></span> Bogey</span>
				<span class="flex items-center gap-1.5"><span class="inline-block w-4 h-4 rounded score-double"></span> Dobbelt bogey</span>
				<span class="flex items-center gap-1.5"><span class="inline-block w-4 h-4 rounded score-triple"></span> Triple+</span>
			</div>
		{:else}
			<div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-12 text-center text-[var(--color-muted)]">
				Ingen data for {selectedDiv} i runde {selectedRound}.
			</div>
		{/if}

	<!-- ── BANER ── -->
	{:else}
		<p class="text-xs text-[var(--color-muted)]">Rangert etter vanskelighet · Basert på alle scorer i {selectedDiv} over 8 runder</p>
		<div class="overflow-x-auto rounded-xl border border-[var(--color-border)]">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
						<th class="px-4 py-3 text-left font-semibold text-[var(--color-text)]">Hull</th>
						<th class="px-4 py-3 text-center font-semibold text-[var(--color-text)]">Par</th>
						<th class="px-4 py-3 text-center font-semibold text-[var(--color-text)]">Meter</th>
						<th class="px-4 py-3 text-center font-semibold text-[var(--color-text)]">Snittscor</th>
						<th class="px-4 py-3 text-center font-semibold text-[var(--color-text)]">±par</th>
						<th class="px-4 py-3 text-left font-semibold text-[var(--color-text)] min-w-48">Vanskelighet</th>
					</tr>
				</thead>
				<tbody>
					{#each sortedHoleStats as h, i}
						{@const isHard = (h.avgVsPar ?? 0) > 0}
						<tr class="border-b border-[var(--color-border)] last:border-0 {i % 2 === 0 ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-surface-2)]/40'}">
							<td class="px-4 py-3 font-semibold text-[var(--color-text)]">Hull {h.hole}</td>
							<td class="px-4 py-3 text-center text-[var(--color-muted)]">{h.par}</td>
							<td class="px-4 py-3 text-center text-[var(--color-muted)]">{h.meters} m</td>
							<td class="px-4 py-3 text-center font-medium text-[var(--color-text)]">
								{h.avg != null ? h.avg.toFixed(2) : '–'}
							</td>
							<td class="px-4 py-3 text-center font-semibold {isHard ? 'text-[var(--color-accent)]' : (h.avgVsPar ?? 0) < 0 ? 'text-[var(--color-primary)]' : 'text-[var(--color-muted)]'}">
								{h.avgVsPar != null ? (h.avgVsPar >= 0 ? '+' : '') + h.avgVsPar.toFixed(2) : '–'}
							</td>
							<td class="px-4 py-3">
								{#if h.avgVsPar != null}
									<div class="h-2 rounded-full bg-[var(--color-border)] overflow-hidden">
										<div
											class="h-full rounded-full transition-all {isHard ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-primary)]'}"
											style="width: {Math.min(100, Math.abs(h.avgVsPar) / maxAbsAvgVsPar * 100)}%"
										></div>
									</div>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}

	{/if}
</div>

<style>
	:global(.score-eagle)  { background: #3b82f6; color: white; }
	:global(.score-birdie) { background: var(--color-primary); color: white; }
	:global(.score-par)    { background: transparent; color: var(--color-text); }
	:global(.score-bogey)  { background: #fbbf24; color: #1a1a1a; }
	:global(.score-double) { background: #f97316; color: white; }
	:global(.score-triple) { background: #ef4444; color: white; }

	/* bogey text contrast in dark mode */
	@media (prefers-color-scheme: dark) {
		:global(:root:not([data-theme="light"]) .score-bogey) { color: var(--color-text); }
	}
	:global([data-theme="dark"] .score-bogey) { color: var(--color-text); }
</style>
