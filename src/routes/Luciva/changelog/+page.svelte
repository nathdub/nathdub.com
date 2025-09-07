<script lang="ts">
	// @ts-ignore
	import Changelog from '../changelog.svx';

	$effect(() => {
		document.body.classList.add('luciva-theme');
		return () => document.body.classList.remove('luciva-theme');
	});
</script>

<h1>Luciva - Changelog</h1>

<Changelog />

<style>
	:global(body.luciva-theme header) {
		background-color: crimson;
	}

	:global(body.luciva-theme) {
		background-color: peachpuff;
	}
</style>
