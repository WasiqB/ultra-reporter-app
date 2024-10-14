'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAnonymousSession } from '@/hooks/use-anonymous-session';

export default function AnonymousSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useAnonymousSession();

  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (session) {
        await supabase.auth.signOut();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [session]);

  return <>{children}</>;
}
