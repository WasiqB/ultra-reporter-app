import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from './supabase/client';

const supabase = createClient();

const subscribers = new Set<
  (user: User | null, isAnonymous: boolean) => void
>();

supabase.auth.onAuthStateChange((event, session) => {
  console.log('@onAuthStateChange', event, session);
  if (session?.user) {
    subscribers.forEach((callback) =>
      callback(session.user, session.user.is_anonymous === true)
    );
  } else {
    subscribers.forEach((callback) => callback(null, true));
  }
});

export function useUser() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(true);

  useEffect(() => {
    const subscriber = (user: User | null, isAnonymous: boolean) => {
      setIsReady(true);
      setUser(user);
      setIsAnonymous(isAnonymous);
    };

    subscribers.add(subscriber);

    // Cleanup function to remove the subscriber on unmount
    return () => {
      subscribers.delete(subscriber);
    };
  }, []);

  return { user, isAnonymous, isReady };
}
