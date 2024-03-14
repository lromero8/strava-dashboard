<script lang='ts'>
    import { calculateTotalCaloriesBurned, type Activity, calculateTotalBeersEarned } from '$lib/activity';
    import Ring from '$lib/ring/+page.svelte';

    export let run: Activity;

    const options = { 
        year: 'numeric' as const, 
        month: 'long' as const, 
        day: 'numeric' as const, 
        hour: '2-digit' as const, 
        minute: '2-digit' as const, 
        hour12: true as const
    };

    const formatActivityDate = (date: Date|string) => new Intl.DateTimeFormat('en-US', options).format(new Date(date));

    function formatTime(seconds: number) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        let formattedTime = '';
        if (hours > 0) {
            formattedTime += hours + 'h ';
        }
        if (minutes > 0) {
            formattedTime += minutes + 'm ';
        }
        formattedTime += remainingSeconds + 's';

        return formattedTime;
    }

    const formattedDate = formatActivityDate(run.start_date);
    const formattedDistance = `${(run.distance / 1000).toFixed(2)} km`
    const formattedTime = formatTime(run.moving_time);
    const caloriesBurned = calculateTotalCaloriesBurned(run.moving_time);
    const beersEarned = Math.round(calculateTotalBeersEarned(caloriesBurned)).toString();

</script>

<span>{formattedDate}</span>
<Ring activityProperty='Distance' activityValue={formattedDistance}  percentageAchieved={100} />
<Ring activityProperty='Time' activityValue={formattedTime}  percentageAchieved={100} />
<Ring activityProperty='Beers earned' activityValue={beersEarned}  percentageAchieved={100} />

<style lang='scss'></style>