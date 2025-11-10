import { StepItem, type StepStatus } from './step-item';

export interface Step {
  id: string;
  label: string;
  status: StepStatus;
  errorMessage?: string;
}

interface StepsContainerProps {
  title: string;
  subtitle?: string;
  steps: Step[];
  progress?: number;
}

export function StepsContainer({ title, subtitle, steps, progress = 0 }: StepsContainerProps) {
  return (
    <div className='w-full max-w-md mx-auto'>
      <div className='bg-card rounded-lg border border-border shadow-sm p-6'>
        {/* Header */}
        <div className='mb-6'>
          <h2 className='text-lg font-semibold text-foreground'>{title}</h2>
          {subtitle && <p className='text-sm text-muted-foreground mt-1'>{subtitle}</p>}
        </div>

        {/* Progress Bar */}
        <div className='mb-6'>
          <div className='w-full h-2 bg-muted rounded-full overflow-hidden'>
            <div className='h-full bg-primary transition-all duration-300 ease-out' style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Steps */}
        <div className='space-y-4'>
          {steps.map((step) => (
            <StepItem key={step.id} label={step.label} status={step.status} errorMessage={step.errorMessage} />
          ))}
        </div>
      </div>
    </div>
  );
}
