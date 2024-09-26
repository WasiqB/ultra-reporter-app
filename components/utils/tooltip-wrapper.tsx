import { forwardRef } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const ForwardedWrapper = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>((props, ref) => <div ref={ref}>{props.children}</div>);

ForwardedWrapper.displayName = 'ForwardedWrapper';

export const TooltipWrapper = ({
  children,
  text,
}: {
  children: JSX.Element;
  text: string;
}): JSX.Element => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <ForwardedWrapper>{children}</ForwardedWrapper>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
