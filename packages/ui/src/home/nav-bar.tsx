'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../components/button';
import { ThemeToggle } from '../components/theme-toggle';
import { GitHub } from '../icons/github';
import { Sponsor } from '../icons/sponsor';

interface NavBarProps {
  suffix?: string;
  cta?: string;
  showFeedback?: boolean;
}

export const NavBar = ({
  suffix,
  cta,
  showFeedback,
}: NavBarProps): JSX.Element => {
  return (
    <nav className={'left-0 right-0 top-0 z-50 transition-all duration-300'}>
      <div className='container mx-auto flex items-center justify-between px-4 py-4'>
        <div className='flex items-center'>
          <Image
            className='m-4'
            src='/favicon.png'
            alt='Ultra report'
            height={24}
            width={24}
          />
          <Link
            href='/'
            className='text-foreground mr-4 flex items-start text-2xl font-bold'
          >
            Ultra Report
          </Link>
          <span className='text-muted-foreground'>{suffix}</span>
        </div>
        <div className='flex items-center space-x-4'>
          <ThemeToggle />
          <Link href='https://github.com/WasiqB/ultra-reporter-app' passHref>
            <Button variant='ghost' size='sm'>
              <GitHub />
            </Button>
          </Link>
          <Link href='https://dub.sh/sponsor-me' passHref>
            <Button
              className='text-red-500 hover:text-red-400 dark:text-red-400 dark:hover:text-red-300'
              variant='ghost'
              size='sm'
            >
              <Sponsor />
            </Button>
          </Link>
          {showFeedback && (
            <Link
              href='https://github.com/WasiqB/ultra-reporter-app/discussions/new/choose'
              passHref
              target='_blank'
            >
              <Button variant='outline' size='sm'>
                Give Feedback
              </Button>
            </Link>
          )}
          {cta && (
            <Link href='/' passHref>
              <Button size='sm'>{cta}</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
