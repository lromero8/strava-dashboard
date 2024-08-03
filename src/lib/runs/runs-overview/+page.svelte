<script lang='ts'>
    import {
        getThisWeekActivities,
        calculateTotalAvgPace,
        calculateTotalCaloriesBurned,
        calculateTotalDistance,
        calculateTotalMovingTime,
        formatTime
    } from '$lib/shared/activities-helper';
    import Icon from '$lib/icons/+page.svelte';
    import type { Activity } from '$lib/activity';
    import TreatDropdown from '$lib/shared/treat-selector/+page.svelte';

    export let runs: Activity[];

    const thisWeekRuns = getThisWeekActivities(runs);
    const distanceRun = calculateTotalDistance(thisWeekRuns);
    const movingTime = calculateTotalMovingTime(thisWeekRuns);
    const formattedTime = formatTime(movingTime);
    const avgPace = calculateTotalAvgPace(thisWeekRuns, movingTime);
    const caloriesBurned = calculateTotalCaloriesBurned(movingTime);

</script>
<div class='fifi-card-overview'>
    <span class='fifi-card-overview-title'>This week's overview</span>
    <div class="fifi-card-overview-body">

        <div class="fifi-card-col">
            <p class='fifi-body-item'>
                <Icon name='Run' size='22' color='#0090E3' />
                <span>Distance run: {distanceRun.toPrecision(3)} kms</span>
            </p>
            <p class='fifi-body-item'>
                <Icon name='TimerOutline' size='22' color='#0090E3' />
                <span>Moving time: {formattedTime}</span>
            </p>
        </div>

        <div class="fifi-card-col">
            <p class='fifi-body-item'>
                <Icon name='Speedometer' size='22' color='#0090E3' />
                <span>Average pace: {avgPace.toPrecision(3)} min/km</span>
            </p>
            <p class='fifi-body-item'>
                <TreatDropdown caloriesBurned={caloriesBurned} iconColor='#0090E3' selectedTextColor='white' selectedValueTextColor='white' />
            </p>
        </div>
    </div>
</div>

<style lang='scss'>
    $card-bg-color: #0090E3;
    $body-bg-color: #101010;

    div.fifi-card-overview {
        display: flex;
        flex-direction: column;
        border: 1px solid #e4e6ed;
        border-radius: 5px;
        margin: 30px auto;
        width: 38rem; 
        padding: 1em;
        @media screen and (max-width: 750px) {
            width: 20rem;
        }

        background-color: color-mix(in srgb, $card-bg-color 15%, $body-bg-color);
        color: #fff;
        border: 2px solid transparent;
        border-radius: 4px;
    }
    
    span.fifi-card-overview-title {
        font-size: 1.1rem;
    }
    
    div.fifi-card-overview-body {
        display: flex;
        justify-content: space-around;
        @media screen and (max-width: 750px) {
            flex-direction: column;
        }

        margin-top: 15px;;
    }

    div.fifi-card-col {
        display: flex;
        flex-direction: column;
        font-size: 0.9rem;
    }
    
    p.fifi-body-item {
        display: flex;
        align-items: center;

        span {
            margin-left: 5px;
        }
    }
</style>