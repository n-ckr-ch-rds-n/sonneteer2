<script>
    import {createEventDispatcher} from "svelte";

    let rhymeScheme = "ABBAABBACDCDCC";
    let lineLength = 14;
    let maxLineLength = 100;

    const dispatch = createEventDispatcher();
    const generatePoem = () => {
        if (lineLength > maxLineLength) {
            alert(`Line length must be lower than ${maxLineLength}`)
        } else {
            dispatch("poemRequest", {rhymeScheme, lineLength})
        }
    }

    generatePoem();
</script>

<div id="options-container">
    <label for="rhyme-scheme">Rhyme Scheme:</label>
    <input type="text" id="rhyme-scheme" bind:value={rhymeScheme}>
    <label for="line-length">Line length:</label>
    <input type="number" id="line-length" min="0" max={maxLineLength} bind:value={lineLength}>
    <button on:click={generatePoem} id="generate-button">Generate</button>
</div>

<style>
    #options-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: baseline;
    }

    #options-container > * {
        margin: 3px;
        border-radius: 10px;
    }

    #generate-button {
        color: #006060;
    }
</style>
