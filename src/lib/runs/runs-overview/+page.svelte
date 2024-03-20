<script lang='ts'>
    import {
        getThisWeekRuns,
        calculateTotalAvgPace,
        calculateTotalBeersEarned,
        calculateTotalCaloriesBurned,
        calculateTotalDistance,
        calculateTotalMovingTime,
        formatTime
    } from '$lib/runs/run-helper';
    import Icon from '$lib/icons/+page.svelte';
    import type { Activity } from '$lib/activity';

    export let runs: Activity[];

    const thisWeekRuns = getThisWeekRuns(runs);
    const distanceRun = calculateTotalDistance(thisWeekRuns);
    const movingTime = calculateTotalMovingTime(thisWeekRuns);
    const formattedTime = formatTime(movingTime);
    const avgPace = calculateTotalAvgPace(thisWeekRuns, movingTime);
    const caloriesBurned = calculateTotalCaloriesBurned(movingTime);
    const beersEarned = calculateTotalBeersEarned(caloriesBurned);

</script>
<div class='fifi-card-overview'>
    <span class='fifi-card-overview-title'>This week's overview</span>
    <div class="fifi-card-overview-body">

        <div class="fifi-card-col">
            <p class='fifi-body-item'>
                <Icon name='Run' size='22' color='white' />
                <span>Distance run: {distanceRun.toPrecision(3)} kms</span>
            </p>
            <p class='fifi-body-item'>
                <Icon name='TimerOutline' size='22' color='white' />
                <span>Moving time: {formattedTime}</span>
            </p>
        </div>

        <div class="fifi-card-col">
            <p class='fifi-body-item'>
                <Icon name='Speedometer' size='22' color='white' />
                <span>Average pace: {avgPace.toPrecision(3)} min/km</span>
            </p>
            <p class='fifi-body-item'>
                <Icon name='GlassMugVariant' size='22' color='white' />
                <span>Kölschs earned: {beersEarned.toPrecision(2)}</span>
            </p>
        </div>
    </div>
</div>

<style lang='scss'>
    $bg-color: #F9725C;
    div.fifi-card-overview {
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

        background-color: $bg-color;
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
    }
    
    p.fifi-body-item {
        display: flex;
        align-items: center;

        span {
            margin-left: 5px;
        }
    }
</style>