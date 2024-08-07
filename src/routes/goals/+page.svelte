<script lang='ts'>
    import { onDestroy, onMount } from 'svelte';
    import Icon from '$lib/icons/+page.svelte';
    import ActivitySelector from '$lib/shared/activity-selector/+page.svelte';
    import type { Activity, ActivityType } from '$lib/activity';
    import { activitiesStore } from '../../stores/store';
    import TreatTypeSelector from '$lib/shared/treat-selector/treat-type-selector/+page.svelte';
    import { treats, type Treat } from '$lib/shared/treat-selector/treat';
    import Ring from '$lib/ring/+page.svelte';
    import { calculateTotalCaloriesBurned } from '$lib/shared/activities-helper';
    

    interface Goal {
        name: string;
        description: string;
        activityType: ActivityType;
        treat: Treat;
        value: number;
    }

    interface GoalWithProgress extends Goal {
        current: number;
        toGo: number;
        progress: number;
    }

    let activateNewGoal = false;
    let savedGoals: readonly Goal[]|undefined;
    let activities: readonly Activity[];
    let goalsWithProgress: GoalWithProgress[]|undefined;
    let unsubscribe: () => void = () => {};

    const iconColor = '#0090E3';
    const goal: Goal = {
        name: '',
        description: '',
        activityType: 'Run',
        treat: treats[0],
        value: 0
    };

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


    const showNewGoalCard = (newValue: boolean) => activateNewGoal = newValue;

    function save() {
        const goals = savedGoals ? savedGoals.concat(goal) : [goal];
        saveGoals(goals)
    }

    function saveGoals(goals: Goal[]) {
        try {
            localStorage.setItem('fitFiesta.goals', JSON.stringify(goals));
        }
        catch (error) {
            console.error(error);
        }
    }

    function loadGoals() {
        try {
            const saved = localStorage.getItem('fitFiesta.goals');
            if(saved) {
                savedGoals = JSON.parse(saved) as Goal[];
                goalsWithProgress = savedGoals.map(goal => {
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
                })
            }
        }
        catch {
            return undefined;
        }
    }

</script>

<div class="fifi-container">
    <h1 style="color: white;">Goals</h1>

        <div class="fifi-new-btn">
            <button style="background-color: {iconColor}; color: white;" on:click={() => showNewGoalCard(true)}>
                <span style="margin-top: 0; margin-bottom: 0">New</span>
                <Icon name='PlusCircle' size='22' color='white' />
            </button>
        </div>


    {#if activateNewGoal}

        <div class="fifi-new-goal-card">
            <div class="fifi-card-header">
                <div>
                    <span id="fifi-activity-name">Name</span>
                    <input type="text" bind:value={goal.name}>
                </div>
                <div>
                    <span id="fifi-activity-name">Description</span>
                    <input type="text" bind:value={goal.description}>
                </div>
                <div>
                    <span id="fifi-activity-name">Activity type</span>
                    <ActivitySelector on:selected={(event) => goal.activityType = event.detail.activity} />
                </div>
                <div>
                    <span id="fifi-activity-name">Treat type</span>
                    <TreatTypeSelector on:selected={(event) => goal.treat = event.detail.treat} />
                </div>
                <div>
                    <span id="fifi-activity-name">Amount</span>
                    <input type="number" bind:value={goal.value}>
                </div>

                <div>
                    <button on:click={save}>Save</button>
                    <button on:click={() => showNewGoalCard(false)}>Cancel</button>
                </div>
            </div>
        
            <div class="fifi-card-body">
                <!-- <div>
                    <span>Current</span>
                    <span>To</span>
                </div>
                <div>
                    <span>current value</span>
                    <span>to go val</span>
                </div> -->
            </div>

        </div>

    {/if}

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
                        <span id="fifi-activity-name">Name: {goal.name}</span>
                    </div>
                    <div>
                        <span id="fifi-activity-name">Description: {goal.description}</span>
                    </div>
                    <div>
                        <span id="fifi-activity-name">Sports type: {goal.activityType}</span>
                    </div>
                    <div>
                        <span id="fifi-activity-name">Goal: {goal.value} {goal.treat?.name}</span>
                    </div>
                </div>
            
                <div class="fifi-card-body">
                </div>
            </div>
        {/each}
    {/if}

</div>

<style lang='scss'>
    .fifi-container {
        margin-top: 4.5rem;
    }

    $card-bg-color: #252525;
    $text-color: #fff;
    $primary-color: #0090E3;
    $activity-field-color: #fff;
    $body-bg-color: #101010;

    div.fifi-new-btn {
        display: flex;
        align-items: center;
    }

    div.fifi-goal-card, div.fifi-new-goal-card {
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

    div.fifi-new-goal-card {
        background-color: color-mix(in srgb, $primary-color 15%, $body-bg-color);
    }

</style>
