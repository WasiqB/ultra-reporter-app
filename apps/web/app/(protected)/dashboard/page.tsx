'use client';

import { signOut } from '@ultra-reporter/auth/actions-client';
import { Button } from '@ultra-reporter/ui/components/button';
import { toast } from '@ultra-reporter/ui/components/sonner';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    await signOut({
      initFn: () => {
        setIsLoading(true);
      },
      successFn: () => {
        router.push('/');
        setIsLoading(false);
        toast.success('Logout successful!', {
          description: 'You are now logged out.',
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
    <div className='container mx-auto p-8'>
      <h1 className='font-bold text-3xl'>Dashboard</h1>
      <Button className='mt-4' onClick={handleSignOut} size='lg' variant='default'>
        {isLoading && <Loader2Icon className='mr-2 h-5 w-5 animate-spin' />}
        Sign Out
      </Button>
    </div>
  );
}
