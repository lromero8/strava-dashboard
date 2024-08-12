<script lang='ts'>
    import { calendarActivitiesStore } from '../../stores/store';
    import { goto } from '$app/navigation';
    import type { Activity } from '$lib/activity';
    import { onMount } from 'svelte';
    import { Chart, registerables } from 'chart.js';
    import { get } from 'svelte/store';
    Chart.register(...registerables);


	export let data;

    let chart: Chart|null;
    let activityType: 'Run'|'Ride'|'Swim' = 'Run';
	let chartCanvas: HTMLCanvasElement|null;
    let timeOptions = [
        {
            label: 'Current month',
            month: new Date().getMonth()
        },
        {
            label: 'Last three months',
            month: new Date().getMonth() - 2
        },
        {
            label: 'Last six months',
            month: new Date().getMonth() - 5
        }
    ];


    $: if (data.calendarActivities) {
        calendarActivitiesStore.set(data.calendarActivities);
        updateChart();
    }

    function createChart(chartLabels: string[], chartValues: number[]) {
        const ctx = chartCanvas?.getContext('2d');
        if (ctx) {
            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartLabels,
                    datasets: [{
                        label: 'Running Progress',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        fill: true,
                        data: chartValues
                    }]
                },
                options: {
                    scales: {
                        x: {
                            ticks: {
                                color: 'white' // X-axis labels color
                            }
                        },
                        y: {
                            ticks: {
                                color: 'white' // Y-axis labels color
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white' // Legend labels color
                            }
                        },
                        tooltip: {
                            titleColor: 'white', // Tooltip title color
                            bodyColor: 'white' // Tooltip body color
                        }
                    }
                }
            });
        }
    }

    function updateChart() {
        const calendarActivities = get(calendarActivitiesStore).filter(a => a.sport_type === activityType);
        const chartLabels = calendarActivities.map((a: Activity) => formatToShortDate(a.start_date));
        const chartValues = calendarActivities.map((a: Activity) => a.distance / 1000);

        const trendData: TrendDataPoint[] = aggregateByWeek(calendarActivities).map((week) => ({
            x: week.month,
            y: week.count, // Or use week.distance or week.time depending on the trend
        }));

        const newLabels = trendData.map(d => d.x);
        const newValues = trendData.map(d => d.y);

        if (chart) {
            // Update chart data
            chart.data.labels = newLabels;
            chart.data.datasets[0].data = newValues;
            chart.update();
        }
        else {
            createChart(newLabels, newValues);
        }
    }

    onMount(() => {
        updateChart();
    });

    
    const options = { 
        year: 'numeric' as const, 
        month: 'short' as const, 
        day: 'numeric' as const
    };
    const formatToShortDate = (date: Date|string) => new Intl.DateTimeFormat('en-US', options).format(new Date(date));

    type AggregatedData = {
    week: string;
    month: string;
    count: number;
    distance: number;
    time: number;
};

type TrendDataPoint = {
  x: string;
  y: number;
};

function aggregateByWeek(activities: Activity[]): AggregatedData[] {
    const weeks: Record<string, AggregatedData> = {};
  
    activities.forEach((activity) => {
        const date = new Date(activity.start_date);
        const week = getWeekNumber(date);
        const month = getMonth(date);
    
        if (!weeks[week]) {
          weeks[week] = {
            week: week,
            month: month,
            count: 0,
            distance: 0,
            time: 0,
          };
        }
    
        weeks[week].count += 1;
        weeks[week].distance += activity.distance;
        weeks[week].time += activity.moving_time;
    });
    
    return Object.values(weeks);
  }
  
  function getWeekNumber(d: Date): string {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const yearStart = new Date(Date.UTC(d.getFullYear(), 0, 1));
    const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    return `${d.getFullYear()}-W${weekNo}`;
  }

  function getMonth(d: Date): string {
  const month = d.getMonth() + 1; // Months are 0-based in JavaScript
  return formatToShortDate(d);
  return `${d.getFullYear()}-${month.toString().padStart(2, '0')}`;
}


</script>

<div class="fifi-container">
    <h1 style="color: white;">Progress</h1>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    {#each timeOptions as option}
        <!-- <option on:select={() => goto(`/progress?month=${option.month}`)}>{option.label}</option> -->
        <div style="color: white; cursor: pointer; margin-top: 100px;" on:click={() => goto(`/progress?month=${option.month}`)}>{option.label}</div>
    {/each}

    {#if $calendarActivitiesStore}
        <span style="color: white;">Store: {$calendarActivitiesStore.length}</span>
    {/if}

    <canvas bind:this={chartCanvas}></canvas>

</div>

<style lang='scss'>
    .fifi-container {
        margin-top: 4.5rem;
    }
</style>
