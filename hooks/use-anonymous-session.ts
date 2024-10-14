import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

export const useAnonymousSession = (): Session | null => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const createAnonymousSession = async () => {
      const { data, error } = await supabase.auth.signInAnonymously();

      if (error) {
        console.error('Error creating anonymous session:', error);
      } else {
        setSession(data.session);
      }
    };

    const checkExistingSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setSession(session);
      } else {
        createAnonymousSession();
      }
    };

    checkExistingSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return session;
};
