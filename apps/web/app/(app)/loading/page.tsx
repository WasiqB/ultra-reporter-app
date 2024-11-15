/* eslint-disable @stylistic/js/max-len */
'use client';

import { logger } from '@ultra-reporter/logger';
import { Button } from '@ultra-reporter/ui/components/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ultra-reporter/ui/components/card';
import { Progress } from '@ultra-reporter/ui/components/progress';
import { getData } from '@ultra-reporter/ui/data';
import {
  convertToJson,
  getTestResults,
} from '@ultra-reporter/utils/xml-parser';
import { Bug, MoveLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
      logger.info('Report generated successfully.');
      router.push('/results');
    } catch (err) {
      if (err instanceof Error) {
        setError(`${err.message}`);
        logger.error(err.message);
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
    <div className='bg-background flex min-h-screen items-center justify-center'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Processing XML</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className='w-full' />
          {error ? (
            <div className='mt-4'>
              <h3 className='text-destructive mb-2 font-semibold'>Error:</h3>
              <p className='text-muted-foreground mb-4 text-sm'>{error}</p>
            </div>
          ) : (
            <p className='text-muted-foreground mt-4'>
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
