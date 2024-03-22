<script lang='ts'>
    import { calculateTotalCaloriesBurned, calculateTotalBeersEarned, calculateCO2Saved } from '$lib/shared/activities-helper';
    import Icon from '$lib/icons/+page.svelte';
    import type { Activity } from '$lib/activity';

    export let ride: Activity;

    const options = { 
        year: 'numeric' as const, 
        month: 'long' as const, 
        day: 'numeric' as const, 
        hour: '2-digit' as const, 
        minute: '2-digit' as const, 
        hour12: true as const
    };

    const fontColor = '#f9725c';

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

    const formattedDate = formatActivityDate(ride.start_date);
    const formattedDistance = `${(ride.distance / 1000).toFixed(2)} km`
    const formattedTime = formatTime(ride.moving_time);
    const co2Saved = calculateCO2Saved(ride.distance / 1000);
    const elevationGain = ride.total_elevation_gain;
    const caloriesBurned = calculateTotalCaloriesBurned(ride.moving_time);
    const beersEarned = Math.round(calculateTotalBeersEarned(caloriesBurned)).toString();

</script>

<div class="fifi-card">
    <div class="fifi-card-header">
        <span>{ride.name}</span>
        <span>{formattedDate}</span>
    </div>

    <div class="fifi-card-body">
        <div class="fifi-stat">
            <span>
                <Icon name='Bike' size='22' color={fontColor} />
                <span>Distance: </span>
            </span>
            <span>{formattedDistance}</span>
        </div>

        <div class="fifi-stat">
            <span>
                <Icon name='TimerOutline' size='22' color={fontColor} />
                <span>Time: </span>
            </span>
            <span>{formattedTime}</span>
        </div>

        <div class="fifi-stat">
            <span>
                <Icon name='MoleculeCo2' size='22' color='{fontColor}' />
                <span>Carbon saved: {co2Saved.toPrecision(3)} kg CO2</span>
            </span>
        </div>

        <div class="fifi-stat">
            <span>
                <Icon name='ElevationRise' size='22' color={fontColor} />
                <span>Elevation gained: </span>
            </span>
            <span>{elevationGain} m</span>
        </div>

        <div class="fifi-stat">
            <span>
                <Icon name='Fire' size='22' color={fontColor} />
                <span>Calories burned: </span>
            </span>
            <span>{caloriesBurned.toPrecision(3)}</span>
        </div>

        <div class="fifi-stat">
            <span>
                <Icon name='GlassMugVariant' size='22' color={fontColor} />
                <span>Kölschs earned: </span>
            </span>
            <span>{beersEarned}</span>
        </div>
    </div>
</div>


<style lang='scss'>
    $bg-color: #fff;
    $header-text-color: #f9725c;
    $text-color: #000;

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

        background-color: $bg-color;
        color: $header-text-color;
        border: 2px solid transparent;
        border-radius: 4px;
    }

    div.fifi-card-header {
        display: flex;
        justify-content: space-between;
        
        font-size: 0.9rem;
        font-weight: bold;
    }

    div.fifi-card-body {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;

        margin: 30px 0;

        div.fifi-stat, div.fifi-stat > span {
            display: flex;
            align-items: center;
        }

        div.fifi-stat > span > span {
            margin: 0 10px;
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