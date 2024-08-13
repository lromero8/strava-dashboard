import { Chart } from 'chart.js';

export function createChart(chartCanvas: HTMLCanvasElement|null, chartLabels: string[], chartValues: number[]) {
    const ctx = chartCanvas?.getContext('2d');
    if (ctx) {
        const chart = plotChart(ctx, chartLabels, chartValues);
        return chart;
    }
}

function plotChart(ctx: CanvasRenderingContext2D, chartLabels: string[], chartValues: number[]) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Running Progress',
                backgroundColor: '#0090E3',
                borderColor: '#fff',
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
