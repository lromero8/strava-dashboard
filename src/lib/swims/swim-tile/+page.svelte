<script lang='ts'>
    import { calculateTotalCaloriesBurned } from '$lib/shared/activities-helper';
    import Icon from '$lib/icons/+page.svelte';
    import TreatDropdown from '$lib/shared/treat-selector/+page.svelte';
    import type { Activity } from '$lib/activity';

    export let swim: Activity;

    const options = { 
        year: 'numeric' as const, 
        month: 'long' as const, 
        day: 'numeric' as const, 
        hour: '2-digit' as const, 
        minute: '2-digit' as const, 
        hour12: true as const
    };

    const iconColor = '#0090E3';

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

    const formattedDate = formatActivityDate(swim.start_date);
    const formattedDistance = `${(swim.distance / 1000).toFixed(2)} km`
    const formattedTime = formatTime(swim.moving_time);
    const pace = (swim.moving_time / 60) / (swim.distance / 1000);
    const avgHeartRate = swim.average_heartrate;
    const caloriesBurned = calculateTotalCaloriesBurned(swim.moving_time);

</script>

<div class="fifi-card">
    <div class="fifi-card-header">
        <span id="fifi-activity-name">{swim.name}</span>
        <span id="fifi-activity-date">{formattedDate}</span>
    </div>

    <div class="fifi-card-body">
        <div class="fifi-stat">
            <span>
                <Icon name='Swim' size='22' color={iconColor} />
                <span>Distance: </span>
            </span>
            <span>{formattedDistance}</span>
        </div>

        <div class="fifi-stat">
            <span>
                <Icon name='TimerOutline' size='22' color={iconColor} />
                <span>Time: </span>
            </span>
            <span>{formattedTime}</span>
        </div>

        <div class="fifi-stat">
            <span>
                <Icon name='Speedometer' size='22' color={iconColor} />
                <span>Pace: </span>
            </span>
            <span>{pace.toPrecision(3)} min/km</span>
        </div>

        <div class="fifi-stat">
            <span>
                <Icon name='HeartPulse' size='22' color={iconColor} />
                <span>Average heart rate: </span>
            </span>
            <span>{avgHeartRate} bpm</span>
        </div>

        <div class="fifi-stat">
            <span>
                <Icon name='Fire' size='22' color={iconColor} />
                <span>Calories burned: </span>
            </span>
            <span>{caloriesBurned.toPrecision(3)}</span>
        </div>

        <div class="fifi-stat">
            <TreatDropdown caloriesBurned={caloriesBurned} iconColor={iconColor} selectedTextColor='white' selectedValueTextColor='white' />
        </div>
    </div>
</div>


<style lang='scss'>
    $card-bg-color: #252525;
    $text-color: #fff;
    $activity-name-color: #0090E3;
    $activity-field-color: #fff;

    div.fifi-card {
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

    div.fifi-card-header {
        display: flex;
        justify-content: space-between;
        
        #fifi-activity-name {
            color: $activity-name-color;
            font-weight: bold;
            font-size: 0.9rem;
        }

        #fifi-activity-date {
            color: $activity-field-color;
            font-size: 0.8rem;
        }
    }

    div.fifi-card-body {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;

        margin: 30px 0;
        font-size: 0.9rem;

        div.fifi-stat, div.fifi-stat > span {
            display: flex;
            align-items: center;
        }

        div.fifi-stat > span > span {
            margin: 0 10px;
            color: $activity-field-color;
            font-weight: 600;
        }
        
        @media (max-width: 750px) {
            display: flex;
            flex-direction: column;

            div.fifi-stat {
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
</style>