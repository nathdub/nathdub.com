<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let searchBox: HTMLTextAreaElement;
	let searchButton: HTMLButtonElement;
	let cursor: HTMLDivElement;

	let searchBoxValue = $state('');
	let cursorType = $state<'default' | 'ibeam' | 'pointer'>('default');
	let cursorX = $state(15);
	let cursorY = $state(75);

	function resizeTextArea() {
		if (!searchBox) return;
		const maxHeight = parseInt(window.getComputedStyle(searchBox).getPropertyValue('max-height').slice(0, -2));
		searchBox.style.height = 'auto';
		if (searchBox.scrollHeight > maxHeight) {
			searchBox.style.height = `${maxHeight}px`;
			searchBox.style.overflowY = 'scroll';
		} else {
			searchBox.style.height = `${searchBox.scrollHeight}px`;
			searchBox.style.overflowY = 'hidden';
		}
	}

	function moveCursor(element: HTMLElement): Promise<void> {
		return new Promise((resolve) => {
			const rect = element.getBoundingClientRect();
			const x = rect.left + rect.width / 2 + window.scrollX;
			const y = rect.top + rect.height / 2 + window.scrollY;

			cursorX = (x / window.innerWidth) * 100;
			cursorY = (y / window.innerHeight) * 100;

			setTimeout(resolve, 1000);
		});
	}

	function typeText(text: string): Promise<void> {
		return new Promise((resolve) => {
			let i = 0;
			const typingInterval = setInterval(() => {
				if (i < text.length) {
					searchBoxValue += text.charAt(i);
					i++;
					resizeTextArea();
				} else {
					clearInterval(typingInterval);
					resolve();
				}
			}, 100);
		});
	}

	async function startAnimation() {
		await new Promise((r) => setTimeout(r, 10)); // Wait 10ms for the navbar to disappear to have correct calculations

		await moveCursor(searchBox);
		cursorType = 'ibeam';

		await typeText(data.searchText);

		cursorType = 'default';
		await moveCursor(searchButton);
		cursorType = 'pointer';

		setTimeout(() => {
			const encodedQuery = encodeURIComponent(data.searchText);
			window.location.href = `https://www.google.com/search?q=${encodedQuery}`;
		}, 1000);
	}

	onMount(() => {
		resizeTextArea();
		if (!data.showcase) {
			startAnimation();
		}
	});

	$effect(() => {
		searchBoxValue;
		resizeTextArea();
	});

	$effect(() => {
		document.body.classList.add('no-nav');
		document.body.classList.add('google-theme');
		return () => {
			document.body.classList.remove('no-nav');
			document.body.classList.remove('google-theme');
		};
	});
</script>

<svelte:head>
	<title>Let Me Search This For You</title>
	{#if !data.showcase}
		<style>
			body {
				visibility: hidden;
			}
		</style>
	{/if}
</svelte:head>

<div class="navbar">
	<a class="nav-link" href="/">Home</a>
	<a class="nav-link" href="/changelog/">Changelog</a>
	<div class="navbar-right">
		<a class="nav-link" href="/">nathdub.com</a>
		<a class="nav-link" href="/LetMeSearchThisForYou/">Créer sa propre recherche</a>
		<div class="dots">
			<svg focusable="false" viewBox="0 0 24 24"
				><path
					d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"
				></path></svg
			>
		</div>
		<img class="profile-picture" src="/images/LetMeSearchThisForYou/profile.jpg" alt="Profile" />
	</div>
</div>

<div class="centered-content">
	<div class="div1">
		<div class="logo">
			<img id="logo" height="92" width="272" src="/images/LetMeSearchThisForYou/google.png" alt="Google" />
		</div>
	</div>

	<div class="div2">
		<div class="search-container-container">
			<div class="search-container">
				<div class="search-icon-container">
					<div class="search-icon left-icon">
						<svg height="20" width="20" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
							><path
								fill="#9aa0a6"
								d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
							></path></svg
						>
					</div>
				</div>

				<div class="search-area">
					<textarea class="search-box" id="search-box" rows="1" bind:this={searchBox} bind:value={searchBoxValue} readonly={!data.showcase}></textarea>
				</div>

				<div class="search-icon-container right-icon">
					<div class="search-icon">
						<svg height="24" width="24" focusable="false" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg"
							><path
								d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm-40 280v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Z"
							></path></svg
						>
					</div>
				</div>

				<div class="search-icon-container right-icon">
					<div class="search-icon">
						<svg height="24" width="24" class="Gdd5U" focusable="false" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg"
							><path
								d="M480-320q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm240 160q-33 0-56.5-23.5T640-240q0-33 23.5-56.5T720-320q33 0 56.5 23.5T800-240q0 33-23.5 56.5T720-160Zm-440 40q-66 0-113-47t-47-113v-80h80v80q0 33 23.5 56.5T280-200h200v80H280Zm480-320v-160q0-33-23.5-56.5T680-680H280q-33 0-56.5 23.5T200-600v120h-80v-120q0-66 47-113t113-47h80l40-80h160l40 80h80q66 0 113 47t47 113v160h-80Z"
							></path></svg
						>
					</div>
				</div>
			</div>

			<div class="search-buttons">
				<button id="search-button" bind:this={searchButton}>Recherche Google</button>
				<button id="lucky-button">J'ai de la chance</button>
			</div>
		</div>
	</div>
</div>

<div class="div3"></div>

<div class="footer1"></div>

<div class="footer2"></div>

{#if !data.showcase}
	<div id="cursor" bind:this={cursor} style:left="{cursorX}%" style:top="{cursorY}%">
		<img id="cursor-default" style:display={cursorType === 'default' ? 'block' : 'none'} src="/images/LetMeSearchThisForYou/cursor-default.svg" alt="Cursor" />
		<img id="cursor-ibeam" style:display={cursorType === 'ibeam' ? 'block' : 'none'} src="/images/LetMeSearchThisForYou/cursor-ibeam.svg" alt="Cursor" />
		<img id="cursor-pointer" style:display={cursorType === 'pointer' ? 'block' : 'none'} src="/images/LetMeSearchThisForYou/cursor-pointer.svg" alt="Cursor" />
	</div>
{/if}

<style>
	@font-face {
		font-family: 'Google Sans';
		font-style: normal;
		font-weight: 400 700;
		font-display: optional;
		src: url(//fonts.gstatic.com/s/googlesans/v29/4UaGrENHsxJlGDuGo1OIlL3Owp4.woff2) format('woff2');
		unicode-range:
			U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212,
			U+2215, U+FEFF, U+FFFD;
	}

	:global(.google-theme) {
		--bg-color: white;
		--text-color: #131313;
		--home-link-hover-color: black;
	}

	:global(body) {
		visibility: visible;
	}

	:global(html),
	:global(body) {
		height: 100%;
		margin: 0;
		font-family: Arial, sans-serif;
	}

	.navbar {
		display: flex;
		height: 60px;
		padding: 6px;
		box-sizing: border-box;
		align-items: center;
	}

	.nav-link {
		padding: 5px;
		margin: 0 5px;
	}

	.nav-link:first-of-type {
		margin-left: 15px;
	}

	a {
		text-decoration: none;
		color: black;
	}

	a:hover {
		text-decoration: underline;
	}

	.navbar-right {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.dots {
		height: 40px;
		width: 40px;
		padding: 8px;
		box-sizing: border-box;
	}

	.profile-picture {
		height: 40px;
		width: 40px;
		padding: 4px;
		box-sizing: border-box;
		border-radius: 50%;
	}

	.centered-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 80vh;
	}

	.div1 {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 50%;
		/* height: calc(100% - 560px); */
	}

	.div2 {
		display: flex;
		padding: 20px;
		flex-direction: column;
		align-items: center;
		height: 146px;
		/* height: 100%; */
	}

	.logo {
		margin-top: auto;
	}

	.search-container-container {
		margin: 0 auto;
		max-width: 584px;
		padding-top: 6px;
		position: relative;
	}

	.search-container {
		display: flex;
		position: relative;
		min-height: 50px;
		border-radius: 26px;
		border: 1px solid #dadce0;
		box-shadow: 0px 3px 10px 0px rgba(31, 31, 31, 0.08);
		width: 100%;
		background: white;
	}

	.search-container:hover {
		box-shadow: 0 2px 8px 1px rgba(64, 60, 67, 0.24);
	}

	.search-icon-container {
		display: flex;
		align-items: center;
		height: 50px;
		box-sizing: border-box;
	}

	.left-icon {
		padding-left: 13px;
		padding-right: 13px;
	}

	.right-icon {
		padding: 0 8px;
		flex: 0 0 auto;
	}

	.right-icon:last-of-type {
		padding-right: 15px;
	}

	.search-icon {
		margin: auto;
		display: flex;
		align-items: center;
	}

	.search-icon svg {
		fill: #474747;
	}

	.search-area {
		display: flex;
		flex: 1;
	}

	#search-box {
		background-color: transparent;
		border: none;
		outline: none;

		width: 450px;
		font-size: 16px;
		padding: 14px 0;
		min-height: 22px;
		max-height: 200px;

		resize: none;
		overflow-y: hidden;
		height: auto;
		box-sizing: border-box;

		font-family:
			Google Sans,
			Arial,
			sans-serif;
	}

	.search-buttons {
		display: flex;
		height: 70px;
		padding-top: 18px;
		justify-content: center;
	}

	.search-buttons button {
		background-color: #f8f9fa;
		cursor: pointer;
		font-size: 14px;
		height: 36px;
		min-width: 54px;
		border-radius: 4px;
		border: 1px solid #f8f9fa;
		padding: 0 16px;
		margin: 11px 4px;
		font-family: Arial, sans-serif;
	}

	.search-buttons button:hover {
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
		border: 1px solid #dadce0;
	}

	#cursor {
		position: fixed;
		z-index: 9999;
		pointer-events: none;
		transition: 1s ease-in-out;
	}

	#cursor-default {
		transform: scale(1.5);
	}

	#cursor-pointer {
		transform: scale(1.5);
	}

	#cursor-ibeam {
		transform: scale(1.5) translate(0%, -30%);
	}

	@media (max-width: 700px) {
		.navbar {
			padding: 4px;
		}

		.nav-link {
			font-size: 14px;
			padding: 3px;
			margin: 0 3px;
		}

		.nav-link:first-of-type {
			margin-left: 8px;
		}

		.profile-picture,
		.dots {
			height: 32px;
			width: 32px;
		}
	}

	@media (max-width: 620px) {
		.centered-content {
			transform: scale(0.9);
			transform-origin: top center;
		}
	}

	@media (max-width: 550px) {
		.centered-content {
			transform: scale(0.8);
		}

		.navbar .nav-link:not(:first-child):not(:last-child) {
			display: none;
		}
	}

	@media (max-width: 500px) {
		.centered-content {
			transform: scale(0.7);
		}
	}

	@media (max-width: 450px) {
		.centered-content {
			transform: scale(0.6);
		}
	}

	@media (max-width: 400px) {
		.centered-content {
			transform: scale(0.5);
		}
	}
</style>
