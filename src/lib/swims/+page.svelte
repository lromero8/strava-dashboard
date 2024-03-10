<script lang='ts'>
    import type { Activity } from '$lib/activity';

    export let swims: Activity[]|undefined;

</script>

{#if swims?.length}
    <p>Last swim: {swims[0].distance / 1000} km</p>
{/if}