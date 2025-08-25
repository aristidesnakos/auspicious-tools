"use client";

import React from 'react';
import type { Model, SortState } from '../types';
import { formatCurrency, formatNumber } from '../utils';
// No Shadcn Table component available, keeping native table with Tailwind classes

interface ModelResultsTableProps {
    displayedModels: Model[];
    onSort: (sortBy: keyof Model | 'estimatedCost' | 'promptCost' | 'completionCost') => void;
    sortState: SortState;
    onRowClick: (modelId: string) => void;
    resultsCount: number;
}

const ModelResultsTable: React.FC<ModelResultsTableProps> = ({
    displayedModels,
    onSort,
    sortState,
    onRowClick,
    resultsCount,
}) => {
    const headers = ['Model', 'Est. Cost', 'Input ($/M)', 'Output ($/M)', 'Context'];
    const sortKeyMap: (keyof Model | 'estimatedCost' | 'promptCost' | 'completionCost')[] = ['name', 'estimatedCost', 'promptCost', 'completionCost', 'context_length'];

    return (
        <section id="results">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-slate-800">Model Comparison</h3>
                <div className="text-sm text-slate-600">
                    Showing <span id="results-count" className="font-bold">{resultsCount}</span> models
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="table-responsive">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                {headers.map((header, index) => {
                                    const currentSortKey = sortKeyMap[index];
                                    return (
                                        <th
                                            key={header}
                                            scope="col"
                                            className={`px-6 py-3 text-${index < 2 ? 'left' : 'right'} text-xs font-medium text-slate-500 uppercase tracking-wider sortable ${sortState.by === currentSortKey ? (sortState.order === 'asc' ? 'sort-asc' : 'sort-desc') : ''}`}
                                            onClick={() => onSort(currentSortKey)}
                                        >
                                            {header}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody id="results-table-body" className="bg-white divide-y divide-slate-200">
                            {displayedModels.length === 0 ? (
                                <tr>
                                    <td colSpan={headers.length} className="text-center py-12 px-4 text-slate-500">
                                        No models match your current filters.
                                    </td>
                                </tr>
                            ) : (
                                displayedModels.map(model => (
                                    <tr
                                        key={model.id}
                                        className="hover:bg-slate-50 cursor-pointer"
                                        onClick={() => onRowClick(model.id)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-slate-900">{model.name}</div>
                                            <div className="text-xs text-slate-500">{model.top_provider.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="text-sm font-bold text-amber-700">{formatCurrency(model.estimatedCost)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-600">${(parseFloat(model.pricing.prompt) * 1000000).toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-600">${(parseFloat(model.pricing.completion) * 1000000).toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-600">{formatNumber(model.context_length)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ModelResultsTable;
