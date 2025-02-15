'use client';

import { signOut } from '@/app/utils/actions';
import { Button } from '@ultra-reporter/ui/components/button';

export default function DashboardPage() {
  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <Button onClick={signOut} variant='default' size='lg' className='mt-4'>
        Sign Out
      </Button>
    </div>
  );
}
