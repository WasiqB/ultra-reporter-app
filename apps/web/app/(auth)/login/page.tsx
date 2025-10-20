'use client';

import { signInWithSocial } from '@ultra-reporter/auth/actions-client';
import { Button } from '@ultra-reporter/ui/components/button';
import { DemoCarousel } from '@ultra-reporter/ui/components/demo-carousel';
import { Icons } from '@ultra-reporter/ui/components/icons';
import { toast } from '@ultra-reporter/ui/components/sonner';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const signInWithGoogle = async () => {
    await signInWithSocial({
      provider: 'google',
      url: '/dashboard',
      initFn: () => {
        setIsLoading(true);
      },
      successFn: () => {
        setIsLoading(false);
        toast.success('Login successful!', {
          description: 'You are now logged in.',
        });
      },
      errorFn: (ctx) => {
        setIsLoading(false);
        toast.error(ctx.error.name, {
          description: ctx.error.message,
        });
      },
    });
  };

  return (
    <div className='container mx-auto flex min-h-screen items-center justify-center'>
      <div className='grid w-full items-center gap-8 lg:grid-cols-2'>
        {/* Demo Carousel Section */}
        <div className='relative hidden h-[600px] lg:block'>
          <DemoCarousel />
        </div>

        {/* Auth Section */}
        <div className='mx-auto w-full max-w-md space-y-8'>
          <div className='space-y-2 text-center'>
            <h1 className='font-bold text-3xl tracking-tight'>Welcome to Ultra Reporter</h1>
            <p className='text-lg text-muted-foreground'>Sign in to your account or create a new one</p>
          </div>

          <div className='space-y-4'>
            <Button
              className='w-full py-6 text-lg'
              disabled={isLoading}
              onClick={signInWithGoogle}
              size='lg'
              type='button'
              variant='default'
            >
              {isLoading ? (
                <Loader2Icon className='mr-2 h-5 w-5 animate-spin' />
              ) : (
                <Icons.google className='mr-2 h-5 w-5' />
              )}
              Continue with Google
            </Button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-sm uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>Secure Authentication</span>
              </div>
            </div>

            <p className='text-center text-muted-foreground text-sm'>
              By continuing, you agree to our{' '}
              <a className='underline hover:text-primary' href='/terms'>
                Terms of Service
              </a>{' '}
              and{' '}
              <a className='underline hover:text-primary' href='/privacy'>
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
