<script lang='ts'>
    import { onDestroy, onMount } from 'svelte';
    import { activitiesStore } from '../../stores/store';
    import type { Activity, ActivityType } from '$lib/activity';
    import Runs from '$lib/runs/+page.svelte';
    import Rides from '$lib/rides/+page.svelte';
    import Swims from '$lib/swims/+page.svelte';
    import Icon from '$lib/icons/+page.svelte';

    interface Menu {
        activityType: ActivityType;
        label: string;
    }

    let activities: Activity[] = [];
    let activitySelected: ActivityType = 'Run';
    let menu: Menu[] = [
        { activityType: 'Run', label: 'Runs' },
        { activityType: 'Ride', label: 'Rides' },
        { activityType: 'Swim', label: 'Swims' }
    ];
    let shownActivities: Activity[] = [];
    let unsubscribe: () => void = () => {};


    function loadActivities() {
        unsubscribe = activitiesStore.subscribe(storedActivities => {
            activities = storedActivities;
            chooseActivity(activitySelected);
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
    {#each menu as tab}
        <button on:click={() => chooseActivity(tab.activityType)}>{tab.label}</button>
    {/each }
</div>

{#if activitySelected === 'Run'}
    <Icon name={'AccountCircle'} />
    <Runs runs={shownActivities} />
{/if}

{#if activitySelected === 'Ride'}
    <Rides rides={shownActivities} />
{/if}

{#if activitySelected === 'Swim'}
    <Swims swims={shownActivities} />
{/if}