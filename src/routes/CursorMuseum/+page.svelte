<script lang="ts">
	import dubCursor from '$lib/assets/dub.ico';
</script>

<h1>Cursor Museum</h1>
<div>Certains curseurs ne marchent pas sur Windows 🪟, c'est tout à fait normal. Normalement il marchent tous sur Linux 🐧.</div>

<div class="container">
	<div class="sub-container">
		<div class="cursor-display" style="cursor:alias;" id="cursorDiv">alias</div>
		<div class="cursor-display" style="cursor:all-scroll;" id="cursorDiv">all-scroll</div>
		<div class="cursor-display" style="cursor:auto;" id="cursorDiv">auto</div>
		<div class="cursor-display" style="cursor:cell;" id="cursorDiv">cell</div>
		<div class="cursor-display" style="cursor:col-resize;" id="cursorDiv">col-resize</div>
		<div class="cursor-display" style="cursor:context-menu;" id="cursorDiv">context-menu</div>
		<div class="cursor-display" style="cursor:copy;" id="cursorDiv">copy</div>
		<div class="cursor-display" style="cursor:crosshair;" id="cursorDiv">crosshair</div>
		<div class="cursor-display" style="cursor:default;" id="cursorDiv">default</div>
		<div class="cursor-display" style="cursor:e-resize;" id="cursorDiv">e-resize</div>
		<div class="cursor-display" style="cursor:ew-resize;" id="cursorDiv">ew-resize</div>
		<div class="cursor-display" style="cursor:grab;" id="cursorDiv">grab</div>
		<div class="cursor-display" style="cursor:grabbing;" id="cursorDiv">grabbing</div>
		<div class="cursor-display" style="cursor:help;" id="cursorDiv">help</div>
		<div class="cursor-display" style="cursor:move;" id="cursorDiv">move</div>
		<div class="cursor-display" style="cursor:n-resize;" id="cursorDiv">n-resize</div>
		<div class="cursor-display" style="cursor:ne-resize;" id="cursorDiv">ne-resize</div>
		<div class="cursor-display" style="cursor:nesw-resize;" id="cursorDiv">nesw-resize</div>
		<div class="cursor-display" style="cursor:ns-resize;" id="cursorDiv">ns-resize</div>
		<div class="cursor-display" style="cursor:nw-resize;" id="cursorDiv">nw-resize</div>
		<div class="cursor-display" style="cursor:nwse-resize;" id="cursorDiv">nwse-resize</div>
		<div class="cursor-display" style="cursor:no-drop;" id="cursorDiv">no-drop</div>
		<div class="cursor-display" style="cursor:none;" id="cursorDiv">none</div>
		<div class="cursor-display" style="cursor:not-allowed;" id="cursorDiv">not-allowed</div>
		<div class="cursor-display" style="cursor:pointer;" id="cursorDiv">pointer</div>
		<div class="cursor-display" style="cursor:progress;" id="cursorDiv">progress</div>
		<div class="cursor-display" style="cursor:row-resize;" id="cursorDiv">row-resize</div>
		<div class="cursor-display" style="cursor:s-resize;" id="cursorDiv">s-resize</div>
		<div class="cursor-display" style="cursor:se-resize;" id="cursorDiv">se-resize</div>
		<div class="cursor-display" style="cursor:sw-resize;" id="cursorDiv">sw-resize</div>
		<div class="cursor-display" style="cursor:text;" id="cursorDiv">text</div>
		<div class="cursor-display" style="cursor:vertical-text;" id="cursorDiv">vertical-text</div>
		<div class="cursor-display" style="cursor:w-resize;" id="cursorDiv">w-resize</div>
		<div class="cursor-display" style="cursor:wait;" id="cursorDiv">wait</div>
		<div class="cursor-display" style="cursor:zoom-in;" id="cursorDiv">zoom-in</div>
		<div class="cursor-display" style="cursor:zoom-out;" id="cursorDiv">zoom-out</div>
	</div>

	<!-- <div style="cursor:initial;" id="cursorDiv">initial</div>
	<div style="cursor: inherit;" id="cursorDiv">inherit</div>
	<div style="cursor:unset;" id="cursorDiv">unset</div>
	<div style="cursor:revert;" id="cursorDiv">revert</div> -->
	<div class="sub-container">
		<div class="cursor-display" style="cursor: url({dubCursor}), auto;" id="cursorDiv">dub</div>
	</div>

	<div class="sub-container">
		<div class="cursor-display" style="cursor:-webkit-grab;" id="cursorDiv">-webkit-grab</div>
		<div class="cursor-display" style="cursor:-webkit-grabbing;" id="cursorDiv">-webkit-grabbing</div>
		<div class="cursor-display" style="cursor:-webkit-zoom-in;" id="cursorDiv">-webkit-zoom-in</div>
		<div class="cursor-display" style="cursor:-webkit-zoom-out;" id="cursorDiv">-webkit-zoom-out</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		margin: 2rem 0;
	}

	.sub-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}

	.cursor-display {
		border: 0.1rem solid var(--border-color);
		padding: 1rem;
		min-width: 8rem;
		text-align: center;
	}
</style>
