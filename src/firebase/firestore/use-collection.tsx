
'use client';

import { useState, useEffect, useRef } from 'react';
import { Query, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

export function useCollection<T = DocumentData>(query: Query<T> | null) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Use a ref to detect if the query object has truly changed (as much as possible)
  const queryRef = useRef<Query<T> | null>(null);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      setData(null);
      queryRef.current = null;
      return;
    }

    // Basic shallow check for stability
    if (queryRef.current === query) return;
    queryRef.current = query;

    setLoading(true);
    const unsubscribe = onSnapshot(
      query,
      (snapshot: QuerySnapshot<T>) => {
        const items = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(items as T[]);
        setLoading(false);
      },
      async (serverError) => {
        // Query doesn't always have a 'path' property directly like DocumentReference
        const permissionError = new FirestorePermissionError({
          path: (query as any)._query?.path?.toString() || 'collection',
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(serverError);
        setLoading(false);
      }
    );

    return () => {
        unsubscribe();
        queryRef.current = null;
    };
  }, [query]);

  return { data, loading, error };
}
