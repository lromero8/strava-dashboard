<script lang='ts'>
    import Ring from '$lib/ring/+page.svelte';
    import type { GoalWithProgress } from '../goal';

    export let goal: GoalWithProgress;

</script>

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

<style lang='scss'>

    $card-bg-color: #252525;
    $text-color: #fff;


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
