"use client";

import React from 'react';
import type { UnitType } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CostCalculatorFormProps {
    inputValue: number;
    onInputValueChange: (value: number) => void;
    unit: UnitType;
    onUnitChange: (unit: UnitType) => void;
    onCalculate: () => void;
    calculationSummary: {
        inputValue: number;
        unit: UnitType;
        estimatedTokens: number;
    } | null;
}

const CostCalculatorForm: React.FC<CostCalculatorFormProps> = ({
    inputValue,
    onInputValueChange,
    unit,
    onUnitChange,
    onCalculate,
    calculationSummary,
}) => {
    return (
        <Card className="mb-8">
            <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Input Quantity</label>
                        <Input
                            type="number"
                            value={inputValue}
                            onChange={(e) => onInputValueChange(Number(e.target.value))}
                            className="w-full"
                            placeholder="10000"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                        <Select value={unit} onValueChange={onUnitChange}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pages">Pages (est. 450 words/page)</SelectItem>
                                <SelectItem value="words">Words</SelectItem>
                                <SelectItem value="tokens">Tokens</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                
                <div className="text-center mb-4">
                    <Button onClick={onCalculate} className="px-8 py-2 bg-orange-500 hover:bg-orange-600">
                        Calculate Costs
                    </Button>
                </div>

                {calculationSummary && (
                    <>
                        <p className="text-sm text-gray-600 text-center">
                            Based on your input of {calculationSummary.inputValue.toLocaleString()} {calculationSummary.unit}, the estimated token count is ~{calculationSummary.estimatedTokens.toLocaleString()} tokens.
                        </p>
                        <p className="text-xs text-gray-500 text-center mt-1">
                            Disclaimer: Token counts are estimates. Actual usage may vary by model and text complexity.
                        </p>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default CostCalculatorForm;
