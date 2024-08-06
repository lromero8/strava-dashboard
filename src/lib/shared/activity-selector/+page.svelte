<script lang='ts'>
    import type { ActivityType } from "$lib/activity";
    import { createEventDispatcher } from "svelte";

    const activityTypes: ActivityType[] = ['Run', 'Ride', 'Swim'];
    let menuOpen = false;
    let selectedActivity: ActivityType|undefined;

    const dispatch = createEventDispatcher();

    function select(newActivity: ActivityType) {
        selectedActivity = newActivity;
		dispatch('selected', {
			activity: selectedActivity
		});
	}

</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-missing-attribute -->
<a on:click={() => menuOpen = !menuOpen}>{selectedActivity || 'Select sport'}</a>

{#if menuOpen}
    <div>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        {#each activityTypes as activity}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={() => select(activity)}>{activity}</div>
        {/each}
    </div>
{/if}

