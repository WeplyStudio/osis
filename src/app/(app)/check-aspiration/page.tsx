
'use client';

import React, { useState } from 'react';
import { useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClipboardCheck, Search, Loader2, Calendar, MessageSquare, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function CheckAspirationPage() {
    const [aspirationId, setAspirationId] = useState('');
    const [result, setResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const firestore = useFirestore();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!aspirationId.trim()) return;

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const docRef = doc(firestore, 'aspirations', aspirationId.trim());
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setResult({ id: docSnap.id, ...docSnap.data() });
            } else {
                setError("ID Aspirasi tidak ditemukan. Pastikan ID yang kamu masukkan benar.");
            }
        } catch (err) {
            setError("Terjadi kesalahan saat mencari data. Coba lagi nanti.");
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'menunggu': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'dilihat': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'diproses': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'dipertimbangkan': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'selesai': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="w-full bg-background text-foreground min-h-screen pt-24 md:pt-32">
            <main className="container mx-auto px-4 max-w-2xl">
                <div className="text-center mb-12">
                    <h1 className="font-body text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-foreground italic uppercase">
                        Cek <span className="text-primary">Status.</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Masukkan ID aspirasi yang kamu dapatkan setelah mengirim pesan untuk melihat perkembangannya.
                    </p>
                </div>

                <Card className="shadow-xl border-2 overflow-hidden mb-8">
                    <CardHeader className="bg-primary/5 border-b">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Search className="w-5 h-5 text-primary" /> CARI ASPIRASI
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <Input 
                                placeholder="Contoh: 7yX9kP2m..." 
                                value={aspirationId}
                                onChange={(e) => setAspirationId(e.target.value)}
                                className="flex-grow rounded-xl h-12"
                            />
                            <Button type="submit" disabled={isLoading || !aspirationId.trim()} className="rounded-xl h-12 px-6 font-bold">
                                {isLoading ? <Loader2 className="animate-spin" /> : 'CEK'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {error && (
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-2xl flex items-start gap-3 animate-fade-in">
                        <AlertCircle className="w-5 h-5 mt-0.5" />
                        <p className="text-sm font-bold">{error}</p>
                    </div>
                )}

                {result && (
                    <Card className="border-2 shadow-2xl animate-fade-in">
                        <CardHeader className="border-b pb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">ID: {result.id}</p>
                                    <CardTitle className="font-body italic uppercase text-2xl">Status Aspirasi</CardTitle>
                                </div>
                                <Badge className={cn("px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-xs border", getStatusColor(result.status))}>
                                    {result.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                                    <MessageSquare className="w-3 h-3" /> Isi Aspirasi
                                </h4>
                                <div className="bg-accent/30 p-4 rounded-xl italic text-foreground">
                                    "{result.content}"
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground bg-accent/20 p-3 rounded-lg">
                                <Calendar className="w-4 h-4" />
                                <span>Dikirim pada: {result.createdAt ? format(result.createdAt.toDate(), 'PPP p', { locale: id }) : '-'}</span>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}
