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

	:global(input) {
		background-color: var(--bg-color);
		color: var(--text-color);
		border: 1px solid;
		border-color: var(--border-color);
	}
	
	:global(.text-input input) {
		padding: 0.5rem;
		font-size: 1rem;
		border-radius: 0.25rem;
	}
	
	:global(button) {
		padding: 0.5rem;
		border-radius: 0.25rem;
		font-size: 1rem;
		cursor: pointer;
		background-color: var(--bg-color);
		color: var(--text-color);
		border: 0.1rem solid var(--border-color);
	}
	
	:global(button:hover) {
		background-color: var(--bg-color-2);
	}
	
	:global(a) {
		color: var(--home-link-color);
	}

	:global(a:hover) {
		color: var(--home-link-hover-color);
	}
</style>
