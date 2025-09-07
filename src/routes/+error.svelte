<script>
	import { page } from '$app/stores';
</script>

<div class="error-page">
	{#if $page.status === 404}
		<h1>404 - Page Not Found</h1>
		<img src="/images/404.png" alt="dub 404" />
	{:else}
		<h1>{$page.status}</h1>
		<p>{$page.error?.message}</p>
	{/if}
</div>

<style>
	.error-page {
		text-align: center;
	}

	h1 {
		font-size: 4rem;
	}
</style>
