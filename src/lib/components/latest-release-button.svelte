<script lang="ts">
	let { directory, text = 'Installer dernière version pour Firefox' }: { directory: string; text?: string } = $props();

	let latestVersion = $state(null);
	let loading = $state(true);
	let error = $state<string | null>(null);

	let link = $derived(`/${directory}/releases/${latestVersion}.xpi`);

	async function fetchLatestVersion() {
		try {
			const response = await fetch(`/${directory}/updates.json`);
			const data = await response.json();

			// Get the first addon (assuming there's only one)
			const addonKey = Object.keys(data.addons)[0];
			const updates = data.addons[addonKey].updates;

			if (updates && updates.length > 0) {
				// Sort versions to get the latest
				const sortedUpdates = updates.sort((a: any, b: any) => {
					const aParts = a.version.split('.').map(Number);
					const bParts = b.version.split('.').map(Number);

					for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
						const aPart = aParts[i] || 0;
						const bPart = bParts[i] || 0;
						if (aPart !== bPart) {
							return bPart - aPart; // difference found
						}
					}
					return 0; //no difference found
				});

				latestVersion = sortedUpdates[0].version;
			}
		} catch (e) {
			error = e instanceof Error ? e.message : 'An unknown error occurred';
		} finally {
			loading = false;
		}
	}

	$effect(() => {
		fetchLatestVersion();
	});
</script>

{#if loading}
	<div>Loading...</div>
{:else if error}
	<div class="error">{error}</div>
{:else if !latestVersion}
	<div class="error">Aucune version trouvée</div>
{:else}
	<a href={link}>{text} (v{latestVersion})</a>
{/if}

<style>
	.error {
		color: red;
	}
</style>
