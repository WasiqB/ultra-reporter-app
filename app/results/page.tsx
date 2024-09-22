'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TestResult } from '@/types/types';

const ResultsPage = (): JSX.Element => {
  const [result, setResult] = useState<TestResult | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('json-data');
    let testResult: TestResult | null;
    if (data) {
      testResult = JSON.parse(data);
      setResult(testResult);
    }
  }, []);

  const renderData = (data: TestResult, level = 0) => {
    return Object.entries(data).map(([key, value]) => (
      <div key={key} style={{ marginLeft: `${level * 20}px` }}>
        <span className='font-semibold'>{key}: </span>
        {typeof value === 'object' ? (
          <div>{JSON.stringify(value, null, 2)}</div>
        ) : (
          <span>{value}</span>
        )}
      </div>
    ));
  };

  return (
    <div className='min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl'>
        <h1 className='mb-8 text-center text-3xl font-bold'>
          XML Processing Results
        </h1>
        <div className='rounded-lg bg-white p-6 shadow-md'>
          {result ? (
            <div>{JSON.stringify(result, null, 2)}</div>
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
