'use client';

import { useState, useEffect, useRef } from 'react';
import type {
  DocumentReference,
  DocumentData,
  FirestoreError,
} from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// Define a generic type for the hook
export const useDoc = <T extends DocumentData>(
  docRef: DocumentReference<T> | null
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);
  
  const docRefRef = useRef(docRef);
  useEffect(() => {
    docRefRef.current = docRef;
  }, [docRef]);


  useEffect(() => {
    if (!docRefRef.current) {
      setData(null);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);

    const unsubscribe = onSnapshot(
      docRefRef.current,
      (docSnap) => {
        if (docSnap.exists()) {
          setData({ id: docSnap.id, ...docSnap.data() } as T);
        } else {
          setData(null); // Document does not exist
        }
        setIsLoading(false);
        setError(null);
      },
      (err) => {
        const permissionError = new FirestorePermissionError({
          path: (docRefRef.current as DocumentReference).path,
          operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [docRef]);

  return { data, isLoading, error };
};
