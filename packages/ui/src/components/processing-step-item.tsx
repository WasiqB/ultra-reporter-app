import { cn } from '@ultra-reporter/utils/cn';
import { Check, Clock, Loader2, X } from 'lucide-react';
import * as React from 'react';

// TypeScript interfaces for step status and icon types
export type StepStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'skipped';

export type StepIconType = 'check' | 'cross' | 'clock' | 'spinner';

export interface ProcessingStep {
  id: string;
  title: string;
  status: StepStatus;
  progress?: number;
  errorMessage?: string;
}

export interface StepIconConfig {
  type: StepIconType;
  color: 'green' | 'red' | 'gray' | 'blue';
  className: string;
}

interface ProcessingStepItemProps {
  step: ProcessingStep;
  className?: string;
}

// Helper function to get icon configuration based on step status
const getStepIconConfig = (status: StepStatus): StepIconConfig => {
  switch (status) {
    case 'completed':
      return {
        type: 'check',
        color: 'green',
        className: 'text-green-600 bg-green-100 border-green-200',
      };
    case 'failed':
      return {
        type: 'cross',
        color: 'red',
        className: 'text-red-600 bg-red-100 border-red-200',
      };
    case 'processing':
      return {
        type: 'spinner',
        color: 'blue',
        className: 'text-blue-600 bg-blue-100 border-blue-200',
      };
    case 'pending':
      return {
        type: 'clock',
        color: 'gray',
        className: 'text-gray-600 bg-gray-100 border-gray-200',
      };
    case 'skipped':
      return {
        type: 'clock',
        color: 'gray',
        className: 'text-gray-400 bg-gray-50 border-gray-100',
      };
    default:
      return {
        type: 'clock',
        color: 'gray',
        className: 'text-gray-600 bg-gray-100 border-gray-200',
      };
  }
};

// Helper function to render the appropriate icon
const renderStepIcon = (iconConfig: StepIconConfig) => {
  const iconProps = {
    className: 'h-4 w-4',
    'aria-hidden': true,
  };

  switch (iconConfig.type) {
    case 'check':
      return <Check {...iconProps} />;
    case 'cross':
      return <X {...iconProps} />;
    case 'spinner':
      return (
        <Loader2
          {...iconProps}
          className={cn(iconProps.className, 'animate-spin')}
        />
      );
    case 'clock':
    default:
      return <Clock {...iconProps} />;
  }
};

// Helper function to get text styling based on step status
const getTextStyling = (status: StepStatus): string => {
  switch (status) {
    case 'completed':
      return 'text-gray-900 font-medium';
    case 'failed':
      return 'text-red-900 font-medium';
    case 'processing':
      return 'text-blue-900 font-medium';
    case 'pending':
      return 'text-gray-700';
    case 'skipped':
      return 'text-gray-400';
    default:
      return 'text-gray-700';
  }
};

export const ProcessingStepItem: React.FC<ProcessingStepItemProps> = ({
  step,
  className,
}) => {
  const iconConfig = getStepIconConfig(step.status);
  const textStyling = getTextStyling(step.status);

  return (
    <div
      className={cn(
        'flex items-center space-x-3 rounded-lg px-4 py-3 transition-all duration-200',
        className
      )}
      role='listitem'
      aria-label={`Processing step: ${step.title}, Status: ${step.status}`}
    >
      {/* Status Icon */}
      <div
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-200',
          iconConfig.className
        )}
        aria-hidden='true'
      >
        {renderStepIcon(iconConfig)}
      </div>

      {/* Step Content */}
      <div className='min-w-0 flex-1'>
        <div
          className={cn('text-sm transition-colors duration-200', textStyling)}
        >
          {step.title}
        </div>

        {/* Error Message */}
        {step.status === 'failed' && step.errorMessage && (
          <div className='mt-1 text-xs text-red-600 opacity-80'>
            {step.errorMessage}
          </div>
        )}

        {/* Progress Bar for Processing State */}
        {step.status === 'processing' && step.progress !== undefined && (
          <div className='mt-2'>
            <div className='h-1.5 w-full rounded-full bg-gray-200'>
              <div
                className='h-1.5 rounded-full bg-blue-600 transition-all duration-300 ease-out'
                style={{
                  width: `${Math.min(100, Math.max(0, step.progress))}%`,
                }}
                role='progressbar'
                aria-valuenow={step.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Progress: ${step.progress}%`}
              />
            </div>
          </div>
        )}
      </div>

      {/* Status Badge */}
      <div className='flex-shrink-0'>
        <span
          className={cn(
            'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium transition-colors duration-200',
            {
              'bg-green-100 text-green-800': step.status === 'completed',
              'bg-red-100 text-red-800': step.status === 'failed',
              'bg-blue-100 text-blue-800': step.status === 'processing',
              'bg-gray-100 text-gray-800': step.status === 'pending',
              'bg-gray-50 text-gray-400': step.status === 'skipped',
            }
          )}
        >
          {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
        </span>
      </div>
    </div>
  );
};

export default ProcessingStepItem;
