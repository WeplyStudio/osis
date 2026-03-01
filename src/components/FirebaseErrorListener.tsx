
'use client';

import { useEffect, useState } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { X, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FirebaseErrorListener() {
  const [error, setError] = useState<FirestorePermissionError | null>(null);

  useEffect(() => {
    const unsubscribe = errorEmitter.on('permission-error', (err: FirestorePermissionError) => {
      setError(err);
    });
    return () => unsubscribe();
  }, []);

  if (!error) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] max-w-md animate-in slide-in-from-right-full">
      <Alert variant="destructive" className="bg-destructive text-destructive-foreground shadow-2xl border-2 border-white/20">
        <ShieldAlert className="h-5 w-5" />
        <AlertTitle className="font-bold uppercase tracking-tighter">Akses Database Ditolak</AlertTitle>
        <AlertDescription className="mt-2 space-y-2">
          <p className="text-xs font-medium opacity-90">
            Terjadi kesalahan izin saat melakukan operasi <span className="font-bold underline">{error.context.operation}</span> pada path: 
            <code className="block mt-1 p-1 bg-black/20 rounded font-mono text-[10px]">{error.context.path}</code>
          </p>
          <div className="flex justify-end mt-4">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 bg-white/10 hover:bg-white/20 border-white/20 text-white font-bold"
              onClick={() => setError(null)}
            >
              TUTUP
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
