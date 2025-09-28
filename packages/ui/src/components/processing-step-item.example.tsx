import * as React from 'react';
import { useState } from 'react';
import { Button } from './button';
import { ProcessingStep, ProcessingStepItem } from './processing-step-item';
import { ProcessingStepList } from './processing-step-list';

// Example data for testing
const createExampleSteps = (): ProcessingStep[] => [
  {
    id: '1',
    title: 'Check upload file format',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Parse the XML file',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Create the JSON data',
    status: 'processing',
    progress: 65,
  },
  {
    id: '4',
    title: 'Format the JSON data',
    status: 'pending',
  },
  {
    id: '5',
    title: 'Generate the report',
    status: 'pending',
  },
];

const createFailedExampleSteps = (): ProcessingStep[] => [
  {
    id: '1',
    title: 'Check upload file format',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Parse the XML file',
    status: 'failed',
    errorMessage: 'Invalid XML format detected',
  },
  {
    id: '3',
    title: 'Create the JSON data',
    status: 'skipped',
  },
  {
    id: '4',
    title: 'Format the JSON data',
    status: 'skipped',
  },
  {
    id: '5',
    title: 'Generate the report',
    status: 'skipped',
  },
];

export const ProcessingStepItemExample: React.FC = () => {
  const [scenario, setScenario] = useState<'normal' | 'failed'>('normal');
  const [steps, setSteps] = useState<ProcessingStep[]>(createExampleSteps());

  const handleScenarioChange = (newScenario: 'normal' | 'failed') => {
    setScenario(newScenario);
    setSteps(
      newScenario === 'normal'
        ? createExampleSteps()
        : createFailedExampleSteps()
    );
  };

  const simulateProgress = () => {
    setSteps((prevSteps) =>
      prevSteps.map((step) => {
        if (step.status === 'processing' && step.progress !== undefined) {
          const newProgress = Math.min(100, step.progress + 10);
          return {
            ...step,
            progress: newProgress,
            status: newProgress === 100 ? 'completed' : 'processing',
          };
        }
        return step;
      })
    );
  };

  return (
    <div className='min-h-screen space-y-8 bg-gray-50 p-8'>
      <div className='mx-auto max-w-4xl'>
        <h1 className='mb-6 text-2xl font-bold text-gray-900'>
          Processing Step Components Example
        </h1>

        {/* Controls */}
        <div className='mb-8 space-x-4'>
          <Button
            onClick={() => handleScenarioChange('normal')}
            variant={scenario === 'normal' ? 'default' : 'outline'}
          >
            Normal Flow
          </Button>
          <Button
            onClick={() => handleScenarioChange('failed')}
            variant={scenario === 'failed' ? 'default' : 'outline'}
          >
            Failed Flow
          </Button>
          <Button
            onClick={simulateProgress}
            variant='secondary'
            disabled={scenario === 'failed'}
          >
            Simulate Progress
          </Button>
        </div>

        {/* Individual Step Examples */}
        <div className='mb-8'>
          <h2 className='mb-4 text-lg font-semibold text-gray-900'>
            Individual Step States
          </h2>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <h3 className='text-sm font-medium text-gray-700'>Completed</h3>
              <ProcessingStepItem
                step={{
                  id: 'example-completed',
                  title: 'File validation completed',
                  status: 'completed',
                }}
                className='rounded-lg border border-gray-200 bg-white'
              />
            </div>

            <div className='space-y-2'>
              <h3 className='text-sm font-medium text-gray-700'>Failed</h3>
              <ProcessingStepItem
                step={{
                  id: 'example-failed',
                  title: 'XML parsing failed',
                  status: 'failed',
                  errorMessage: 'Invalid XML structure detected',
                }}
                className='rounded-lg border border-gray-200 bg-white'
              />
            </div>

            <div className='space-y-2'>
              <h3 className='text-sm font-medium text-gray-700'>Processing</h3>
              <ProcessingStepItem
                step={{
                  id: 'example-processing',
                  title: 'Creating JSON data',
                  status: 'processing',
                  progress: 45,
                }}
                className='rounded-lg border border-gray-200 bg-white'
              />
            </div>

            <div className='space-y-2'>
              <h3 className='text-sm font-medium text-gray-700'>Pending</h3>
              <ProcessingStepItem
                step={{
                  id: 'example-pending',
                  title: 'Generate report',
                  status: 'pending',
                }}
                className='rounded-lg border border-gray-200 bg-white'
              />
            </div>

            <div className='space-y-2'>
              <h3 className='text-sm font-medium text-gray-700'>Skipped</h3>
              <ProcessingStepItem
                step={{
                  id: 'example-skipped',
                  title: 'Format JSON data',
                  status: 'skipped',
                }}
                className='rounded-lg border border-gray-200 bg-white'
              />
            </div>
          </div>
        </div>

        {/* Full Step List Example */}
        <div>
          <h2 className='mb-4 text-lg font-semibold text-gray-900'>
            Complete Processing Flow ({scenario})
          </h2>
          <ProcessingStepList
            steps={steps}
            title='File Processing Steps'
            className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'
          />
        </div>
      </div>
    </div>
  );
};

export default ProcessingStepItemExample;
