'use client';

import { authClient } from '@ultra-reporter/auth/auth-client';
import { Button } from '@ultra-reporter/ui/components/button';
import { toast } from '@ultra-reporter/ui/components/sonner';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          router.push('/');
          setIsLoading(false);
          toast.success('Logout successful!', {
            description: 'You are now logged out.',
          });
        },
        onError: (ctx) => {
          setIsLoading(false);
          toast.error(ctx.error.name, {
            description: ctx.error.message,
          });
        },
      },
    });
  };

  return (
    <div className='container mx-auto py-8'>
      <h1 className='font-bold text-3xl'>Dashboard</h1>
      <Button className='mt-4' onClick={signOut} size='lg' variant='default'>
        {isLoading && <Loader2Icon className='mr-2 h-5 w-5 animate-spin' />}
        Sign Out
      </Button>
    </div>
  );
}
