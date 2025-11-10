'use client';

import { logger } from '@ultra-reporter/logger';
import { Button } from '@ultra-reporter/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@ultra-reporter/ui/components/dialog';
import { Verified, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { StepItem, type StepStatus } from './step-item';

interface Step {
  id: string;
  label: string;
  status: StepStatus;
  errorMessage?: string;
}

interface StepConfig {
  id: string;
  label: string;
  callback: () => Promise<void>;
}

interface LoadingModalProps {
  fileName: string;
  isOpen: boolean;
  onClose?: () => void;
}

export function LoadingModal({ fileName, isOpen, onClose }: LoadingModalProps) {
  const router = useRouter();
  const [steps, setSteps] = useState<Step[]>([
    { id: '1', label: 'Uploading file', status: 'pending' },
    { id: '2', label: 'Parsing XML content', status: 'pending' },
    { id: '3', label: 'Validating data structure', status: 'pending' },
    { id: '4', label: 'Saving to database', status: 'pending' },
  ]);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [progressBarColor, setProgressBarColor] = useState('text-green-500');
  const [suiteId, setSuiteId] = useState<string | null>(null);

  const reconstructFile = (): File => {
    const fileData = sessionStorage.getItem('uploadedFile');
    if (!fileData) {
      throw new Error('No file found in session');
    }
    const { name, data } = JSON.parse(fileData);
    const buffer = new Uint8Array(data).buffer;
    return new File([buffer], name, { type: 'application/xml' });
  };

  const stepConfigs: StepConfig[] = [
    {
      id: '1',
      label: 'Uploading file',
      callback: async () => {
        const file: File = reconstructFile();
        logger.info(`[v0] File reconstructed: ${file.name} ${file.size}`);
        await new Promise((resolve) => setTimeout(resolve, 300));
      },
    },
    {
      id: '2',
      label: 'Parsing XML content',
      callback: async () => {
        const file = reconstructFile();
        const result = await parseAndStoreTestResults(file);
        console.log('[v0] Parse result:', result);
        setSuiteId(result.suiteId);
        await new Promise((resolve) => setTimeout(resolve, 500));
      },
    },
    {
      id: '3',
      label: 'Validating data structure',
      callback: async () => {
        if (!suiteId) {
          throw new Error('Failed to save test suite to database');
        }
        await new Promise((resolve) => setTimeout(resolve, 400));
      },
    },
    {
      id: '4',
      label: 'Saving to database',
      callback: async () => {
        if (!suiteId) {
          throw new Error('Test suite ID not found');
        }
        sessionStorage.setItem('testSuiteId', suiteId);
        await new Promise((resolve) => setTimeout(resolve, 300));
      },
    },
  ];

  const executeSteps = useCallback(async () => {
    for (let index = 0; index < stepConfigs.length; index++) {
      setSteps((prev) => prev.map((step, i) => (i === index ? { ...step, status: 'loading' as const } : step)));
      setProgress(((index + 1) / stepConfigs.length) * 100);

      try {
        await stepConfigs[index].callback();

        setSteps((prev) =>
          prev.map((step, i) =>
            i === index ? { ...step, status: 'success' as const, errorMessage: undefined } : step,
          ),
        );
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('[v0] Step error:', errorMessage);

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

        setProgressBarColor('text-red-500');
        setHasFailed(true);

        setTimeout(() => {
          sessionStorage.removeItem('uploadedFile');
          sessionStorage.removeItem('testSuiteId');
          router.push('/upload');
        }, 1500);

        return;
      }
    }

    setIsCompleted(true);
    setProgress(100);
  }, [suiteId, router]);

  useEffect(() => {
    if (isOpen) {
      executeSteps();
    }
  }, [isOpen, executeSteps]);

  const handleDoneClick = () => {
    if (suiteId) {
      router.push(`/results?suiteId=${suiteId}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}} modal={true}>
      <DialogContent showCloseButton={false} className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Processing Your Report</DialogTitle>
          <DialogDescription>File: {fileName}</DialogDescription>
        </DialogHeader>

        {isCompleted ? (
          <div className='space-y-6'>
            {/* Completion State */}
            <div className='flex justify-center'>
              <div className='relative w-24 h-24'>
                <svg className='w-24 h-24' viewBox='0 0 100 100'>
                  <circle
                    cx='50'
                    cy='50'
                    r='45'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    className='text-green-100'
                  />
                  <circle
                    cx='50'
                    cy='50'
                    r='45'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    className='text-green-500 animate-pulse'
                    style={{
                      strokeDasharray: '282.7',
                      strokeDashoffset: '0',
                      animation: 'drawCircle 0.8s ease-out forwards',
                    }}
                  />
                </svg>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <Verified className='w-16 h-16 text-green-500 animate-bounce' style={{ animationDuration: '0.6s' }} />
                </div>
              </div>
            </div>

            {/* Steps List */}
            <div className='space-y-3'>
              {steps.map((step) => (
                <StepItem key={step.id} label={step.label} status={step.status} errorMessage={step.errorMessage} />
              ))}
            </div>

            {/* Done Button */}
            <DialogFooter>
              <Button onClick={handleDoneClick} className='w-full'>
                Done
              </Button>
            </DialogFooter>

            <style>{`
              @keyframes drawCircle {
                to {
                  stroke-dashoffset: 0;
                }
              }
            `}</style>
          </div>
        ) : hasFailed ? (
          <div className='space-y-6'>
            {/* Error State */}
            <div className='flex justify-center'>
              <div className='relative w-24 h-24'>
                <svg className='w-24 h-24' viewBox='0 0 100 100'>
                  <circle
                    cx='50'
                    cy='50'
                    r='45'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    className='text-red-100'
                  />
                  <circle
                    cx='50'
                    cy='50'
                    r='45'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    className='text-red-500 animate-pulse'
                    style={{
                      strokeDasharray: '282.7',
                      strokeDashoffset: '282.7',
                      animation: 'drawCircleError 0.8s ease-out forwards',
                    }}
                  />
                </svg>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <XCircle className='w-16 h-16 text-red-500 animate-bounce' style={{ animationDuration: '0.6s' }} />
                </div>
              </div>
            </div>

            {/* Steps List with Error */}
            <div className='space-y-3'>
              {steps.map((step) => (
                <StepItem key={step.id} label={step.label} status={step.status} errorMessage={step.errorMessage} />
              ))}
            </div>

            <p className='text-sm text-muted-foreground text-center'>
              An error occurred. Redirecting to upload page...
            </p>

            <style>{`
              @keyframes drawCircleError {
                to {
                  stroke-dashoffset: 0;
                }
              }
            `}</style>
          </div>
        ) : (
          <div className='space-y-6'>
            {/* Loading State */}
            <div className='flex justify-center'>
              <div className='relative w-32 h-32'>
                <svg className='w-32 h-32 transform -rotate-90' viewBox='0 0 120 120'>
                  {/* Background circle */}
                  <circle
                    cx='60'
                    cy='60'
                    r='54'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='3'
                    className='text-muted'
                  />
                  {/* Progress circle - color changes based on state */}
                  <circle
                    cx='60'
                    cy='60'
                    r='54'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='3'
                    className={`${progressBarColor} transition-all duration-300`}
                    style={{
                      strokeDasharray: `${2 * Math.PI * 54}`,
                      strokeDashoffset: `${2 * Math.PI * 54 * (1 - progress / 100)}`,
                    }}
                    strokeLinecap='round'
                  />
                </svg>
                {/* Progress text in center */}
                <div className='absolute inset-0 flex items-center justify-center'>
                  <span className='text-2xl font-bold text-foreground'>{Math.round(progress)}%</span>
                </div>
              </div>
            </div>

            {/* Steps List */}
            <div className='space-y-3'>
              {steps.map((step) => (
                <StepItem key={step.id} label={step.label} status={step.status} errorMessage={step.errorMessage} />
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
