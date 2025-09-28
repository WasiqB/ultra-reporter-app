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
import { ProcessingStep } from '@ultra-reporter/ui/components/processing-step-item';
import { ProcessingStepList } from '@ultra-reporter/ui/components/processing-step-list';
import { isProd } from '@ultra-reporter/utils/constants';
import { Bug, MoveLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { JSX, useEffect, useState } from 'react';

const LoadingPage = (): JSX.Element => {
  const [steps, setSteps] = useState<ProcessingStep[]>([
    {
      id: 'validation',
      title: 'Validating XML file',
      status: 'pending',
    },
    {
      id: 'parsing',
      title: 'Parsing XML content',
      status: 'pending',
    },
    {
      id: 'transformation',
      title: 'Transforming to JSON',
      status: 'pending',
    },
    {
      id: 'analysis',
      title: 'Analyzing test results',
      status: 'pending',
    },
    {
      id: 'completion',
      title: 'Finalizing report',
      status: 'pending',
    },
  ]);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const reportId = searchParams.get('reportId');

  const updateStepStatus = (
    stepId: string,
    status: ProcessingStep['status'],
    progress?: number,
    errorMessage?: string
  ): void => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId ? { ...step, status, progress, errorMessage } : step
      )
    );
  };

  useEffect(() => {
    if (!reportId) {
      setError('No report ID provided');
      updateStepStatus(
        'validation',
        'failed',
        undefined,
        'No report ID provided'
      );
      return;
    }

    let pollCount = 0;
    const maxPolls = 30; // Maximum 60 seconds of polling

    const pollReport = async (): Promise<void> => {
      try {
        pollCount++;

        const response = await fetch(`/api/report/${reportId}`);
        const report = await response.json();

        if (!response.ok) {
          throw new Error(report.error || 'Failed to fetch report');
        }

        // Update steps based on actual server status, not artificial progression
        if (report.status === 'processing') {
          // Show realistic progression based on server response
          updateStepStatus('validation', 'completed');
          updateStepStatus('parsing', 'processing', 50 + pollCount * 10);
        } else if (report.status === 'completed') {
          // Complete all steps when server reports completion
          updateStepStatus('validation', 'completed');
          updateStepStatus('parsing', 'completed');
          updateStepStatus('transformation', 'completed');
          updateStepStatus('analysis', 'completed');
          updateStepStatus('completion', 'completed');

          // Store the processed data for the results page
          sessionStorage.setItem(
            'report-data',
            JSON.stringify(report.jsonData)
          );

          router.push('/results');
        } else if (report.status === 'failed') {
          // Determine which step failed based on error type
          let failedStepId = 'parsing';
          const errorMessage = report.errorMessage || 'Processing failed';

          // Map specific error types to appropriate steps
          if (
            errorMessage.toLowerCase().includes('validation') ||
            errorMessage.toLowerCase().includes('invalid')
          ) {
            failedStepId = 'validation';
          } else if (
            errorMessage.toLowerCase().includes('parse') ||
            errorMessage.toLowerCase().includes('xml')
          ) {
            failedStepId = 'parsing';
          } else if (
            errorMessage.toLowerCase().includes('transform') ||
            errorMessage.toLowerCase().includes('json')
          ) {
            failedStepId = 'transformation';
          } else if (
            errorMessage.toLowerCase().includes('analysis') ||
            errorMessage.toLowerCase().includes('test')
          ) {
            failedStepId = 'analysis';
          }

          updateStepStatus(failedStepId, 'failed', undefined, errorMessage);

          // Skip remaining steps
          const stepIds = [
            'validation',
            'parsing',
            'transformation',
            'analysis',
            'completion',
          ];
          const failedIndex = stepIds.indexOf(failedStepId);
          const remainingSteps = stepIds.slice(failedIndex + 1);

          remainingSteps.forEach((stepId) => {
            updateStepStatus(stepId, 'skipped');
          });

          throw new Error(errorMessage);
        } else {
          // Still processing - show initial validation step
          if (pollCount === 1) {
            updateStepStatus('validation', 'processing', 25);
          }

          // Continue polling
          if (pollCount >= maxPolls) {
            throw new Error('Processing timeout - please try again');
          }

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
  }, [reportId, router, retryCount]);

  const handleBack = (): void => {
    router.push('/');
  };

  const handleRaiseIssue = (): void => {
    router.push(
      'https://github.com/WasiqB/ultra-reporter-app/issues/new?assignees=&labels=bug&projects=&template=bug.yml&title=%F0%9F%90%9B+New+Bug:'
    );
  };

  const handleRetry = (): void => {
    if (retryCount >= 3) return; // Max 3 retries

    setIsRetrying(true);
    setError(null);
    setRetryCount((prev) => prev + 1);
    // Reset all steps to pending
    setSteps((prevSteps) =>
      prevSteps.map((step) => ({
        ...step,
        status: 'pending' as const,
        progress: undefined,
        errorMessage: undefined,
      }))
    );

    // Restart the polling process
    setTimeout(() => {
      setIsRetrying(false);
      // The useEffect will trigger again due to dependency changes
    }, 1000);
  };

  const hasFailedSteps = steps.some((step) => step.status === 'failed');
  const canRetry = retryCount < 3 && (error || hasFailedSteps) && !isRetrying;

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Processing Report
          </h1>
          <p className='text-muted-foreground'>
            Your XML file is being processed. Please wait while we analyze your
            test results.
          </p>
        </div>
      </div>

      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Processing Status</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <ProcessingStepList steps={steps} title='' className='w-full' />

          {error && (
            <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
              <h3 className='mb-2 font-semibold text-red-900'>
                Processing Error
              </h3>
              <p className='text-sm text-red-700'>{error}</p>
              {retryCount > 0 && (
                <p className='mt-2 text-xs text-red-600'>
                  Retry attempt {retryCount} of 3
                </p>
              )}
            </div>
          )}

          {isRetrying && (
            <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
              <p className='text-sm text-yellow-700'>
                Retrying processing... Please wait.
              </p>
            </div>
          )}

          {!error && !hasFailedSteps && !isRetrying && (
            <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
              <p className='text-sm text-blue-700'>
                Processing is in progress. This may take a few moments depending
                on the size of your XML file.
              </p>
            </div>
          )}
        </CardContent>

        {(error || hasFailedSteps) && (
          <CardFooter className='flex justify-between'>
            <Button variant='outline' onClick={handleBack}>
              <MoveLeft className='mr-2 h-4 w-4' />
              Back to Upload
            </Button>
            <div className='flex gap-2'>
              {canRetry && (
                <Button
                  variant='secondary'
                  onClick={handleRetry}
                  disabled={isRetrying}
                >
                  {isRetrying ? 'Retrying...' : 'Retry'}
                </Button>
              )}
              <Button onClick={handleRaiseIssue}>
                <Bug className='mr-2 h-4 w-4' />
                Report Issue
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default LoadingPage;
