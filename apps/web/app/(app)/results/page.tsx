'use client';

import type { ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table';
import { AreaChartComponent } from '@ultra-reporter/ui/charts/area-chart';
import { DoughNutComponent } from '@ultra-reporter/ui/charts/dough-nut-chart';
import { PieComponent } from '@ultra-reporter/ui/charts/pie-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ultra-reporter/ui/components/card';
import type { ChartConfig } from '@ultra-reporter/ui/components/chart';
import { Skeleton } from '@ultra-reporter/ui/components/skeleton';
import { getFormattedData, type TestResultData } from '@ultra-reporter/ui/data';
import { DataTable } from '@ultra-reporter/ui/data-table/data-table';
import { columns } from '@ultra-reporter/ui/data-table/table/columns';
import { NavBar } from '@ultra-reporter/ui/home/nav-bar';
import { cn } from '@ultra-reporter/utils/cn';
import type { FormattedData } from '@ultra-reporter/utils/types';
import { type JSX, useEffect, useState } from 'react';

const chartConfig: ChartConfig = {
  total: {
    label: 'Test Cases',
  },
  pass: {
    label: 'Passes',
    color: 'var(--passed)',
  },
  fail: {
    label: 'Failed',
    color: 'var(--failed)',
  },
  skip: {
    label: 'Skipped',
    color: 'var(--skipped)',
  },
};

const barConfig: ChartConfig = {
  property: {
    label: 'Method',
    color: 'var(--failed)',
  },
};

const ResultsPage = (): JSX.Element => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [result, setResult] = useState<TestResultData[]>([]);
  const [formattedData, setFormattedData] = useState<FormattedData>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const resultData = localStorage.getItem('json-data') as string;
    if (resultData) {
      const testResult: TestResultData[] = JSON.parse(resultData);
      setResult(testResult);
      setFormattedData(getFormattedData(testResult));
    }
    setIsLoading(false);
  }, []);

  const { passed, failed, skipped, date, totalTests, chartCountData, chartPieData, areaChartData } =
    formattedData || {};

  return (
    <div className='flex min-h-screen flex-col bg-background text-foreground'>
      <NavBar cta='Generate new Report' showFeedback suffix={`for ${isLoading ? '...' : date}`} />
      <main className='flex-grow'>
        <section className='container mx-auto space-y-6 p-4'>
          <Card className='bg-card text-card-foreground'>
            <CardHeader className='items-center pb-5'>
              <CardTitle className='text-xl'>Test Statistics</CardTitle>
              <CardDescription>Overall Test execution statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
                {[
                  { label: 'Total Tests', color: 'blue' },
                  { label: 'Passed', color: 'green' },
                  { label: 'Failed', color: 'red' },
                  { label: 'Skipped', color: 'yellow' },
                ].map((item, index) => (
                  <Card
                    className={cn('rounded-lg p-4', {
                      'bg-blue-100 dark:bg-blue-900/20': item.color === 'blue',
                      'bg-green-100 dark:bg-green-900/20': item.color === 'green',
                      'bg-red-100 dark:bg-red-900/20': item.color === 'red',
                      'bg-yellow-100 dark:bg-yellow-900/20': item.color === 'yellow',
                    })}
                    key={item.label}
                  >
                    {isLoading ? (
                      <Skeleton className='h-16 w-full' />
                    ) : (
                      <>
                        <CardTitle
                          className={cn('mb-2 font-bold text-3xl', {
                            'text-blue-600 dark:text-blue-300': item.color === 'blue',
                            'text-green-600 dark:text-green-300': item.color === 'green',
                            'text-red-600 dark:text-red-300': item.color === 'red',
                            'text-yellow-600 dark:text-yellow-300': item.color === 'yellow',
                          })}
                        >
                          {[totalTests, passed, failed, skipped][index]}
                        </CardTitle>
                        <CardDescription
                          className={cn('font-medium', {
                            'text-blue-800 dark:text-blue-200': item.color === 'blue',
                            'text-green-800 dark:text-green-200': item.color === 'green',
                            'text-red-800 dark:text-red-200': item.color === 'red',
                            'text-yellow-800 dark:text-yellow-200': item.color === 'yellow',
                          })}
                        >
                          {item.label}
                        </CardDescription>
                      </>
                    )}
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {isLoading ? (
              <>
                <Skeleton className='h-[300px] w-full' />
                <Skeleton className='h-[300px] w-full' />
              </>
            ) : (
              <>
                <DoughNutComponent
                  config={chartConfig}
                  data={chartCountData || []}
                  description='Status based distribution of Test results'
                  title='Test Summary Counts'
                  totalValue={totalTests || 0}
                  valueLabel='Test cases'
                />
                <PieComponent
                  config={chartConfig}
                  data={chartPieData || []}
                  description='Status based % distribution of Test results'
                  title='Test Summary %'
                />
              </>
            )}
          </div>
          <div className='grid grid-cols-1 gap-6'>
            {isLoading ? (
              <Skeleton className='h-[300px] w-full' />
            ) : (
              <AreaChartComponent
                config={barConfig}
                data={areaChartData || []}
                description='Displays the test execution time trends'
                title='Test Execution Trends (in seconds)'
              />
            )}
          </div>
          <Card>
            <CardHeader className='items-center pb-5'>
              <CardTitle className='text-xl'>Test Details</CardTitle>
              <CardDescription>List of all the executed test cases</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className='h-[400px] w-full' />
              ) : result ? (
                <DataTable
                  columnFilters={columnFilters}
                  columns={columns}
                  columnVisibility={columnVisibility}
                  data={result}
                  filterColumn='method_name'
                  setColumnFilters={setColumnFilters}
                  setColumnVisibility={setColumnVisibility}
                  setSorting={setSorting}
                  sorting={sorting}
                />
              ) : (
                <p className='text-center'>No data available</p>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default ResultsPage;
