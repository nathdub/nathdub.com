<script lang="ts">
	import LatestReleaseButton from '$lib/components/latest-release-button.svelte';
	// @ts-ignore
	import Content from './content.svx';

	$effect(() => {
		document.body.classList.add('luciva-theme');
		return () => document.body.classList.remove('luciva-theme');
	});
</script>

<h1>Luciva - <a href="/Luciva/changelog/">📝Changelog</a></h1>
<h3>Luciva, l'extension de productivité n°1 (enfin celle de dub quoi). Dites aurevoir aux distractions !!!!</h3>
<h4>Toutes les fonctionnalités sont activables et désactivables séparément dans un menu (par défaut toutes désactivées)</h4>
<h2>Firefox</h2>
<LatestReleaseButton directory="Luciva" />
<div>
	<b>Pour télécharger sur Firefox il suffit d'appuyer sur le bouton ci-dessus</b>
</div>
<div>
	Pour l'instant seulement disponible pour firefox et aussi c'est directement hébergé sur nathdub.com pour pouvoir publier plus rapidement (ça prends moins de
	5min à avoir la signature de mozilla au lieu de plusieurs jours/semaines pour le mettre sur addons.mozilla.org)
</div>
<hr />
<Content />

<style>
	:global(.luciva-theme) {
		--bg-color: peachpuff;
		--bg-color-2: rgb(233, 233, 233);
		--bg-color-3: rgb(214, 214, 214);
		--accent-color: crimson;
		--home-link-color: #00ff41;
		--home-link-color: brown;
		--home-link-hover-color: red;
		--text-color: #131313;
		--nav-text-color: white;
		--nav-dub-color: white;
	}
</style>
