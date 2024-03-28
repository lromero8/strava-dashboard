<script lang='ts'>
    import type { Activity } from '$lib/activity';
    import SwimsOverview from '$lib/swims/swims-overview/+page.svelte';
    import SwimTile from '$lib/swims/swim-tile/+page.svelte';

    export let swims: Activity[]|undefined;

</script>

{#if swims?.length}
    <SwimsOverview swims={swims}/>

    {#each swims as swim}
        <SwimTile swim={swim} />
    {/each}

{/if}