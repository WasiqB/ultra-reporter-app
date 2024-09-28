'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { GitHub } from '@/components/icons/github';
import { Sponsor } from '@/components/icons/sponsor';

interface NavBarProps {
  suffix?: string;
  cta?: string;
}

export const NavBar = ({ suffix, cta }: NavBarProps): JSX.Element => {
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
          ? 'bg-current/80 shadow-md backdrop-blur-md'
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
            className='mr-4 flex items-start text-2xl font-bold text-gray-800'
          >
            Ultra Report
          </Link>
          <span className='text-gray-600'>{suffix}</span>
        </div>
        <div className='flex items-center space-x-4'>
          <Link href='https://github.com/WasiqB/ultra-reporter-app' passHref>
            <Button variant='ghost' size='sm'>
              <GitHub />
            </Button>
          </Link>
          <Link href='https://dub.sh/sponsor-me' passHref>
            <Button
              className='text-red-500 hover:text-red-400'
              variant='ghost'
              size='sm'
            >
              <Sponsor />
            </Button>
          </Link>
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
