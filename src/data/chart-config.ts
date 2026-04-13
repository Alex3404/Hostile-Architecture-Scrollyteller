/**
 * Chart.js configuration and utilities for the affordability/homelessness visualization
 */

import type { ChartConfiguration } from 'chart.js';
import { homelessnessData } from './homelessness-data';
import { affordabilityData } from './housing-affordability';

export interface ChartConfigOptions {
    containerId: string;
    yearStart: number;
    yearEnd: number;
}

/**
 * Transform raw data into Chart.js compatible format
 */
export function prepareChartData(options: ChartConfigOptions) {
    const { yearStart, yearEnd } = options;

    // Years array for x-axis
    const years: number[] = [];
    for (let year = yearStart; year <= yearEnd; year++) {
        years.push(year);
    }

    // Prepare homelessness dataset (left axis) - US total
    const homelessnessData_values = years.map((year) => {
        const point = homelessnessData.find((d) => d.year === year);
        return point ? point.count : 0;
    });

    const homelessnessDatasets = [{
        label: 'Unhoused Population (USA)',
        data: homelessnessData_values,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderWidth: 3.5,
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
        yAxisID: 'y',
    }];

    // Prepare affordability dataset (right axis) - US average
    const affordabilityData_values = years.map((year) => {
        const point = affordabilityData.find((d) => d.year === year);
        return point ? point.affordabilityRatio : 0;
    });

    const affordabilityDatasets = [{
        label: 'Affordability Ratio (USA)',
        data: affordabilityData_values,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        borderWidth: 3.5,
        borderDash: [0],
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
        yAxisID: 'y1',
    }];

    return {
        labels: years,
        homelessnessDatasets,
        affordabilityDatasets,
        allDatasets: [...homelessnessDatasets, ...affordabilityDatasets],
    };
}

/**
 * Create Chart.js configuration object
 */
export function createChartConfig(options: ChartConfigOptions) {
    const { labels, allDatasets } = prepareChartData(options);

    return {
        type: 'line',
        data: {
            labels,
            datasets: allDatasets,
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 12,
                            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        },
                        padding: 15,
                        usePointStyle: true,
                        boxWidth: 10,
                    },
                },
                title: {
                    display: false,
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    titleFont: {
                        size: 13,
                        weight: 'bold',
                    },
                    bodyFont: {
                        size: 12,
                    },
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            const yValue = context.parsed.y ?? 0;
                            if ('y1' === context.dataset.yAxisID) {
                                // Affordability ratio
                                label += (yValue as number).toFixed(2);
                            } else {
                                // Homelessness count
                                label += (yValue as number).toLocaleString();
                            }
                            return label;
                        },
                    },
                },
            },
            scales: {
                y: {
                    type: 'linear',
                    position: 'left',
                    min: 300000,
                    max: 850000,
                    title: {
                        display: true,
                        text: 'Unhoused Population (USA)',
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 12,
                            weight: 'bold',
                        },
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.6)',
                        font: {
                            size: 11,
                        },
                        callback: function (value) {
                            return (value as number).toLocaleString();
                        },
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false,
                    },
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    min: 2.5,
                    max: 6.5,
                    title: {
                        display: true,
                        text: 'Affordability Ratio (Price ÷ Income)',
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 12,
                            weight: 'bold',
                        },
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.6)',
                        font: {
                            size: 11,
                        },
                        callback: function (value) {
                            return (value as number).toFixed(1);
                        },
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year',
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 12,
                            weight: 'bold',
                        },
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.6)',
                        font: {
                            size: 11,
                        },
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false,
                    },
                },
            },
        },
    } as ChartConfiguration;
}
