<script lang='ts'>
    import type { Activity } from '$lib/activity';
    import RunTile from '$lib/runs/run-tile/+page.svelte';
    import RunsOverview from '$lib/runs/runs-overview/+page.svelte';

    export let runs: Activity[]|undefined;

    let lastRun = '';
    if (runs?.length) {
        lastRun = (runs[0].distance / 1000).toPrecision(3);
    }

</script>

{#if runs?.length}
    <RunsOverview runs={runs}/>

    {#each runs as run}
        <RunTile run={run} />
    {/each}

{/if}