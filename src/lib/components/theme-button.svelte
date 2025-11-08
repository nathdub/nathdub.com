<script lang="ts">
	import { theme, setTheme, type Theme } from '$lib/stores/theme';

	const themes: { value: Theme; label: string; icon: string }[] = [
		{ value: 'light', label: 'Light', icon: '☀️' },
		{ value: 'dark', label: 'Dark', icon: '🌙' },
		{ value: 'system', label: 'System', icon: '⚙️' },
		{ value: 'matrix', label: 'Matrix', icon: '👨🏼‍💻' }
	];

	let isOpen = $state(false);

	function selectTheme(selectedTheme: Theme) {
		setTheme(selectedTheme);
		isOpen = false;
	}

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function closeDropdown() {
		isOpen = false;
	}

	const currentThemeData = $derived(themes.find((t) => t.value === $theme) || themes[2]);
</script>

<div class="theme-selector">
	<button class="theme-button" onclick={toggleDropdown} aria-label="Select theme">
		{currentThemeData.icon}
	</button>

	{#if isOpen}
		<div class="dropdown">
			{#each themes as themeOption}
				<button class="dropdown-item" class:active={themeOption.value === $theme} onclick={() => selectTheme(themeOption.value)}>
					<span class="icon">{themeOption.icon}</span>
					<span class="label">{themeOption.label}</span>
				</button>
			{/each}
		</div>
		<div
			class="backdrop"
			onclick={closeDropdown}
			onkeydown={(e) => e.key === 'Escape' && closeDropdown()}
			role="button"
			tabindex="-1"
			aria-label="Close theme selector"
		></div>
	{/if}
</div>

<style>
	.theme-selector {
		position: relative;
		display: inline-block;
	}

	.theme-button {
		background: none;
		border: none;
		cursor: pointer;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 150%;
		padding: 0;
	}

	.theme-button:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.dropdown {
		position: absolute;
		right: 0;
		background: var(--bg-color-2);
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		z-index: 1000;
		min-width: 140px;
		overflow: hidden;
	}

	.dropdown-item {
		width: 100%;
		padding: 0.4rem;
		border: none;
		background: var(--bg-color-2);
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.dropdown-item:hover {
		background-color: var(--bg-color-3);
		color: var(--text-color);
	}

	.dropdown-item.active {
		background-color: var(--accent-color);
		color: var(--blue-color);
	}

	.label {
		color: var(--text-color);
	}

	.dropdown-item.active .label {
		color: var(--nav-text-color);
		font-weight: 500;
	}

	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 999;
	}
</style>
