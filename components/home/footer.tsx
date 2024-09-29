import Image from 'next/image';
import Link from 'next/link';
import { GitHub } from '@/components/icons/github';
import { LinkedIn } from '@/components/icons/linkedin';
import { X } from '@/components/icons/x';
import { YouTube } from '@/components/icons/youtube';
import { Sponsor } from '@/components/icons/sponsor';

export const Footer = (): JSX.Element => {
  return (
    <footer className='primary footer footer-center p-10 pb-10 font-bold'>
      <aside>
        <Image src='/favicon.png' height={24} width={24} alt='Ultra Reporter' />
        <h3 className='text-xl'>Ultra Report</h3>
        <div>
          <div className='grid-flow-col items-center'>
            <p>
              Copyright © {new Date().getFullYear()} - Designed and built by
              Wasiq Bhamla.
            </p>
          </div>
          All right reserved.
        </div>
      </aside>
      <nav>
        <div className='grid grid-flow-col gap-5 text-gray-500'>
          <Link
            className='hover:text-gray-400'
            href='https://git.new/personal'
            target='_blank'
          >
            <GitHub />
          </Link>
          <Link
            className='hover:text-gray-400'
            href='https://dub.sh/lnkd'
            target='_blank'
          >
            <LinkedIn />
          </Link>
          <Link
            className='hover:text-gray-400'
            href='https://dub.sh/x-wasiq'
            target='_blank'
          >
            <X />
          </Link>
          <Link
            className='hover:text-gray-400'
            href='https://dub.sh/lta-yt'
            target='_blank'
          >
            <YouTube />
          </Link>
          <Link
            className='text-red-500 hover:text-red-400'
            href='https://dub.sh/sponsor-me'
            target='_blank'
          >
            <Sponsor />
          </Link>
        </div>
      </nav>
    </footer>
  );
};
