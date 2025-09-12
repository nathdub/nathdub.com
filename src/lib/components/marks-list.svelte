<script lang="ts">
	import type { Mark } from '$lib/types';

	let {
		marks,
		removeMark
	}: {
		marks: Mark[];
		removeMark: (mark: Mark) => void;
	} = $props();
</script>

<div class="mark-container">
	{#each marks as mark}
		<article>
			<input type="text" placeholder="note" bind:value={mark.note} />
			<input type="text" placeholder="importance" bind:value={mark.weight} />
			<button disabled={marks.length === 1} onclick={() => removeMark(mark)}>retirer</button>
		</article>
	{/each}
</div>

<style>
	article {
		display: flex;
		gap: 0.5rem;
		width: 100%;
	}

	input {
		flex: 1;
		min-width: 0;
		padding: 0.5rem;
		border: 1px solid var(--border-color);
		border-radius: 0.25rem;
		font-size: 1rem;
	}

	button {
		flex-shrink: 0; /* empeche de shrink */
		min-width: 4rem;
		padding: 0.5rem;
		background: var(--red-color);
		color: var(--text-inv-color);
		border: none;
		border-radius: 0.25rem;
		font-size: 1rem;
		cursor: pointer;
	}

	button:hover:not(:disabled) {
		background: var(--red-hover-color);
	}

	button:disabled {
		background: var(--field-disabled-color);
		cursor: not-allowed;
	}

	.mark-container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.5rem;
	}
</style>
