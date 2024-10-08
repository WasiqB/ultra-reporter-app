import Link from 'next/link';
import { StarIcon } from 'lucide-react';
import { RainbowButton } from '@/components/ui/rainbow-button';

export const OpenSource = (): JSX.Element => {
  return (
    <section className='mb-10 mt-10 text-center'>
      <h2 className='mb-4 text-3xl font-bold text-foreground'>
        We are proudly Open Source ❤️
      </h2>
      <p className='mb-6 text-xl text-muted-foreground'>
        Our code is open source and available on GitHub
      </p>
      <Link href='https://github.com/WasiqB/ultra-reporter-app' passHref>
        <RainbowButton>
          <StarIcon className='mr-2 h-4 w-4 fill-current' /> Mark a star on
          GitHub
        </RainbowButton>
      </Link>
    </section>
  );
};
