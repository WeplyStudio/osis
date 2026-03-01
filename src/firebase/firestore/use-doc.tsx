
'use client';

import { useState, useEffect, useRef } from 'react';
import { DocumentReference, onSnapshot, DocumentSnapshot, DocumentData } from 'firebase/firestore';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

export function useDoc<T = DocumentData>(docRef: DocumentReference<T> | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Use a ref to track the current path to avoid unnecessary re-subscriptions
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!docRef) {
      setLoading(false);
      setData(null);
      lastPathRef.current = null;
      return;
    }

    // Optimization: Don't re-subscribe if the path is the same
    if (lastPathRef.current === docRef.path) {
        return;
    }
    lastPathRef.current = docRef.path;

    setLoading(true);
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot: DocumentSnapshot<T>) => {
        setData(snapshot.exists() ? ({ ...snapshot.data(), id: snapshot.id } as T) : null);
        setLoading(false);
      },
      async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(serverError);
        setLoading(false);
      }
    );

    return () => {
        unsubscribe();
        lastPathRef.current = null;
    };
  }, [docRef]); // We still depend on docRef, but the internal path check adds stability

  return { data, loading, error };
}
