<script lang="ts">
import type { DigitSymbol } from "$lib/types";

	const trans: Record<DigitSymbol, string[]> = {
		'': [],
		'0': ['a', 'b', 'c', 'e', 'f', 'g'],
		'1': ['c', 'f'],
		'2': ['a', 'c', 'd', 'e', 'g'],
		'3': ['a', 'c', 'd', 'f', 'g'],
		'4': ['b', 'c', 'd', 'f'],
		'5': ['a', 'b', 'd', 'f', 'g'],
		'6': ['a', 'b', 'd', 'e', 'f', 'g'],
		'7': ['a', 'c', 'f'],
		'8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
		'9': ['a', 'b', 'c', 'd', 'f', 'g'],
		E: ['a', 'b', 'd', 'e', 'g'],
		R: ['e', 'd'],
		O: ['d', 'e', 'f', 'g'],
		all: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'dot'],
		i: ['f'],
		o: ['d', 'e', 'f', 'g']
	};

	let { value, hideDot = false, dot }: { value: DigitSymbol; hideDot?: boolean; dot: boolean } = $props();

	let segments = $derived.by(() => {
		let segs = { a: false, b: false, c: false, d: false, e: false, f: false, g: false, dot: false };

		for (const seg of trans[value]) {
			segs[seg as keyof typeof segs] = true;
		}

		if (dot) segs['dot'] = true;
		return segs;
	});
</script>

<div class="digit">
	<span class:on={segments.a} class="segment a"></span>
	<span class:on={segments.b} class="segment b"></span>
	<span class:on={segments.c} class="segment c"></span>
	<span class:on={segments.d} class="segment d"></span>
	<span class:on={segments.e} class="segment e"></span>
	<span class:on={segments.f} class="segment f"></span>
	<span class:on={segments.g} class="segment g"></span>
	{#if !hideDot}
		<span class:on={segments.dot} class="segment dot"></span>
	{/if}
</div>

<style>
	.segment {
		position: absolute;
		background-color: rgb(60, 0, 0);
	}

	.segment.on {
		background-color: red;
		/* box-shadow: 0 0 4px 2px red; */
		/* filter: drop-shadow(0 0 3px red);  */
		z-index: 1;
	}

	.digit {
		width: 10%;
		height: 100%;
		position: relative;
	}

	.segment.a {
		top: 8%;
		left: 25%;
		width: 62%;
		height: 9%;
		transform: skewX(-8deg);
		clip-path: polygon(0% 0%, 100% 0%, 78% 100%, 22% 100%);
	}
	.segment.b {
		top: 10%;
		left: 18%;
		width: 13%;
		height: 40%;
		rotate: 8deg;
		clip-path: polygon(0% 0%, 100% 20%, 100% 80%, 0% 100%);
	}
	.segment.c {
		top: 10%;
		right: 14%;
		width: 13%;
		height: 40%;
		rotate: 8deg;
		clip-path: polygon(100% 0%, 0% 24%, 0% 84%, 100% 97%);
	}
	.segment.d {
		top: 46%;
		left: 18%;
		width: 60%;
		height: 9%;
		transform: skewX(-8deg);
		clip-path: polygon(0% 50%, 15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%);
	}
	.segment.e {
		bottom: 8%;
		left: 10%;
		width: 13%;
		height: 40%;
		rotate: 8deg;
		clip-path: polygon(0% 0%, 100% 14%, 100% 75%, 0% 100%);
	}
	.segment.f {
		bottom: 9%;
		right: 22%;
		width: 13%;
		height: 40%;
		rotate: 8deg;
		clip-path: polygon(100% 0%, 0% 20%, 0% 80%, 100% 97%);
	}
	.segment.g {
		bottom: 7%;
		left: 11%;
		width: 62%;
		height: 9%;
		transform: skewX(-8deg);
		clip-path: polygon(0% 100%, 100% 100%, 77% 0%, 22% 0%);
	}
	.segment.dot {
		bottom: 5%;
		right: 1.5%;
		width: 15%;
		aspect-ratio: 1;
		clip-path: circle();
	}
</style>
