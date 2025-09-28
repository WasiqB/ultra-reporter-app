'use client';

import { authClient } from '@ultra-reporter/auth/auth-client';
import { Button } from '@ultra-reporter/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ultra-reporter/ui/components/card';
import { toast } from '@ultra-reporter/ui/components/sonner';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { JSX, useState } from 'react';

export default function DashboardPage(): JSX.Element {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest: (ctx) => {
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
    <div className='flex flex-1 flex-col gap-4'>
      <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Dashboard</CardTitle>
            <CardDescription>
              Manage your TestNG reports and uploads from here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground text-sm'>
              Use the sidebar to navigate between different sections.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <Button
              onClick={() => router.push('/')}
              variant='outline'
              className='w-full'
            >
              Upload New Report
            </Button>
            <Button onClick={signOut} variant='default' className='w-full'>
              {isLoading && (
                <Loader2Icon className='mr-2 h-4 w-4 animate-spin' />
              )}
              Sign Out
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground text-sm'>
              No recent activity to display.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
