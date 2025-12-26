'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowRight, Star, Heart, Shield, Sparkles, Brain, Landmark, Palette, Dumbbell, BookOpen, Cpu, Languages, Eye, Target, Gem, PartyPopper, Megaphone, GraduationCap, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { teamMembers, vision, mission, divisions } from '@/lib/data';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const SectionTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h2 className={cn(`font-headline text-5xl md:text-6xl font-extrabold tracking-tighter text-center mb-12 text-white`, className)}
      style={{textShadow: '0 4px 8px rgba(0,0,0,0.3)'}}>
    {children}
  </h2>
);

const VisionCard = ({ icon: Icon, title, description, color, align = 'left' }: { icon: React.ElementType, title: string, description: string, color: string, align?: 'left' | 'right' }) => (
    <div className={`relative z-10 w-full md:w-3/4 lg:w-3/5 ${align === 'left' ? 'self-start' : 'self-end'}`}>
        <div className="bg-card/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border-2 border-b-8 border-border/60 flex items-center gap-6 transition-transform duration-300 hover:-translate-y-2">
            <div className={`flex-shrink-0 p-4 rounded-full bg-background shadow-inner`}>
                <Icon className={`w-12 h-12 ${color}`} strokeWidth={2.5}/>
            </div>
            <div>
                <h3 className="font-headline text-2xl font-bold text-white mb-1">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
            </div>
        </div>
    </div>
);

const MissionCard = ({ icon: Icon, title, description, color, className }: { icon: React.ElementType, title: string, description: string, color: string, className?: string }) => (
    <div className={cn("bg-card/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border-2 border-b-8 border-border/60 flex flex-col items-start text-left transition-transform duration-300 hover:-translate-y-2 h-full", className)}>
        <div className={`mb-4 p-4 rounded-full bg-background shadow-inner`}>
            <Icon className={`w-10 h-10 ${color}`} strokeWidth={2.5}/>
        </div>
        <h3 className="font-headline text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm flex-grow">{description}</p>
    </div>
);

const DivisionTabs = () => {
    const [activeDivision, setActiveDivision] = useState(divisions[0].id);
    const activeDivisionData = divisions.find(d => d.id === activeDivision);

    return (
        <div className="w-full bg-card/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl border-2 border-border/40">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 min-h-[500px]">
                {/* Left Nav */}
                <div className="md:col-span-4 lg:col-span-3">
                    <h3 className="font-headline text-sm font-bold tracking-wider uppercase text-muted-foreground mb-4">Pilih Divisi</h3>
                    <div className="flex flex-col space-y-2">
                        {divisions.map((division, index) => (
                            <button
                                key={division.id}
                                onClick={() => setActiveDivision(division.id)}
                                className={cn(
                                    "flex items-center gap-4 p-3 rounded-xl text-left transition-all duration-200",
                                    activeDivision === division.id
                                        ? 'bg-primary text-primary-foreground font-bold shadow-lg'
                                        : 'hover:bg-accent/50'
                                )}
                            >
                                <span className={cn(
                                    "flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold",
                                    activeDivision === division.id
                                        ? 'bg-primary-foreground/20'
                                        : 'bg-accent text-accent-foreground'
                                )}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <span className="flex-grow">{division.title}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Content */}
                <div className="md:col-span-8 lg:col-span-9 flex flex-col">
                    {activeDivisionData && (
                        <div className="flex flex-col flex-grow">
                             <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-6 shadow-inner border-2 border-border/30">
                                <Image
                                    src={activeDivisionData.image}
                                    alt={activeDivisionData.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                            
                            <h3 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-white mb-3">
                                {activeDivisionData.title}
                            </h3>
                            <p className="text-muted-foreground text-lg mb-6 flex-grow">
                                {activeDivisionData.description}
                            </p>
                             <div className="mt-auto flex flex-wrap gap-4">
                                <Button size="lg" className="font-bold">
                                    <Eye className="mr-2 h-5 w-5"/> Detail Divisi
                                </Button>
                                <Button size="lg" variant="secondary" className="font-bold">
                                    <Target className="mr-2 h-5 w-5"/> Program Kerja
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default function LandingPage() {
  return (
    <div className="w-full bg-background text-foreground min-h-screen">
      <main className="container mx-auto px-4 py-16 md:py-24 space-y-24 md:space-y-32">
        {/* Hero Section */}
        <section className="text-center">
          <div className="inline-block bg-card/80 rounded-full px-6 py-2 mb-4 border-2 border-border/30">
              <p className="font-bold text-primary flex items-center gap-2">
                <Star className="w-5 h-5 fill-current" /> Platform OSIS Terbaik
              </p>
          </div>
          <h1 className="font-headline text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 text-white"
              style={{textShadow: '0 4px 12px rgba(0,0,0,0.4)'}}>
            Selamat Datang di <span className="text-primary">OSIS Kigra</span>!
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/80 mb-10">
            Pusat semua kegiatan, acara seru, dan ide-ide cemerlang OSIS. Ayo buat kehidupan sekolah lebih berwarna dan tak terlupakan!
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xl py-8 px-8 md:px-12 rounded-2xl border-2 border-b-8 border-yellow-600 shadow-lg transition-transform hover:scale-105 hover:-translate-y-1">
            <Link href="/ideas">
              Mulai Berkontribusi <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </Button>
        </section>

        {/* About Us Section */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative aspect-square md:aspect-auto md:h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-border/50">
               <Image src="https://picsum.photos/seed/101/600/600" alt="About OSIS" fill className="object-cover" data-ai-hint="students collaboration" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">Tentang <span className="text-primary">OSIS Kigra</span></h2>
              <p className="text-lg text-white/80 mb-6">
                OSIS Kigra adalah wadah digital resmi Organisasi Siswa Intra Sekolah (OSIS) di sekolah kita. Kami ada untuk mewujudkan aspirasi, kreativitas, dan semangat seluruh siswa. Dari acara heboh hingga program pengembangan diri, kami berkomitmen untuk menciptakan pengalaman sekolah yang lebih dari sekadar belajar di kelas.
              </p>
               <Button asChild size="lg" className="font-bold text-lg py-6 px-10 rounded-xl shadow-lg transition-transform hover:scale-105 border-2 border-b-4 border-yellow-600">
                <Link href="/events">
                  Lihat Acara Kami
                </Link>
              </Button>
            </div>
          </div>
        </section>


        {/* Our Team Section */}
        <section>
          <SectionTitle>Tim <span className="text-primary">Kami</span></SectionTitle>
          <Carousel opts={{ loop: true }} className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {teamMembers.map((member) => (
                <CarouselItem key={member.id}>
                  <Card className="bg-card/80 backdrop-blur-sm shadow-xl rounded-3xl overflow-hidden border-2 border-border/30">
                    <CardContent className="p-6 md:p-10">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-center">
                        <div className="md:col-span-1 flex justify-center">
                          <div className="relative aspect-square w-48 h-48 md:w-full md:h-full rounded-2xl overflow-hidden shadow-lg border-4 border-border/50">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-2 text-center md:text-left">
                          <p className="text-lg md:text-xl text-white/80 italic mb-6">
                            &quot;{member.quote}&quot;
                          </p>
                          <div className="flex items-center justify-center md:justify-start gap-3">
                            <Avatar className="w-12 h-12 border-2 border-primary">
                              <AvatarImage src={member.image} alt={member.name} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-bold text-white text-lg">{member.name}</h4>
                              <p className="text-primary font-medium">{member.role}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex absolute left-[-60px] top-1/2 -translate-y-1/2 h-14 w-14 bg-card/80 hover:bg-card text-white border-2 border-border/30 backdrop-blur-sm rounded-full" />
            <CarouselNext className="hidden md:flex absolute right-[-60px] top-1/2 -translate-y-1/2 h-14 w-14 bg-card/80 hover:bg-card text-white border-2 border-border/30 backdrop-blur-sm rounded-full" />
          </Carousel>
        </section>

        {/* Vision Section */}
        <section>
            <SectionTitle>Visi <span className="text-primary">Kami</span></SectionTitle>
            <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border/30 transform -translate-x-1/2 hidden md:block">
                    <svg width="100%" height="100%" className="stroke-current text-border/50">
                        <line x1="50%" y1="0" x2="50%" y2="100%" strokeWidth="2" strokeDasharray="8 8"/>
                    </svg>
                </div>
                <div className="space-y-12 md:space-y-12 flex flex-col items-center">
                    {vision.map((item, index) => (
                        <VisionCard 
                            key={item.title} 
                            {...item} 
                            align={index % 2 === 0 ? 'left' : 'right'} 
                        />
                    ))}
                </div>
            </div>
        </section>

        {/* Mission Section */}
        <section>
            <SectionTitle>Misi <span className="text-primary">Kami</span></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <MissionCard {...mission[0]} className="md:col-span-2"/>
                <MissionCard {...mission[1]} />
                <MissionCard {...mission[2]} />
            </div>
        </section>

        {/* Divisions Section */}
        <section className="text-center">
           <SectionTitle>Divisi <span className="text-primary">Kami</span></SectionTitle>
           <DivisionTabs />
        </section>

        {/* Join Us Section */}
        <section className="text-center bg-card/80 rounded-3xl p-8 md:p-12 border-2 border-b-8 border-primary shadow-2xl">
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 text-white">
            Jelajahi Dunia <span className="text-primary">OSIS Kigra</span>!
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-white/80 mb-8">
            Lihat semua kegiatan, acara, dan informasi terbaru dari OSIS Kigra. Jadilah bagian dari keseruan di sekolah!
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xl py-8 px-8 rounded-2xl border-2 border-b-8 border-yellow-600 shadow-lg transition-transform hover:scale-105 hover:-translate-y-1">
              <Link href="/events">
                Jelajahi <Search className="ml-2 h-6 w-6" />
              </Link>
          </Button>
        </section>

      </main>
    </div>
  );
}
