'use client'
import { useMemo } from 'react';
import type { firestore } from 'firebase';

/**
 * A hook to memoize Firebase queries and references.
 * This is crucial to prevent infinite loops in `useEffect` when using `useCollection` or `useDoc`.
 * @param factory A function that returns a Firestore query or reference, or null.
 * @param deps The dependencies for the `useMemo` hook.
 */
export function useMemoFirebase<T>(factory: () => T, deps: React.DependencyList): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
}
