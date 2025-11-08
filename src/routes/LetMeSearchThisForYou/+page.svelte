<script lang="ts">
	let searchText = $state('');
	let generatedLink = $state('https://nathdub.com/LetMeSearchThisForYou/search/?showcase=1');

	function generateLink() {
		generatedLink = `https://nathdub.com/LetMeSearchThisForYou/search/?q=${encodeURIComponent(searchText)}`;
	}

	function copyLink() {
		navigator.clipboard
			.writeText(generatedLink)
			.then(() => {
				alert('copied to clipboard');
			})
			.catch((err) => {
				console.error(err);
			});
	}
</script>

<h1>Let Me Search This For You</h1>
<h3>
	Envoyez ça à vos potes quand ils vous demandent une question où la réponse peut facilement être
	trouvée en faisant une simple recherche Google. Voilà, c'est de l'ironie, c'est bon enfant, on
	s'amuse, on rigole. Le gars reçoit ça et il se dit "olala il a raison, la réponse peut vraiment
	facilement être trouvée, désolé le goat de t'avoir dérangé avec ça et hahaha très drôle ce site
	fait par NATHDUB.
</h3>

<div>
	oui je sais cette page est moche, c'est temporaire (tout le budget est parti pour faire une page
	google très ressemblante)
</div>
<select id="search-engine">
	<option>Google</option>
</select>
<textarea id="search-field" placeholder="chose à rechercher" bind:value={searchText}></textarea>
<br />
<button id="generate-button" onclick={generateLink}>Générer lien</button>
<div>
	<a id="link-display" href={generatedLink}>{generatedLink}</a>
</div>
<button id="share-button" onclick={copyLink}>Copier lien</button>
<br />

<br />
<a href="/LetMeSearchThisForYou/search/?showcase=1">Google showcase</a>
