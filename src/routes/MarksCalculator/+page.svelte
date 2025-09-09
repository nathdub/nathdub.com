<script lang="ts">
	import MarksList from '$lib/components/marks-list.svelte';
	import type { Mark } from '$lib/types';

	// let numTestsInput = $state(1);

	let marks: Mark[] = $state([{ id: crypto.randomUUID(), note: '', weight: '' }]);

	function removeMark(mark: Mark) {
		const index = marks.findIndex((i) => i.id === mark.id);
		marks.splice(index, 1);
	}

	function addMark() {
		marks.push({ id: crypto.randomUUID(), note: '', weight: '' });
	}

	function fieldToFloat(input: string): number {
		let normalizedInput = input.replace(',', '.');

		if (normalizedInput.includes('%')) {
			const value = parseFloat(normalizedInput.replace('%', ''));
			return value / 100;
		}

		if (normalizedInput.includes('/')) {
			const parts = normalizedInput.split('/');
			const numerator = parseFloat(parts[0]);
			const denominator = parseFloat(parts[1]);
			if (denominator === 0) {
				return NaN;
			}
			return numerator / denominator;
		}

		return parseFloat(normalizedInput);
	}

	const regex = /^[0-9.,/%]+$/;

	let results = $derived.by<{
		minimalMarks: number;
		minimalMarksNormalized: number;
		remainingWeight: number;
		actualMean: number;
		actualMeanNormalized: number;
		worstPossibleMean: number;
		worstPossibleMeanNormalized: number;
		bestPossibleMean: number;
		bestPossibleMeanNormalized: number;
		errors: string[];
		warnings: string[];
		correctMarks: number;
	}>(() => {
		const errors = [];
		const warnings = [];
		let sumWeightedMarks = 0;
		let sumWeights = 0;
		let correctMarks = 0;
		for (const [index, mark] of marks.entries()) {
			if (mark.note === '' && mark.weight === '') {
				if (marks.length > 1) warnings.push(`La note ${index + 1} est vide, cette note sera ignorée`);
			} else if (mark.note && !regex.test(mark.note)) {
				errors.push(`La note entrée "${mark.note}" de la note ${index + 1} possède des caractères illégaux`);
			} else if (mark.weight && !regex.test(mark.weight)) {
				errors.push(`L'importance entrée "${mark.weight}" de la note ${index + 1} possède des caractères illégaux`);
			} else if (mark.note === '') {
				errors.push(`La note ${index + 1} n'a pas de note définie (associée à l'importance "${mark.weight}")`);
			} else if (mark.weight === '') {
				errors.push(`La note ${index + 1} n'a pas d'importance (associée à la note "${mark.note}")`);
			} else {
				correctMarks++;
				const note = fieldToFloat(mark.note);
				if (note > 1) {
					warnings.push(`La note "${mark.note}" de la note ${index + 1} est supérieure à 100%`);
				}
				const weight = fieldToFloat(mark.weight);
				sumWeightedMarks += weight * note;
				sumWeights += weight;
			}
		}

		let output;

		if (errors.length > 0) {
			output = {
				minimalMarks: 0,
				minimalMarksNormalized: 0,
				remainingWeight: 0,
				actualMean: 0,
				actualMeanNormalized: 0,
				worstPossibleMean: 0,
				worstPossibleMeanNormalized: 0,
				bestPossibleMean: 0,
				bestPossibleMeanNormalized: 0,
				correctMarks: 0,
				errors: errors,
				warnings: warnings
			};
		} else {
			if (sumWeights > 1) {
				warnings.push('La somme des importance est supérieure à 100%');
			}
			if (sumWeights === 1) {
				warnings.push("Tu as déjà 100% de l'importance, il ne devrait plus y avoir de tests restants");
			}

			output = {
				minimalMarks: ((0.5 - sumWeightedMarks) / (1 - sumWeights)) * 100,
				minimalMarksNormalized: ((0.5 - sumWeightedMarks) / (1 - sumWeights)) * 20,
				remainingWeight: (1 - sumWeights) * 100,
				actualMean: (sumWeightedMarks / sumWeights) * 100,
				actualMeanNormalized: (sumWeightedMarks / sumWeights) * 20,
				worstPossibleMean: sumWeightedMarks * 100,
				worstPossibleMeanNormalized: sumWeightedMarks * 20,
				bestPossibleMean: (sumWeightedMarks + (1 - sumWeights)) * 100,
				bestPossibleMeanNormalized: (sumWeightedMarks + (1 - sumWeights)) * 20,
				correctMarks: correctMarks,
				errors: errors,
				warnings: warnings
			};
		}

		return output;
	});
</script>

<h1>Marks Calculator</h1>

<div class="main-container">
	<div class="inputs">
		<MarksList {marks} {removeMark} />
		<button class="add-mark" onclick={addMark}>Ajouter une note</button>
	</div>

	<div class="output">
		{#if results.errors.length > 0}
			<div class="errors">
				<h2>Error</h2>
				{#each results.errors as error}
					<li class="error">{error}</li>
				{/each}
			</div>
		{:else}
			{#if results.warnings.length > 0}
				<div class="warnings">
					<h2>Warning</h2>
					{#each results.warnings as warning}
						<li class="warning">{warning}</li>
					{/each}
				</div>
			{/if}
			<div class="results">
				{#if results.correctMarks === 0}
					<p>Ajoute des notes pour voir les résultats</p>
				{:else}
					{#if results.minimalMarks <= 0}
						<p>GG mon reuf, tu peux signer que tu réussirais 🥳 (ps: je décline toute responsabilité néanmoins)</p>
					{:else if results.minimalMarks > 100}
						<p>Mon reuf, euh comment dire, j'ai bien peur que tu sois foutu 😅</p>
					{/if}
					<p><strong>Note minimale à obtenir pour réussir: {results.minimalMarks.toFixed(2)}% = {results.minimalMarksNormalized.toFixed(2)}/20</strong></p>
					<p>Cotation restante: {results.remainingWeight.toFixed(2)}%</p>
					<p>Moyenne actuelle: {results.actualMean.toFixed(2)}% = {results.actualMeanNormalized.toFixed(2)}/20</p>
					<p>Pire moyenne possible (tu signes tt en gros): {results.worstPossibleMean.toFixed(2)}% = {results.worstPossibleMeanNormalized.toFixed(2)}/20</p>
					<p>Meilleure moyenne possible: {results.bestPossibleMean.toFixed(2)}% = {results.bestPossibleMeanNormalized.toFixed(2)}/20</p>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.main-container {
		max-width: 50rem;
		margin: 0 auto;
	}

	.inputs {
		display: flex;
		flex-direction: column;
		max-width: 25rem;
		margin: 0 auto;
	}

	.add-mark {
		padding: 0.75rem;
		background: #4caf50;
		color: white;
		border: none;
		border-radius: 0.25rem;
		font-size: 1rem;
		cursor: pointer;
		margin-top: 0.5rem;
	}

	.add-mark:hover {
		background: #45a049;
	}

	.output {
		margin-top: 1rem;
	}

	.warnings,
	.errors {
		padding: 1rem;
		border-radius: 1rem;
	}

	.warnings h2,
	.errors h2 {
		font-weight: bold;
		margin: 0;
	}

	.warnings {
		color: yellow;
		background-color: grey;
		border: 0.25rem solid yellow;
	}

	.errors {
		color: red;
		background-color: grey;
		border: 0.25rem solid red;
	}

	li {
		margin: 0 1rem;
	}

	.results {
		padding: 1rem;
		border: 0.25rem black solid;
		border-radius: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.results p {
		margin: 0;
	}
</style>
