'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { FormattedData } from '@/types/types';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { DataTable } from '@/components/data-table/data-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ChartConfig } from '@/components/ui/chart';
import DoughNutComponent from '@/components/charts/dough-nut-chart';
import { TestResultData, getFormattedData } from '@/components/data-table/data';
import { columns } from '@/components/data-table/columns';
import { PieComponent } from '@/components/charts/pie-chart';
import { NavBar } from '@/components/home/nav-bar';
import { cn } from '@/lib/utils';

const chartConfig: ChartConfig = {
  total: {
    label: 'Test Cases',
  },
  pass: {
    label: 'Passes',
    color: 'hsl(var(--passed))',
  },
  fail: {
    label: 'Failed',
    color: 'hsl(var(--failed))',
  },
  skip: {
    label: 'Skipped',
    color: 'hsl(var(--skipped))',
  },
  ignored: {
    label: 'Ignored',
    color: 'hsl(var(--ignored))',
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

  const {
    passed,
    failed,
    skipped,
    date,
    totalTests,
    chartCountData,
    chartPieData,
  } = formattedData || {};

  return (
    <div className='flex min-h-screen flex-col bg-background text-foreground'>
      <NavBar
        suffix={`for ${isLoading ? '...' : date}`}
        cta='Generate new Report'
        showFeedback
      />
      <main className='flex-grow pt-16'>
        <section className='container mx-auto space-y-6 p-4'>
          <Card className='bg-card text-card-foreground'>
            <CardHeader>
              <CardTitle className='text-xl'>Test Statistics</CardTitle>
              <CardDescription>
                Overall Test execution statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                {[
                  { label: 'Total Tests', color: 'blue' },
                  { label: 'Passed', color: 'green' },
                  { label: 'Failed', color: 'red' },
                  { label: 'Skipped', color: 'yellow' },
                ].map((item, index) => (
                  <Card
                    key={item.label}
                    className={cn('rounded-lg p-4', {
                      'bg-blue-100 dark:bg-blue-900/20': item.color === 'blue',
                      'bg-green-100 dark:bg-green-900/20':
                        item.color === 'green',
                      'bg-red-100 dark:bg-red-900/20': item.color === 'red',
                      'bg-yellow-100 dark:bg-yellow-900/20':
                        item.color === 'yellow',
                    })}
                  >
                    {isLoading ? (
                      <Skeleton className='h-16 w-full' />
                    ) : (
                      <>
                        <CardTitle
                          className={cn('mb-2 text-3xl font-bold', {
                            'text-blue-600 dark:text-blue-300':
                              item.color === 'blue',
                            'text-green-600 dark:text-green-300':
                              item.color === 'green',
                            'text-red-600 dark:text-red-300':
                              item.color === 'red',
                            'text-yellow-600 dark:text-yellow-300':
                              item.color === 'yellow',
                          })}
                        >
                          {[totalTests, passed, failed, skipped][index]}
                        </CardTitle>
                        <CardDescription
                          className={cn('font-medium', {
                            'text-blue-800 dark:text-blue-200':
                              item.color === 'blue',
                            'text-green-800 dark:text-green-200':
                              item.color === 'green',
                            'text-red-800 dark:text-red-200':
                              item.color === 'red',
                            'text-yellow-800 dark:text-yellow-200':
                              item.color === 'yellow',
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
                  title='Test Summary Counts'
                  description='Status based distribution of Test results'
                  config={chartConfig}
                  data={chartCountData || []}
                  totalValue={totalTests || 0}
                  valueLabel='Test cases'
                />
                <PieComponent
                  title='Test Summary %'
                  description='Status based % distribution of Test results'
                  config={chartConfig}
                  data={chartPieData || []}
                />
              </>
            )}
          </div>
          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Test Details</CardTitle>
              <CardDescription>
                List of all the executed test cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className='h-[400px] w-full' />
              ) : result ? (
                <DataTable
                  columns={columns}
                  data={result}
                  filterColumn='method_name'
                  columnFilters={columnFilters}
                  columnVisibility={columnVisibility}
                  sorting={sorting}
                  setColumnFilters={setColumnFilters}
                  setColumnVisibility={setColumnVisibility}
                  setSorting={setSorting}
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
