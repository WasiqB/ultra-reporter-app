import { StarIcon } from 'lucide-react';
import Link from 'next/link';
import type { JSX } from 'react';
import { Button } from '../../components/button';

export const OpenSource = (): JSX.Element => (
  <section className='mt-16 mb-10 text-center'>
    <h2 className='mb-4 font-bold text-3xl text-foreground'>We are proudly Open Source ❤️</h2>
    <p className='mb-6 text-muted-foreground text-xl'>Our code is open source and available on GitHub</p>
    <Link href='https://github.com/WasiqB/ultra-reporter-app' passHref>
      <Button>
        <StarIcon className='mr-2 h-4 w-4 fill-current' /> Mark a star on GitHub
      </Button>
    </Link>
  </section>
);
