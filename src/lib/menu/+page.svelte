<script lang='ts'>
    import { onDestroy, onMount } from 'svelte';
    import { activitiesStore } from '../../stores/store';
    import type { Activity, ActivityType } from '$lib/activity';
    import Runs from '$lib/runs/+page.svelte';
    import Rides from '$lib/rides/+page.svelte';
    import Swims from '$lib/swims/+page.svelte';


    let activities: Activity[] = [];
    let activitySelected: ActivityType;
    let shownActivities: Activity[] = [];
    let unsubscribe: () => void = () => {};


    function loadActivities() {
        unsubscribe = activitiesStore.subscribe(storedActivities => {
            activities = storedActivities;
            console.log(activities);
        });
    }

    const chooseActivity = (activityType: ActivityType) => {
        activitySelected = activityType;
        switch (activityType) {
            case 'Run':
                shownActivities = activities?.filter(a => a.type === 'Run');
                break;
            case 'Ride':
                shownActivities = activities?.filter(a => a.type === 'Ride' && a.commute === true);
                break;
            case 'Swim':
                shownActivities = activities?.filter(a => a.type === 'Swim');
                break;
            default:
                break;
        }
    }

    onMount(loadActivities);

    onDestroy(() => {
      unsubscribe();
    });


</script>

<div>
    <button on:click={() => chooseActivity('Run')}>Run</button>
    <button on:click={() => chooseActivity('Ride')}>Bike</button>
    <button on:click={() => chooseActivity('Swim')}>Swim</button>
</div>

{#if activitySelected === 'Run'}
    <Runs runs={shownActivities} />
{/if}

{#if activitySelected === 'Ride'}
    <Rides rides={shownActivities} />
{/if}

{#if activitySelected === 'Swim'}
    <Swims swims={shownActivities} />
{/if}