'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { convertToJson, getTestResults } from '@/lib/xml-parser';

const LoadingPage = (): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const xmlContent = localStorage.getItem('xml-data');
    if (!xmlContent) {
      alert('No XML data found!');
      router.push('/');
      return;
    }
    setProgress(10);
    const jsonData = convertToJson(xmlContent);
    setProgress(30);
    const testResult = getTestResults(jsonData);
    setProgress(50);
    localStorage.setItem('json-data', JSON.stringify(testResult));
    setProgress(100);
    router.push('/results');
  }, [router]);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='w-96 rounded-lg bg-white p-8 text-center shadow-md'>
        <h1 className='mb-4 text-2xl font-bold'>Processing XML</h1>
        <div className='mb-4 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700'>
          <div
            className='h-2.5 rounded-full bg-blue-600'
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className='text-gray-600'>
          Please wait while we process your XML file...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
