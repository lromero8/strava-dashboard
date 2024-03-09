<script lang='ts'>
    import { onDestroy, onMount } from 'svelte';
    import { activitiesStore } from '../../stores/store';
    import type { Activity } from '$lib/activity';
    import Runs from '$lib/runs/+page.svelte';
    import Rides from '$lib/rides/+page.svelte';
    import Swims from '$lib/swims/+page.svelte';


    let activities: Activity[];
    let runs: Activity[]|undefined;
    let rides: Activity[]|undefined;
    let swims: Activity[]|undefined;
    let unsubscribe: () => void = () => {};


    function loadActivities() {
        unsubscribe = activitiesStore.subscribe(storedActivities => {
            const castedActivities = storedActivities as Activity[]|undefined;
            if (castedActivities) {
                activities = castedActivities;
                console.log(activities);
            }
        });
    }

    const getRuns = () => runs = activities?.filter(a => a.type === 'Run');
    const getRides = () => rides = activities?.filter(a => a.type === 'Ride');
    const getSwims = () => swims = activities?.filter(a => a.type === 'Swim');

    onMount(loadActivities);

    onDestroy(() => {
      unsubscribe();
    });


</script>

<div>
    <button on:click={getRuns}>Run</button>
    <button on:click={getRides}>Bike</button>
    <button on:click={getSwims}>Swim</button>
</div>

{#if runs?.length}
    <Runs runs={runs} />
{/if}

{#if rides?.length}
    <Rides rides={rides} />
{/if}

{#if swims?.length}
    <Swims swims={swims} />
{/if}