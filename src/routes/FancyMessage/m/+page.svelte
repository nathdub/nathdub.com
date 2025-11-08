<script lang="ts">
	import type { PageData } from './$types';
	import FancyMessageDisplay from '$lib/components/fancy-message-display.svelte';

	let { data }: { data: PageData } = $props();

	$effect(() => {
		document.body.classList.add('fancymessage-theme');
		return () => document.body.classList.remove('fancymessage-theme');
	});
</script>

<div id="back-link"><a href="/FancyMessage/">Fancy Message</a></div>

<FancyMessageDisplay
	text={data.text}
	font={data.font}
	color={data.color}
	size={data.size}
	leftMargin={data.leftMargin}
	topMargin={data.topMargin}
	bold={data.bold}
	italic={data.italic}
	rainbow={data.rainbow}
	animated={data.animated}
/>

<style>
	:global(.fancymessage-theme) {
		--bg-color: white;
		--bg-color-2: rgb(233, 233, 233);
		--bg-color-3: rgb(214, 214, 214);
		--text-color: #131313;
	}
</style>
