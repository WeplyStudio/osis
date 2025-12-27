'use client';

import { initializeFirebase } from '.';
import { FirebaseProvider } from './provider';
import { useEffect } from 'react';
import { getAuth, signInAnonymously } from 'firebase/auth';

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = initializeFirebase();
  
  useEffect(() => {
    const auth = getAuth(value.firebaseApp);
    signInAnonymously(auth).catch((error) => {
      console.error("Anonymous sign-in failed:", error);
    });
  }, [value.firebaseApp]);

  return <FirebaseProvider value={value}>{children}</FirebaseProvider>;
}
