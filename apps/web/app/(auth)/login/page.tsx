'use client';

import { signinWithGoogle } from '@/app/utils/actions';
import { Button } from '@ultra-reporter/ui/components/button';
import { DemoCarousel } from '@ultra-reporter/ui/components/demo-carousel';
import { Icons } from '@ultra-reporter/ui/components/icons';

export default function AuthPage() {
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
            <h1 className='text-3xl font-bold tracking-tight'>
              Welcome to Ultra Reporter
            </h1>
            <p className='text-muted-foreground text-lg'>
              Sign in to your account or create a new one
            </p>
          </div>

          <div className='space-y-4'>
            <Button
              variant='default'
              size='lg'
              className='w-full py-6 text-lg'
              onClick={signinWithGoogle}
            >
              <Icons.google className='mr-2 h-5 w-5' />
              Continue with Google
            </Button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-sm uppercase'>
                <span className='bg-background text-muted-foreground px-2'>
                  Secure Authentication
                </span>
              </div>
            </div>

            <p className='text-muted-foreground text-center text-sm'>
              By continuing, you agree to our{' '}
              <a href='/terms' className='hover:text-primary underline'>
                Terms of Service
              </a>{' '}
              and{' '}
              <a href='/privacy' className='hover:text-primary underline'>
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
