<script lang="ts">
	import {Sonneteer} from "./sonneteer/sonneteer";
	import type {Poem} from "./sonneteer/poem";
	import {generateRhymes} from "./rhyme-generator/generate.rhymes";
	import {generateRandomWord} from "./random-word-generator/generate.random.word";
	import {countSyllables} from "./syllable-counter/count.syllables";
	import Header from "./header/Header.svelte";
	import Loading from "./loading/Loading.svelte";
	import PoemContainer from "./poem/PoemContainer.svelte";
	import Configurator from "./configurator/Configurator.svelte";

	const sonneteer = new Sonneteer(generateRhymes, generateRandomWord, countSyllables);
	let rhymeScheme = "ABBAABBACDCDCC";
	let lineLength = 14;
	let poemPromise: Promise<Poem>;
	let maxLineLength = 100;

	const generatePoem = (event) => {
		poemPromise = sonneteer.composePoem(event.detail.rhymeScheme, event.detail.lineLength)
	}

	poemPromise = sonneteer.composePoem(rhymeScheme, lineLength);
</script>

<main>
	<Header/>
	<Configurator on:poemRequest={generatePoem}/>
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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
