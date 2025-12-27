
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      
      {/* Background Gradient Blobs */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[40rem] h-[40rem] bg-pink-500/10 rounded-full blur-3xl"
      ></div>
      <div 
        aria-hidden="true" 
        className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-3xl"
      ></div>

      {/* Giant 404 in the background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-[25rem] font-black text-foreground/5 leading-none">404</h1>
      </div>
      
      <main className="relative z-10 flex flex-col items-center justify-center text-center p-8">
        
        <div className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-2xl shadow-primary/5 rounded-2xl px-6 py-3 mb-8">
            <p className="font-mono text-sm font-bold tracking-widest text-primary uppercase">Neural Path Broken.</p>
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground max-w-2xl">
            Kamu Tersesat di <span className="text-primary">Cyberspace Kigra.</span>
        </h2>
        <p className="mt-4 max-w-lg text-muted-foreground">
            Halaman yang kamu cari mungkin telah dipindahkan, dihapus, atau sedang diproses oleh AI Assistant kami.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="font-bold text-base py-6 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
              <Link href="/">
                Kembali ke Base
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold text-base py-6 px-8 rounded-full shadow-lg transition-transform hover:scale-105" onClick={() => window.history.back()}>
                <button type="button">
                    Go Back
                </button>
            </Button>
        </div>

      </main>
    </div>
  );
}
