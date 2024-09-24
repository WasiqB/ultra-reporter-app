'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// import { format } from 'date-fns';
import { TestException, TestResult } from '@/types/types';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartConfig } from '@/components/ui/chart';
import DoughNutComponent from '@/components/dough-nut-chart';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  Check,
  LinkIcon,
  MessageCircleWarning,
  X,
} from 'lucide-react';
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogContent } from '@radix-ui/react-dialog';

type TestResultData = {
  suite_name: string;
  test_name: string;
  class_name: string;
  method_name: string;
  is_config: string;
  status: string;
  exception?: TestException;
  attachment: string;
  started_at: string;
  finished_at: string;
  duration_ms: number;
};

const columns: ColumnDef<TestResultData>[] = [
  {
    accessorKey: 'suite_name',
    header: 'Suite Name',
    cell: ({ row }) => (
      <div className='font-medium'>{row.getValue('suite_name')}</div>
    ),
  },
  {
    accessorKey: 'test_name',
    header: 'Test Name',
  },
  {
    accessorKey: 'class_name',
    header: 'Class Name',
  },
  {
    accessorKey: 'method_name',
    header: 'Method Name',
  },
  {
    accessorKey: 'is_config',
    header: 'Is Config?',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <div className='flex items-center'>
          {status === 'PASS' && (
            <Check className='mr-2 h-4 w-4 text-green-500' />
          )}
          {status === 'FAIL' && <X className='mr-2 h-4 w-4 text-red-500' />}
          {status === 'SKIP' && (
            <AlertTriangle className='mr-2 h-4 w-4 text-yellow-500' />
          )}
        </div>
      );
    },
  },
  {
    id: 'exception',
    header: 'Error',
    cell: ({ row }) => {
      const exception = row.getValue('exception') as TestException;
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>
            <MessageCircleWarning className='h-4 w-4 text-red-500' />
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Exception</DialogTitle>
            <DialogDescription>This is the Test Exception</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              {exception ? (
                <Card>
                  <CardHeader>
                    <CardTitle>{exception.message}</CardTitle>
                    <CardDescription>{exception.class_name}</CardDescription>
                  </CardHeader>
                  <CardContent className='mockup-code'>
                    {exception.stack_trace.map((line, index) => (
                      <pre key={index} data-prefix='~'>
                        <code>{line}</code>
                      </pre>
                    ))}
                  </CardContent>
                </Card>
              ) : (
                'No exception for this test'
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>;
    },
  },
  {
    id: 'attachment',
    header: 'Attachment',
    cell: ({ row }) => {
      const attachment = row.getValue('attachment') as string;
      <div className='flex items-center'>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline'>
              <LinkIcon className='h-4 w-4' />
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Attachment</DialogTitle>
              <DialogDescription>This is the Test attachment</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                {attachment || 'No attachment for this test'}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>;
    },
  },
  {
    accessorKey: 'started_at',
    header: 'Started At',
    // cell: ({ row }) => format(new Date(row.getValue('started_at')), 'PPpp'),
  },
  {
    accessorKey: 'finished_at',
    header: 'Finished At',
    // cell: ({ row }) => format(new Date(row.getValue('finished_at')), 'PPpp'),
  },
  {
    accessorKey: 'duration_ms',
    header: 'Duration',
    cell: ({ row }) => {
      const duration = parseInt(row.getValue('duration_ms'));
      return duration >= 1000
        ? `${(duration / 1000).toFixed(2)} s`
        : `${duration} ms`;
    },
  },
];

const getData = (data: TestResult): TestResultData[] => {
  const result: TestResultData[] = [];
  const suites = data.test_suites;
  for (const suite of suites) {
    for (const test of suite.test_cases) {
      for (const cls of test.test_classes) {
        for (const method of cls.test_methods) {
          result.push({
            suite_name: suite.name,
            test_name: test.name,
            class_name: cls.name?.substring(cls.name.lastIndexOf('.')),
            method_name: method.description || method.name,
            is_config: method.is_config ? 'Yes' : 'No',
            status: method.status,
            exception: method.exception,
            attachment: method.log?.line,
            started_at: method.started_at,
            finished_at: method.finished_at,
            duration_ms: method.duration_ms,
          });
        }
      }
    }
  }
  return result;
};

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
  const [rowSelection, setRowSelection] = useState({});
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
      setPassed(
        data.filter((d) => d.status === 'PASS' && d.is_config === 'No').length
      );
      setFailed(
        data.filter((d) => d.status === 'FAIL' && d.is_config === 'No').length
      );
      setSkipped(
        data.filter((d) => d.status === 'SKIP' && d.is_config === 'No').length
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
              rowSelection={rowSelection}
              sorting={sorting}
              setColumnFilters={setColumnFilters}
              setColumnVisibility={setColumnVisibility}
              setRowSelection={setRowSelection}
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
