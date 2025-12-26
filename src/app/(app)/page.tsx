
'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Gamepad2, Rocket, Trophy, ArrowRight, Star, Users, Briefcase, Mic, Award, MessageSquare, PlusCircle, CheckCircle } from 'lucide-react';
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

const FeatureCard = ({ icon, title, description, buttonText, href, className }: { icon: React.ReactNode, title: string, description: string, buttonText: string, href: string, className?: string }) => (
  <div className={`rounded-3xl border-4 border-b-8 p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl ${className} flex flex-col`}>
    <div className="mb-4 text-white drop-shadow-md">{icon}</div>
    <h3 className="font-headline text-3xl font-bold text-white mb-2 drop-shadow-md">{title}</h3>
    <p className="text-white/80 flex-grow mb-6">{description}</p>
    <Button asChild size="lg" className="mt-auto w-full bg-white text-black hover:bg-gray-200 font-bold text-lg py-6 rounded-xl shadow-md transition-transform hover:scale-105">
      <Link href={href}>
        {buttonText}
      </Link>
    </Button>
  </div>
);

const SectionTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h2 className={`font-headline text-5xl md:text-6xl font-extrabold tracking-tighter text-center mb-12 text-white ${className}`}
      style={{textShadow: '0 4px 8px rgba(0,0,0,0.3)'}}>
    {children}
  </h2>
);

const VisionMissionCard = ({ icon: Icon, title, description, color }: { icon: React.ElementType, title: string, description: string, color: string }) => (
    <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border-2 border-border/30 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2">
        <div className={`mb-4 p-4 rounded-full bg-card shadow-inner`}>
            <Icon className={`w-12 h-12 ${color}`} strokeWidth={2.5}/>
        </div>
        <h3 className="font-headline text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </div>
);


export default function LandingPage() {
  return (
    <div className="w-full bg-background text-foreground min-h-screen">
      <main className="container mx-auto px-4 py-16 md:py-24 space-y-24 md:space-y-32">
        {/* Hero Section */}
        <section className="text-center">
          <div className="inline-block bg-secondary rounded-full px-6 py-2 mb-4">
              <p className="font-bold text-secondary-foreground flex items-center gap-2">
                <Star className="w-5 h-5 fill-current" /> Platform OSIS Terbaik
              </p>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-white"
              style={{textShadow: '0 4px 8px rgba(0,0,0,0.3)'}}>
            Selamat Datang di <span className="text-primary">OASISverse</span>!
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/70 mb-10">
            Pusat semua kegiatan, acara seru, dan ide-ide cemerlang OSIS. Ayo buat kehidupan sekolah lebih berwarna dan tak terlupakan!
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xl py-8 px-12 rounded-2xl border-2 border-b-8 border-yellow-600 shadow-lg transition-transform hover:scale-105 hover:-translate-y-1">
            <Link href="/ideas">
              Mulai Berkontribusi <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </Button>
        </section>

        {/* About Us Section */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative aspect-square md:aspect-auto md:h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-purple-500">
               <Image src="https://picsum.photos/seed/101/600/600" alt="About OSIS" fill className="object-cover" data-ai-hint="students collaboration" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">Tentang <span className="text-secondary">OASISverse</span></h2>
              <p className="text-lg text-white/80 mb-6">
                OASISverse adalah wadah digital resmi Organisasi Siswa Intra Sekolah (OSIS) di sekolah kita. Kami ada untuk mewujudkan aspirasi, kreativitas, dan semangat seluruh siswa. Dari acara heboh hingga program pengembangan diri, kami berkomitmen untuk menciptakan pengalaman sekolah yang lebih dari sekadar belajar di kelas.
              </p>
              <Button asChild size="lg" variant="secondary" className="font-bold text-lg py-6 px-10 rounded-xl shadow-lg transition-transform hover:scale-105">
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
                            <div className="p-1">
                                <Card className={`overflow-hidden rounded-3xl border-4 border-b-8 shadow-lg group transition-transform duration-300 hover:-translate-y-2 ${member.bgColor}`}>
                                    <CardContent className="relative p-0 aspect-square flex flex-col justify-end">
                                        <Image src={member.image} alt={member.name} fill className="object-cover object-top transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                        <div className="relative p-6 text-white">
                                            <h3 className="font-headline text-3xl font-bold drop-shadow-lg">{member.name}</h3>
                                            <p className="text-lg font-medium text-primary drop-shadow-lg">{member.role}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex absolute left-[-50px] top-1/2 -translate-y-1/2 h-14 w-14 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm" />
                <CarouselNext className="hidden md:flex absolute right-[-50px] top-1/2 -translate-y-1/2 h-14 w-14 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm" />
            </Carousel>
        </section>

        {/* Vision & Mission Section */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="text-center">
                  <SectionTitle>Visi <span className="text-green-400">Kami</span></SectionTitle>
                  <div className="grid grid-cols-1 sm:grid-cols-1 gap-8">
                      {vision.map((item) => <VisionMissionCard key={item.title} {...item} />)}
                  </div>
              </div>
              <div className="text-center">
                  <SectionTitle>Misi <span className="text-pink-400">Kami</span></SectionTitle>
                  <div className="grid grid-cols-1 sm:grid-cols-1 gap-8">
                      {mission.map((item) => <VisionMissionCard key={item.title} {...item} />)}
                  </div>
              </div>
          </div>
        </section>

        {/* Featured Programs Section */}
        <section className="text-center">
           <SectionTitle>Program <span className="text-secondary">Unggulan</span></SectionTitle>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Gamepad2 size={48} />}
                title="Acara Seru"
                description="Jangan lewatkan acara-acara paling heboh dari OSIS. Mulai dari festival, kompetisi, sampai acara amal!"
                buttonText="Lihat Semua Acara"
                href="/events"
                className="border-blue-500 bg-blue-600 border-b-blue-800"
              />
              <FeatureCard 
                icon={<Rocket size={48} />}
                title="Bank Ide Gila"
                description="Punya ide brilian untuk mengubah sekolah? Sumbangkan idemu dan kita wujudkan bersama OSIS!"
                buttonText="Sumbang Ide Kamu"
                href="/ideas"
                className="border-purple-500 bg-purple-600 border-b-purple-800"
              />
              <FeatureCard 
                icon={<Trophy size={48} />}
                title="Galeri Prestasi"
                description="Lihat momen-momen terbaik dan prestasi gemilang yang telah diraih oleh siswa-siswi kita."
                buttonText="Jelajahi Galeri"
                href="/gallery"
                className="border-green-500 bg-green-600 border-b-green-800"
              />
           </div>
        </section>

        {/* Student Voices Section */}
        <section>
          <SectionTitle>Suara <span className="text-yellow-400">Siswa</span></SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card/80 p-6 rounded-2xl shadow-lg border-2 border-border/30">
              <CardContent className="p-0">
                <MessageSquare className="w-8 h-8 text-primary mb-4"/>
                <p className="text-white/90 mb-4 italic">"Acara pentas seni kemarin seru banget! Nggak nyangka sekolah kita bisa sekeren itu."</p>
                <p className="font-bold text-white">- Rika, Kelas XI-A</p>
              </CardContent>
            </Card>
            <Card className="bg-card/80 p-6 rounded-2xl shadow-lg border-2 border-border/30">
              <CardContent className="p-0">
                 <MessageSquare className="w-8 h-8 text-primary mb-4"/>
                <p className="text-white/90 mb-4 italic">"Berkat OSIS, usulan soal tempat parkir sepeda akhirnya didengar. Terima kasih banyak!"</p>
                <p className="font-bold text-white">- Eko, Kelas X-C</p>
              </CardContent>
            </Card>
            <Card className="bg-card/80 p-6 rounded-2xl shadow-lg border-2 border-border/30">
              <CardContent className="p-0">
                 <MessageSquare className="w-8 h-8 text-primary mb-4"/>
                <p className="text-white/90 mb-4 italic">"Workshop public speaking dari OSIS ngebantu aku jadi lebih percaya diri. Keren!"</p>
                <p className="font-bold text-white">- Fitri, Kelas XII-B</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="text-center bg-card/80 rounded-3xl p-8 md:p-12 border-4 border-primary border-b-8 shadow-2xl">
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 text-white">
            Ayo Jadi Bagian dari <span className="text-primary">Perubahan</span>!
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-white/80 mb-8">
            Punya semangat untuk memajukan sekolah? Ingin belajar berorganisasi dan bikin acara keren? Tunggu apa lagi? Gabung bersama kami di OSIS!
          </p>
          <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-xl py-8 px-12 rounded-2xl border-2 border-b-8 border-pink-700 shadow-lg transition-transform hover:scale-105 hover:-translate-y-1">
              Daftar Sekarang <PlusCircle className="ml-2 h-6 w-6" />
          </Button>
        </section>

      </main>
    </div>
  );
}
