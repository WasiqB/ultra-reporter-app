import { cn } from '@ultra-reporter/utils/cn';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('animate-pulse rounded-md bg-primary/10', className)} data-slot='skeleton' {...props} />;
}

export { Skeleton };
