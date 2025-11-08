<script lang="ts">
	import FancyMessageDisplay from '$lib/components/fancy-message-display.svelte';

	let text = $state('');
	let font = $state('Arial');
	let color = $state('#000000');
	let size = $state(30);
	let leftMargin = $state(100);
	let topMargin = $state(0);
	let bold = $state(false);
	let italic = $state(false);
	let rainbow = $state(false);
	let animated = $state(false);

	function share() {
		const boldValue = bold ? 'bold' : 'normal';
		const italicValue = italic ? 'italic' : 'normal';
		const colorHex = color.slice(1); // Remove # from color

		const link = `https://nathdub.com/FancyMessage/m/?text=${encodeURIComponent(text)}&font=${font}&color=${colorHex}&size=${size}&leftMargin=${leftMargin}&topMargin=${topMargin}&bold=${boldValue}&italic=${italicValue}&rainbow=${rainbow}&animated=${animated}`;

		navigator.clipboard
			.writeText(link)
			.then(() => {
				alert('copied to clipboard');
			})
			.catch((err) => {
				console.error(err);
			});
	}

	$effect(() => {
		document.body.classList.add('fancymessage-theme');
		return () => document.body.classList.remove('fancymessage-theme');
	});
</script>

<h1>Fancy Message</h1>

<div class="controls">
	<div class="control-item">
		<textarea class="text-input" placeholder="message" bind:value={text}></textarea>
	</div>

	<div class="control-item">
		<select id="font-input" bind:value={font}>
			<option value="Arial">Arial</option>
			<option value="Verdana">Verdana</option>
			<option value="Trebuchet MS">Trebuchet MS</option>
			<option value="Times New Roman">Times New Roman</option>
			<option value="Courier New">Courier New</option>
		</select>
		<input type="color" class="color-input" bind:value={color} />
	</div>

	<div class="control-item">
		Font size : <input type="range" id="size-input" min="8" max="200" bind:value={size} />
		{size}
	</div>
	<div class="control-item">
		Left Margin : <input type="range" id="left-margin-input" min="0" max="500" bind:value={leftMargin} />
		{leftMargin}
	</div>
	<div class="control-item">
		Top Margin : <input type="range" id="top-margin-input" min="0" max="500" bind:value={topMargin} />
		{topMargin}
	</div>

	<div>
		<input type="checkbox" id="bold-checkbox" bind:checked={bold} /> Bold
	</div>
	<div>
		<input type="checkbox" id="italic-checkbox" bind:checked={italic} /> Italic
	</div>
	<div>
		<input type="checkbox" id="rainbow-checkbox" bind:checked={rainbow} /> Rainbow
	</div>
	<div>
		<input type="checkbox" id="animated-checkbox" bind:checked={animated} /> Animated
	</div>
</div>

<button id="share-button" onclick={share}>share</button>
<div id="display-properties"></div>
<hr />
<FancyMessageDisplay {text} {font} {color} {size} {leftMargin} {topMargin} {bold} {italic} {rainbow} {animated} />
<hr />
<div class="share"></div>

<style>
	:global(.fancymessage-theme) {
		--bg-color: white;
		--bg-color-2: rgb(233, 233, 233);
		--bg-color-3: rgb(214, 214, 214);
		--text-color: #131313;
	}

	.text-input {
		max-width: 100%;
		width: 50%;
		height: 3rem;
	}

	.control-item {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 0.3rem;
	}

	.color-input {
		padding: 0.3rem;
	}
</style>
