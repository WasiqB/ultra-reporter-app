import { Button } from '@ultra-reporter/ui/components/button';
import { FileQuestion } from 'lucide-react';
import Link from 'next/link';
import { JSX } from 'react';

const NotFound = (): JSX.Element => {
  return (
    <div className='bg-background text-foreground flex min-h-screen flex-col items-center justify-center'>
      <FileQuestion className='text-primary mb-8 h-24 w-24' />
      <h1 className='mb-4 text-4xl font-bold'>404 - Page Not Found</h1>
      <p className='mb-8 max-w-md text-center text-xl'>
        Oops! It seems what you&apos;re looking for has gone missing in our data
        center.
      </p>
      <Button asChild>
        <Link href='/'>Return to Homepage</Link>
      </Button>
    </div>
  );
};

export default NotFound;
