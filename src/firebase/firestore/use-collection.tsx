'use client';

import { useState, useEffect, useRef } from 'react';
import type {
  CollectionReference,
  DocumentData,
  Query,
  FirestoreError,
} from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// Define a generic type for the hook
export const useCollection = <T extends DocumentData>(
  query: CollectionReference<T> | Query<T> | null
) => {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  // Use a ref to store the query to prevent re-subscribing on every render
  // if the query object is memoized by the consumer.
  const queryRef = useRef(query);
  useEffect(() => {
    queryRef.current = query;
  }, [query]);


  useEffect(() => {
    // Only subscribe if the query is not null
    if (!queryRef.current) {
      setData([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const unsubscribe = onSnapshot(
      queryRef.current,
      (querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        setData(documents);
        setIsLoading(false);
        setError(null);
      },
      (err) => {
        const permissionError = new FirestorePermissionError({
          path: (queryRef.current as CollectionReference).path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(err); // Also set local error state if needed
        setIsLoading(false);
      }
    );

    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [query]); // The effect now depends on the stable query object

  return { data, isLoading, error };
};
