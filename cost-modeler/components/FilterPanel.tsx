"use client";

import React from 'react';
import type { FiltersState, RangeOption } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider'; // Import Slider
import { Label } from '@/components/ui/label';

interface FilterPanelProps {
    filters: FiltersState;
    onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPromptPricingChange: (value: number[]) => void; // New prop for slider change
    maxPrice: number; // New prop for slider max value
    onContextLengthChange: (value: number[]) => void; // New prop for context length slider change
    minContextLength: number; // New prop for context length slider min value
    maxContextLength: number; // New prop for context length slider max value
    providers: string[];
    series: string[];
    categories: string[];
    isSidebarOpen: boolean; // To control visibility on mobile
}

const CreateFilterGroup: React.FC<{
    title: string;
    name: string;
    items: (string | RangeOption)[];
    type?: 'checkbox' | 'radio';
    filters: FiltersState;
    onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ title, name, items, type = 'checkbox', filters, onFilterChange }) => (
    <Card>
        <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent className={`space-y-2 ${name === 'provider' ? 'max-h-48 overflow-y-auto' : ''}`}>
            {type === 'radio' ? (
                <div className="space-y-1">
                    {items.map(item => {
                        const value = typeof item === 'string' ? item : item.value;
                        const label = typeof item === 'string' ? item : item.label;
                        return (
                            <div key={value} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id={`${name}-${value}`}
                                    name={name}
                                    value={value}
                                    className="h-4 w-4 rounded-full border-slate-300 text-primary focus:ring-primary"
                                    onChange={onFilterChange}
                                    checked={filters[name] && (filters[name] as string[])[0] === value}
                                />
                                <Label htmlFor={`${name}-${value}`} className="text-sm">
                                    {label}
                                </Label>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="space-y-2">
                    {items.map(item => {
                        const value = typeof item === 'string' ? item : item.value;
                        const label = typeof item === 'string' ? item : item.label;
                        return (
                            <div key={value} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`${name}-${value}`}
                                    checked={filters[name] && (filters[name] as string[]).includes(value)}
                                    onCheckedChange={(checked) => onFilterChange({
                                        target: { name, value, type: 'checkbox', checked: checked as boolean }
                                    } as React.ChangeEvent<HTMLInputElement>)}
                                />
                                <Label htmlFor={`${name}-${value}`} className="text-sm">
                                    {label}
                                </Label>
                            </div>
                        );
                    })}
                </div>
            )}
        </CardContent>
    </Card>
);

const FilterPanel: React.FC<FilterPanelProps> = ({
    filters,
    onFilterChange,
    onPromptPricingChange,
    maxPrice,
    onContextLengthChange,
    minContextLength,
    maxContextLength,
    providers,
    series,
    categories,
    isSidebarOpen,
}) => {
    const currentPromptPriceRange = (filters.prompt_pricing && filters.prompt_pricing.length === 2)
        ? filters.prompt_pricing
        : [0, maxPrice]; // Default to full range

    const currentContextLengthRange = (filters.context_length && filters.context_length.length === 2)
        ? filters.context_length
        : [minContextLength, maxContextLength]; // Default to full range

    return (
        <aside className="bg-white">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Filters</h2>
            <div className="space-y-6">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Prompt Pricing</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="prompt-pricing-slider" className="text-sm">
                                Price Range: ${currentPromptPriceRange[0].toFixed(2)} - ${currentPromptPriceRange[1].toFixed(2)}
                            </Label>
                        </div>
                        <Slider
                            id="prompt-pricing-slider"
                            min={0}
                            max={maxPrice}
                            step={0.01}
                            value={currentPromptPriceRange as number[]}
                            onValueChange={onPromptPricingChange}
                            className="w-[90%]"
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Context Length</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="context-length-slider" className="text-sm">
                                Context Range: {currentContextLengthRange[0].toLocaleString()} - {currentContextLengthRange[1].toLocaleString()}
                            </Label>
                        </div>
                        <Slider
                            id="context-length-slider"
                            min={minContextLength}
                            max={maxContextLength}
                            step={1000} // Adjust step as needed for context length
                            value={currentContextLengthRange as number[]}
                            onValueChange={onContextLengthChange}
                            className="w-[90%]"
                        />
                    </CardContent>
                </Card>

                <CreateFilterGroup
                    title="Provider"
                    name="provider"
                    items={providers}
                    filters={filters}
                    onFilterChange={onFilterChange}
                />
                <CreateFilterGroup
                    title="Series"
                    name="series"
                    items={series}
                    filters={filters}
                    onFilterChange={onFilterChange}
                />
                <CreateFilterGroup
                    title="Categories"
                    name="categories"
                    items={categories}
                    filters={filters}
                    onFilterChange={onFilterChange}
                />
            </div>
        </aside>
    );
};

export default FilterPanel;
