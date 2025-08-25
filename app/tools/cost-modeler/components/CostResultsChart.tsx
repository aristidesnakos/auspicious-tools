"use client";

import React, { useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    TooltipItem,
    Scale,
    Tick,
} from 'chart.js';
import type { Model } from '../types';
import { formatCurrency } from '../utils';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface CostResultsChartProps {
    displayedModels: Model[];
}

const CostResultsChart: React.FC<CostResultsChartProps> = ({ displayedModels }) => {
    const chartRef = useRef<ChartJS<'bar', number[], string>>(null);

    const top5Models = displayedModels.slice(0, 5);

    const chartDataConfig = {
        labels: top5Models.map(m => m.name),
        datasets: [{
            label: 'Estimated Input Cost',
            data: top5Models.map(m => m.estimatedCost),
            backgroundColor: 'rgba(217, 119, 6, 0.7)',
            borderColor: 'rgba(217, 119, 6, 1)',
            borderWidth: 1
        }]
    };

    const chartOptions: ChartOptions<'bar'> = {
        maintainAspectRatio: false,
        responsive: true,
        indexAxis: 'y' as const,
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    callback: function(value: string | number) {
                        return formatCurrency(typeof value === 'string' ? parseFloat(value) : value);
                    }
                }
            },
            y: {
                ticks: {
                    autoSkip: false,
                    callback: function(this: Scale, value: string | number, index: number, ticks: Tick[]) {
                        // In Chart.js v3/v4, `this.getLabelForValue` is the correct way to get the label
                        // The value passed to callback is the tick value itself (usually index for category scale)
                        // For category scales, labels are directly available via `this.chart.data.labels`
                        const label = this.chart.data.labels ? (this.chart.data.labels[index] as string) : '';
                        return label.length > 25 ? label.substring(0, 25) + '...' : label;
                    }
                }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function(context: TooltipItem<'bar'>) {
                        return `Cost: ${formatCurrency(context.parsed.x)}`;
                    }
                }
            }
        }
    };
    
    // Ensure chart updates when displayedModels change
    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.update();
        }
    }, [displayedModels]);

    return (
        <section id="chart-section" className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Top 5 Most Affordable Models (Input Cost)</h3>
            <div className="chart-container">
                {top5Models.length > 0 ? (
                    <Bar ref={chartRef} data={chartDataConfig} options={chartOptions} />
                ) : (
                    <p className="text-center text-slate-500 py-10">No data available for chart.</p>
                )}
            </div>
        </section>
    );
};

export default CostResultsChart;
