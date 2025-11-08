<script lang="ts">
	import { onMount } from 'svelte';

	type Tool = 'brush' | 'eraser' | 'rainbow' | 'epileptic1' | 'epileptic2' | 'glow' | 'random';
	type BackgroundType = 'plain' | 'transparent' | 'dog' | 'custom';

	let canvasElement: HTMLDivElement;
	let customFileInput: HTMLInputElement;

	// State
	let squarePixels = $state(true);
	let gridHeight = $state(24);
	let gridWidth = $state(24);
	let tool = $state<Tool>('brush');
	let brushColor = $state('#7d007d');
	let canvasColor = $state('#e6e6fa');
	let pixelGrid = $state(false);
	let canvasBorder = $state(false);
	let backgroundType = $state<BackgroundType>('plain');
	let randomHue = $state(5);
	let randomSat = $state(30);
	let randomLight = $state(30);
	let customBackgroundUrl = $state<string | null>(null);

	let isDrawing = $state(false);
	let pixels: HTMLDivElement[] = [];
	let epileptic: Array<[HTMLDivElement, boolean]> = [];

	// Color conversion functions
	function hexToHSL(hex: string): [number, number, number] {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

		if (!result) {
			throw new Error('Could not parse Hex Color');
		}

		const rHex = parseInt(result[1], 16);
		const gHex = parseInt(result[2], 16);
		const bHex = parseInt(result[3], 16);

		const r = rHex / 255;
		const g = gHex / 255;
		const b = bHex / 255;

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);

		let h = (max + min) / 2;
		let s = h;
		let l = h;

		if (max === min) {
			return [0, 0, Math.round(l * 100)];
		}

		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;

		s = s * 100;
		s = Math.round(s);
		l = l * 100;
		l = Math.round(l);
		h = Math.round(360 * h);

		return [h, s, l];
	}

	function HSLToHex(h: number, s: number, l: number): string {
		const hDecimal = l / 100;
		const a = (s * Math.min(hDecimal, 1 - hDecimal)) / 100;
		const f = (n: number) => {
			const k = (n + h / 30) % 12;
			const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
			return Math.round(255 * color)
				.toString(16)
				.padStart(2, '0');
		};
		return `#${f(0)}${f(8)}${f(4)}`;
	}

	function createGrid() {
		const width = gridWidth;
		const height = gridHeight;

		const line = `<div class="line">${'<div class="pixel"></div>'.repeat(width)}</div>`;
		canvasElement.innerHTML = line.repeat(height);

		pixels = Array.from(canvasElement.querySelectorAll('.pixel'));

		pixels.forEach((pixel) => {
			pixel.addEventListener('mousedown', (event) => {
				event.preventDefault();
				alterPixel(pixel);
			});

			pixel.addEventListener('mouseover', () => {
				if (isDrawing) alterPixel(pixel);
			});
		});

		epileptic = [];
		updatePixelGrid();
	}

	function alterPixel(pixel: HTMLDivElement) {
		pixel.classList.remove('rainbow');
		pixel.classList.remove('epileptic1');
		pixel.classList.remove('epileptic2');
		pixel.style.boxShadow = 'none';
		pixel.style.zIndex = '0';

		epileptic = epileptic.filter((item) => item[0] !== pixel);

		switch (tool) {
			case 'brush':
				pixel.style.backgroundColor = brushColor;
				break;

			case 'eraser':
				pixel.style.backgroundColor = 'transparent';
				break;

			case 'rainbow':
				setTimeout(function () {
					pixel.classList.add('rainbow');
				}, 1);
				break;

			case 'epileptic1':
				epileptic.push([pixel, false]);
				epilepticAnimation();
				break;

			case 'epileptic2':
				epileptic.push([pixel, true]);
				epilepticAnimation();
				break;

			case 'glow':
				pixel.style.backgroundColor = brushColor;
				pixel.style.boxShadow = `0 0 50px 10px ${brushColor}`;
				pixel.style.zIndex = '1';
				break;

			case 'random':
				let [H, S, L] = hexToHSL(brushColor);

				let hue = randomHue;
				let sat = randomSat;
				let light = randomLight;

				let rangeH = (359 * hue) / 100;
				let rangeS = (100 * sat) / 100;
				let rangeL = (100 * light) / 100;

				H = Math.round(H * (1 - hue / 100)) + Math.round(Math.random() * rangeH);
				H = H > 359 ? 359 : H;
				S = Math.round(S * (1 - sat / 100)) + Math.round(Math.random() * rangeS);
				S = S > 100 ? 100 : S;
				L = Math.round(L * (1 - light / 100)) + Math.round(Math.random() * rangeL);
				L = L > 100 ? 100 : L;

				pixel.style.backgroundColor = HSLToHex(H, S, L);
				break;
		}
	}

	function updatePixelGrid() {
		pixels.forEach((pixel) => {
			pixel.style.border = pixelGrid ? '1px solid black' : 'none';
		});
	}

	function epilepticAnimation() {
		epileptic.forEach(([pixel, delay]) => {
			pixel.classList.remove('epileptic1');
			pixel.classList.remove('epileptic2');
		});
		setTimeout(function () {
			epileptic.forEach(([pixel, delay]) => {
				!delay ? pixel.classList.add('epileptic1') : pixel.classList.add('epileptic2');
			});
		}, 1);
	}

	function handleCustomBackground() {
		const file = customFileInput.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				customBackgroundUrl = e.target?.result as string;
			};
			reader.readAsDataURL(file);
		} else {
			alert('Select an image');
			customBackgroundUrl = null;
		}
	}

	function handleGridHeightChange() {
		if (squarePixels) {
			gridWidth = gridHeight;
		}
		createGrid();
	}

	function handleGridWidthChange() {
		if (squarePixels) {
			gridHeight = gridWidth;
		}
		createGrid();
	}

	function handleSquarePixelsChange() {
		if (squarePixels && gridHeight !== gridWidth) {
			gridWidth = gridHeight;
			createGrid();
		}
	}

	let backgroundImage = $derived.by(() => {
		switch (backgroundType) {
			case 'plain':
				return 'none';
			case 'transparent':
				return 'url("/images/CrazyPaint/transparent.png")';
			case 'dog':
				return 'url("/images/CrazyPaint/dog.png")';
			case 'custom':
				return customBackgroundUrl ? `url("${customBackgroundUrl}")` : 'none';
			default:
				return 'none';
		}
	});

	onMount(() => {
		createGrid();

		const handleMouseDown = () => (isDrawing = true);
		const handleMouseUp = () => (isDrawing = false);

		document.addEventListener('mousedown', handleMouseDown);
		document.addEventListener('mouseup', handleMouseUp);

		return () => {
			document.removeEventListener('mousedown', handleMouseDown);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	});

	$effect(() => {
		if (pixels.length > 0) {
			updatePixelGrid();
		}
	});

	$effect(() => {
		if (backgroundType === 'custom') {
			handleCustomBackground();
		}
	});
</script>

<h1>Crazy Paint</h1>

<div
	id="canvas"
	bind:this={canvasElement}
	style:background-color={canvasColor}
	style:background-image={backgroundImage}
	style:border={canvasBorder ? '0.7rem solid var(--text-color)' : '0.7rem solid var(--bg-color)'}
></div>

<div class="controls-container">
	<div class="controls">
		<div class="control-item">
			<input type="checkbox" id="square-pixels" bind:checked={squarePixels} onchange={handleSquarePixelsChange} />
			<label for="square-pixels">Square Pixels</label> <br />
		</div>

		<div class="control-item">
			<label for="grid-height">Pixels in Height</label>
			<input type="range" id="grid-height" min="2" max="100" bind:value={gridHeight} onchange={handleGridHeightChange} />
			<input type="number" id="grid-height-display" min="2" max="100" bind:value={gridHeight} onchange={handleGridHeightChange} class="range-display" />
		</div>

		<div class="control-item">
			<label for="grid-width">Pixels in Width</label>
			<input type="range" id="grid-width" min="2" max="100" bind:value={gridWidth} onchange={handleGridWidthChange} />
			<input type="number" id="grid-width-display" min="2" max="100" bind:value={gridWidth} onchange={handleGridWidthChange} class="range-display" />
		</div>

		<div class="control-item">
			<label for="background-type">Background Type</label>
			<select name="background-type" id="background-type" bind:value={backgroundType}>
				<option value="plain">Plain Color</option>
				<option value="transparent">Transparent Checkboard</option>
				<option value="dog">Dog</option>
				<option value="custom">Custom Image</option>
			</select>
		</div>

		<div class="control-item">
			<label for="custom-background">Custom Background Image</label>
			<input type="file" accept="image/png, image/jpeg" id="custom-background" bind:this={customFileInput} onchange={handleCustomBackground} /> <br />
		</div>

		<div class="control-item">
			<input type="color" id="canvas-color" bind:value={canvasColor} />
			<label for="canvas-color">canvas Color</label>
		</div>
		<div class="control-item">
			<button id="clear-canvas" onclick={createGrid}>Clear Canvas</button>
		</div>

		<div class="control-item">
			<input type="checkbox" id="pixel-grid" bind:checked={pixelGrid} />
			<label for="pixel-grid">Pixel Grid</label> <br />
		</div>
		<div class="control-item">
			<input type="checkbox" id="canvas-border" bind:checked={canvasBorder} />
			<label for="canvas-border">Canvas Border</label> <br />
		</div>
	</div>

	<div class="controls">
		<div class="control-item">
			<input type="color" id="brush-color" bind:value={brushColor} />
			<label for="brush-color">Brush Color</label>
		</div>

		<div class="control-item">
			<input type="radio" name="tool" id="brush-tool" value="brush" bind:group={tool} />
			<label for="brush-tool">Brush</label>
		</div>
		<div class="control-item">
			<input type="radio" name="tool" id="eraser-tool" value="eraser" bind:group={tool} />
			<label for="eraser-tool">Eraser</label>
		</div>
		<div class="control-item">
			<input type="radio" name="tool" id="rainbow-tool" value="rainbow" bind:group={tool} />
			<label for="rainbow-tool">Rainbow</label>
		</div>
		<div class="control-item">
			<input type="radio" name="tool" id="epileptic1-tool" value="epileptic1" bind:group={tool} />
			<label for="epileptic1-tool">Epileptic 1</label>
			<input type="radio" name="tool" id="epileptic2-tool" value="epileptic2" bind:group={tool} />
			<label for="epileptic2-tool">Epileptic 2</label>
		</div>
		<div class="control-item">
			<input type="radio" name="tool" id="glow-tool" value="glow" bind:group={tool} />
			<label for="glow-tool">Glow Tool</label><br />
		</div>
		<div class="control-item">
			<input type="radio" name="tool" id="random-tool" value="random" bind:group={tool} />
			<label for="random-tool">Random Tool</label>
		</div>
		<div class="control-item">
			<input type="range" id="random-hue" min="0" max="100" bind:value={randomHue} />
			<label for="random-hue">Random Hue</label>
		</div>
		<div class="control-item">
			<input type="range" id="random-sat" min="0" max="100" bind:value={randomSat} />
			<label for="random-sat">Random Saturation</label>
		</div>
		<div class="control-item">
			<input type="range" id="random-light" min="0" max="100" bind:value={randomLight} />
			<label for="random-light">Random Lightness</label>
		</div>
	</div>
</div>

<style>
	.control-item {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	#canvas {
		display: flex;
		height: 500px;
		width: 500px;
		flex-direction: column;
		padding: 0;
		background-repeat: no-repeat;
		background-size: cover;
		margin: 0 auto;
	}

	:global(.line) {
		flex: 1;
		display: flex;
	}

	:global(.pixel) {
		flex: 1;
		box-sizing: border-box;
	}

	.range-display {
		width: 50px;
	}

	.controls-container {
		display: flex;
		gap: 50px;
		padding: 1rem;
		border: 0.1rem solid var(--border-color);
		width: fit-content;
		margin: 0 auto;
	}

	:global(.rainbow) {
		animation: rainbow 2s linear;
		animation-iteration-count: infinite;
	}

	:global(.epileptic1) {
		animation: epileptic1 0.1s linear;
		animation-iteration-count: infinite;
	}

	:global(.epileptic2) {
		animation: epileptic2 0.1s linear;
		animation-iteration-count: infinite;
	}

	@keyframes rainbow {
		0%,
		100% {
			background-color: rgb(255, 0, 0);
		}
		16.66% {
			background-color: rgb(255, 255, 0);
		}
		33.33% {
			background-color: rgb(0, 255, 0);
		}
		50% {
			background-color: rgb(0, 255, 255);
		}
		66.66% {
			background-color: rgb(0, 0, 255);
		}
		83.33% {
			background-color: rgb(255, 0, 255);
		}
	}

	@keyframes epileptic1 {
		0%,
		49.99%,
		100% {
			background-color: black;
		}
		50%,
		99.99% {
			background-color: white;
		}
	}
	@keyframes epileptic2 {
		0%,
		49.99%,
		100% {
			background-color: white;
		}
		50%,
		99.99% {
			background-color: black;
		}
	}
</style>
