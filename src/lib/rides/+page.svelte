<script lang='ts'>
    import type { Activity } from '$lib/activity';

    export let rides: Activity[]|undefined;

</script>

{#if rides?.length}
    <p>Last ride: {rides[0].distance / 1000} km</p>
{/if}