<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	// Arrangementssiden (nc.stovnerfrisbee.no) har sitt eget oppsett uten klubbmeny og footer
	const eventPage = $derived($page.route.id === '/norges-cup');
</script>

<!-- Standardbeskrivelse for klubbsidene; arrangementssiden setter sin egen -->
<svelte:head>
	{#if !eventPage}
		<meta name="description" content="Stovner Frisbeeklubb — En discgolfperle nord i Groruddalen siden 1985." />
	{/if}
</svelte:head>

{#if eventPage}
	{@render children()}
{:else}
<Nav />
<!-- Forsiden slutter i et fullbredde bånd, så den får ikke luft før footeren -->
<main class="pt-[68px] {$page.url.pathname === '/' ? '' : 'pb-24'}">
	{@render children()}
</main>
<Footer />
{/if}
