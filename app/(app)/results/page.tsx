'use client';

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
import { ChartConfig } from '@/components/ui/chart';
import DoughNutComponent from '@/components/charts/dough-nut-chart';
import { TestResultData, getFormattedData } from '@/components/data-table/data';
import { columns } from '@/components/data-table/columns';
import { PieComponent } from '@/components/charts/pie-chart';
import { NavBar } from '@/components/home/nav-bar';

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

  useEffect(() => {
    const resultData = localStorage.getItem('json-data') as string;
    if (resultData) {
      const testResult: TestResultData[] = JSON.parse(resultData);
      setResult(testResult);
      setFormattedData(getFormattedData(testResult));
    }
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
    <div className='flex min-h-screen flex-col'>
      <NavBar suffix={`for ${date}`} cta='Generate new Report' />
      <main className='flex-grow pt-16'>
        <section className='container mx-auto space-y-6 p-4'>
          <div className='grid grid-cols-1 gap-6'>
            <Card>
              <CardHeader>
                <CardTitle className='text-xl'>Test Statistics</CardTitle>
                <CardDescription>
                  Overall Test execution statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
                  <Card className='rounded-lg bg-blue-200 p-4'>
                    <CardDescription>Total Tests</CardDescription>
                    <CardTitle className='text-blue-700'>
                      {totalTests}
                    </CardTitle>
                  </Card>
                  <Card className='rounded-lg bg-green-200 p-4'>
                    <CardDescription>Passed</CardDescription>
                    <CardTitle className='text-green-700'>{passed}</CardTitle>
                  </Card>
                  <Card className='rounded-lg bg-red-200 p-4'>
                    <CardDescription>Failed</CardDescription>
                    <CardTitle className='text-red-700'>{failed}</CardTitle>
                  </Card>
                  <Card className='rounded-lg bg-yellow-200 p-4'>
                    <CardDescription>Skipped</CardDescription>
                    <CardTitle className='text-yellow-700'>{skipped}</CardTitle>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
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
          </div>
          {result ? (
            <Card>
              <CardHeader>
                <CardTitle className='text-xl'>Test Details</CardTitle>
                <CardDescription>
                  List of all the executed test cases
                </CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          ) : (
            <p className='text-center'>No data available</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default ResultsPage;
