'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TestResult } from '@/types/types';
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
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartConfig } from '@/components/ui/chart';
import DoughNutComponent from '@/components/charts/dough-nut-chart';
import { getData, TestResultData } from '@/components/data-table/data';
import { columns } from '@/components/data-table/columns';
import { PieComponent } from '@/components/charts/pie-chart';
import { formatDate, round } from '@/lib/formatting';

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
  const [passed, setPassed] = useState(0);
  const [failed, setFailed] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [date, setDate] = useState('');

  useEffect(() => {
    const resultData = localStorage.getItem('json-data') as string;
    let data: TestResultData[];
    if (resultData) {
      const testResult = JSON.parse(resultData) as TestResult;
      data = getData(testResult);
      setResult(data);
      setDate(formatDate(data[0].started_at));
      setPassed(data.filter((d) => d.status === 'pass' && !d.is_config).length);
      setFailed(data.filter((d) => d.status === 'fail' && !d.is_config).length);
      setSkipped(
        data.filter((d) => d.status === 'skip' && !d.is_config).length
      );
    }
  }, []);

  const totalTests = passed + failed + skipped;

  const chartCountData = [
    { status: 'pass', total: passed, fill: 'var(--color-pass)' },
    { status: 'fail', total: failed, fill: 'var(--color-fail)' },
    { status: 'skip', total: skipped, fill: 'var(--color-skip)' },
  ];

  const chartPieData = [
    {
      status: 'pass',
      total: round((passed / totalTests) * 100),
      fill: 'var(--color-pass)',
    },
    {
      status: 'fail',
      total: round((failed / totalTests) * 100),
      fill: 'var(--color-fail)',
    },
    {
      status: 'skip',
      total: round((skipped / totalTests) * 100),
      fill: 'var(--color-skip)',
    },
  ];

  return (
    <section className='container mx-auto space-y-6 p-4'>
      <h1 className='mb-8 text-balance text-center text-3xl font-bold'>
        Ultra Report for {date}
      </h1>
      <div className='grid grid-cols-1 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle className='text-xl'>Test Statistics</CardTitle>
            <CardDescription>Overall Test execution statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
              <Card className='rounded-lg bg-blue-200 p-4'>
                <CardDescription>Total Tests</CardDescription>
                <CardTitle>{passed + failed + skipped}</CardTitle>
              </Card>
              <Card className='rounded-lg bg-green-200 p-4'>
                <CardDescription>Passed</CardDescription>
                <CardTitle>{passed}</CardTitle>
              </Card>
              <Card className='rounded-lg bg-red-200 p-4'>
                <CardDescription>Failed</CardDescription>
                <CardTitle>{failed}</CardTitle>
              </Card>
              <Card className='rounded-lg bg-yellow-200 p-4'>
                <CardDescription>Skipped</CardDescription>
                <CardTitle>{skipped}</CardTitle>
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
          data={chartCountData}
          totalValue={totalTests}
          valueLabel='Test cases'
        />
        <PieComponent
          title='Test Summary %'
          description='Status based % distribution of Test results'
          config={chartConfig}
          data={chartPieData}
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
          <CardFooter className='flex justify-end'>
            <div className='mt-8 items-end text-center'>
              <Link
                href='/'
                className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600'
              >
                Process Another XML File
              </Link>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <p className='text-center'>No data available</p>
      )}
    </section>
  );
};

export default ResultsPage;
