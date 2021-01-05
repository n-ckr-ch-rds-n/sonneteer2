<script lang="ts">
    import type {Poem} from "../sonneteer/poem";

    export let poem: Poem;
</script>

<h2>{poem.title}</h2>
{#each poem.body as line}
    <p>{line}</p>
{/each}
