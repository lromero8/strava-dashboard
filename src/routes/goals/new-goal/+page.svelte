<script lang='ts'>
    import Icon from '$lib/icons/+page.svelte';
    import ActivitySelector from '$lib/shared/activity-selector/+page.svelte';
    import TreatTypeSelector from '$lib/shared/treat-selector/treat-type-selector/+page.svelte';
    import type { Goal } from '../goal';
    import { treats } from '$lib/shared/treat-selector/treat';
    import { createEventDispatcher } from 'svelte';


    export let savedGoals: readonly Goal[]|undefined;

    let activateNewGoal = false;
    const goal: Goal = {
        name: '',
        description: '',
        activityType: 'Run',
        treat: treats[0],
        value: 0
    };
    const iconColor = '#0090E3';

    function save() {
        const goals = savedGoals ? savedGoals.concat(goal) : [goal];
        activateNewGoal = false;
        saveGoals(goals)
        dispatch('new', {
			goal: goal
		});
    }

    function saveGoals(goals: Goal[]) {
        try {
            localStorage.setItem('fitFiesta.goals', JSON.stringify(goals));
        }
        catch (error) {
            console.error(error);
        }
    }

    const showNewGoalCard = (newValue: boolean) => activateNewGoal = newValue;
    const dispatch = createEventDispatcher();

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="fifi-new-btn" on:click={() => showNewGoalCard(true)}>
    <div>
        <Icon name='Plus' size='22' color={iconColor} />
    </div>
    <span>New</span>
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

<style lang='scss'>

    $primary-color: #0090E3;
    $card-bg-color: #252525;
    $body-bg-color: #101010;
    $text-color: #fff;

    div.fifi-new-btn {
        display: flex;
        justify-content: end;
        align-items: center;
        color: white;
        width: 40rem;
        
        :hover {
            cursor: pointer;
        }

        @media (max-width: 750px) {
            margin: 0 auto;
            width: 20rem;
        }
    }

    div.fifi-new-goal-card {
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

</style>
