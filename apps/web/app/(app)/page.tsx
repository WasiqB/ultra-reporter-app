import { Features } from '@ultra-reporter/ui/home/feature';
import { Feedback } from '@ultra-reporter/ui/home/feedback';
import { NavBar } from '@ultra-reporter/ui/home/nav-bar';
import { OpenSource } from '@ultra-reporter/ui/home/open-source';
import { Sponsor } from '@ultra-reporter/ui/home/sponsor';
import { FileUpload } from '@ultra-reporter/ui/utils/file-upload';

const LandingPage = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <main className='bg-background text-foreground container mx-auto flex-grow px-4 py-16'>
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
