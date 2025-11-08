<script lang="ts">
	import { onMount } from 'svelte';

	import changelogRaw from '../../changelog.svx?raw';

	let version = $state(changelogRaw.split('\n')[0].split(' ')[1]);
	let containerElement = $state<HTMLDivElement | null>(null);
	let fullTextElement = $state<HTMLSpanElement | null>(null);
	let showFullVersion = $state(true);

	// Check if content overflows and adjust display
	function checkOverflow() {
		if (!containerElement || !fullTextElement) return;

		const containerWidth = containerElement.clientWidth;
		const fullTextWidth = fullTextElement.scrollWidth;

		showFullVersion = fullTextWidth <= containerWidth;
	}

	onMount(() => {
		if (!containerElement) return;

		// Initial check
		checkOverflow();

		// Watch for size changes
		const resizeObserver = new ResizeObserver(() => {
			checkOverflow();
		});

		resizeObserver.observe(containerElement);

		return () => {
			resizeObserver.disconnect();
		};
	});
</script>

<div bind:this={containerElement} class="version-container">
	<span class="version-text">
		{#if showFullVersion}
			nathdub.com - {version}
		{:else}
			{version}
		{/if}
	</span>
	<span bind:this={fullTextElement} class="version-text-hidden" aria-hidden="true">
		nathdub.com - {version}
	</span>
</div>

<style>
	.version-container {
		display: inline-block;
		white-space: nowrap;
		max-width: 100%;
		position: relative;
	}

	.version-text {
		display: inline-block;
		white-space: nowrap;
	}

	.version-text-hidden {
		position: fixed;
		visibility: hidden;
		white-space: nowrap;
		pointer-events: none;
		top: -9999px;
		left: -9999px;
	}
</style>
