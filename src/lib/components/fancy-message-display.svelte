<script lang="ts">
	interface Props {
		text: string;
		font: string;
		color: string;
		size: number;
		leftMargin: number;
		topMargin: number;
		bold: boolean | string;
		italic: boolean | string;
		rainbow: boolean;
		animated: boolean;
	}

	let { text, font, color, size, leftMargin, topMargin, bold, italic, rainbow, animated }: Props = $props();

	// in the preview : boolean
	// in the /m page : string
	let fontWeight = $derived(typeof bold === 'boolean' ? (bold ? 'bold' : 'normal') : bold);
	let fontStyle = $derived(typeof italic === 'boolean' ? (italic ? 'italic' : 'normal') : italic);
</script>

<div
	id="display"
	style:font-family={font}
	style:color={rainbow ? 'transparent' : color}
	style:font-size="{size}px"
	style:margin-left="{leftMargin}px"
	style:margin-top="{topMargin}px"
	style:font-weight={fontWeight}
	style:font-style={fontStyle}
	class:rainbow
	class:animated
>
	{text}
</div>

<style>
	.rainbow {
		background: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red, violet, indigo, blue, green, yellow, orange, red, violet);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
		animation: rainbow-animation 1s linear infinite;
		background-size: 200% 100%;
	}

	@keyframes rainbow-animation {
		0% {
			background-position: 0%;
		}
		100% {
			background-position: 100%;
		}
	}

	.animated {
		animation: animation-a 2s linear infinite;
	}

	@keyframes animation-a {
		0%,
		50%,
		100% {
			transform: rotate(0);
		}
		25% {
			transform: rotate(-25deg) scale(1.5);
		}
		75% {
			transform: rotate(25deg) scale(1.5);
		}
	}

	#display {
		padding: 0;
		display: inline-block;
	}
</style>
