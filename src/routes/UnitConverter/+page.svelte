<script lang="ts">
	import { unitCategories as baseCategories, type System} from '$lib/unit_systems';
	let unitCategories = $state(baseCategories);

	function computeBaseValue(system: System): number {
		let result = 0;
		for (const entry of system.unitEntries) {
			result += entry.value * entry.unit.ratio;
		}
		return result;
	}

	function updateSystemToValue(system: System, value: number): void {
		for (const entry of system.unitEntries.slice(0, -1)) {
			const x = value / entry.unit.ratio;
			entry.value = Math.floor(x);
			value -= entry.value * entry.unit.ratio;
		}
		const lastEntry = system.unitEntries.at(-1);
		if (lastEntry) {
			lastEntry.value = Math.round((value / lastEntry.unit.ratio) * 1e3) / 1e3;
		}
	}
</script>

{#each unitCategories as category}
	<h3>{category.name}</h3>
	<div class="container">
		{#each category.systems as system}
			<div class="row">
				<h4>{system.name}</h4>
				<button
					onclick={() => {
						updateSystemToValue(system, computeBaseValue(system));
					}}>Rearrange</button
				>
				<button
					onclick={() => {
						let baseValue = computeBaseValue(system);
						for (const sys of category.systems) {
							if (sys !== system) {
								updateSystemToValue(sys, baseValue);
							}
						}
					}}>Convert</button
				>
				<div class="units-list">
					{#each system.unitEntries as unitEntry}
						<div class="unit-input">
							<input type="number" id={`${system.name}-${unitEntry.unit.name}`} bind:value={unitEntry.value} />
							<label for={`${system.name}-${unitEntry.unit.name}`}>
								<span class="unit-name">{unitEntry.unit.name}</span>
							</label>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
{/each}

<style>
	.container {
		display: flex;
		gap: 2rem;
		border: 0.1rem solid var(--border-color);
		width: fit-content;
		padding: 1rem;
		margin: 0 auto;
	}

	.unit-input {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.unit-input label {
		min-width: 4rem;
	}

	.unit-input input {
		width: 8rem;
		padding: 0.25rem;
	}

	button {
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}
</style>
