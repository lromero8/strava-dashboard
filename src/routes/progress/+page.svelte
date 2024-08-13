<script lang='ts'>
    import { calendarActivitiesStore } from '../../stores/store';
    import { onMount } from 'svelte';
    import { Chart, registerables } from 'chart.js';
    import { get } from 'svelte/store';
    import { aggregateData, type AggregationType } from './aggregate-data';
    import { createChart } from './create-chart';
    import TimeSelector from './time-selector/+page.svelte';
    Chart.register(...registerables);


	export let data;

    let chart: Chart|null;
    let activityType: 'Run'|'Ride'|'Swim' = 'Run';
	let chartCanvas: HTMLCanvasElement|null;
    let selectedAggregationType: AggregationType = 'Daily';


    $: if (data.calendarActivities) {
        calendarActivitiesStore.set(data.calendarActivities);
        updateChart();
    }

    function updateChart() {
        const calendarActivities = get(calendarActivitiesStore).filter(a => a.sport_type === activityType);
        
        const trendData = aggregateData(calendarActivities, selectedAggregationType);
        const kmLabels = trendData.map(d => d.x);
        const dateValues = trendData.map(d => d.y);


        if (chart) {
            // Update chart data
            chart.data.labels = kmLabels;
            chart.data.datasets[0].data = dateValues;
            chart.update();
        }
        else {
            const initChart = createChart(chartCanvas, kmLabels, dateValues);
            if (initChart) {
                chart = initChart;
            }
        }
    }

    onMount(() => {
        updateChart();
    });


    function select(aggregationType: AggregationType) {
        selectedAggregationType = aggregationType;
    }


</script>

<div class="fifi-container">

    <div class="fifi-header">
        <h1>Progress</h1>
    </div>
    
    <TimeSelector on:selected={(event) => select(event.detail.aggregationType)} />
        
    <div class="fifi-chart-container">
        <canvas bind:this={chartCanvas}></canvas>
    </div>

</div>

<style lang='scss'>
    div.fifi-container {
        margin-top: 4.5rem;
        max-width: 940px;
        margin-right: auto;
        margin-left: auto;


        div.fifi-header {
            display: flex;
            justify-content: space-between;
            width: 38rem;

            h1 { color: white; }

            @media (max-width: 750px) {
                margin: 0 auto;
                width: 20rem;
                padding: 0 1rem;
            }

        }
    
        .fifi-chart-container {
            width: 70vw;
            height: 60vh;
    
            @media screen and (max-width: 750px) {
                width: 90vw;
            }
        }
    
        canvas {
            max-width: 100%;
            max-height: 100%;
        }
    }

</style>
