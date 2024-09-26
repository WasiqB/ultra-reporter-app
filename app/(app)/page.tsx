import Image from 'next/image';
import { FileUpload } from '@/components/utils/file-upload';

const LandingPage = (): JSX.Element => {
  return (
    <div className='min-h-screen'>
      <main className='container mx-auto px-4 py-16'>
        <div className='flex flex-col items-center text-center'>
          <Image
            src='/favicon.png'
            alt='Ultra Reporter Logo'
            width={100}
            height={100}
            className='mb-8'
          />
          <h1 className='mb-4 text-4xl font-bold'>Ultra Reporter</h1>
          <p className='mb-8 max-w-2xl text-xl'>
            Upload your Test result XML file and let our advanced reporter
            system analyze and display the data for you.
          </p>
          <FileUpload />
          <div className='mt-8'>
            <h2 className='mb-4 text-2xl font-semibold'>Key Features</h2>
            <ul className='list-inside list-disc text-left'>
              <li>Display TestNG results in beautiful dashboard</li>
              <li>See the Tests insights charts</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
