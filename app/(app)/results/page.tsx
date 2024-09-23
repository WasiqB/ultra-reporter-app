'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TestResult } from '@/types/types';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';

type TestResultData = {
  suite_name: string;
  test_name: string;
  class_name: string;
  method_name: string;
  is_config: string;
  status: string;
  started_at: string;
  finished_at: string;
  duration_ms: number;
};

const columns: ColumnDef<TestResultData>[] = [
  {
    accessorKey: 'suite_name',
    header: 'Suite Name',
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
  },
  {
    accessorKey: 'started_at',
    header: 'Started At',
  },
  {
    accessorKey: 'finished_at',
    header: 'Finished At',
  },
  {
    accessorKey: 'duration_ms',
    header: 'Duration',
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

const ResultsPage = (): JSX.Element => {
  const [result, setResult] = useState<TestResultData[] | null>(null);

  useEffect(() => {
    const resultData = localStorage.getItem('json-data');
    let data: TestResultData[] | null;
    if (resultData) {
      const testResult = JSON.parse(resultData) as TestResult;
      data = getData(testResult);
      setResult(data);
    }
  }, []);

  return (
    <div className='bg-gray-100 px-4 py-6 sm:px-6 lg:px-8'>
      <div className='md:max-w mx-auto max-w-5xl'>
        <h1 className='mb-8 text-center text-3xl font-bold'>Ultra Report</h1>
        <div className='rounded-lg bg-white p-6 shadow-md'>
          {result ? (
            <div className='container mx-auto py-10'>
              <DataTable columns={columns} data={result} />
            </div>
          ) : (
            <p className='text-center'>No data available</p>
          )}
        </div>
        <div className='mt-8 text-center'>
          <Link
            href='/'
            className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600'
          >
            Process Another XML File
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
