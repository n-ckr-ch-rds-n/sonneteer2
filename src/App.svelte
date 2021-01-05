<script lang="ts">
	import {Sonneteer} from "./sonneteer/sonneteer";
	import type {Poem} from "./sonneteer/poem";
	import {generateRhymes} from "./rhyme-generator/generate.rhymes";
	import {generateRandomWord} from "./random-word-generator/generate.random.word";
	import {countSyllables} from "./syllable-counter/count.syllables";
	import Header from "./header/Header.svelte";
	import Loading from "./loading/Loading.svelte";
	import PoemContainer from "./poem/PoemContainer.svelte";

	const appName = "Sonneteer";
	const sonneteer = new Sonneteer(generateRhymes, generateRandomWord, countSyllables);
	let rhymeScheme = "ABBAABBACDCDCC";
	let lineLength = 14;
	let poemPromise: Promise<Poem>;
	let maxLineLength = 100;

	const generatePoem = () => {
		if (lineLength > maxLineLength) {
			alert(`Line length must be lower than ${maxLineLength}`)
		} else {
			poemPromise = sonneteer.composePoem(rhymeScheme, lineLength);
		}
	}

	generatePoem();
</script>

<main>
	<Header appName={appName}/>
	<div class="options-container">
		<label for="rhyme-scheme">Rhyme Scheme:</label>
		<input type="text" id="rhyme-scheme" bind:value={rhymeScheme}>
		<label for="line-length">Line length:</label>
		<input type="number" id="line-length" min="0" max={maxLineLength} bind:value={lineLength}>
		<button on:click={generatePoem}>Generate</button>
	</div>

	{#await poemPromise}
		<Loading/>
	{:then poem}
		<PoemContainer poem="{poem}"/>
	{/await}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
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
