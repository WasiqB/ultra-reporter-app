'use client';

import { useEffect, useState } from 'react';
import { authClient } from '../lib/auth-client';

export function useAnonymousAuth(): {
  isAuthenticated: any;
  isLoading: any;
} {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      try {
        const session = await authClient.getSession();

        if (!session) {
          await authClient.signIn.anonymous();
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  return { isAuthenticated, isLoading };
}
