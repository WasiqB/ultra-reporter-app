'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@ultra-reporter/utils/cn';
import type * as React from 'react';

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn(
        'select-none font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
        className
      )}
      data-slot='label'
      {...props}
    />
  );
}

export { Label };
