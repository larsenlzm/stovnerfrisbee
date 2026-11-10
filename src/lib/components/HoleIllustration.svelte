<script lang="ts">
	// Tegnet i samme stil som hullskiltene på banen, derfor egne farger som ikke følger temaet
	const trees = [
		[70, 200], [95, 180], [82, 228], [235, 150], [40, 380],
		[235, 400], [120, 60], [250, 60], [60, 440]
	];
	const markers = [
		{ n: 1, x: 196, y: 444 },
		{ n: 2, x: 208, y: 248 },
		{ n: 4, x: 226, y: 84 }
	];
</script>

<svg
	viewBox="0 0 320 480"
	class="block h-auto w-full overflow-hidden rounded-2xl"
	role="img"
	aria-label="Tegning av et hull sett ovenfra: utkastet nederst, discen der den landet, og kurven øverst"
>
	<rect width="320" height="480" fill="#E3EBB8" />
	<path d="M-10 300 C 60 280, 70 200, 40 120 S 60 20, 120 -10" fill="none" stroke="#F1EBC8" stroke-width="14" stroke-linecap="round" />

	<path d="M262 -5 L330 -5 L330 485 L278 485 L270 330 L284 200 Z" fill="#C4C6C8" />
	<text x="300" y="250" font-size="13" font-weight="700" fill="#2B2B2B" text-anchor="middle">OB</text>

	{#each trees as [x, y]}
		<g transform="translate({x} {y})">
			<circle r="17" fill="#6FB944" stroke="#5A9E36" stroke-width="1.5" />
			<circle cx="-5" cy="-5" r="7" fill="#8ACB5E" />
			<circle cx="6" cy="4" r="5" fill="#5FA83A" />
		</g>
	{/each}

	<path d="M160 420 C 165 360, 175 300, 182 245" fill="none" stroke="#1D1D1B" stroke-width="2.5" stroke-dasharray="7 6" />
	<path d="M182 245 C 186 200, 188 150, 189 108" fill="none" stroke="#1D1D1B" stroke-width="2" stroke-dasharray="2 6" />

	<rect x="150" y="420" width="22" height="42" rx="2" fill="#2F5D3A" stroke="#1D3A25" stroke-width="2" />
	<circle cx="182" cy="245" r="7" fill="#F2A65A" stroke="#1D1D1B" stroke-width="1.5" />

	<circle cx="190" cy="92" r="19" fill="#fff" stroke="#F5D90A" stroke-width="6" />
	<circle cx="190" cy="92" r="19" fill="none" stroke="#1D1D1B" stroke-width="1.2" />
	<g stroke="#1D1D1B" stroke-width="1.2">
		<line x1="190" y1="76" x2="190" y2="108" />
		<line x1="174" y1="92" x2="206" y2="92" />
		<line x1="179" y1="81" x2="201" y2="103" />
		<line x1="201" y1="81" x2="179" y2="103" />
	</g>
	<circle cx="190" cy="92" r="2.5" fill="#1D1D1B" />

	<!-- Tallene følger stegene i teksten og bruker klubbens grønn -->
	{#each markers as m}
		<circle cx={m.x} cy={m.y} r="12" fill="#1C6B42" />
		<text x={m.x} y={m.y + 4.5} font-size="13" font-weight="700" fill="#fff" text-anchor="middle">{m.n}</text>
	{/each}
</svg>
