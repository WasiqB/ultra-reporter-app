import { CalendarIcon } from '@radix-ui/react-icons';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import Link from 'next/link';

export const UserCard = (): JSX.Element => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href='https://git.new/personal'>
          <Button variant='link'>@WasiqB</Button>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className='w-80'>
        <div className='flex justify-between space-x-4'>
          <Avatar>
            <AvatarImage src='https://github.com/WasiqB.png' />
            <AvatarFallback>WB</AvatarFallback>
          </Avatar>
          <div className='space-y-1'>
            <h4 className='text-sm font-semibold'>@WasiqB</h4>
            <p className='text-sm'>
              Ultra Reporter - Created and maintained by Wasiq Bhamla
            </p>
            <div className='flex items-center pt-2'>
              <CalendarIcon className='mr-2 h-4 w-4 opacity-70' />{' '}
              <span className='text-xs text-muted-foreground'>
                Created September, 21st 2024
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
