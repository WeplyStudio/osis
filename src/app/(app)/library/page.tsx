
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, File, Download, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { buttonVariants } from '@/components/ui/button';

const DOCS_PIN = process.env.NEXT_PUBLIC_DOCS_PIN || '010810';
const MAX_ATTEMPTS = 3;
const LOCKOUT_DURATION_MINUTES = 30;

type Document = {
  id: string;
  title: string;
  description: string;
  fileUrl: string; // This will point to a file in the /public directory
  icon: 'document' | 'spreadsheet' | 'presentation';
};

const documents: Document[] = [
  {
    id: '1',
    title: 'PROPOSAL LAPORAN KEGIATAN',
    description: 'Dokumen pertanggungjawaban program yang telah dilaksanakan.',
    fileUrl: '/Proposal Laporan Kegiatan.docx',
    icon: 'document',
  },
  {
    id: '2',
    title: 'PROPOSAL PENGAJUAN PROGRAM',
    description: 'Dokumen untuk mengajukan ide program kerja baru.',
    fileUrl: '/Proposal Pengajuan Kegiatan.docx',
    icon: 'document',
  },
];

const DocumentCard = ({ doc, isLocked }: { doc: Document, isLocked: boolean }) => {
  const getIcon = () => {
    return <File className="w-8 h-8 text-primary" />;
  };

  return (
    <Card className="text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardContent className="p-8 flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          {getIcon()}
        </div>
        <h3 className="font-body text-xl font-bold uppercase tracking-tight text-foreground mb-1">{doc.title}</h3>
        <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider">{doc.description}</p>
         <a
            href={isLocked ? '#' : doc.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            aria-disabled={isLocked}
            className={cn(
                buttonVariants({ variant: "link", size: "sm" }),
                "font-bold text-primary",
                isLocked && "pointer-events-none opacity-50"
            )}
        >
          DOWNLOAD DOCX
        </a>
      </CardContent>
    </Card>
  );
};

const PinWall = ({ onUnlock }: { onUnlock: () => void }) => {
    const [pin, setPin] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const { toast } = useToast();
    const pinInputs = useRef<(HTMLInputElement | null)[]>([]);

    const [failedAttempts, setFailedAttempts] = useState(0);
    const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const storedAttempts = parseInt(localStorage.getItem('pinFailedAttempts') || '0', 10);
        setFailedAttempts(storedAttempts);

        const storedLockout = localStorage.getItem('pinLockoutUntil');
        if (storedLockout) {
            const lockoutTime = parseInt(storedLockout, 10);
            if (Date.now() < lockoutTime) {
                setLockoutUntil(lockoutTime);
            } else {
                localStorage.removeItem('pinLockoutUntil');
                localStorage.removeItem('pinFailedAttempts');
            }
        }

        pinInputs.current[0]?.focus();
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (lockoutUntil) {
            const updateTimer = () => {
                const now = Date.now();
                const remaining = Math.max(0, lockoutUntil - now);
                if (remaining === 0) {
                    setLockoutUntil(null);
                    setFailedAttempts(0);
                    localStorage.removeItem('pinLockoutUntil');
                    localStorage.removeItem('pinFailedAttempts');
                    clearInterval(interval);
                } else {
                    const minutes = Math.floor(remaining / 60000);
                    const seconds = Math.floor((remaining % 60000) / 1000);
                    setTimeLeft(`${minutes}m ${seconds}s`);
                }
            };
            updateTimer();
            interval = setInterval(updateTimer, 1000);
        }
        return () => clearInterval(interval);
    }, [lockoutUntil]);


    const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        if (/^[0-9]$/.test(value) || value === '') {
            const newPin = pin.split('');
            newPin[index] = value;
            setPin(newPin.join(''));

            if (value !== '' && index < 5) {
                pinInputs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !pin[index] && index > 0) {
            pinInputs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (lockoutUntil) return;

        setIsLoading(true);
        setError(false);

        await new Promise(resolve => setTimeout(resolve, 500));

        if (pin === DOCS_PIN) {
            toast({
                title: "Akses Diberikan",
                description: "Selamat datang di Digital Library OSIS Kigra.",
            });
            localStorage.removeItem('pinFailedAttempts');
            localStorage.removeItem('pinLockoutUntil');
            setFailedAttempts(0);
            onUnlock();
        } else {
            const newAttempts = failedAttempts + 1;
            setFailedAttempts(newAttempts);
            localStorage.setItem('pinFailedAttempts', newAttempts.toString());
            
            setError(true);

            if (newAttempts >= MAX_ATTEMPTS) {
                const lockoutTime = Date.now() + LOCKOUT_DURATION_MINUTES * 60 * 1000;
                setLockoutUntil(lockoutTime);
                localStorage.setItem('pinLockoutUntil', lockoutTime.toString());
                localStorage.setItem('pinFailedAttempts', '0');
                toast({
                    variant: "destructive",
                    title: "Akses Terkunci",
                    description: `Anda telah salah memasukkan PIN ${MAX_ATTEMPTS} kali. Coba lagi dalam ${LOCKOUT_DURATION_MINUTES} menit.`,
                });
            } else {
                 toast({
                    variant: "destructive",
                    title: "PIN Salah",
                    description: `Anda memiliki ${MAX_ATTEMPTS - newAttempts} percobaan tersisa.`,
                });
            }
            setPin('');
            pinInputs.current[0]?.focus();
        }
        setIsLoading(false);
    };

    const isLockedOut = !!lockoutUntil;

    return (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/50 backdrop-blur-md">
            <Card className="max-w-sm w-full p-8 shadow-2xl border-primary/20">
                <div className="text-center mb-6">
                    <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Akses Terbatas</h2>
                    <p className="text-muted-foreground">
                        {isLockedOut 
                            ? `Formulir terkunci. Coba lagi dalam: ${timeLeft}`
                            : 'Masukkan 6 digit PIN untuk membuka dokumen.'
                        }
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={cn("flex justify-center gap-2 mb-4", error && "animate-shake")}>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Input
                                key={i}
                                ref={el => pinInputs.current[i] = el}
                                type="text"
                                maxLength={1}
                                value={pin[i] || ''}
                                onChange={(e) => handlePinChange(e, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                className="w-12 h-14 text-center text-2xl font-bold"
                                disabled={isLoading || isLockedOut}
                            />
                        ))}
                    </div>
                    <Button type="submit" className="w-full font-bold" disabled={isLoading || pin.length !== 6 || isLockedOut}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Buka Akses'}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default function LibraryPage() {
  const [isLocked, setIsLocked] = useState(true);

  return (
    <div className="w-full bg-background text-foreground min-h-screen pt-24 md:pt-32">
      <main className="container mx-auto px-4 relative">
        {isLocked && <PinWall onUnlock={() => setIsLocked(false)} />}
        
        <div className={cn("space-y-16 pb-24 md:pb-32 transition-all duration-500", isLocked && "blur-sm opacity-50")}>
            <section className="text-center">
                <h1 className="font-body text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 text-foreground italic uppercase">
                    Digital<br/>
                    <span className="text-primary">Library.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                    Transparansi penuh. Akses Proposal, Laporan Pertanggungjawaban (LPJ), hingga kurikulum kepemimpinan OSIS secara bebas.
                </p>
                <div className="mt-6 flex justify-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/40 dark:text-green-300">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        DATABASE UPDATED: 2H AGO
                    </div>
                </div>
            </section>

            <section>
                 {documents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {documents.map(doc => (
                            <DocumentCard key={doc.id} doc={doc} isLocked={isLocked} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-card rounded-2xl border border-dashed">
                        <File className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-foreground">Perpustakaan Kosong</h3>
                        <p className="text-muted-foreground">Saat ini belum ada dokumen yang tersedia untuk diunduh.</p>
                    </div>
                )}
            </section>
        </div>
      </main>
    </div>
  );
}
