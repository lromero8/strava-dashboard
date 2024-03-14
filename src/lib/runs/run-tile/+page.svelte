<script lang='ts'>
    import type { Activity } from '$lib/activity';
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

    const formattedDate = formatActivityDate(run.start_date);

</script>

<span>{formattedDate}</span>
<Ring activityProperty='Distance' activityValue={`${run.distance} km`}  percentageAchieved={100} />

<style lang='scss'></style>