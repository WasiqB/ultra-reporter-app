import { Label, Pie, PieChart } from 'recharts';
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

interface DoughNutProps {
  title: string;
  description?: string;
  config: ChartConfig;
  data: ChartData[];
  totalValue: number;
  valueLabel: string;
  footer?: string;
}

const DoughNutComponent = ({
  title,
  description,
  config,
  data,
  totalValue,
  valueLabel,
  footer,
}: DoughNutProps): JSX.Element => {
  return (
    <Card>
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
              innerRadius={50}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {totalValue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        >
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
          <div className='leading-none text-muted-foreground'>{footer}</div>
        </CardFooter>
      )}
    </Card>
  );
};

export default DoughNutComponent;
