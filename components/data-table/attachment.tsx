'use client';

import React, { useState } from 'react';
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

interface AttachmentDialogProps {
  content: string;
  title: string;
  description?: string;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const isBase64Image = (str: string): boolean => {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
};

export function AttachmentDialog({
  content,
  title,
  description,
}: AttachmentDialogProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const isImage = isBase64Image(content);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <Link className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col sm:max-h-[90vh] sm:max-w-[90vw]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className='mt-4 flex-grow overflow-auto'>
          {isImage ? (
            <div className='relative h-full min-h-[300px] w-full border border-gray-500'>
              <img
                src={`data:image/png;base64,${content}`}
                alt='Attachment'
                className='h-full w-full object-contain'
              />
            </div>
          ) : (
            <div className='max-h-[60vh] overflow-y-auto'>
              <p className='whitespace-pre-wrap text-lg text-gray-800'>
                {content}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
