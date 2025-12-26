'use client';

import Link from "next/link";
import { Facebook, Twitter, Instagram, Home, Calendar, GalleryHorizontal, Lightbulb, Menu, Mail, Phone } from "lucide-react";
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

const OasisLogo = () => (
    <div className="p-2 bg-primary rounded-lg shadow-md">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM8.46 15.54C9.45 16.53 10.71 17.09 12 17.09C13.29 17.09 14.55 16.53 15.54 15.54C16.03 15.05 16.03 14.25 15.54 13.76C15.05 13.27 14.25 13.27 13.76 13.76C13.22 14.3 12.55 14.59 11.82 14.59C11.09 14.59 10.42 14.3 9.88 13.76C8.92 12.8 8.92 11.2 9.88 10.24C10.42 9.7 11.09 9.41 11.82 9.41C12.55 9.41 13.22 9.7 13.76 10.24C14.25 10.73 15.05 10.73 15.54 10.24C16.03 9.75 16.03 8.95 15.54 8.46C14.55 7.47 13.29 6.91 12 6.91C10.71 6.91 9.45 7.47 8.46 8.46C6.51 10.41 6.51 13.59 8.46 15.54Z" fill="hsl(var(--primary-foreground))"/>
        </svg>
    </div>
);

const navItems = [
    { href: '/', icon: Home, label: 'Beranda' },
    { href: '/events', icon: Calendar, label: 'Divisi' },
    { href: '/gallery', icon: GalleryHorizontal, label: 'Program' },
    { href: '/ideas', icon: Lightbulb, label: 'Tentang' },
];

const AppFooter = () => (
    <footer className="bg-card text-card-foreground border-t">
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                    <Link href="/" className="flex items-center gap-3 mb-4">
                      <OasisLogo />
                      <h1 className="text-xl font-headline font-bold text-foreground">OSIS Kigra</h1>
                    </Link>
                    <p className="text-muted-foreground text-sm max-w-xs">
                        Organisasi Siswa Intra Sekolah. Berkomitmen menciptakan lingkungan sekolah yang inklusif dan inovatif.
                    </p>
                </div>
                <div>
                    <h3 className="font-headline text-sm font-bold tracking-wider uppercase text-muted-foreground mb-4">Navigasi</h3>
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
                    <h3 className="font-headline text-sm font-bold tracking-wider uppercase text-muted-foreground mb-4">Dukungan</h3>
                    <ul className="space-y-3">
                        <li><Link href="#" className="text-sm text-foreground hover:text-primary transition-colors">Aspirasi</Link></li>
                        <li><Link href="#" className="text-sm text-foreground hover:text-primary transition-colors">Sponsor</Link></li>
                        <li><Link href="#" className="text-sm text-foreground hover:text-primary transition-colors">Kontak</Link></li>
                    </ul>
                </div>
                <div>
                     <h3 className="font-headline text-sm font-bold tracking-wider uppercase text-muted-foreground mb-4">Ikuti Kami</h3>
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
              <OasisLogo />
              <h1 className="text-xl font-headline font-bold text-foreground">OSIS Kigra</h1>
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
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                   <SheetHeader className="mb-8">
                     <Link href="/" className="flex items-center gap-3">
                        <OasisLogo />
                        <h1 className="text-xl font-headline font-bold text-foreground">OSIS Kigra</h1>
                    </Link>
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col h-full">
                    <nav className="flex flex-col gap-3 flex-grow">
                      {navItems.map((item) => (
                        <Link key={item.href} href={item.href} className="flex items-center gap-4 p-3 rounded-lg text-lg font-medium hover:bg-accent transition-colors">
                           <item.icon className="w-6 h-6" />
                           {item.label}
                        </Link>
                      ))}
                    </nav>
                     <Button asChild className="mt-auto w-full font-bold text-lg py-6 rounded-full shadow-lg">
                        <Link href="#"><Phone className="mr-2 h-5 w-5"/>Kontak</Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
        <AppFooter />
    </div>
  );
}
