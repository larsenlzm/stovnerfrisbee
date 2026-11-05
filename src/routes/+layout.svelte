<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<Nav />
<!-- Forsiden slutter i et fullbredde bånd, så den får ikke luft før footeren -->
<main class="pt-[68px] {$page.url.pathname === '/' ? '' : 'pb-24'}">
	{@render children()}
</main>
<Footer />
