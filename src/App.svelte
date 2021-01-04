<script lang="ts">
	import {Sonneteer} from "./sonneteer/sonneteer";
	import type {Poem} from "./sonneteer/poem";
	import {generateRhymes} from "./rhyme-generator/generate.rhymes";
	import {generateRandomWord} from "./random-word-generator/generate.random.word";
	import {countSyllables} from "./syllable-counter/count.syllables";

	const sonneteer = new Sonneteer(generateRhymes, generateRandomWord, countSyllables);
	let rhymeScheme = "ABBAABBACDCDCC";
	let lineLength = 14;
	let poemPromise: Promise<Poem>;

	const generatePoem = () => {
		poemPromise = sonneteer.composePoem(rhymeScheme, lineLength);
	}

	generatePoem();
</script>

<main>
	<h1>Sonneteer</h1>
	<div class="options-container">
		<label for="rhyme-scheme">Rhyme Scheme:</label>
		<input type="text" id="rhyme-scheme" bind:value={rhymeScheme}>
		<label for="line-length">Line length:</label>
		<input type="number" id="line-length" min="0" max="100" bind:value={lineLength}>
		<button on:click={generatePoem}>Generate</button>
	</div>
	{#await poemPromise}
		<img src="assets/writing_hand.gif" alt="Writing hand">
	{:then poem}
		<h2>{poem.title}</h2>
		{#each poem.body as line}
			<p>{line}</p>
		{/each}
	{/await}
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
		align-items: baseline;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
