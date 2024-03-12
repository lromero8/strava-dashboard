<script lang='ts'>
    import type { Activity } from '$lib/activity';
    import Ring from '$lib/ring/+page.svelte';
    import RunsOverview from '$lib/runs/runs-overview/+page.svelte';

    export let runs: Activity[]|undefined;

    let lastRun = '';
    if (runs?.length) {
        lastRun = (runs[0].distance / 1000).toPrecision(3);
    }

</script>

{#if runs?.length}
    <RunsOverview runs={runs}/>
    <Ring activityProperty='Distance' activityValue={`${lastRun} km`}  percentageAchieved={100} />

{/if}