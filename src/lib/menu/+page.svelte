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
        iconName: string;
    }

    let activities: Activity[] = [];
    let activitySelected: ActivityType = 'Run';
    const menu: Menu[] = [
        { activityType: 'Run', iconName: 'Run' },
        { activityType: 'Ride', iconName: 'Bike' },
        { activityType: 'Swim', iconName: 'Swim' }
    ];
    let shownActivities: Activity[] = [];
    let unsubscribe: () => void = () => {};

    const iconBgColor= '#0090E3';

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

<div class="fifi-menu-container">
    <ul class="fifi-tabs">
        {#each menu as tab}
            <li class='{activitySelected === tab.activityType ? 'fifi-active-tab' : ''}'>
                <button on:click={() => chooseActivity(tab.activityType)}>
                    <Icon name={tab.iconName} size={'22'} color={activitySelected === tab.activityType ? 'white' : iconBgColor}/>
                </button>
            </li>
        {/each }
    </ul>
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

<style lang='scss'>
    $tab-container-bg-color: #252525;
    $tab-bg-color: #0090E3;

    .fifi-menu-container {
        display: flex;
        justify-content: center;
        flex-grow: 1;
        flex-shrink: 1;
        margin-top: 4.5rem;
    }

    ul.fifi-tabs {
        background: $tab-container-bg-color;
        border-radius: 20px;
        display: inline-block;
        list-style: none;
        margin: 0 0.25em;
        padding: 0.5em 0.5em;
        white-space: nowrap;

        li {
            display: inline-block;

            &::before {
                content: '';
            }


            button {
              background: transparent;
              border: 0;
              border-radius: 15px;
              cursor: pointer;
              font-weight: 700;
              min-width: 6.9em;
              outline: 0;
              padding: 0.50em 3.5em;
              @media screen and (max-width: 750px) {
                padding: 0.3em;
              }
            }
        }

        .fifi-active-tab {
            button {
                background: $tab-bg-color;
                color: #000;
            }
        }


    }
</style>