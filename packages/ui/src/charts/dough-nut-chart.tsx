import type { ChartData } from '@ultra-reporter/utils/types';
import type { JSX } from 'react';
import { Label, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../components/chart';

interface DoughNutProps {
  title: string;
  description?: string;
  config: ChartConfig;
  data: ChartData[];
  totalValue: number;
  valueLabel: string;
  footer?: string;
}

export const DoughNutComponent = ({
  title,
  description,
  config,
  data,
  totalValue,
  valueLabel,
  footer,
}: DoughNutProps): JSX.Element => (
  <Card>
    <CardHeader className='items-center pb-5'>
      <CardTitle className='text-xl'>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent className='flex-1 pb-0'>
      <ChartContainer className='mx-auto aspect-square max-h-[250px]' config={config}>
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
          <Pie data={data} dataKey='total' innerRadius={50} nameKey='status' strokeWidth={5}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text dominantBaseline='middle' textAnchor='middle' x={viewBox.cx} y={viewBox.cy}>
                      <tspan className='fill-foreground font-bold text-3xl' x={viewBox.cx} y={viewBox.cy}>
                        {totalValue.toLocaleString()}
                      </tspan>
                      <tspan className='fill-muted-foreground' x={viewBox.cx} y={(viewBox.cy || 0) + 24}>
                        {valueLabel}
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
    {footer && (
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='text-muted-foreground leading-none'>{footer}</div>
      </CardFooter>
    )}
  </Card>
);
