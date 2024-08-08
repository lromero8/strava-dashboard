<script lang='ts'>
    import { onDestroy, onMount } from 'svelte';
    import type { Activity } from '$lib/activity';
    import { activitiesStore } from '../../stores/store';
    import Ring from '$lib/ring/+page.svelte';
    import { calculateTotalCaloriesBurned } from '$lib/shared/activities-helper';
    import type { Goal } from './goal';
    import NewGoal from './new-goal/+page.svelte'
    

    interface GoalWithProgress extends Goal {
        current: number;
        toGo: number;
        progress: number;
    }

    let savedGoals: readonly Goal[]|undefined;
    let activities: readonly Activity[];
    let goalsWithProgress: GoalWithProgress[]|undefined;
    let unsubscribe: () => void = () => {};


    onMount(load);

    onDestroy(() => {
      unsubscribe();
    });

    function load() {
        loadActivities();
        loadGoals();
        console.log(savedGoals);
        console.log(goalsWithProgress);
    }

    function loadActivities() {
        unsubscribe = activitiesStore.subscribe(storedActivities => {
            activities = storedActivities;
            console.log(activities);
        });
    }

    function loadGoals() {
        try {
            const saved = localStorage.getItem('fitFiesta.goals');
            if(saved) {
                savedGoals = JSON.parse(saved) as Goal[];
                calculateGoalsProgress();
            }
        }
        catch {
            return undefined;
        }
    }

    function calculateGoalsProgress() {
        goalsWithProgress = savedGoals?.map(goal => {
            const caloriesNeeded = goal.value * goal.treat.calories;
            const caloriesBurned = activities
                .filter(a => a.type === goal.activityType)
                .reduce((acc, cur) => acc + calculateTotalCaloriesBurned(cur.moving_time), 0)
            const progress = Math.floor((caloriesBurned/caloriesNeeded) * 100);

            return {
                ...goal,
                current: Math.floor(caloriesBurned),
                toGo: Math.floor(caloriesNeeded - caloriesBurned),
                progress: progress > 100 ? 100 : progress
            };
        });
    }

</script>

<div class="fifi-container">

    <div class="fifi-header">
        <h1>Goals</h1>
    </div>

    <NewGoal savedGoals={savedGoals} on:new={loadGoals} />

    {#if goalsWithProgress}
        {#each goalsWithProgress as goal}
            <div class="fifi-goal-card">
                <div class="fifi-card-header">
                    <div>
                        <Ring
                            activityValue={goal.value.toString()}
                            activityIcon={goal.treat.icon}
                            percentageAchieved={goal.progress}
                        />
                    </div>
                    <div>
                        <div class="fifi-goal-item">
                            <strong>{goal.name}</strong>
                        </div>
                        <div class="fifi-goal-item">
                            <span>{goal.description}</span>
                        </div>
                        <div class="fifi-goal-item">
                            <span>Goal: <strong>{goal.value} {goal.treat?.name}</strong></span>
                        </div>
                        <div class="fifi-goal-item">
                            <span>Sport: <strong>{goal.activityType}</strong></span>
                        </div>
                    </div>
                </div>
                
                <div class="fifi-card-body">
                    <div class="fifi-current-togo">
                        <div>Current</div>
                        <div>To Go</div>
                        <div>
                            <strong>{goal.current} Cal</strong>
                        </div>
                        <div>
                            <strong>{goal.toGo > 0 ? goal.toGo : 0} Cal</strong>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    {/if}

</div>

<style lang='scss'>
    .fifi-container {
        margin-top: 4.5rem;
        max-width: 540px;
        margin-right: auto;
        margin-left: auto;

        @media (max-width: 750px) {
            max-width: 1320px;
        }
    }

    $card-bg-color: #252525;
    $text-color: #fff;
    $primary-color: #0090E3;
    $activity-field-color: #fff;
    $body-bg-color: #101010;

    div.fifi-header {
        display: flex;
        justify-content: space-between;
        width: 38rem;

        h1 { color: white; }

        @media (max-width: 750px) {
            margin: 0 auto;
            width: 20rem;
            padding: 0 1rem;
        }

    }

    div.fifi-goal-card {
        display: flex;
        flex-direction: column;
        border: 1px solid #e4e6ed;
        border-radius: 5px;
        box-shadow: 0 5px 5px 0 rgba(69, 88, 127, 0.1);
        margin: 30px auto;
        width: 38rem;
        padding: 1em;
        @media screen and (max-width: 750px) {
            width: 20rem;
        }

        background-color: $card-bg-color;
        color: $text-color;
        border: 2px solid transparent;
        border-radius: 4px;
    }

    div.fifi-goal-card {

        div.fifi-card-header {
            display: flex;
           
            @media screen and (max-width: 750px) {
                display: block;
            }

            div.fifi-goal-item {
                margin-bottom: 15px;
            }
        }

        div.fifi-card-body {
            
            div.fifi-current-togo {
                display: grid;
                grid-template-columns: 0.15fr 0.15fr;
                grid-template-rows: auto auto;
                gap: 10px;

                margin-top: 2em;

                @media screen and (max-width: 750px) {
                    grid-template-columns: 0.5fr 0.5fr;
                }
            }
        }

    }


</style>
