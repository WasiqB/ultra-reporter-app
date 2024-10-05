'use client';

import { Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ChartData } from '@/types/types';

interface PieProps {
  title: string;
  description?: string;
  config: ChartConfig;
  data: ChartData[];
  footer?: string;
}

export function PieComponent({
  config,
  data,
  title,
  description,
  footer,
}: PieProps): JSX.Element {
  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle className='text-xl'>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={config}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend
              className='pb-2'
              align='left'
              content={<ChartLegendContent />}
            />
            <Pie
              data={data}
              dataKey='total'
              nameKey='status'
              labelLine={false}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      {footer && (
        <CardFooter className='flex-col gap-2 text-sm'>
          <div className='leading-none text-muted-foreground'>{footer}</div>
        </CardFooter>
      )}
    </Card>
  );
}
