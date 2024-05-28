<script lang='ts'>
    import { onMount } from 'svelte';
    import { activitiesStore } from '../stores/store';
    import Menu from '$lib/menu/+page.svelte';


    export let data;

    function setStore() {
        if (data.activities) {
            console.log(data);
            activitiesStore.set(data.activities);
        }
    }

    onMount(setStore);


</script>


<Menu />

<!-- <div>
    <span>Ideas 💡</span>
    <ul>
    
        <li>Menu home page with three links: Run, bike, swim</li>
        <ul>
            <li>Run: show last run ring</li>
            <li>Bike: show last bike ring</li>
            <li>Swim: show last swim ring</li>
            <li>Filter by day, week, month</li>
        </ul>
    
        <li>Show last activity ring</li>
        <ul>
            <li>If run show: run icon, distance, time</li>
            <li>If bike show: bike icon, distance, time</li>
            <li>If swim show: swim icon, distance, time</li>
            <li>Show run kudos count</li>
        </ul>
    
        <li>Show commutes</li>
        <ul>
            <li>Show total distance per week and month</li>
            <li>Show total carbon saved per week and month</li>
        </ul>
    
        <li>Show beers earned</li>
        <ul>
            <li>Per run</li>
            <li>Per month</li>
            <li>Per week</li>
        </ul>
    
        <li>Show calendar of active days</li>
    
        <li>Add Goals</li>
        <ul>
            <li>Show goals completion rings</li>
            <li>Show days left for goal</li>
        </ul>
    
        <li>Add events</li>
        <ul>
            <li>Show event details</li>
            <li>Days left for event</li>
        </ul>
    </ul>
</div> -->

