'use client';

import Link from "next/link";
import { Home, Calendar, GalleryHorizontal, Lightbulb, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
            ? 'top-4 left-1/2 -translate-x-1/2 w-full max-w-4xl bg-card/80 backdrop-blur-sm rounded-full shadow-lg border p-2'
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {[...navItems, {href: "#", label: "Kontak", icon: Home}].map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                       <Link href={item.href} className="flex items-center gap-2">
                         <item.icon className="w-4 h-4" />
                         {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
    </div>
  );
}
