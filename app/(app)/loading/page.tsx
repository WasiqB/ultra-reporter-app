/* eslint-disable @stylistic/js/max-len */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Bug, MoveLeft } from 'lucide-react';
import { useUser } from '@/lib/use-user';

const LoadingPage = (): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const processData = async (): Promise<void> => {
      try {
        if (!user) {
          throw new Error('No active session');
        }

        const sessionId = sessionStorage.getItem('reportSessionId');
        if (!sessionId) {
          throw new Error('No session ID found');
        }

        const response = await fetch(
          `/api/get-processed-data?sessionId=${sessionId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch processed data');
        }

        const processedData = await response.json();

        // Update progress as data is processed
        setProgress(25);
        setProgress(100);

        // Store the final processed data in sessionStorage
        sessionStorage.setItem('reportData', JSON.stringify(processedData));

        router.push('/results');
      } catch (err) {
        if (err instanceof Error) {
          setError(`${err.message}`);
          if (process.env.VERCEL_ENV !== 'production') {
            console.error(`Message: ${err.message}\nStack: ${err.stack}`);
          }
        }
      }
    };

    processData();
  }, [router]);

  const handleBack = (): void => {
    window.location.href = '/';
  };

  const handleRaiseIssue = (): void => {
    window.location.href =
      'https://github.com/WasiqB/ultra-reporter-app/issues/new?assignees=&labels=bug&projects=&template=bug.yml&title=%F0%9F%90%9B+New+Bug:';
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-background'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Processing XML</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className='w-full' />
          {error ? (
            <div className='mt-4'>
              <h3 className='mb-2 font-semibold text-destructive'>Error:</h3>
              <p className='mb-4 text-sm text-muted-foreground'>{error}</p>
            </div>
          ) : (
            <p className='mt-4 text-muted-foreground'>
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
