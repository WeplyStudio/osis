
'use client';

import Link from "next/link";
import { Facebook, Twitter, Instagram, Home, Menu, Phone, Users, Briefcase, Info, Youtube, LucideIcon } from "lucide-react";
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

const organizationLinks = [
    { href: '#', label: 'Visi & Misi' },
    { href: '#', label: 'Sejarah' },
    { href: '#', label: 'Arsip LPJ' },
    { href: '#', label: 'Struktur' },
];

const innovationLinks = [
    { href: '#', label: 'E-Voting' },
    { href: '#', label: 'AI Assistant' },
    { href: '#', label: 'Library' },
    { href: '#', label: 'Podwaves' },
];

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon | React.ComponentType<{ className?: string }> | string }) => (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-lg hover:bg-primary hover:text-primary-foreground transition-colors">
        {typeof Icon === 'string' ? Icon : <Icon className="w-6 h-6" />}
    </Link>
);


const AppFooter = () => (
    <footer className="bg-card text-card-foreground border-t">
        <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5">
                     <Link href="/" className="flex items-center gap-3 mb-6">
                      <h1 className="text-3xl font-body font-extrabold text-foreground italic uppercase">OSIS<span className="text-primary">Kigra</span></h1>
                    </Link>
                    <p className="text-muted-foreground text-base max-w-sm leading-relaxed">
                        Organisasi Siswa Intra Sekolah Kigra. Membangun karakter religius, kreatif, dan mandiri melalui inovasi tanpa henti.
                    </p>
                    <div className="flex items-center gap-3 mt-8">
                        <SocialIcon href="https://www.instagram.com/osissmp_kinaryagrasia" icon={Instagram} />
                        <SocialIcon href="https://www.youtube.com/@kinaryagrasia" icon={Youtube} />
                        <SocialIcon href="#" icon={'TK'} />
                    </div>
                </div>
                <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
                    <div className="md:col-start-2">
                        <h3 className="font-mono text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground mb-6">ORGANIZATION</h3>
                        <ul className="space-y-4">
                            {organizationLinks.map(item => (
                                 <li key={item.label}>
                                    <Link href={item.href} className="text-xs font-bold uppercase text-muted-foreground hover:text-primary transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-mono text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground mb-6">INNOVATION</h3>
                        <ul className="space-y-4">
                             {innovationLinks.map(item => (
                                 <li key={item.label}>
                                    <Link href={item.href} className="text-xs font-bold uppercase text-muted-foreground hover:text-primary transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border-t mt-16 pt-6 text-center text-xs text-muted-foreground">
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
              <h1 className="text-xl font-body font-extrabold text-foreground italic uppercase">OSIS<span className="text-primary">Kigra</span></h1>
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
                      <h1 className="text-xl font-body font-extrabold text-foreground italic uppercase">OSIS<span className="text-primary">Kigra</span></h1>
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
        <main className="flex-1">
          {children}
        </main>
        <AppFooter />
    </div>
  );
}
