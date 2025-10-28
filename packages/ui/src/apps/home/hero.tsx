'use client';

import Image from 'next/image';
import type { JSX } from 'react';
import { FileUpload } from '../../utils/file-upload';

export const Hero = (): JSX.Element => {
  return (
    <section className='flex flex-col items-center gap-4 p-16'>
      <div className='flex flex-col-reverse items-center justify-between gap-8 md:flex-row md:gap-12'>
        <div className='flex flex-col items-center gap-4 text-center md:items-center md:text-left'>
          <h1 className='text-left font-bold text-3xl md:text-6xl'>
            Convert your Test results to
            <br />
            <span className='gradient-text'>Beautiful Report</span>
            <br />
            in one click
          </h1>
          <div className='w-full max-w-sm pt-8'>
            <FileUpload />
          </div>
        </div>
        <div className='w-full max-w-lg items-end'>
          <Image
            alt='Ultra Reporter Sample Report'
            className='rounded-lg border shadow-lg dark:shadow-muted-foreground'
            height={600}
            priority
            src='/report-1.png'
            width={600}
          />
        </div>
      </div>
    </section>
  );
};
