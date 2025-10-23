'use client';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex min-h-screen flex-col justify-between'>{children}</div>;
};

export default ProtectedLayout;
