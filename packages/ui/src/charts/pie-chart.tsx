'use client';

import type { ChartData } from '@ultra-reporter/utils/types';
import type { JSX } from 'react';
import { Pie, PieChart } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../components/chart';

interface PieProps {
  title: string;
  description?: string;
  config: ChartConfig;
  data: ChartData[];
  footer?: string;
}

export const PieComponent = ({ config, data, title, description, footer }: PieProps): JSX.Element => (
  <Card className='flex flex-col'>
    <CardHeader className='items-center pb-5'>
      <CardTitle className='text-xl'>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent className='flex-1 pb-0'>
      <ChartContainer className='mx-auto aspect-square max-h-[250px]' config={config}>
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
          <Pie data={data} dataKey='total' labelLine={false} nameKey='status' />
        </PieChart>
      </ChartContainer>
    </CardContent>
    {footer && (
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='text-muted-foreground leading-none'>{footer}</div>
      </CardFooter>
    )}
  </Card>
);
