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
  const [result, setResult] = useState<TestResultData[] | null>(null);
  const [passed, setPassed] = useState(0);
  const [failed, setFailed] = useState(0);
  const [skipped, setSkipped] = useState(0);

  useEffect(() => {
    const resultData = localStorage.getItem('json-data') as string;
    let data: TestResultData[];
    if (resultData) {
      const testResult = JSON.parse(resultData) as TestResult;
      data = getData(testResult);
      setResult(data);
      setPassed(data.filter((d) => d.status === 'pass' && !d.is_config).length);
      setFailed(data.filter((d) => d.status === 'fail' && !d.is_config).length);
      setSkipped(
        data.filter((d) => d.status === 'skip' && !d.is_config).length
      );
    }
  }, []);

  const chartData = [
    { status: 'pass', total: passed, fill: 'var(--color-pass)' },
    { status: 'fail', total: failed, fill: 'var(--color-fail)' },
    { status: 'skip', total: skipped, fill: 'var(--color-skip)' },
    { status: 'ignored', total: 0, fill: 'var(--color-ignored)' },
  ];

  return (
    <section className='container mx-auto space-y-6 p-4'>
      <h1 className='mb-8 text-center text-3xl font-bold'>Ultra Report</h1>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Test Statistics</CardTitle>
            <CardDescription>Overall Test execution statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 gap-4'>
              <div className='rounded-lg bg-blue-100 p-4'>
                <CardDescription>Total Tests</CardDescription>
                <CardTitle>{passed + failed + skipped}</CardTitle>
              </div>
              <div className='rounded-lg bg-green-100 p-4'>
                <CardDescription>Passed</CardDescription>
                <CardTitle>{passed}</CardTitle>
              </div>
              <div className='rounded-lg bg-red-100 p-4'>
                <CardDescription>Failed</CardDescription>
                <CardTitle>{failed}</CardTitle>
              </div>
              <div className='rounded-lg bg-yellow-100 p-4'>
                <CardDescription>Skipped</CardDescription>
                <CardTitle>{skipped}</CardTitle>
              </div>
            </div>
          </CardContent>
        </Card>
        <DoughNutComponent
          title='Test Summary'
          description='Status based distribution of Automated Test cases result'
          config={chartConfig}
          data={chartData}
          totalValue={passed + failed + skipped}
          valueLabel='Test cases'
        />
      </div>
      {result ? (
        <Card>
          <CardHeader>
            <CardTitle>Test Details</CardTitle>
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
