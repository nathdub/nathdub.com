<script lang="ts">
	import favicon from '$lib/assets/dub.ico';
	import Navbar from '$lib/components/navbar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />

<main>
	{@render children?.()}
</main>

<style>
	:global(body) {
		font-family: sans-serif;
		margin: 0;
		background-color: white;
	}

	main {
		padding: 0 1rem;
	}
</style>
