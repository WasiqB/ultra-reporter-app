import { FileUpload } from '@/components/utils/file-upload';
import { OpenSource } from '@/components/home/open-source';
import { NavBar } from '@/components/home/nav-bar';
import { Features } from '@/components/home/feature';
import Link from 'next/link';
import { StarIcon } from 'lucide-react';
import { RainbowButton } from '@/components/ui/rainbow-button';

const LandingPage = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <main className='container mx-auto flex-grow px-4 py-16'>
        <div className='flex flex-col items-center pt-16 text-center'>
          <Link href='https://github.com/WasiqB/ultra-reporter-app' passHref>
            <RainbowButton>
              <StarIcon className='mr-2 h-4 w-4 fill-current' /> Star us on
              GitHub
            </RainbowButton>
          </Link>
          <h1 className='mb-16 mt-16 text-center text-5xl font-bold leading-tight md:text-7xl'>
            <span className='text-gray-700'>Convert your Test results to</span>
            <br />
            <span className='gradient-text'>Beautiful Report</span>
            <br />
            <span className='text-gray-700'>in one click</span>
          </h1>
          <FileUpload />
        </div>
        <Features />
        <OpenSource />
      </main>
    </>
  );
};

export default LandingPage;
