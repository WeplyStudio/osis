'use client';

import Link from "next/link";
import { Facebook, Twitter, Instagram, Home, Menu, Phone, Users, Briefcase, Info } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: '/', icon: Home, label: 'Beranda' },
    { href: '/#divisions', icon: Users, label: 'Divisi' },
    { href: '/#about', icon: Info, label: 'Tentang' },
];

const AppFooter = () => (
    <footer className="bg-card text-card-foreground border-t">
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                    <Link href="/" className="flex items-center gap-3 mb-4">
                      <h1 className="text-xl font-body font-bold text-foreground">OSIS Kigra</h1>
                    </Link>
                    <p className="text-muted-foreground text-sm max-w-xs">
                        Organisasi Siswa Intra Sekolah. Berkomitmen menciptakan lingkungan sekolah yang inklusif dan inovatif.
                    </p>
                </div>
                <div>
                    <h3 className="font-body text-sm font-bold tracking-wider uppercase text-muted-foreground mb-4">Navigasi</h3>
                    <ul className="space-y-3">
                        {navItems.map(item => (
                             <li key={item.label}>
                                <Link href={item.href} className="text-sm text-foreground hover:text-primary transition-colors">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div>
                    <h3 className="font-body text-sm font-bold tracking-wider uppercase text-muted-foreground mb-4">Dukungan</h3>
                    <ul className="space-y-3">
                        <li><Link href="#" className="text-sm text-foreground hover:text-primary transition-colors">Aspirasi</Link></li>
                        <li><Link href="#" className="text-sm text-foreground hover:text-primary transition-colors">Sponsor</Link></li>
                        <li><Link href="#" className="text-sm text-foreground hover:text-primary transition-colors">Kontak</Link></li>
                    </ul>
                </div>
                <div>
                     <h3 className="font-body text-sm font-bold tracking-wider uppercase text-muted-foreground mb-4">Ikuti Kami</h3>
                     <div className="flex items-center gap-3">
                        <Button asChild variant="outline" size="icon" className="rounded-lg">
                            <Link href="#"><Facebook className="w-5 h-5" /></Link>
                        </Button>
                        <Button asChild variant="outline" size="icon" className="rounded-lg">
                            <Link href="#"><Twitter className="w-5 h-5" /></Link>
                        </Button>
                         <Button asChild variant="outline" size="icon" className="rounded-lg">
                            <Link href="#"><Instagram className="w-5 h-5" /></Link>
                        </Button>
                     </div>
                </div>
            </div>
            <div className="border-t mt-8 pt-6 text-center text-xs text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} OSIS Kigra. All rights reserved.</p>
            </div>
        </div>
    </footer>
);


export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
        <header className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          "flex items-center justify-between",
          scrolled 
            ? 'top-4 left-1/2 -translate-x-1/2 w-[80%] bg-card/80 backdrop-blur-sm rounded-full shadow-lg border p-2'
            : 'w-full p-4 bg-transparent'
        )}>
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <h1 className="text-xl font-body font-bold text-foreground">OSIS Kigra</h1>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map(item => (
                <Button key={item.href} asChild variant="ghost">
                    <Link href={item.href}>
                        {item.label}
                    </Link>
                </Button>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <Button asChild className="hidden md:flex rounded-full font-bold px-6">
                <Link href="#">Kontak</Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu />
                  <span className="sr-only">Buka menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] flex flex-col p-0">
                  <SheetHeader className="p-6 pb-0">
                    <Link href="/" className="flex items-center gap-3">
                      <h1 className="text-xl font-body font-bold text-foreground">OSIS Kigra</h1>
                    </Link>
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col h-full p-6">
                  <nav className="flex flex-col gap-3 flex-grow">
                    {navItems.map((item) => (
                      <Button key={item.href} asChild variant="ghost" className="justify-start text-lg h-14">
                          <Link href={item.href} className="flex items-center gap-4">
                              <item.icon className="w-6 h-6" />
                              {item.label}
                          </Link>
                      </Button>
                    ))}
                  </nav>
                    <Button asChild className="mt-auto w-full font-bold text-lg py-6 rounded-full shadow-lg">
                      <Link href="#"><Phone className="mr-2 h-5 w-5"/>Kontak</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        <main className="flex-1 pb-24 md:pb-32">
          {children}
        </main>
        <AppFooter />
    </div>
  );
}
