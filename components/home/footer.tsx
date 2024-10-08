import Image from 'next/image';
import Link from 'next/link';
import { GitHub } from '@/components/icons/github';
import { LinkedIn } from '@/components/icons/linkedin';
import { X } from '@/components/icons/x';
import { YouTube } from '@/components/icons/youtube';
import { Sponsor } from '@/components/icons/sponsor';
import packageInfo from '@/package.json';

export const Footer = (): JSX.Element => {
  return (
    <footer className='footer footer-center bg-muted p-10 pb-10 font-bold text-muted-foreground'>
      <aside>
        <Image src='/favicon.png' height={24} width={24} alt='Ultra Reporter' />
        <h3 className='text-xl text-foreground'>
          Ultra Report <span className='text-sm'>- v{packageInfo.version}</span>
        </h3>
        <div>
          <div className='grid-flow-col items-center'>
            <p>
              Copyright © {new Date().getFullYear()} - Designed and built by
              Wasiq Bhamla.
            </p>
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
            // eslint-disable-next-line @stylistic/js/max-len
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
