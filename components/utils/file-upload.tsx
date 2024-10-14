'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { UploadIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useAnonymousSession } from '@/hooks/use-anonymous-session';

export function FileUpload(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const session = useAnonymousSession();

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (!file || !session) return;

    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const xmlContent = e.target?.result as string;

        console.log({ session, xmlContent });

        const response = await fetch('/api/process-file', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ content: xmlContent }),
        });

        if (!response.ok) {
          throw new Error('Failed to process XML');
        }

        const { sessionId } = await response.json();

        sessionStorage.setItem('reportSessionId', sessionId);

        router.push('/loading');
      };
      reader.readAsText(file);
    } catch (error) {
      console.error('Error processing file:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-md'>
      <div
        // eslint-disable-next-line @stylistic/js/max-len
        className='cursor-pointer rounded-lg border-2 border-dashed border-input p-8 text-center transition-all hover:border-primary hover:text-primary'
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          type='file'
          accept='.xml'
          onChange={handleFileChange}
          className='hidden'
          id='file-upload'
        />
        <Label htmlFor='file-upload' className='cursor-pointer'>
          <UploadIcon className='mx-auto mb-4 h-12 w-12' />
          <p className='text-muted-foreground'>
            {file ? file.name : 'Click to select or drag and drop an XML file'}
          </p>
        </Label>
      </div>
      <Button type='submit' className='mt-4 w-full' disabled={loading || !file}>
        {loading ? 'Generating your Report...' : 'Generate Report'}
      </Button>
    </form>
  );
}
