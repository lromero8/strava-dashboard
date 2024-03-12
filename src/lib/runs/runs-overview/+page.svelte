<script lang='ts'>
    import {
        getLastWeekRuns,
        type Activity,
        calculateTotalAvgPace,
        calculateTotalBeersEarned,
        calculateTotalCaloriesBurned,
        calculateTotalDistance,
        calculateTotalMovingTime,
        formatTime
    } from '$lib/activity';

    export let runs: Activity[];

    const lastWeekRuns = getLastWeekRuns(runs);
    const distanceRun = calculateTotalDistance(lastWeekRuns);
    const movingTime = calculateTotalMovingTime(lastWeekRuns);
    const formattedTime = formatTime(movingTime);
    const avgPace = calculateTotalAvgPace(lastWeekRuns, movingTime);
    const caloriesBurned = calculateTotalCaloriesBurned(movingTime);
    const beersEarned = calculateTotalBeersEarned(caloriesBurned);

</script>
<h3>Last week's overview</h3>
<div>
    <p>Distance run: {distanceRun} kms</p>
    <p>Moving time: {formattedTime}</p>
    <p>Average pace: {avgPace.toPrecision(3)} min/km</p>
    <p>Kölschs earned: {beersEarned.toPrecision(2)}</p>
</div>

<style lang='scss'></style>