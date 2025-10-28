'use client';

import { Button } from '@ultra-reporter/ui/components/button';
import { ArrowLeft } from 'lucide-react';
import type { JSX } from 'react';

interface ComingSoonProps {
  title: string;
  onBack: () => void;
}

export function ComingSoon({ title, onBack }: ComingSoonProps): JSX.Element {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-background to-muted'>
      <div className='text-center space-y-6 max-w-md'>
        <div className='space-y-2'>
          <h1 className='text-4xl font-bold text-foreground'>Coming Soon</h1>
          <p className='text-lg text-muted-foreground'>{title}</p>
        </div>

        <div className='space-y-4'>
          <p className='text-sm text-muted-foreground'>
            We're working hard to bring this feature to you. Stay tuned for updates!
          </p>

          <div className='flex justify-center'>
            <div className='w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center'>
              <div className='w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center'>
                <div className='w-8 h-8 rounded-full bg-primary/30 animate-pulse' />
              </div>
            </div>
          </div>
        </div>

        <Button onClick={onBack} variant='outline' className='gap-2 bg-transparent'>
          <ArrowLeft className='h-4 w-4' />
          Go Back
        </Button>
      </div>
    </div>
  );
}
