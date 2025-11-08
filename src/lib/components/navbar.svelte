<script lang="ts">
	import ThemeButton from './theme-button.svelte';
	import Version from './version.svelte';
</script>

<header>
	<nav>
		<a class="nav-link" href="/">Home</a>
		<a class="nav-link" href="/changelog/">Changelog</a>
		<a class="nav-link" href="https://forms.gle/hP9qgyb9x2j5U38PA">Feedback</a>
	</nav>
	<div class="header-right">
		<ThemeButton />
		<span class="dub-version">
			<Version />
		</span>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		background-color: var(--accent-color);
		padding: 0.4rem 1rem;
		align-items: center;
		transition: 0.3s;
	}

	.header-right {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-shrink: 1;
		min-width: 0;
	}

	nav {
		display: flex;
		gap: 1rem;
		flex-shrink: 1;
		min-width: 0;
	}

	.nav-link {
		color: var(--nav-text-color);
		text-decoration: none;
	}

	.nav-link:hover {
		color: var(--nav-text-hover-color);
	}

	.dub-version {
		color: var(--nav-dub-color);
		font-family: monospace;
		font-size: 1rem;
		display: flex;
		flex-shrink: 1;
		min-width: 0;
		max-width: 100%;
	}

	/* @media (max-width: 435px) {
		.dub-version {
			font-size: 13px;
		}
	}

	@media (max-width: 410px) {
		nav {
			gap: 0.5rem;
		}
	}

	@media (max-width: 390px) {
		header {
			padding: 0.4rem 0.5rem;
		}
	}

	@media (max-width: 360px) {
		.dub-version {
			font-size: 10px;
		}
	} */
</style>
