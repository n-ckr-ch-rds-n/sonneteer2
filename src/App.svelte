<script lang="ts">
	export let name: string;
	let rhymeScheme = "ABBAABBACDCDCC";
	let lineLength = 14;
</script>

<main>
	<h1>Sonneteer</h1>
	<div class="options-container">
		<label for="rhyme-scheme">Rhyme Scheme:</label>
		<input type="text" id="rhyme-scheme" bind:value={rhymeScheme}>
		<label for="line-length">Line length:</label>
		<input type="number" id="line-length" min="0" max="100" bind:value={lineLength}>
		<button>Generate</button>
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	.options-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
