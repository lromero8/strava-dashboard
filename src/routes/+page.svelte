<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { activitiesStore } from "../stores/store";
    import type { Activity } from "$lib/activity";
    // import { load } from "./+page.server";

    // let unsubscribe: () => void;
    export let data;

    let activities: Activity[];

    fetchActivities();
    function fetchActivities() {
        // const json = load();
        // console.log(json);
        console.log(data);
        if (data.activities) {
            activities = data.activities;
        }
        // unsubscribe = activitiesStore.subscribe(activities => {
        //     console.log(activities)    
        // })

    }

    // onMount(fetchActivities);

    onDestroy(() => {
    //   unsubscribe();
    });

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<p>Last activity: {activities[0].distance / 1000} km</p>
