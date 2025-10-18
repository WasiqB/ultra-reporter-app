/** biome-ignore-all lint/a11y/noStaticElementInteractions: intentionally using static element interactions */
/** biome-ignore-all lint/correctness/useUniqueElementIds: intentionally using unique element ids */
'use client';

import { Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type JSX, useState } from 'react';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Label } from '../components/label';

export const FileUpload = (): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFile(event?.target?.files?.[0] ?? null);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setFile(event?.dataTransfer?.files?.[0] ?? null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (file) {
      setLoading(true);
      try {
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

  return (
    <form className='w-full max-w-md' onSubmit={handleSubmit}>
      <div
        className='cursor-pointer rounded-lg border-4 border-muted-foreground border-dashed p-8 text-center transition-all hover:border-primary hover:text-primary'
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input accept='.xml' className='hidden' id='file-upload' onChange={handleFileChange} type='file' />
        <Label className='cursor-pointer' htmlFor='file-upload'>
          <Upload className='mx-auto mb-4 h-12 w-12 text-muted-foreground' />
          <p className='text-muted-foreground'>
            {file ? file.name : 'Click to select or drag and drop testng-results.xml file'}
          </p>
        </Label>
      </div>
      <Button className='mt-4 w-full' disabled={!file || loading} type='submit'>
        {loading ? 'Generating your Report...' : 'Generate Report'}
      </Button>
    </form>
  );
};
