<script lang='ts'>
    import { calendarActivitiesStore } from '../../stores/store';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { Chart, registerables } from 'chart.js';
    import { get } from 'svelte/store';
    import { aggregateData, type AggregationType } from './aggregate-data';
    import { createChart } from './create-chart';
    Chart.register(...registerables);


    interface TimeOption {
        label: string;
        month: number;
        aggregationType: AggregationType;
    }

	export let data;

    let chart: Chart|null;
    let activityType: 'Run'|'Ride'|'Swim' = 'Run';
	let chartCanvas: HTMLCanvasElement|null;
    let timeOptions: TimeOption[] = [
        {
            label: 'Current month',
            month: new Date().getMonth(),
            aggregationType: 'Daily'
        },
        {
            label: 'Last three months',
            month: new Date().getMonth() - 2,
            aggregationType: 'Weekly'
        },
        {
            label: 'Last six months',
            month: new Date().getMonth() - 5,
            aggregationType: 'Weekly'
        }
    ];
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


    function select(timeOption: TimeOption) {
        selectedAggregationType = timeOption.aggregationType;
        goto(`/progress?month=${timeOption.month}`);
    }


</script>

<div class="fifi-container">
    <h1 style="color: white;">Progress</h1>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    {#each timeOptions as option}
        <!-- <option on:select={() => goto(`/progress?month=${option.month}`)}>{option.label}</option> -->
        <div style="color: white; cursor: pointer; margin-top: 100px;" on:click={() => select(option)}>{option.label}</div>
    {/each}

    {#if $calendarActivitiesStore}
        <span style="color: white;">Store: {$calendarActivitiesStore.length}</span>
    {/if}

    <div class="fifi-chart-container">
        <canvas bind:this={chartCanvas}></canvas>
    </div>

</div>

<style lang='scss'>
    .fifi-container {
        margin-top: 4.5rem;
    }

    .fifi-chart-container {
        width: 80vw;
        height: 60vh;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;

        @media screen and (max-width: 750px) {
            width: 90vw;
        }
    }

    canvas {
        max-width: 100%;
        max-height: 100%;
    }

</style>
