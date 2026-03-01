
'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { initializeFirebase, FirebaseClientProvider } from '@/firebase';

function LoginPageContent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (username === 'osiskigra' && password === 'osiskigra2024') {
            localStorage.setItem('isAdmin', 'true');
            toast({
                title: "Login Berhasil",
                description: "Selamat datang di Dashboard Admin OSIS Kigra.",
            });
            router.push('/admin');
        } else {
            toast({
                variant: "destructive",
                title: "Login Gagal",
                description: "Username atau password salah.",
            });
        }
        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-accent/20 px-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <Lock className="text-white" />
                    </div>
                    <CardTitle className="text-2xl font-body font-bold italic uppercase tracking-tighter">ADMIN <span className="text-primary">KIGRA</span></CardTitle>
                    <CardDescription>Masukkan kredensial Anda untuk masuk ke dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    placeholder="Username" 
                                    className="pl-10" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    type="password" 
                                    placeholder="Password" 
                                    className="pl-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full font-bold uppercase tracking-widest" disabled={isLoading}>
                            {isLoading ? 'MEMPROSES...' : 'LOGIN SEKARANG'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default function LoginPage() {
    // Memoize initialization to prevent infinite loop
    const { firebaseApp, firestore, auth } = useMemo(() => initializeFirebase(), []);
    return (
        <FirebaseClientProvider firebaseApp={firebaseApp} firestore={firestore} auth={auth}>
            <LoginPageContent />
        </FirebaseClientProvider>
    );
}
