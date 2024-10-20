'use client';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import { isBase64Image, isJson, isXml, prettifyJson } from '@/lib/string-util';
import { CopyBlock, dracula } from 'react-code-blocks';

interface AttachmentDialogProps {
  attachment: string | string[];
  title: string;
  description?: string;
}

export function AttachmentDialog({
  attachment,
  title,
  description,
}: AttachmentDialogProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const isArray = Array.isArray(attachment);
  const content = isArray ? attachment : [attachment];
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <Link className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='flex w-full flex-col sm:max-h-[90vh] sm:max-w-[90vw]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className='mt-4 flex w-full flex-grow flex-col items-center justify-center'>
          <Carousel setApi={setApi} className='relative w-full'>
            <CarouselContent className='w-full'>
              {content.map((item, index) => (
                <CarouselItem key={index} className='w-full'>
                  <Card className='w-full'>
                    <CardContent className='p-6'>
                      {isBase64Image(item) ? (
                        <div className='relative h-[300px] w-full border border-gray-500'>
                          <img
                            src={`data:image/png;base64,${item}`}
                            alt='Attachment'
                            className='h-full w-full object-contain'
                          />
                        </div>
                      ) : (
                        <div className='w-full overflow-hidden'>
                          <CopyBlock
                            text={
                              isJson(item) ? prettifyJson(item) : item.trim()
                            }
                            theme={dracula}
                            language={
                              isJson(item)
                                ? 'json'
                                : isXml(item)
                                  ? 'xml'
                                  : 'text'
                            }
                            customStyle={{
                              height: '300px',
                              overflow: 'auto',
                            }}
                            showLineNumbers
                            wrapLongLines
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className='py-2 text-center text-sm text-muted-foreground'>
            Slide {current} of {count}. (Use arrow keys to navigate)
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
