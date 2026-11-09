<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	// Arrangementssiden (nc.stovnerfrisbee.no) har sitt eget oppsett uten klubbmeny og footer
	const eventPage = $derived($page.route.id === '/norges-cup');
</script>

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
