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
        activateNewGoal = false;
        saveGoals(goals)
        load();
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

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="fifi-new-btn" on:click={() => showNewGoalCard(true)}>
            <div>
                <Icon name='Plus' size='22' color={iconColor} />
            </div>
            <span>New</span>
        </div>
    </div>



    {#if activateNewGoal}

        <div class="fifi-new-goal-card">
            <div class="fifi-new-goal-card-body">
                <div>
                    <span class="fifi-new-activity-field">Name</span>
                    <span class="fifi-new-activity-field">Description</span>
                    <span class="fifi-new-activity-field">Activity type</span>
                    <span class="fifi-new-activity-field">Treat type</span>
                    <span class="fifi-new-activity-field">Amount</span>
                </div>
                <div>
                    <div class="fifi-new-activity-field">
                        <input type="text" bind:value={goal.name}>
                    </div>
                    <div class="fifi-new-activity-field">
                        <input type="text" bind:value={goal.description}>
                    </div>
                    <div class="fifi-new-activity-field">
                        <ActivitySelector on:selected={(event) => goal.activityType = event.detail.activity} />
                    </div>
                    <div class="fifi-new-activity-field">
                        <TreatTypeSelector on:selected={(event) => goal.treat = event.detail.treat} />
                    </div>
                    <div class="fifi-new-activity-field">
                        <input type="number" bind:value={goal.value}>
                    </div>
                </div>

            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="fifi-new-goal-btns">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="fifi-new-goal-save" on:click={save}>
                    <Icon name='Plus' size='22' color={iconColor} />
                    <span>Save</span>
                </div>
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="fifi-new-goal-cancel" on:click={() => showNewGoalCard(false)}>
                    <Icon name='Close' size='22' color={iconColor} />
                    <span>Cancel</span>
                </div>
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

        div.fifi-new-btn:hover {
            cursor: pointer;
        }

        @media (max-width: 750px) {
            margin: 0 auto;
            width: 20rem;
            padding: 0 1rem;
        }

    }

    div.fifi-new-btn {
        display: flex;
        align-items: center;

        span {
            color: $primary-color;
            margin-left: 0.5rem;
        }
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

        div.fifi-new-goal-card-body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
            gap: 20px;

            div .fifi-new-activity-field {
                display: block;
                margin-bottom: 1rem;
            }

            div input {
                border: 1px solid #e4e6ed;
                border-radius: 5px;
                color: white;
                background-color: color-mix(in srgb, $primary-color 15%, $body-bg-color);
            }
        }

        div.fifi-new-goal-btns {
            display: flex;
            align-items: center;
            justify-content: start;
            
            @media screen and (max-width: 750px) {
                justify-content: space-between;
            }
            
            
            div.fifi-new-goal-save, div.fifi-new-goal-cancel {
                display: flex;
                align-items: center;
                cursor: pointer;

                margin-right: 1em;
                span { margin-left: 0.5em; }

                @media screen and (max-width: 750px) {
                    margin: 0;
                }

                
            }
        }
    }

    div.fifi-new-goal-card {
        background-color: color-mix(in srgb, $primary-color 15%, $body-bg-color);
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
