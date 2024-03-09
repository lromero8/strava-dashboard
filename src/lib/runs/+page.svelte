<script lang='ts'>
    import type { Activity } from '$lib/activity';

      export let runs: Activity[]|undefined;

</script>

{#if runs?.length}
    <p>Last run: {runs[0].distance / 1000} km</p>
{/if}