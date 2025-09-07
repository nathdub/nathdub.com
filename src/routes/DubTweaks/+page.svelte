<script lang="ts">
	import LatestReleaseButton from '$lib/components/latest-release-button.svelte';
	// @ts-ignore
	import Content from './content.svx';
</script>

<h1>dub Tweaks - <a href="/DubTweaks/changelog/">📝Changelog</a></h1>
<h3>dub Tweaks, l'extension n°1 pour rendre les sites mieux (du dub tout craché finalement). Dites bonjour à une vie meilleure !!!!</h3>
<h4>Toutes les fonctionnalités sont activables et désactivables séparément dans un menu (par défaut toutes désactivées)</h4>
<h2>Firefox</h2>
<LatestReleaseButton directory="DubTweaks" />
<div>
	<b>Pour télécharger sur Firefox il suffit d'appuyer sur le bouton ci-dessus</b>
</div>
<div>
	Pour l'instant seulement disponible pour firefox et aussi c'est directement hébergé sur nathdub.com pour pouvoir publier plus rapidement (ça prends moins de
	5min à avoir la signature de mozilla au lieu de plusieurs jours/semaines pour le mettre sur addons.mozilla.org)
</div>
<hr />
<Content />
