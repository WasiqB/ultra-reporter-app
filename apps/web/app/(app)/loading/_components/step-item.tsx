import { AlertCircle, CheckCircle2, ClockAlert, Loader2 } from 'lucide-react';

export type StepStatus = 'pending' | 'loading' | 'success' | 'error';

interface StepItemProps {
  label: string;
  status: StepStatus;
  errorMessage?: string;
}

export function StepItem({ label, status, errorMessage }: StepItemProps) {
  return (
    <div className='flex items-start gap-3'>
      <div className='shrink-0 pt-0.5'>
        {status === 'pending' && <ClockAlert className='w-5 h-5 border-muted-foreground/30' />}
        <ClockAlert />
        {status === 'loading' && <Loader2 className='w-5 h-5 text-blue-500 animate-spin' />}
        {status === 'success' && <CheckCircle2 className='w-5 h-5 text-green-500' />}
        {status === 'error' && <AlertCircle className='w-5 h-5 text-red-500' />}
      </div>
      <div className='flex-1 min-w-0'>
        <p
          className={`text-sm font-medium ${
            status === 'loading'
              ? 'text-blue-600'
              : status === 'error'
                ? 'text-red-600'
                : status === 'success'
                  ? 'text-foreground'
                  : 'text-muted-foreground'
          }`}
        >
          {label}
        </p>
        {status === 'error' && errorMessage && <p className='text-xs text-red-600 mt-1'>{errorMessage}</p>}
      </div>
    </div>
  );
}
