<script lang='ts'>
    import type { Activity } from '$lib/activity';
    import SwimsOverview from '$lib/swims/swims-overview/+page.svelte';

    export let swims: Activity[]|undefined;

</script>

{#if swims?.length}
    <SwimsOverview swims={swims}/>

    <!-- {#each runs as run}
        <RunTile run={run} />
    {/each} -->

{/if}