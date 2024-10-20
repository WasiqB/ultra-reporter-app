import * as React from 'react';

import { FileUpload } from '@/components/utils/file-upload';
import { OpenSource } from '@/components/home/open-source';
import { NavBar } from '@/components/home/nav-bar';
import { Features } from '@/components/home/feature';
import { Sponsor } from '@/components/home/sponsor';
import { Feedback } from '@/components/home/feedback';

const LandingPage = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <main className='container mx-auto flex-grow bg-background px-4 py-16 text-foreground'>
        <div className='flex flex-col items-center pt-16 text-center'>
          <h2 className='gradient-text text-3xl font-bold md:text-5xl'>
            Ultra Reporter
          </h2>
          <h1 className='mb-8 mt-16 text-center text-4xl font-bold leading-tight md:text-6xl'>
            <span className='text-foreground'>
              Convert your Test results to
            </span>
            <br />
            <span className='gradient-text'>Beautiful Report</span>
            <br />
            <span className='text-foreground'>in one click</span>
          </h1>
          <FileUpload />
        </div>
        <Features />
        <Feedback />
        <Sponsor />
        <OpenSource />
      </main>
    </>
  );
};

export default LandingPage;
