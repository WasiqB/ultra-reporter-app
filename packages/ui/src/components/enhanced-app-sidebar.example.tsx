/**
 * Example usage of the EnhancedAppSidebar component
 * This file demonstrates how to integrate the component with authentication
 */

'use client';

import { useState } from 'react';
import {
  EnhancedAppSidebar,
  EnhancedSidebarUser,
} from './enhanced-app-sidebar';
import { SidebarProvider } from './sidebar';

// Example usage component
export function EnhancedSidebarExample() {
  // Example user states
  const [user, setUser] = useState<EnhancedSidebarUser | null>(null);
  const [currentPath, setCurrentPath] = useState('/dashboard/reports');

  // Mock authentication actions
  const handleAuthAction = (action: 'signin' | 'signout' | 'signup') => {
    switch (action) {
      case 'signin':
        // Mock sign in - in real app, this would trigger auth flow
        setUser({
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          image: 'https://github.com/shadcn.png',
          isAnonymous: false,
        });
        break;
      case 'signout':
        // Mock sign out - in real app, this would clear auth state
        setUser({
          id: 'anon-1',
          name: 'Guest',
          email: 'anonymous@example.com',
          isAnonymous: true,
        });
        break;
      case 'signup':
        // Mock sign up - in real app, this would trigger registration flow
        console.log('Sign up clicked');
        break;
    }
  };

  return (
    <SidebarProvider>
      <div className='flex h-screen w-full'>
        <EnhancedAppSidebar
          user={user}
          onAuthAction={handleAuthAction}
          currentPath={currentPath}
        />
        <main className='flex-1 p-6'>
          <h1 className='mb-4 text-2xl font-bold'>Dashboard Content</h1>
          <p>Current user: {user?.name || 'No user'}</p>
          <p>Is anonymous: {user?.isAnonymous ? 'Yes' : 'No'}</p>
          <p>Current path: {currentPath}</p>

          <div className='mt-4 space-x-2'>
            <button
              onClick={() => setCurrentPath('/dashboard/reports')}
              className='rounded bg-blue-500 px-4 py-2 text-white'
            >
              Go to Reports
            </button>
            <button
              onClick={() => setCurrentPath('/dashboard/upload')}
              className='rounded bg-green-500 px-4 py-2 text-white'
            >
              Go to Upload
            </button>
            <button
              onClick={() => setCurrentPath('/dashboard/history')}
              className='rounded bg-purple-500 px-4 py-2 text-white'
            >
              Go to History
            </button>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

// Example with different user states
export function AnonymousUserExample() {
  const anonymousUser: EnhancedSidebarUser = {
    id: 'anon-123',
    name: 'Guest',
    email: 'anonymous@example.com',
    isAnonymous: true,
  };

  return (
    <SidebarProvider>
      <EnhancedAppSidebar
        user={anonymousUser}
        onAuthAction={(action) => console.log(`Auth action: ${action}`)}
        currentPath='/dashboard/upload'
      />
    </SidebarProvider>
  );
}

export function AuthenticatedUserExample() {
  const authenticatedUser: EnhancedSidebarUser = {
    id: 'user-456',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    image: 'https://github.com/janedoe.png',
    isAnonymous: false,
  };

  return (
    <SidebarProvider>
      <EnhancedAppSidebar
        user={authenticatedUser}
        onAuthAction={(action) => console.log(`Auth action: ${action}`)}
        currentPath='/dashboard/reports'
      />
    </SidebarProvider>
  );
}
