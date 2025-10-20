import type { JSX } from 'react';

interface TitleProps {
  text: string;
}

export const Title = ({ text }: TitleProps): JSX.Element => (
  <h2 className='text-center font-bold text-3xl text-foreground'>{text}</h2>
);
