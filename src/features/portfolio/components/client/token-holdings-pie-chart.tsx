'use client';

import {
  Card,
  CardContent,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/ui';
import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';
import type { Portfolio } from '../../types';
import { formatters } from '../../utils';

interface TokenHoldingsPieChartProps {
  portfolio: Portfolio;
}

interface ChartData {
  token: string;
  value: number;
  fill: string;
  name: string;
  symbol: string;
}

const CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

export const TokenHoldingsPieChart = ({
  portfolio,
}: TokenHoldingsPieChartProps) => {
  // Transform portfolio data to chart format
  const chartData = React.useMemo((): ChartData[] => {
    const data: ChartData[] = [];

    // Add tokens
    portfolio.tokens.forEach((token, index) => {
      const value = parseFloat(token.valueUsd);
      if (value > 0) {
        data.push({
          token: token.symbol,
          value,
          fill: CHART_COLORS[(index + 1) % CHART_COLORS.length],
          name: token.symbol,
          symbol: token.symbol,
        });
      }
    });

    return data;
  }, [portfolio]);

  // Chart configuration
  const chartConfig: ChartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      value: {
        label: 'Value',
      },
    };

    chartData.forEach((item, index) => {
      config[item.token.toLowerCase()] = {
        label: item.name,
        color: CHART_COLORS[index % CHART_COLORS.length],
      };
    });

    return config;
  }, [chartData]);

  // Calculate total value for center display
  const formattedTotalValue = `$${formatters.value(parseFloat(portfolio.totalValue), 'compact')}`;

  return (
    <Card className="from-card to-card/50 overflow-hidden border-0 bg-gradient-to-br shadow-sm">
      <CardContent className="p-6">
        <ChartContainer
          className="mx-auto aspect-square max-h-[300px]"
          config={chartConfig}
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => [
                    `$${formatters.value(Number(value), 'compact')} ${name}`,
                  ]}
                  hideLabel
                />
              }
              cursor={false}
            />
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={70}
              label={({ payload }) => payload.symbol}
              labelLine={false}
              nameKey="name"
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        dominantBaseline="middle"
                        textAnchor="middle"
                        x={viewBox.cx}
                        y={viewBox.cy}
                      >
                        <tspan
                          className="fill-foreground text-3xl font-bold"
                          x={viewBox.cx}
                          y={viewBox.cy}
                        >
                          {formattedTotalValue}
                        </tspan>
                        <tspan
                          className="fill-muted-foreground"
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                        >
                          Total Value
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
