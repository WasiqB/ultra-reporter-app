'use client';

import { authClient } from '@ultra-reporter/auth/auth-client';
import { Button } from '@ultra-reporter/ui/components/button';
import { useRouter } from 'next/navigation';

export default async function DashboardPage() {
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
        },
      },
    });
  };

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <Button onClick={signOut} variant='default' size='lg' className='mt-4'>
        Sign Out
      </Button>
    </div>
  );
}
