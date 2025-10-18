'use client';

import { useVariableValue } from '@ultra-reporter/feature-toggle/client';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { JSX } from 'react';
import { Button } from '../components/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../components/sheet';
import { ThemeToggle } from '../components/theme-toggle';
import { GitHub } from '../icons/github';
import { Sponsor } from '../icons/sponsor';

interface NavBarProps {
  suffix?: string;
  cta?: string;
  showFeedback?: boolean;
  hideAuth?: boolean;
}

export const NavBar = ({ suffix, cta, showFeedback }: NavBarProps): JSX.Element => {
  const signInSupport = useVariableValue('sign-in-support', false);

  return (
    <nav className={'top-0 right-0 left-0 z-50 transition-all duration-300'}>
      <div className='container mx-auto flex items-center justify-between px-4 py-4'>
        <div className='flex items-center'>
          <Image alt='Ultra report' className='m-4' height={24} src='/favicon.png' width={24} />
          <Link className='mr-4 flex items-start font-bold text-2xl text-foreground' href='/'>
            Ultra Report
          </Link>
          <span className='text-muted-foreground'>{suffix}</span>
        </div>

        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button className='cursor-pointer md:hidden' size='sm' type='button' variant='ghost'>
              <Menu className='size-6' />
            </Button>
          </SheetTrigger>
          <SheetContent className='w-[300px] sm:w-[400px]' side='right'>
            <SheetTitle className='m-4 text-center'>Menu</SheetTitle>
            <div className='m-4 flex flex-col space-y-4 py-4'>
              <ThemeToggle />
              <Link href='https://github.com/WasiqB/ultra-reporter-app' passHref>
                <Button className='w-full justify-start' size='sm' variant='ghost'>
                  <GitHub />
                  GitHub
                </Button>
              </Link>
              <Link href='https://dub.sh/sponsor-me' passHref>
                <Button
                  className='w-full justify-start text-red-500 hover:text-red-400 dark:text-red-400 dark:hover:text-red-300'
                  size='sm'
                  variant='ghost'
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
                  <Button className='w-full' size='sm' variant='outline'>
                    Give Feedback
                  </Button>
                </Link>
              )}
              {signInSupport && (
                <Link href='/login' passHref>
                  <Button className='w-full' size='sm'>
                    Try for Free
                  </Button>
                </Link>
              )}
              {cta && (
                <Link href='/' passHref>
                  <Button className='w-full' size='sm'>
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
            <Button size='sm' variant='ghost'>
              <GitHub />
            </Button>
          </Link>
          <Link href='https://dub.sh/sponsor-me' passHref>
            <Button
              className='text-red-500 hover:text-red-400 dark:text-red-400 dark:hover:text-red-300'
              size='sm'
              variant='ghost'
            >
              <Sponsor />
            </Button>
          </Link>
          {showFeedback && (
            <Link href='https://github.com/WasiqB/ultra-reporter-app/discussions/new/choose' passHref target='_blank'>
              <Button size='sm' variant='outline'>
                Give Feedback
              </Button>
            </Link>
          )}
          {signInSupport && (
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
