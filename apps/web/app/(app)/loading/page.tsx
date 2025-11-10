'use client';

import { logger } from '@ultra-reporter/logger';
import { Button } from '@ultra-reporter/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ultra-reporter/ui/components/card';
import { Progress } from '@ultra-reporter/ui/components/progress';
import { getData } from '@ultra-reporter/ui/data';
import { isProd } from '@ultra-reporter/utils/constants';
import { convertToJson, getTestResults } from '@ultra-reporter/utils/xml-parser';
import { Bug, MoveLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type JSX, useEffect, useState } from 'react';
import { type Step, StepsContainer } from './_components/steps-container';

interface StepConfig {
  id: string;
  label: string;
  handler: () => Promise<void>;
}

const stepConfigs: StepConfig[] = [
  {
    id: '1',
    label: 'Validating file',
    handler: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
    },
  },
  {
    id: '2',
    label: 'Parsing XML content',
    handler: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
    },
  },
  {
    id: '3',
    label: 'Analyzing test results',
    handler: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
    },
  },
  {
    id: '4',
    label: 'Generating report',
    handler: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Simulate random error (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Generation timeout');
      }
    },
  },
];

const LoadingPage = (): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [steps, setSteps] = useState<Step[]>(
    stepConfigs.map((config) => ({
      id: config.id,
      label: config.label,
      status: 'pending' as const,
    })),
  );
  const router = useRouter();

  useEffect(() => {
    const executeSteps = async () => {
      for (let index = 0; index < stepConfigs.length; index++) {
        // Set to loading
        setSteps((prev) => prev.map((step, i) => (i === index ? { ...step, status: 'loading' as const } : step)));
        setProgress((index / stepConfigs.length) * 100);

        try {
          // Execute the step callback
          await stepConfigs[index]?.handler();

          // Set to success
          setSteps((prev) =>
            prev.map((step, i) =>
              i === index ? { ...step, status: 'success' as const, errorMessage: undefined } : step,
            ),
          );
        } catch (error) {
          // Set to error with message
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          setSteps((prev) =>
            prev.map((step, i) =>
              i === index
                ? {
                    ...step,
                    status: 'error' as const,
                    errorMessage,
                  }
                : step,
            ),
          );
          // Stop execution on error
          break;
        }

        setProgress(((index + 1) / stepConfigs.length) * 100);
      }
    };

    executeSteps();
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
        if (!isProd) {
          logger.error(`Message: ${err.message}
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
      'https://github.com/WasiqB/ultra-reporter-app/issues/new?assignees=&labels=bug&projects=&template=bug.yml&title=%F0%9F%90%9B+New+Bug:',
    );
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-background'>
      <StepsContainer
        title='Processing Your Report'
        subtitle='File: multi-groups.xml'
        steps={steps}
        progress={progress}
      />
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Processing XML</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress className='w-full' value={progress} />
          {error ? (
            <div className='mt-4'>
              <h3 className='mb-2 font-semibold text-destructive'>Error:</h3>
              <p className='mb-4 text-muted-foreground text-sm'>{error}</p>
            </div>
          ) : (
            <p className='mt-4 text-muted-foreground'>Please wait while we process your XML file...</p>
          )}
        </CardContent>
        {error && (
          <CardFooter className='flex justify-between'>
            <Button onClick={handleBack} variant='outline'>
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
