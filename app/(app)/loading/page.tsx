/* eslint-disable @stylistic/js/max-len */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { convertToJson, getTestResults } from '@/lib/xml-parser';
import { Progress } from '@/components/ui/progress';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bug, MoveLeft } from 'lucide-react';
import { getData } from '@/components/data-table/data';

const LoadingPage = (): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const xmlContent = localStorage.getItem('xml-data');
    try {
      setProgress(0);
      if (!xmlContent) {
        throw new Error('No XML data found in the file.');
      }
      setProgress(25);
      const jsonData = convertToJson(xmlContent);
      setProgress(50);
      const testResult = getTestResults(jsonData);
      setProgress(75);
      localStorage.setItem('json-data', JSON.stringify(getData(testResult)));
      setProgress(100);
      router.push('/results');
    } catch (err) {
      if (err instanceof Error) {
        setError(`${err.message}`);
        if (process.env.VERCEL_ENV !== 'production') {
          console.error(`Message: ${err.message}
Stack: ${err.stack}`);
        }
      }
    }
  }, [router]);

  const handleBack = (): void => {
    router.push('/');
  };

  const handleRaiseIssue = (): void => {
    router.push(
      'https://github.com/WasiqB/ultra-reporter-app/issues/new?assignees=&labels=bug&projects=&template=bug.yml&title=%F0%9F%90%9B+New+Bug:'
    );
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Processing XML</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className='w-full' />
          {error ? (
            <div className='mt-4'>
              <h3 className='mb-2 font-semibold text-red-600'>Error:</h3>
              <p className='mb-4 text-sm text-gray-600'>{error}</p>
            </div>
          ) : (
            <p className='mt-4 text-gray-600'>
              Please wait while we process your XML file...
            </p>
          )}
        </CardContent>
        {error && (
          <CardFooter className='flex justify-between'>
            <Button variant='outline' onClick={handleBack}>
              <MoveLeft className='h-6 w-6 pr-2' />
              Back
            </Button>
            <Button onClick={handleRaiseIssue}>
              <Bug className='h-6 w-6 pr-2' />
              Raise Issue
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default LoadingPage;
