<script lang="ts">
	import type { SoundEntry } from '$lib/types';
	import SoundButton from '$lib/components/sound-button.svelte';

	const entries: SoundEntry[] = [
		{ sounds: 'bonjour-ici-dub.mp3', image: 'bonjour-ici-dub.gif' },
		{ sounds: 'eh-oui.mp3', image: 'eh-oui.gif' },
		{ sounds: 'dubitatif.mp3', image: 'dubitatif.gif' },
		{ sounds: 'foutus.mp3', image: 'foutus.jpg' },
		{
			sounds: [
				'flavio1.mp3',
				'flavio2.mp3',
				'flavio3.mp3',
				'flavio4.mp3',
				'flavio5.mp3',
				'flavio6.mp3',
				'flavio7.mp3',
				'flavio8.mp3',
				'flavio9.mp3',
				'flavio10.mp3',
				'flavio11.mp3',
				'flavio12.mp3',
				'flavio13.mp3',
				'flavio14.mp3',
				'flavio15.mp3',
				'flavio16.mp3',
				'flavio17.mp3',
				'flavio18.mp3'
			],
			image: 'flavio.webp'
		},
		{ sounds: 'dog.m4a', image: 'dog.png' },
		{ sounds: 'apple-pay.m4a', image: 'apple-pay.png' },
		{ sounds: ['0.wav', '1.wav', '2.wav', '3.wav', '4.wav', '5.wav', '6.wav', '7.wav', '8.wav', '9.wav'], image: 'numbers.jpg' },
		{ sounds: 'doorstuck.m4a', image: 'doorstuck.png' },
		{ sounds: 'letsgo.m4a', image: 'letsgo.jpg' },
		{ sounds: 'nintendo64.m4a', image: 'nintendo64.jpg' },
		{ sounds: 'ohlavache.m4a', image: 'ohlavache.png' },
		{ sounds: 'okipullup.m4a', image: 'okipullup.jpg' },
		{ sounds: 'wilhelm.m4a', image: 'wilhelm.webp' },
		{ sounds: 'among-us.opus', image: 'among-us.webp' },
		{ sounds: 'metal-pipe.opus', image: 'metal-pipe.webp' },
		{ sounds: 'tooning.opus', image: 'tooning.webp' },
		{ sounds: 'pufferfish.opus', image: 'pufferfish.jpg' },
		{ sounds: 'oof.opus', image: 'oof.jpg' },
		{ sounds: 'minecraft-damage.opus', image: 'minecraft-damage.png' },
		{ sounds: 'refrigirators.opus', image: 'refrigirators.jpg' },
		{ sounds: 'stop-it-get-some-help.opus', image: 'stop-it-get-some-help.png' },
		{ sounds: 'sleep.opus', image: 'sleep.png' },
		{ sounds: 'borgir.opus', image: 'borgir.jpg' }
	];
</script>

<h1>Sound Board</h1>

<div class="button-container">
	{#each entries as entry}
		<SoundButton {entry}/>
	{/each}

</div>

<style>
	.button-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}
</style>
