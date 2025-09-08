<header>
	<nav>
		<a class="nav-link" href="/">Home</a>
		<a class="nav-link" href="/changelog/">Changelog</a>
		<a class="nav-link" href="https://forms.gle/hP9qgyb9x2j5U38PA">Feedback</a>
	</nav>
	<span class="dub-version">nathdub.com - 3.0.0</span>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		background-color: teal;
		padding: 0.4rem 1rem;
		align-items: center;
	}

	nav {
		display: flex;
		gap: 1rem;
		flex-shrink: 1;
		min-width: 0;
	}

	.nav-link {
		color: white;
		text-decoration: none;
	}

	.nav-link:hover {
		color: yellow;
	}

	.dub-version {
		color: rgb(255, 137, 220);
		font-family: monospace;
		white-space: nowrap;
		font-size: 1rem;
	}

	@media (max-width: 435px) {
		.dub-version {
			font-size: 13px
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
	}
</style>
