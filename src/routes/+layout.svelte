<script lang="ts">
	import favicon from '$lib/assets/dub.ico';
	import Navbar from '$lib/components/navbar.svelte';
	import { initTheme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		initTheme();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script>
		// Apply theme immediately on page load to prevent flash
		(function () {
			const stored = localStorage.getItem('theme') || 'system';
			const root = document.documentElement;

			if (stored === 'system') {
				const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
				root.classList.add(prefersDark ? 'dark-theme' : 'light-theme');
			} else {
				root.classList.add(stored + '-theme');
			}
		})();
	</script>
</svelte:head>

<Navbar />

<main>
	{@render children?.()}
</main>

<style>
	@import "$lib/vars.css";

	:global(body) {
		font-family: sans-serif;
		margin: 0;
		background-color: var(--bg-color);
		color: var(--text-color);
		transition: 0.3s;
	}

	main {
		padding: 0 1rem;
	}
</style>
