'use client';

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Home, Calendar, GalleryHorizontal, Lightbulb } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

const OasisLogo = () => (
    <div className="p-2 bg-accent rounded-lg">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM8.46 15.54C9.45 16.53 10.71 17.09 12 17.09C13.29 17.09 14.55 16.53 15.54 15.54C16.03 15.05 16.03 14.25 15.54 13.76C15.05 13.27 14.25 13.27 13.76 13.76C13.22 14.3 12.55 14.59 11.82 14.59C11.09 14.59 10.42 14.3 9.88 13.76C8.92 12.8 8.92 11.2 9.88 10.24C10.42 9.7 11.09 9.41 11.82 9.41C12.55 9.41 13.22 9.7 13.76 10.24C14.25 10.73 15.05 10.73 15.54 10.24C16.03 9.75 16.03 8.95 15.54 8.46C14.55 7.47 13.29 6.91 12 6.91C10.71 6.91 9.45 7.47 8.46 8.46C6.51 10.41 6.51 13.59 8.46 15.54Z" fill="hsl(var(--accent-foreground))"/>
        </svg>
    </div>
);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const navItems = [
    { href: '/', icon: Home, label: 'Dashboard' },
    { href: '/events', icon: Calendar, label: 'Events' },
    { href: '/gallery', icon: GalleryHorizontal, label: 'Gallery' },
    { href: '/ideas', icon: Lightbulb, label: 'Suggest Idea' },
  ];

  const currentPage = [...navItems].reverse().find(item => pathname.startsWith(item.href));

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-3">
            <OasisLogo />
            <h1 className="text-xl font-headline font-bold text-foreground group-data-[collapsible=icon]:hidden">OASISverse</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map(item => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={item.href === '/' ? pathname === '/' : pathname.startsWith(item.href) && item.href !== '/'}>
                  <Link href={item.href}>
                    <item.icon />
                    {item.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b bg-card shadow-sm">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h2 className="text-lg font-headline font-semibold hidden sm:block">
              {currentPage?.label || 'Dashboard'}
            </h2>
          </div>
          <Avatar>
            <AvatarImage src="https://picsum.photos/seed/user/40/40" alt="User avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
