'use client';

import { createAnonymousUser } from '@ultra-reporter/auth/actions';
import { cn } from '@ultra-reporter/utils/cn';
import { Loader2, Upload } from 'lucide-react';
import { type JSX, useCallback, useState } from 'react';
import { Spinner } from '@/components/spinner';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Label } from '../components/label';

export const FileUpload = (): JSX.Element => {
  // const [file, setFile] = useState<File | null>(null);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFile = useCallback((file: File) => {
    file
      .arrayBuffer()
      .then((buffer) => {
        sessionStorage.setItem(
          'uploaded-file',
          JSON.stringify({
            name: file.name,
            type: file.type,
            size: file.size,
            data: Array.from(new Uint8Array(buffer)),
          }),
        );
        setFileName(file.name);
        setShowLoadingModal(true);
      })
      .catch((error) => {
        setError(error instanceof Error ? error.message : 'An error occurred while uploading the file');
      });
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files?.[0]) {
      handleFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setIsDragActive(true);
    } else if (event.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);

    if (event?.dataTransfer?.files?.[0]) {
      handleFile(event.dataTransfer.files[0]);
    }
  };

  /*
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (file) {
      setLoading(true);
      try {
        await createAnonymousUser();
        const reader = new FileReader();
        reader.onload = async (e) => {
          const xmlContent = e.target?.result as string;
          localStorage.setItem('xml-data', xmlContent);
          router.push('/loading');
        };
        reader.readAsText(file);
      } catch (error) {
        console.error('Error reading file:', error);
        alert('Error reading file');
      } finally {
        setLoading(false);
      }
    }
  };
  */

  return (
    <>
      <form className='w-full max-w-md'>
        <div
          className={cn(
            'cursor-pointer rounded-lg border-4 border-muted-foreground border-dashed p-8 text-center transition-all hover:border-primary hover:text-primary',
            isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragOver}
          onDragEnter={handleDragOver}
          onDrop={handleDrop}
        >
          <Input accept='.xml' className='hidden' id='file-upload' onChange={handleFileChange} type='file' />
          <Label className='cursor-pointer' htmlFor='file-upload'>
            <Upload className='mx-auto mb-4 h-12 w-12 text-muted-foreground' />
            <p className='text-muted-foreground'>
              {fileName ? fileName : `Click to select or drag and drop ${fileName} file`}
            </p>
          </Label>
        </div>
        <Button className='mt-4 w-full' disabled={!file || loading} type='submit'>
          {loading ? (
            <>
              <Spinner />
              <p className='ml-2'>Generating your Report...</p>
            </>
          ) : (
            'Generate Report'
          )}
        </Button>
      </form>
      <LoadingModal fileName={fileName || 'file.xml'} isOpen={showLoadingModal} />
    </>
  );
};
