<script lang='ts'>
    import type { Activity } from '$lib/activity';
    // import RideTile from '$lib/runs/run-tile/+page.svelte';
    import RidesOverview from '$lib/rides/rides-overview/+page.svelte';

    export let rides: Activity[]|undefined;

</script>

{#if rides?.length}
    <RidesOverview rides={rides}/>

    <!-- {#each rides as ride}
        <RideTile run={ride} />
    {/each} -->

{/if}