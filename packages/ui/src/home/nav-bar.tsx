'use client';

import { getFlag } from '@ultra-reporter/feature-toggle/provider';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';
import { Button } from '../components/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '../components/sheet';
import { ThemeToggle } from '../components/theme-toggle';
import { GitHub } from '../icons/github';
import { Sponsor } from '../icons/sponsor';

interface NavBarProps {
  suffix?: string;
  cta?: string;
  showFeedback?: boolean;
  hideAuth?: boolean;
}

export const NavBar = ({
  suffix,
  cta,
  showFeedback,
}: NavBarProps): JSX.Element => {
  const signInSupport = getFlag('sign_in_support');

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

        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              className='cursor-pointer md:hidden'
              type='button'
            >
              <Menu className='size-6' />
            </Button>
          </SheetTrigger>
          <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
            <SheetTitle className='m-4 text-center'>Menu</SheetTitle>
            <div className='m-4 flex flex-col space-y-4 py-4'>
              <ThemeToggle />
              <Link
                href='https://github.com/WasiqB/ultra-reporter-app'
                passHref
              >
                <Button
                  variant='ghost'
                  size='sm'
                  className='w-full justify-start'
                >
                  <GitHub />
                  GitHub
                </Button>
              </Link>
              <Link href='https://dub.sh/sponsor-me' passHref>
                <Button
                  className='w-full justify-start text-red-500 hover:text-red-400 dark:text-red-400 dark:hover:text-red-300'
                  variant='ghost'
                  size='sm'
                >
                  <Sponsor />
                  Sponsor
                </Button>
              </Link>
              {showFeedback && (
                <Link
                  href='https://github.com/WasiqB/ultra-reporter-app/discussions/new/choose'
                  passHref
                  target='_blank'
                >
                  <Button variant='outline' size='sm' className='w-full'>
                    Give Feedback
                  </Button>
                </Link>
              )}
              {signInSupport?.enabled && (
                <Link href='/login' passHref>
                  <Button size='sm' className='w-full'>
                    Try for Free
                  </Button>
                </Link>
              )}
              {cta && (
                <Link href='/' passHref>
                  <Button size='sm' className='w-full'>
                    {cta}
                  </Button>
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <div className='hidden items-center space-x-4 md:flex'>
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
          {signInSupport?.enabled && (
            <Link href='/login' passHref>
              <Button size='sm' variant='default'>
                Try for Free
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
