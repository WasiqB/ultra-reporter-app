import { cn } from '@ultra-reporter/utils/cn';
import * as React from 'react';
import { ProcessingStep, ProcessingStepItem } from './processing-step-item';

interface ProcessingStepListProps {
  steps: ProcessingStep[];
  title?: string;
  className?: string;
}

export const ProcessingStepList: React.FC<ProcessingStepListProps> = ({
  steps,
  title = 'Processing Steps',
  className,
}) => {
  return (
    <div className={cn('mx-auto w-full max-w-2xl', className)}>
      {title && (
        <h2 className='mb-4 text-lg font-semibold text-gray-900'>{title}</h2>
      )}

      <div className='space-y-2' role='list' aria-label='Processing steps'>
        {steps.map((step) => (
          <ProcessingStepItem
            key={step.id}
            step={step}
            className='border border-gray-200 bg-white hover:shadow-sm'
          />
        ))}
      </div>
    </div>
  );
};

export default ProcessingStepList;
