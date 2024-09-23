'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { convertToJson, getTestResults } from '@/lib/xml-parser';

const LoadingPage = (): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [redirectTimer, setRedirectTimer] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const xmlContent = localStorage.getItem('xml-data');
    if (!xmlContent) {
      setError('No XML data found');
      return;
    }
    setProgress(10);
    try {
      const jsonData = convertToJson(xmlContent);
      setProgress(30);
      const testResult = getTestResults(jsonData);
      setProgress(50);
      localStorage.setItem('json-data', JSON.stringify(testResult));
      setProgress(100);
      router.push('/results');
    } catch (err) {
      if (err instanceof Error) {
        setError(`${err.name} : ${err.message}`);
      }
    }
  }, [router]);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    if (error) {
      timerInterval = setInterval(() => {
        setRedirectTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(timerInterval);
            router.push('/');
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [error, router]);

  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-100'>
        <div className='w-96 rounded-lg bg-white p-8 text-center shadow-md'>
          <h1 className='mb-4 text-2xl font-bold text-red-600'>Error</h1>
          <p className='mb-4 text-gray-600'>{error}</p>
          <p className='text-gray-500'>
            Redirecting to home page in {redirectTimer} second
            {redirectTimer > 1 ? 's' : ''}...
          </p>
        </div>
      </div>
    );
  }

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
