'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface BreakEvenInputs {
  initialInvestment: number;
  monthlyCosts: number;
  productPrice: number;
  initialMonthlySales: number;
  monthlyGrowthRate: number;
}

const BreakEvenAnalysis = () => {
  const [inputs, setInputs] = useState<BreakEvenInputs>({
    initialInvestment: 10000,
    monthlyCosts: 1000,
    productPrice: 50,
    initialMonthlySales: 10,
    monthlyGrowthRate: 5,
  });

  const handleInputChange = (field: keyof BreakEvenInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [field]: numValue }));
  };

  const { chartData, breakEvenMonth } = useMemo(() => {
    const data = [];
    let cumulativeProfit = -inputs.initialInvestment;
    let breakEven = null;

    for (let month = 1; month <= 60; month++) {
      const salesUnits = inputs.initialMonthlySales * Math.pow(1 + inputs.monthlyGrowthRate / 100, month - 1);
      const monthlyRevenue = salesUnits * inputs.productPrice;
      const monthlyProfit = monthlyRevenue - inputs.monthlyCosts;
      cumulativeProfit += monthlyProfit;

      data.push({
        month,
        netIncome: Math.round(cumulativeProfit),
        monthlyRevenue: Math.round(monthlyRevenue),
        monthlyCosts: inputs.monthlyCosts,
        salesUnits: Math.round(salesUnits),
      });

      if (cumulativeProfit >= 0 && breakEven === null) {
        breakEven = month;
      }
    }

    return { chartData: data, breakEvenMonth: breakEven };
  }, [inputs]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">Month {label}</p>
          <p className="text-sm text-muted-foreground">
            Net Income: <span className={`font-medium ${data.netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(data.netIncome)}
            </span>
          </p>
          <p className="text-sm text-muted-foreground">Revenue: {formatCurrency(data.monthlyRevenue)}</p>
          <p className="text-sm text-muted-foreground">Sales Units: {data.salesUnits}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Break Even Analysis Chart
          </h1>
          {breakEvenMonth && (
            <p className="text-2xl font-semibold text-foreground">
              You will break even in <span className="text-primary">{breakEvenMonth} months</span>
            </p>
          )}
          {!breakEvenMonth && (
            <p className="text-xl text-muted-foreground">
              Adjust your assumptions to reach break-even within 60 months
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Assumptions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                📊 Assumptions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="initialInvestment" className="text-sm font-medium">
                  Initial Investment
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="initialInvestment"
                    type="number"
                    value={inputs.initialInvestment}
                    onChange={(e) => handleInputChange('initialInvestment', e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyCosts" className="text-sm font-medium">
                  Monthly Costs
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="monthlyCosts"
                    type="number"
                    value={inputs.monthlyCosts}
                    onChange={(e) => handleInputChange('monthlyCosts', e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productPrice" className="text-sm font-medium">
                  Product Price
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="productPrice"
                    type="number"
                    value={inputs.productPrice}
                    onChange={(e) => handleInputChange('productPrice', e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="initialMonthlySales" className="text-sm font-medium">
                  Initial Monthly Sales
                </Label>
                <Input
                  id="initialMonthlySales"
                  type="number"
                  value={inputs.initialMonthlySales}
                  onChange={(e) => handleInputChange('initialMonthlySales', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyGrowthRate" className="text-sm font-medium">
                  Monthly Growth Rate
                </Label>
                <div className="relative">
                  <Input
                    id="monthlyGrowthRate"
                    type="number"
                    step="0.1"
                    value={inputs.monthlyGrowthRate}
                    onChange={(e) => handleInputChange('monthlyGrowthRate', e.target.value)}
                    className="pr-8"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chart */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center justify-center gap-2">
                📈 Net Income Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={formatCurrency}
                      label={{offset: -20}}
                    />
                    <ReferenceLine y={0} stroke="hsl(var(--border))" strokeWidth={2} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="netIncome"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
              💡 Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-red-600">To reduce your costs, check out my <a href="https://medium.com/@just-aristides" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-700 transition-colors">blog</a></h4>
                <p className="text-sm text-muted-foreground">
                  Learn cost optimization strategies, efficient resource management, and smart budgeting techniques to minimize your monthly expenses.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-green-600">To increase your sales, check out <a href="https://arinakos.gumroad.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-700 transition-colors">my automations</a>!</h4>
                <p className="text-sm text-muted-foreground">
                  Discover automated marketing tools, sales funnels, and growth strategies to boost your monthly sales and accelerate your path to profitability.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BreakEvenAnalysis;