/* eslint-disable @stylistic/js/max-len */
'use client';

import { Button } from '@ultra-reporter/ui/components/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ultra-reporter/ui/components/card';
import { Progress } from '@ultra-reporter/ui/components/progress';
import { isProd } from '@ultra-reporter/utils/constants';
import { Bug, MoveLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { JSX, useEffect, useState } from 'react';

const LoadingPage = (): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const reportId = searchParams.get('reportId');

  useEffect(() => {
    if (!reportId) {
      setError('No report ID provided');
      return;
    }

    const pollReport = async (): Promise<void> => {
      try {
        setProgress(25);
        const response = await fetch(`/api/report/${reportId}`);
        const report = await response.json();

        if (!response.ok) {
          throw new Error(report.error || 'Failed to fetch report');
        }

        setProgress(50);

        if (report.status === 'completed') {
          setProgress(100);
          // Store the processed data for the results page
          sessionStorage.setItem(
            'report-data',
            JSON.stringify(report.jsonData)
          );
          router.push('/results');
        } else if (report.status === 'failed') {
          throw new Error(report.errorMessage || 'Processing failed');
        } else {
          // Still processing, poll again
          setProgress(75);
          setTimeout(pollReport, 2000);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(`${err.message}`);
          if (!isProd) {
            console.error(`Message: ${err.message}
Stack: ${err.stack}`);
          }
        }
      }
    };

    pollReport();
  }, [reportId, router]);

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
