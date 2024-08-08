<script lang='ts'>
    import { onDestroy, onMount } from 'svelte';
    import type { Activity } from '$lib/activity';
    import { activitiesStore } from '../../stores/store';
    import { calculateTotalCaloriesBurned } from '$lib/shared/activities-helper';
    import type { Goal, GoalWithProgress } from './goal';
    import NewGoalCard from './new-goal/+page.svelte'
    import GoalCard from './goal/+page.svelte'
    

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

    <NewGoalCard savedGoals={savedGoals} on:new={loadGoals} />

    {#if goalsWithProgress}
        {#each goalsWithProgress as goal}
            <GoalCard goal={goal} />
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

</style>
