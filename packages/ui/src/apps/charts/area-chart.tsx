'use client';

import type { AreaChartData } from '@ultra-reporter/utils/types';
import type { JSX } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../../components/chart';

interface AreaChartProps {
  title: string;
  description: string;
  config: ChartConfig;
  data: AreaChartData[];
  footer?: string;
  subFooter?: string;
}

export const AreaChartComponent = ({
  title,
  description,
  config,
  data,
  footer,
  subFooter,
}: AreaChartProps): JSX.Element => (
  <Card>
    <CardHeader className='items-center pb-5'>
      <CardTitle className='text-xl'>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent className='flex-1 pb-5'>
      <ChartContainer config={config}>
        <AreaChart
          accessibilityLayer
          data={data}
          margin={{
            top: 5,
            left: -20,
            right: 12,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={true} />
          <XAxis
            axisLine={false}
            dataKey='property'
            hide
            tickFormatter={(value) => value.slice(0, 5)}
            tickLine={false}
            tickMargin={5}
          />
          <ChartTooltip content={<ChartTooltipContent indicator='dot' />} cursor={false} />
          <Area
            dataKey='duration'
            fill='var(--color-property)'
            fillOpacity={0.4}
            stroke='var(--color-property)'
            type='linear'
          />
        </AreaChart>
      </ChartContainer>
    </CardContent>
    {footer && (
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 font-medium leading-none'>{footer}</div>
            {subFooter && <div className='flex items-center gap-2 text-muted-foreground leading-none'>{subFooter}</div>}
          </div>
        </div>
      </CardFooter>
    )}
  </Card>
);
