'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { GitHub } from '@/components/icons/github';
import { Sponsor } from '@/components/icons/sponsor';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { DownloadIcon } from 'lucide-react';
import { exportHTML } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface NavBarProps {
  suffix?: string;
  cta?: string;
  exportReport?: 'html' | undefined;
  showFeedback?: boolean;
}

export const NavBar = ({
  suffix,
  cta,
  exportReport,
  showFeedback,
}: NavBarProps): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 shadow-md backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
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
            className='mr-4 flex items-start text-2xl font-bold text-foreground'
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
          {exportReport && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm'>
                  <DownloadIcon className='mr-2 h-4 w-4' />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={exportHTML}>
                  Export HTML
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
