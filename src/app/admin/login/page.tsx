'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';

const CORRECT_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN;

export default function LoginPage() {
  const [pin, setPin] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = () => {
    if (pin === CORRECT_PIN) {
      try {
        localStorage.setItem('pin_authenticated', 'true');
        router.push('/admin/dashboard');
      } catch (e) {
         toast({
            variant: "destructive",
            title: 'Error',
            description: 'Could not save login status. Please enable local storage.',
        });
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'PIN Salah',
        description: 'PIN yang Anda masukkan tidak benar. Silakan coba lagi.',
      });
      setPin('');
    }
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPin(value);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-sm shadow-2xl">
        <CardHeader className="text-center">
            <div className="mx-auto bg-primary rounded-full p-3 w-fit mb-4">
                <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
          <CardTitle className="font-body text-2xl font-bold tracking-tight">Halaman Admin</CardTitle>
          <CardDescription>Masukkan PIN untuk mengakses dasbor.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="••••••"
              value={pin}
              onChange={handlePinChange}
              maxLength={6}
              className="text-center text-2xl tracking-[0.5em] font-mono"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full font-bold">
              Masuk
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
