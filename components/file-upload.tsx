'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const FileUpload = (): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
    <form onSubmit={handleSubmit} className='w-full max-w-md'>
      <div
        className='cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center'
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type='file'
          accept='.xml'
          onChange={handleFileChange}
          className='hidden'
          id='file-upload'
        />
        <label htmlFor='file-upload' className='cursor-pointer'>
          {file ? file.name : 'Click to select or drag and drop an XML file'}
        </label>
      </div>
      <button
        type='submit'
        className='mt-4 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600'
        disabled={!file || loading}
      >
        {loading ? 'Processing...' : 'Process XML'}
      </button>
    </form>
  );
};
