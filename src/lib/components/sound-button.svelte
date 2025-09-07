<script lang="ts">
	import type { SoundEntry } from '$lib/types';
	import { onMount } from 'svelte';

	let { entry }: { entry: SoundEntry } = $props();
	let src = $derived(`/images/SoundBoard/${entry.image}`);
	let alt = $derived(entry.image.split('.')[0]);

	const soundURLPrefix = '/sounds/SoundBoard/';
	let audios: HTMLAudioElement[] = [];

	// SvelteKit runs code on the server first.
	// The 'window' object and browser APIs like Audio() don't exist there.
	// This check ensures the code only runs on the client (browser).
	onMount(() => {
		if (Array.isArray(entry.sounds)) {
			for (let sound of entry.sounds) {
				audios.push(new Audio(soundURLPrefix + sound));
			}
		} else {
			audios.push(new Audio(soundURLPrefix + entry.sounds));
		}
	});

	$inspect(audios);

	function onclick() {
		const index = Math.floor(Math.random() * audios.length)
		const audio = audios[index];
		const newAudio = audio.cloneNode() as HTMLAudioElement; // allows for multiple instances of the same audio
		newAudio.play();
	}
</script>

<button {onclick}>
	<img {src} {alt} />
</button>

<style>
	button {
		width: 6.5rem;
		height: 6.5rem;
		background-color: white;
		border: 0.15rem solid black;
		border-radius: 1rem;
		cursor: pointer;
		transition: transform 0.1s ease;
		overflow: hidden;
		padding: 0;
		box-sizing: border-box;
	}

	button img {
		width: 100%;
		height: 100%;
	}

	button:hover {
		/* border: 0.5rem solid black; */
		transform: scale(1.15);
	}

	button:active{
		transform: scale(0.95);
	}
</style>
