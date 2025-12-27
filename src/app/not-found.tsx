
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <main className="flex flex-col items-center justify-center text-center p-8">
        <div className="relative">
            <h1 
                className="text-[150px] md:text-[200px] font-black leading-none bg-clip-text text-transparent bg-gradient-to-b from-primary/20 to-primary/5"
            >
                404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
                 <h2 className="font-body text-5xl md:text-7xl font-extrabold tracking-tighter text-foreground italic uppercase">
                    Oops!
                </h2>
            </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-4">
            Halaman Tidak Ditemukan
        </h3>
        <p className="mt-2 max-w-md text-muted-foreground">
            Maaf, kami tidak dapat menemukan halaman yang Anda cari. Mungkin telah dipindahkan atau dihapus.
        </p>
        <Button asChild className="mt-8 font-bold text-lg py-6 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            Kembali ke Beranda
          </Link>
        </Button>
      </main>
    </div>
  );
}
