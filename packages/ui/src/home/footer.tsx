import Image from 'next/image';
import Link from 'next/link';
import type { JSX } from 'react';
import packageInfo from '../../package.json';
import { GitHub } from '../icons/github';
import { LinkedIn } from '../icons/linkedin';
import { Sponsor } from '../icons/sponsor';
import { X } from '../icons/x';
import { YouTube } from '../icons/youtube';

export const Footer = (): JSX.Element => {
  return (
    <footer className='footer footer-horizontal footer-center bg-muted p-10 pb-10 font-bold text-muted-foreground'>
      <aside>
        <Link className='flex flex-col items-center' href='/'>
          <Image alt='Ultra Reporter' height={24} src='/favicon.png' width={24} />
          <h3 className='text-foreground text-xl'>
            Ultra Report <span className='text-sm'>- v{packageInfo.version}</span>
          </h3>
        </Link>
        <div>
          <div className='grid-flow-col items-center'>
            <p>Copyright © {new Date().getFullYear()} - Designed and built with ❤️ by Wasiq Bhamla.</p>
          </div>
          All rights reserved.
        </div>
      </aside>
      <nav>
        <div className='grid grid-flow-col gap-5'>
          <Link
            className='text-muted-foreground transition-colors hover:text-foreground'
            href='https://git.new/personal'
            target='_blank'
          >
            <GitHub />
          </Link>
          <Link
            className='text-muted-foreground transition-colors hover:text-foreground'
            href='https://dub.sh/lnkd'
            target='_blank'
          >
            <LinkedIn />
          </Link>
          <Link
            className='text-muted-foreground transition-colors hover:text-foreground'
            href='https://dub.sh/x-wasiq'
            target='_blank'
          >
            <X />
          </Link>
          <Link
            className='text-muted-foreground transition-colors hover:text-foreground'
            href='https://dub.sh/lta-yt'
            target='_blank'
          >
            <YouTube />
          </Link>
          <Link
            className='text-red-500 transition-colors hover:text-red-400 dark:text-red-400 dark:hover:text-red-300'
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
