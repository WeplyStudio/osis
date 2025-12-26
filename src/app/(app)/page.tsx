'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowRight, Star, Heart, Shield, Sparkles, Brain, Landmark, Palette, Dumbbell, BookOpen, Cpu, Languages, Eye, Target, Gem, PartyPopper, Megaphone, GraduationCap, Search, CheckCircle, Calendar, ClipboardCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { teamMembers, divisions, newsArticles, programs } from '@/lib/data';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';


const SectionTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h2 className={cn(`font-headline text-5xl md:text-6xl font-extrabold tracking-tighter text-center mb-12 text-foreground`, className)}>
    {children}
  </h2>
);

const DivisionTabs = () => {
    const [activeDivision, setActiveDivision] = useState(divisions[0].id);
    const activeDivisionData = divisions.find(d => d.id === activeDivision);

    return (
        <div className="w-full bg-card rounded-3xl p-6 md:p-10 shadow-xl border">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[400px]">
                {/* Left Nav */}
                <div className="lg:col-span-4">
                    <h3 className="font-headline text-sm font-bold tracking-wider uppercase text-muted-foreground mb-4">Pilih Divisi</h3>
                    <div className="flex flex-col space-y-2">
                        {divisions.map((division, index) => (
                            <button
                                key={division.id}
                                onClick={() => setActiveDivision(division.id)}
                                className={cn(
                                    "flex items-center gap-4 p-3 rounded-xl text-left transition-all duration-200 text-foreground",
                                    activeDivision === division.id
                                        ? 'bg-primary text-primary-foreground font-bold shadow-lg'
                                        : 'hover:bg-accent'
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
                <div className="lg:col-span-8 flex flex-col justify-center">
                    {activeDivisionData && (
                        <div className="flex flex-col text-center lg:text-left">
                            <p className="font-headline text-sm font-bold tracking-wider uppercase text-primary mb-2">DEPARTEMEN DIGITAL</p>
                            <h3 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground mb-3">
                                {activeDivisionData.title}
                            </h3>
                            <p className="text-muted-foreground text-lg mb-6">
                                {activeDivisionData.description}
                            </p>
                             <div className="mt-auto flex flex-wrap gap-4 justify-center">
                                <Button size="lg" className="font-bold">
                                    <Eye className="mr-2 h-5 w-5"/> Detail Divisi
                                </Button>
                                <Button size="lg" variant="outline" className="font-bold">
                                    Program Kerja
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ImpactStat = ({ value, label }: { value: string, label: string }) => (
  <div className="text-center">
    <p className="font-headline text-5xl md:text-7xl font-bold tracking-tighter">{value}</p>
    <p className="font-sans text-sm uppercase tracking-widest font-medium">{label}</p>
  </div>
);

const faqItems = [
  {
    id: "faq1",
    question: "Bagaimana cara mendaftar jadi pengurus OSIS?",
    answer: "Pendaftaran pengurus OSIS biasanya dibuka setiap awal tahun ajaran baru. Kamu bisa memantau pengumuman di mading sekolah, media sosial OSIS, atau bertanya langsung kepada pengurus OSIS saat ini. Prosesnya meliputi pengisian formulir, seleksi berkas, dan wawancara."
  },
  {
    id: "faq2",
    question: "Siapa saja yang boleh ikut program kerja OSIS?",
    answer: "Seluruh siswa dan siswi sekolah berhak untuk berpartisipasi dalam program kerja OSIS, baik sebagai panitia maupun peserta. Beberapa acara mungkin memiliki target audiens tertentu, namun pada dasarnya semua kegiatan kami terbuka untuk umum."
  },
    {
    id: "faq3",
    question: "Apa keuntungan bergabung dengan OSIS?",
    answer: "Bergabung dengan OSIS memberikan banyak sekali manfaat! Kamu akan belajar tentang kepemimpinan, kerja sama tim, manajemen waktu, dan cara berkomunikasi yang efektif. Selain itu, ini adalah kesempatan emas untuk memperluas jaringan pertemanan dan membuat perubahan positif di lingkungan sekolah."
  }
];

const NewsCard = ({ article }: { article: (typeof newsArticles)[0] }) => (
    <div className="group">
        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-4 shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
            <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={article.imageHint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
            />
        </div>
        <p className="font-headline text-sm font-bold tracking-wider uppercase text-primary mb-2">{article.category}</p>
        <h3 className="font-headline text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
            <Link href="#">{article.title}</Link>
        </h3>
    </div>
);


export default function LandingPage() {
  return (
    <div className="w-full bg-background text-foreground min-h-screen pt-24 md:pt-32">
      <main className="container mx-auto px-4 space-y-24 md:space-y-32 pb-24 md:pb-32">
        {/* Hero Section */}
        <section className="text-center">
            <div className="inline-block bg-accent text-accent-foreground rounded-full px-4 py-2 mb-6">
                <p className="font-bold text-sm tracking-wider uppercase">Empowering Future Leaders</p>
            </div>
            <h1 className="font-headline text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 text-foreground">
                Inovasi Digital<br/>
                <span className="text-primary">Satu Suara Kigra.</span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                Wadah kolaborasi inklusif bagi seluruh siswa Kigra untuk berkarya, berinovasi, dan membawa perubahan positif bagi sekolah dan masyarakat.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="font-bold text-lg py-6 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
                <Link href="#">
                  Mulai Berkontribusi <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-bold text-lg py-6 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
                <Link href="/#programs">
                  Lihat Program
                </Link>
              </Button>
            </div>
        </section>

        {/* About Us Section */}
        <section id="about">
          <div className="text-center mb-12">
            <p className="font-headline text-sm font-bold tracking-wider uppercase text-primary mb-2">MENGENAL LEBIH DEKAT</p>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">Tentang Kami</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="font-headline text-3xl font-bold tracking-tight text-foreground">
                Membangun Karakter, <br/><span className="text-primary">Mewujudkan Perubahan.</span>
              </h3>
              <p className="mt-4 text-muted-foreground">
                Didirikan sejak tahun 1990, OSIS Kigra telah menjadi wadah bagi ribuan siswa untuk mengasah kepemimpinan. Kami percaya bahwa setiap suara siswa adalah aset berharga bagi kemajuan sekolah.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="bg-card/80 border-border/80 shadow-sm">
                  <CardContent className="p-6">
                    <h4 className="font-headline text-lg font-bold text-primary mb-2">Visi</h4>
                    <p className="text-sm text-muted-foreground">Menjadi barometer organisasi sekolah yang religius, kreatif, dan mandiri.</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/80 border-border/80 shadow-sm">
                  <CardContent className="p-6">
                    <h4 className="font-headline text-lg font-bold text-primary mb-2">Misi</h4>
                    <p className="text-sm text-muted-foreground">Mengoptimalkan minat bakat melalui program kerja inovatif.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border">
              <Image src="https://picsum.photos/seed/101/800/600" alt="About OSIS" fill className="object-cover" data-ai-hint="students collaboration" />
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section>
          <SectionTitle>Tim <span className="text-primary">Kami</span></SectionTitle>
          <Carousel opts={{ loop: true }} className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {teamMembers.map((member) => (
                <CarouselItem key={member.id}>
                  <Card className="bg-card/80 backdrop-blur-sm rounded-3xl overflow-hidden border">
                    <CardContent className="p-6 md:p-10">
                      <div className="flex flex-col md:flex-row md:gap-10 items-center">
                        <div className="md:w-1/3 flex-shrink-0 mb-6 md:mb-0">
                          <div className="relative aspect-square w-48 h-48 md:w-full md:h-auto rounded-2xl overflow-hidden border mx-auto">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="md:w-2/3 text-center md:text-left">
                          <p className="text-lg md:text-xl text-muted-foreground italic mb-6">
                            &quot;{member.quote}&quot;
                          </p>
                          <div className="flex items-center justify-center md:justify-start gap-3">
                            <Avatar className="w-12 h-12 border-2 border-primary">
                              <AvatarImage src={member.image} alt={member.name} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-bold text-foreground text-lg">{member.name}</h4>
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
            <CarouselPrevious className="hidden md:flex absolute left-[-60px] top-1/2 -translate-y-1/2 h-14 w-14 bg-card hover:bg-card/90 text-foreground border backdrop-blur-sm rounded-full" />
            <CarouselNext className="hidden md:flex absolute right-[-60px] top-1/2 -translate-y-1/2 h-14 w-14 bg-card hover:bg-card/90 text-foreground border backdrop-blur-sm rounded-full" />
          </Carousel>
        </section>

        {/* Divisions Section */}
        <section id="divisions">
           <SectionTitle>Divisi <span className="text-primary">Kami</span></SectionTitle>
           <DivisionTabs />
        </section>

        {/* Impact Section */}
        <section className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter">
                Dampak Kami.
              </h2>
              <p className="text-lg md:text-xl max-w-md mx-auto lg:mx-0">
                Lebih dari sekadar organisasi, kami adalah agen perubahan nyata bagi lingkungan sekolah.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <ImpactStat value="45+" label="PROKER / TAHUN" />
              <ImpactStat value="1.2K" label="SISWA TERLIBAT" />
              <ImpactStat value="4" label="PERIODE" />
            </div>
          </div>
        </section>

        {/* News Section */}
        <section>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-12">Pojok Berita</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsArticles.map(article => (
                    <NewsCard key={article.id} article={article} />
                ))}
            </div>
        </section>

        {/* FAQ Section */}
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-center">
                <div className="lg:col-span-1 text-left">
                    <h2 className="font-headline text-5xl font-extrabold tracking-tight text-foreground">Masih Penasaran?</h2>
                    <p className="mt-4 text-muted-foreground">Temukan jawaban atas pertanyaan umum mengenai OSIS dan kehidupan sekolah di sini.</p>
                </div>
                <div className="lg:col-span-2">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqItems.map((item) => (
                             <AccordionItem key={item.id} value={item.id} className="bg-card border-none rounded-2xl shadow-sm">
                                <AccordionTrigger className="p-6 font-bold text-base hover:no-underline text-left">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="p-6 pt-0 text-muted-foreground text-left">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>

      </main>
    </div>
  );
}
