'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
        const pinAuthenticated = localStorage.getItem('pin_authenticated') === 'true';
        if (pinAuthenticated) {
            setIsAuthenticated(true);
        } else if (pathname !== '/admin/login') {
            router.replace('/admin/login');
        }
    } catch (e) {
        if (pathname !== '/admin/login') {
             router.replace('/admin/login');
        }
    }
    setIsLoading(false);
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated && pathname !== '/admin/login') {
    return null; // or a loading spinner, since redirection is happening
  }

  return <>{children}</>;
}
