/**
 * Chart controller - Wrapper around Chart.js for GSAP-friendly animations
 * Handles initialization, updates, and animation triggers
 */

import Chart from 'chart.js/auto';
import type { ChartConfiguration } from 'chart.js';
import type { ChartConfigOptions } from './data/chart-config';
import { createChartConfig } from './data/chart-config';

export class AffordabilityChart {
    private chartInstance: Chart | null = null;
    private canvasElement: HTMLCanvasElement | null = null;
    private config: ChartConfiguration | null = null;

    /**
     * Initialize the chart with configuration
     */
    public initialize(options: ChartConfigOptions): Chart {
        // Get or create canvas element
        const containerId = options.containerId;
        let container = document.getElementById(containerId);

        if (!container) {
            throw new Error(`Container with ID "${containerId}" not found in DOM`);
        }

        // Check if canvas already exists, if not create it
        this.canvasElement = container.querySelector('canvas');
        if (!this.canvasElement) {
            this.canvasElement = document.createElement('canvas');
            this.canvasElement.id = `${containerId}-canvas`;
            container.appendChild(this.canvasElement);
        }

        // Create chart configuration
        this.config = createChartConfig(options);

        // Initialize Chart.js
        this.chartInstance = new Chart(this.canvasElement, this.config);

        console.log('Chart initialized successfully');
        return this.chartInstance;
    }

    /**
     * Get the Chart.js instance
     */
    public getChartInstance(): Chart | null {
        return this.chartInstance;
    }

    /**
     * Get the canvas element
     */
    public getCanvasElement(): HTMLCanvasElement | null {
        return this.canvasElement;
    }

    /**
     * Update chart data while preserving animation
     */
    public updateChart(newConfig: ChartConfiguration): void {
        if (!this.chartInstance) {
            console.warn('Chart not initialized');
            return;
        }

        this.chartInstance.data = newConfig.data;
        this.chartInstance.update('none'); // Update without animation
    }

    /**
     * Destroy the chart instance
     */
    public destroy(): void {
        if (this.chartInstance) {
            this.chartInstance.destroy();
            this.chartInstance = null;
        }
    }
}

// Export singleton instance
export const affordabilityChart = new AffordabilityChart();
