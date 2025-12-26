

'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Gamepad2, Rocket, Trophy, ArrowRight, Star, Users, Briefcase, Mic, Award, MessageSquare, PlusCircle, CheckCircle, Search, Heart, Shield, Sparkles, Brain, Landmark, Palette, Dumbbell, BookOpen, Cpu, Languages } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { teamMembers, vision, mission } from '@/lib/data';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className={`rounded-3xl border-2 border-b-8 p-6 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col bg-card/80 border-border/30`}>
    <div className="mb-4 text-primary drop-shadow-md">{icon}</div>
    <h3 className="font-headline text-2xl font-bold text-white mb-2 drop-shadow-md">{title}</h3>
    <p className="text-white/80 flex-grow text-sm">{description}</p>
  </div>
);


const SectionTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h2 className={`font-headline text-5xl md:text-6xl font-extrabold tracking-tighter text-center mb-12 text-white ${className}`}
      style={{textShadow: '0 4px 8px rgba(0,0,0,0.3)'}}>
    {children}
  </h2>
);

const VisionCard = ({ icon: Icon, title, description, color, align = 'left' }: { icon: React.ElementType, title: string, description: string, color: string, align?: 'left' | 'right' }) => (
    <div className={`relative z-10 w-full md:w-2/5 ${align === 'left' ? 'self-start' : 'self-end'}`}>
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
            <Carousel opts={{ loop: true, align: "start" }} className="w-full max-w-6xl mx-auto">
                <CarouselContent className="-ml-4">
                    {teamMembers.map(member => (
                        <CarouselItem key={member.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                            <Card className="rounded-3xl overflow-hidden bg-card/80 border-2 border-border/30 shadow-lg group transition-transform duration-300 hover:-translate-y-2">
                                <CardContent className="p-0">
                                    <div className="aspect-[4/3] relative">
                                        <Image src={member.image} alt={member.name} fill className="object-cover object-top transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-headline text-2xl font-bold text-white">{member.name}</h3>
                                        <p className="text-lg font-medium text-primary">{member.role}</p>
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
        <section className="relative py-12 rounded-3xl stacked-card">
            <SectionTitle>Visi <span className="text-primary">Kami</span></SectionTitle>
            <div className="relative max-w-2xl mx-auto">
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border/30 transform -translate-x-1/2 hidden md:block">
                    <svg width="100%" height="100%" className="stroke-current text-border/50">
                        <line x1="50%" y1="0" x2="50%" y2="100%" strokeWidth="2" strokeDasharray="8 8"/>
                    </svg>
                </div>
                <div className="space-y-12 md:space-y-0 flex flex-col items-center">
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
        <section className="relative py-12 rounded-3xl stacked-card">
            <SectionTitle>Misi <span className="text-primary">Kami</span></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-8 max-w-5xl mx-auto">
                <MissionCard {...mission[0]} className="md:col-span-2"/>
                <MissionCard {...mission[1]} className="md:row-start-2"/>
                <MissionCard {...mission[2]} className="md:col-start-2 md:row-start-2"/>
            </div>
        </section>

        {/* Divisions Section */}
        <section className="text-center">
           <SectionTitle>Divisi <span className="text-primary">Kami</span></SectionTitle>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <FeatureCard 
                icon={<Heart size={40} />}
                title="Keimanan"
                description="Membentuk karakter spiritual dan moral siswa."
              />
              <FeatureCard 
                icon={<Shield size={40} />}
                title="Budi Pekerti"
                description="Mengembangkan sopan santun dan etika luhur."
              />
              <FeatureCard 
                icon={<Sparkles size={40} />}
                title="Kepribadian Unggul"
                description="Membangun kepemimpinan dan rasa percaya diri."
              />
              <FeatureCard 
                icon={<Brain size={40} />}
                title="Akademik"
                description="Meningkatkan prestasi dan wawasan keilmuan."
              />
              <FeatureCard 
                icon={<Landmark size={40} />}
                title="Politik"
                description="Pendidikan demokrasi dan kesadaran berbangsa."
              />
              <FeatureCard 
                icon={<Palette size={40} />}
                title="Kreativitas"
                description="Mewadahi bakat seni dan keterampilan siswa."
              />
              <FeatureCard 
                icon={<Dumbbell size={40} />}
                title="Olahraga"
                description="Mendukung kesehatan jasmani dan sportivitas."
              />
              <FeatureCard 
                icon={<BookOpen size={40} />}
                title="Sastra & Budaya"
                description="Melestarikan dan mengembangkan sastra dan budaya."
              />
              <FeatureCard 
                icon={<Cpu size={40} />}
                title="Teknologi"
                description="Mengembangkan inovasi dan literasi digital."
              />
              <FeatureCard 
                icon={<Languages size={40} />}
                title="Bahasa Inggris"
                description="Meningkatkan kemampuan komunikasi global."
              />
           </div>
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
