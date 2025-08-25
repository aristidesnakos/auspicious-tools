"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


// Import types
import type { Model, UnitType, FiltersState, SortState, RangeOption } from './types';

// Import utilities and data
import { modelsData as initialModelsData, calculateTokens } from './utils';

// Import sub-components
import CostCalculatorForm from './components/CostCalculatorForm';
import FilterPanel from './components/FilterPanel';
import CostResultsChart from './components/CostResultsChart';
import ModelResultsTable from './components/ModelResultsTable';
import ModelDetailModal from './components/ModelDetailModal';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const CostModelerPage = () => {
    const [inputValue, setInputValue] = useState<number>(10000);
    const [unit, setUnit] = useState<UnitType>('words');
    const [estimatedTokens, setEstimatedTokens] = useState<number>(0);
    const [filters, setFilters] = useState<FiltersState>({
        prompt_pricing: [0, 0.5], // Default to models under $0.50, now a range
        context_length: [0, 9999999], // Default to any context length
        provider: ['OpenAI', 'Anthropic'] // Default to OpenAI and Anthropic models
    });
    const [sort, setSort] = useState<SortState>({ by: 'estimatedCost', order: 'asc' });
    const [displayedModels, setDisplayedModels] = useState<Model[]>([]);
    const [resultsCount, setResultsCount] = useState<number>(0);
    const [calculationSummary, setCalculationSummary] = useState<{
        inputValue: number;
        unit: UnitType;
        estimatedTokens: number;
    } | null>(null);
    const [selectedModel, setSelectedModel] = useState<Model | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    // Prepare data for filters (could also be part of utils.ts if static)
    const providers = Array.from(new Set(initialModelsData.map(m => m.top_provider.name)));
    const series = Array.from(new Set(initialModelsData.map(m => m.series))).sort();
    const categories = Array.from(new Set(initialModelsData.flatMap(m => m.categories))).sort();
    const MIN_CONTEXT_LENGTH = 0;
    const MAX_CONTEXT_LENGTH = 10000000; // A very large number to cover all possible context lengths
    const MAX_PRICE = 10; // Define a reasonable max price for the slider, e.g., $10

    const applyFiltersAndSort = useCallback((modelsToProcess: Model[]): Model[] => {
        let filteredModels = [...modelsToProcess];

        Object.keys(filters).forEach(key => {
            const filterValues = filters[key as keyof FiltersState];
            if (filterValues && filterValues.length > 0) {
                filteredModels = filteredModels.filter(model => {
                    if (key === 'context_length') {
                        const [minContext, maxContext] = filterValues as number[];
                        const modelContext = model.context_length;
                        return modelContext >= minContext && modelContext <= maxContext;
                    }
                    if (key === 'prompt_pricing') {
                        const [minPrice, maxPrice] = filterValues as number[];
                        const modelPrice = parseFloat(model.pricing.prompt);
                        return modelPrice >= minPrice && modelPrice <= maxPrice;
                    }
                    if (key === 'provider') {
                        return (filterValues as string[]).includes(model.top_provider.name);
                    }
                    if (key === 'series') {
                        return (filterValues as string[]).includes(model.series);
                    }
                    if (key === 'categories') {
                        return (filterValues as string[]).some(cat => model.categories.includes(cat));
                    }
                    return false;
                });
            }
        });

        const { by, order } = sort;
        filteredModels.sort((a, b) => {
            let valA: string | number, valB: string | number;
            switch (by) {
                case 'name':
                    valA = a.name.toLowerCase();
                    valB = b.name.toLowerCase();
                    break;
                case 'estimatedCost':
                    valA = a.estimatedCost;
                    valB = b.estimatedCost;
                    break;
                case 'promptCost':
                    valA = parseFloat(a.pricing.prompt);
                    valB = parseFloat(b.pricing.prompt);
                    break;
                case 'completionCost':
                    valA = parseFloat(a.pricing.completion);
                    valB = parseFloat(b.pricing.completion);
                    break;
                case 'context_length':
                    valA = a.context_length;
                    valB = b.context_length;
                    break;
                default:
                    const aVal = a[by as keyof Model];
                    const bVal = b[by as keyof Model];
                    if (typeof aVal === 'string' && typeof bVal === 'string') {
                        valA = aVal.toLowerCase();
                        valB = bVal.toLowerCase();
                    } else if (typeof aVal === 'number' && typeof bVal === 'number') {
                        valA = aVal;
                        valB = bVal;
                    } else {
                        return 0;
                    }
            }
            if (valA < valB) return order === 'asc' ? -1 : 1;
            if (valA > valB) return order === 'asc' ? 1 : -1;
            return 0;
        });
        return filteredModels;
    }, [filters, sort]);

    const handleCalculation = useCallback(() => {
        const tokens = calculateTokens(inputValue, unit);
        setEstimatedTokens(tokens);

        setCalculationSummary({
            inputValue,
            unit,
            estimatedTokens: tokens
        });

        const updatedModelsData = initialModelsData.map(model => ({
            ...model,
            estimatedCost: tokens * parseFloat(model.pricing.prompt)
        }));
        
        const newDisplayedModels = applyFiltersAndSort(updatedModelsData);
        setDisplayedModels(newDisplayedModels);
        setResultsCount(newDisplayedModels.length);
    }, [inputValue, unit, applyFiltersAndSort]);

    useEffect(() => {
        handleCalculation();
    }, [handleCalculation]); // This will run on initial mount and when handleCalculation changes (due to inputValue, unit, or applyFiltersAndSort)

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setFilters(prevFilters => {
            const newFilters = { ...prevFilters };
            if (type === 'radio') {
                // For radio buttons, ensure the filter is treated as a string array
                newFilters[name as keyof FiltersState] = value ? [value] : [];
            } else {
                // For checkboxes, ensure the filter is treated as a string array
                const currentValues = (newFilters[name as keyof FiltersState] || []) as string[];
                if (checked) {
                    newFilters[name as keyof FiltersState] = [...currentValues, value];
                } else {
                    newFilters[name as keyof FiltersState] = currentValues.filter((v: string) => v !== value);
                }
            }
            return newFilters;
        });
    };

    const handlePromptPricingChange = (value: number[]) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            prompt_pricing: value,
        }));
    };

    const handleContextLengthChange = (value: number[]) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            context_length: value,
        }));
    };

    const handleSort = (sortBy: keyof Model | 'estimatedCost' | 'promptCost' | 'completionCost') => {
        setSort(prevSort => {
            if (prevSort.by === sortBy) {
                return { ...prevSort, order: prevSort.order === 'asc' ? 'desc' : 'asc' };
            }
            return { by: sortBy, order: 'asc' };
        });
    };
    
    const handleRowClick = (modelId: string) => {
        const model = initialModelsData.find(m => m.id === modelId); // Find from original data
        if (model) {
             // Recalculate estimatedCost for the specific model to show in modal, if needed, or ensure it's up-to-date
            const currentTokens = calculateTokens(inputValue, unit);
            setSelectedModel({
                ...model,
                estimatedCost: currentTokens * parseFloat(model.pricing.prompt)
            });
        }
    };

    const closeModal = () => {
        setSelectedModel(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Sidebar */}
                    <div className="w-64 flex-shrink-0">
                        <FilterPanel
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onPromptPricingChange={handlePromptPricingChange}
                            maxPrice={MAX_PRICE}
                            onContextLengthChange={handleContextLengthChange} // New prop for context length slider
                            minContextLength={MIN_CONTEXT_LENGTH} // New prop for context length slider min value
                            maxContextLength={MAX_CONTEXT_LENGTH} // New prop for context length slider max value
                            providers={providers}
                            series={series}
                            categories={categories}
                            isSidebarOpen={isSidebarOpen}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Title Section */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">LLM Cost Visualizer</h2>
                            <p className="text-gray-600 mb-1">Estimate and compare processing costs across 400+ models on OpenRouter.</p>
                            <p className="text-sm text-gray-500">Note: Free models can serve up to 1000 API calls per day at a slower speed.</p>
                        </div>

                        {/* Calculator Card */}
                        <div className="mb-8 max-w-2xl mx-auto">
                            <CostCalculatorForm
                                inputValue={inputValue}
                                onInputValueChange={setInputValue}
                                unit={unit}
                                onUnitChange={setUnit}
                                onCalculate={handleCalculation}
                                calculationSummary={calculationSummary}
                            />
                        </div>

                        {/* Results */}
                        <div className="mb-8">
                            <CostResultsChart displayedModels={displayedModels} />
                        </div>
                        
                        <div>
                            <ModelResultsTable
                                displayedModels={displayedModels}
                                onSort={handleSort}
                                sortState={sort}
                                onRowClick={handleRowClick}
                                resultsCount={resultsCount}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ModelDetailModal model={selectedModel} onClose={closeModal} />
        </div>
    );
};

export default CostModelerPage;
