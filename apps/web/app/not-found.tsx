import { Button } from '@ultra-reporter/ui/components/button';
import { FileQuestion } from 'lucide-react';
import Link from 'next/link';
import type { JSX } from 'react';

const NotFound = (): JSX.Element => (
  <div className='flex min-h-screen flex-col items-center justify-center bg-background text-foreground'>
    <FileQuestion className='mb-8 h-24 w-24 text-primary' />
    <h1 className='mb-4 font-bold text-4xl'>404 - Page Not Found</h1>
    <p className='mb-8 max-w-md text-center text-xl'>
      Oops! It seems what you&apos;re looking for has gone missing in our data center.
    </p>
    <Button asChild>
      <Link href='/'>Return to Homepage</Link>
    </Button>
  </div>
);

export default NotFound;
