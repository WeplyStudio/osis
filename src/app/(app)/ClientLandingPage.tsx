
'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowRight, Eye, HelpCircle, Mail, Loader2 } from 'lucide-react';
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
import { divisions, faqItems, teamMembers as staticTeamMembers } from '@/lib/data';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ClientOnly from '@/components/ClientOnly';
import Marquee from '@/components/ui/marquee';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { sendAspiration } from '@/app/actions';

gsap.registerPlugin(ScrollTrigger);

const SectionTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h2 className={cn(`font-body text-5xl md:text-6xl font-extrabold tracking-tighter text-center mb-12 text-foreground italic uppercase`, className)}>
    {children}
  </h2>
);

const aspirationSchema = z.object({
  name: z.string().optional(),
  aspiration: z.string().min(10, { message: "Aspirasi harus minimal 10 karakter." }),
  category: z.string(),
});

type AspirationFormInputs = z.infer<typeof aspirationSchema>;

const AspirationDialog = ({ title, category, children }: { title: string, category: string, children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<AspirationFormInputs>({
        resolver: zodResolver(aspirationSchema),
        defaultValues: {
            category: category,
            name: '',
            aspiration: ''
        }
    });

    const processForm: SubmitHandler<AspirationFormInputs> = async (data) => {
        const result = await sendAspiration(data);

        if (result.success) {
            toast({
                title: "Aspirasi Terkirim!",
                description: "Terima kasih atas masukanmu. Aspirasimu telah berhasil dikirim.",
            });
            reset();
            setOpen(false);
        } else {
            toast({
                variant: "destructive",
                title: "Gagal Mengirim",
                description: result.error || "Terjadi kesalahan saat mengirim aspirasi.",
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                 <form onSubmit={handleSubmit(processForm)}>
                    <DialogHeader>
                        <DialogTitle className="font-body text-primary tracking-wider uppercase">{title}</DialogTitle>
                        <DialogDescription>
                            Berikan saran atau kritik kamu secara jelas dan sopan.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Input
                            id="name"
                            placeholder="Nama (Opsional/Anonim)"
                            {...register("name")}
                        />
                         <input type="hidden" {...register("category")} value={category} />
                        <Textarea
                            id="aspiration"
                            placeholder="Tuliskan aspirasimu di sini..."
                            className="min-h-[120px]"
                            {...register("aspiration")}
                        />
                        {errors.aspiration && <p className="text-xs text-destructive">{errors.aspiration.message}</p>}
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="outline">Batal</Button>
                      </DialogClose>
                      <Button type="submit" className="font-bold" disabled={isSubmitting}>
                          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'KIRIM SEKARANG'}
                      </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};


const DivisionTabs = () => {
    const [activeDivision, setActiveDivision] = React.useState(divisions[0].id);
    const activeDivisionData = divisions.find(d => d.id === activeDivision);

    return (
        <div className="w-full bg-card rounded-3xl p-6 md:p-10 shadow-xl border">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[400px]">
                {/* Left Nav */}
                <div className="lg:col-span-4">
                    <h3 className="font-body text-sm font-bold tracking-wider uppercase text-muted-foreground mb-4">Pilih Divisi</h3>
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
                            <p className="font-body text-sm font-bold tracking-wider uppercase text-primary mb-2">{activeDivisionData.department}</p>
                            <h3 className="font-body text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground mb-3 italic uppercase">
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

const AspirationCard = React.forwardRef<HTMLDivElement, { title: string; description: string; status: string; statusVariant: "default" | "secondary" | "outline" | "destructive" | null | undefined, [key: string]: any }>(
    ({ title, description, status, statusVariant, ...props }, ref) => (
    <Card ref={ref} className="hover:bg-accent/50 transition-colors duration-200 cursor-pointer" {...props}>
        <CardContent className="p-6 flex items-center justify-between">
            <div>
                <h4 className="font-bold text-lg text-foreground">{title}</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Badge variant={statusVariant} className="flex-shrink-0">
                {status}
            </Badge>
        </CardContent>
    </Card>
));
AspirationCard.displayName = 'AspirationCard';

const WhySpeakUpItem = ({ number, text }: { number: number; text: string }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-foreground/20 text-primary-foreground font-bold text-xs flex items-center justify-center">
            {number}
        </div>
        <p className="text-primary-foreground/90 text-sm">
            {text}
        </p>
    </div>
);

const PeriodMarquee = () => {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const marqueeText = `OSIS PERIODE ${currentYear} / ${nextYear}`;
  
  return (
    <div className="bg-primary text-primary-foreground py-3 overflow-x-hidden">
      <Marquee baseVelocity={-2}>
        <span className="font-body text-xl font-bold italic uppercase tracking-wider mx-4">
          {marqueeText}
        </span>
        <span className="text-xl mx-4">•</span>
      </Marquee>
    </div>
  );
}


export default function ClientLandingPage() {
  const teamMembers = staticTeamMembers;
  const mainRef = useRef<HTMLDivElement>(null);

   useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Helper function for animations
      const animateFrom = (elem: gsap.TweenTarget, vars: gsap.TweenVars = {}) => {
        const delay = vars.delay || 0;
        const duration = vars.duration || 1;
        const ease = vars.ease || "power3.out";
        const y = vars.y || 50;
        const x = vars.x || 0;

        gsap.from(elem, {
          opacity: 0,
          y,
          x,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: elem as gsap.DOMTarget,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          ...vars,
        });
      };
      
      const sequence = (targets: gsap.TweenTarget[], vars: gsap.TweenVars = {}) => {
        gsap.utils.toArray(targets).forEach((target, index) => {
          animateFrom(target, { ...vars, delay: (vars.delay || 0) + index * 0.1 });
        });
      };

      // Hero Section
      animateFrom('.hero-badge', { y: -20, delay: 0.2, duration: 0.5 });
      animateFrom('.hero-title', { y: 20, delay: 0.4, duration: 0.8 });
      animateFrom('.hero-p', { y: 20, delay: 0.7, duration: 0.8 });
      animateFrom('.hero-buttons', { y: 20, delay: 1, duration: 0.8 });

      // About Section
      animateFrom("#about .section-p");
      animateFrom("#about .section-h2", {delay: 0.1});
      animateFrom("#about .section-h3", {delay: 0.2});
      animateFrom("#about .section-p-desc", {delay: 0.3});
      sequence("#about .about-cards", {delay: 0.4});

      // Aspirasi Section
      animateFrom("#aspirasi .section-h2", {delay: 0});
      animateFrom("#aspirasi .section-p", {delay: 0.1});
      sequence("#aspirasi .aspiration-cards", {delay: 0.2});
      animateFrom("#aspirasi .why-speak-up", {delay: 0.5});
      
      // Team Section
      animateFrom("#team .section-title");
      animateFrom("#team .team-carousel", {delay: 0.2});

      // Divisions Section
      animateFrom("#divisions .section-title");
      animateFrom("#divisions .division-tabs", {delay: 0.2});

      // Newsletter Section
      animateFrom("#newsletter .section-h2");
      animateFrom("#newsletter .section-p", {delay: 0.1});
      animateFrom("#newsletter .newsletter-form", {delay: 0.2});
      
      // FAQ Section
      animateFrom("#faq .section-h2");
      animateFrom("#faq .section-p", {delay: 0.1});
      animateFrom("#faq .faq-contact-button", {delay: 0.2});
      sequence("#faq .faq-items", {delay: 0.3});

    }, mainRef);
    return () => ctx.revert();
  }, []);

  const aspirationCategories = [
      {
          title: "Program Kerja",
          description: "Evaluasi & ide untuk program kerja OSIS.",
          status: "DISKUSI AKTIF",
          statusVariant: "default" as const,
      },
      {
          title: "Kinerja OSIS",
          description: "Masukan mengenai kinerja pengurus OSIS.",
          status: "TINDAK LANJUT",
          statusVariant: "secondary" as const,
      },
      {
          title: "Saran Lainnya",
          description: "Punya ide atau masukan lain untuk sekolah?",
          status: "COMING SOON",
          statusVariant: "outline" as const,
      }
  ];

  return (
    <div ref={mainRef} className="w-full bg-background text-foreground min-h-screen pt-24 md:pt-32">
      <main className="space-y-24 md:space-y-32 pb-24 md:pb-32">
        {/* Hero Section */}
        <section className="text-center container mx-auto px-4">
            <div className="hero-badge inline-block bg-accent text-accent-foreground rounded-full px-4 py-2 mb-6">
                <p className="font-bold text-sm tracking-wider uppercase">EMPOWERING FUTURE LEADERS</p>
            </div>
            <h1 className="hero-title font-body text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 text-foreground italic uppercase">
                Inovasi Digital<br/>
                <span className="text-primary">Satu Suara Kigra.</span>
            </h1>
            <p className="hero-p max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                Wadah kolaborasi inklusif bagi seluruh siswa Kigra untuk berkarya, berinovasi, dan membawa perubahan positif bagi sekolah dan masyarakat.
            </p>
            <div className="hero-buttons mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="font-bold text-lg py-6 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
                <Link href="#">
                  Mulai Berkontribusi <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-bold text-lg py-6 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
                <Link href="/#about">
                  Lihat Agenda
                </Link>
              </Button>
            </div>
        </section>
        
        <PeriodMarquee />

        {/* About Us Section */}
        <section id="about" className="container mx-auto px-4">
          <div className="text-left mb-12">
            <p className="section-p font-body text-sm font-bold tracking-wider uppercase text-primary mb-2">MENGENAL LEBIH DEKAT</p>
            <h2 className="section-h2 font-body text-4xl md:text-5xl font-extrabold tracking-tight text-foreground italic uppercase">Tentang Kami</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:gap-16 items-center">
            <div>
              <h3 className="section-h3 font-body text-3xl font-bold tracking-tight text-foreground text-left">
                Membangun Karakter, <br/><span className="text-primary">Mewujudkan Perubahan.</span>
              </h3>
              <p className="section-p-desc mt-4 text-muted-foreground max-w-3xl text-left">
                Didirikan sejak tahun 2022, OSIS Kigra telah menjadi wadah bagi ribuan siswa untuk mengasah kepemimpinan. Kami percaya bahwa setiap suara siswa adalah aset berharga bagi kemajuan sekolah.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
                <Card className="about-cards bg-card/80 border-border/80 shadow-sm">
                  <CardContent className="p-6">
                    <h4 className="font-body text-lg font-bold text-primary mb-2">Visi</h4>
                    <p className="text-sm text-muted-foreground">Menjadi barometer organisasi sekolah yang religius, kreatif, dan mandiri.</p>
                  </CardContent>
                </Card>
                <Card className="about-cards bg-card/80 border-border/80 shadow-sm">
                  <CardContent className="p-6">
                    <h4 className="font-body text-lg font-bold text-primary mb-2">Misi</h4>
                    <p className="text-sm text-muted-foreground">Mengoptimalkan minat bakat melalui program kerja inovatif.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Aspirasi Section */}
        <section id="aspirasi" className="container mx-auto px-4">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div>
                    <h2 className="section-h2 font-body text-5xl md:text-6xl font-extrabold tracking-tighter text-foreground mb-4 italic uppercase">
                        Suara Kamu, <br/><span className="text-primary">Perubahan Kita.</span>
                    </h2>
                    <p className="section-p text-muted-foreground mb-8 max-w-lg">
                        OSIS sedang fokus mengevaluasi beberapa hal penting. Pilih salah satu kategori dan berikan masukan terbaikmu untuk sekolah.
                    </p>
                     <div className="space-y-4">
                        <ClientOnly>
                          {aspirationCategories.map((cat, index) => (
                              <AspirationDialog key={cat.title} title={cat.title} category={cat.title}>
                                  <AspirationCard
                                      className="aspiration-cards"
                                      title={cat.title}
                                      description={cat.description}
                                      status={cat.status}
                                      statusVariant={cat.statusVariant}
                                  />
                              </AspirationDialog>
                          ))}
                        </ClientOnly>
                    </div>
                </div>
                <div className="why-speak-up bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="font-body text-3xl font-extrabold tracking-tight mb-6 italic">Kenapa Harus Bersuara?</h3>
                    <div className="space-y-5">
                        <WhySpeakUpItem number={1} text="Aspirasi kamu dibaca langsung oleh Ketua Umum & Sekbid terkait." />
                        <WhySpeakUpItem number={2} text="Transparansi penuh: Laporan tindak lanjut akan dipublikasikan." />
                        <WhySpeakUpItem number={3} text="Membangun Kigra yang lebih demokratis dan nyaman bagi kita semua." />
                    </div>
                </div>
             </div>
        </section>

        {/* Our Team Section */}
        <section id="team" className="container mx-auto px-4">
          <SectionTitle className="section-title">Tim <span className="text-primary">Kami</span></SectionTitle>
          <Carousel opts={{ loop: true }} className="team-carousel w-full max-w-6xl mx-auto">
            <CarouselContent>
              {teamMembers && teamMembers.map((member: any) => (
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
                              <h4 className="font-bold text-foreground text-lg italic uppercase">{member.name}</h4>
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
        <section id="divisions" className="container mx-auto px-4">
           <SectionTitle className="section-title">Divisi <span className="text-primary">Kami</span></SectionTitle>
           <div className="division-tabs">
            <DivisionTabs />
           </div>
        </section>

        {/* Newsletter Section */}
        <section id="newsletter" className="container mx-auto px-4">
            <div className="text-center">
                <h2 className="section-h2 font-body text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground mb-4 italic uppercase">
                    INFO KIGRA DI <span className="text-primary">INBOXTU.</span>
                </h2>
                <p className="section-p max-w-xl mx-auto text-muted-foreground mb-8">
                    Berlangganan info mingguan seputar pendaftaran, kegiatan, dan beasiswa terbaru eksklusif via email.
                </p>
                <form className="newsletter-form max-w-lg mx-auto flex items-center gap-2 bg-card p-2 rounded-full border shadow-sm">
                    <Mail className="ml-4 text-muted-foreground" />
                    <Input 
                        type="email" 
                        placeholder="Alamat Email Kamu..." 
                        className="flex-grow bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <Button type="submit" size="lg" className="rounded-full font-bold px-8">
                        SUBSCRIBE
                    </Button>
                </form>
            </div>
        </section>


        {/* FAQ Section */}
        <section id="faq" className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                <div className="lg:col-span-1">
                    <h2 className="section-h2 font-body text-5xl font-extrabold tracking-tight text-foreground italic uppercase">
                        FAQ<br/><span className="text-primary">COMMON GROUND.</span>
                    </h2>
                    <p className="section-p mt-4 text-muted-foreground">
                        Punya ganjalan atau pertanyaan seputar OSIS? Kami rangkum jawaban yang paling sering ditanyakan di sini untuk mempermudahmu.
                    </p>
                    <Button variant="default" size="lg" className="faq-contact-button mt-8 w-full h-auto py-4 rounded-2xl bg-primary text-primary-foreground">
                        <div className="flex items-center gap-4 text-left">
                             <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                                <HelpCircle className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <div>
                                <p className="font-bold">BUTUH RESPON LEBIH CEPAT?</p>
                                <p className="text-xs font-mono uppercase tracking-wider">CONTACT PUBLIC RELATION</p>
                            </div>
                        </div>
                    </Button>
                </div>
                <div className="lg:col-span-2">
                  <ClientOnly>
                      <Accordion type="single" collapsible className="w-full space-y-4">
                          {faqItems.map((item) => (
                               <AccordionItem key={item.id} value={item.id} className="faq-items group bg-card border-none rounded-2xl shadow-sm data-[state=open]:border data-[state=open]:border-primary/50">
                                  <AccordionTrigger className="p-6 font-bold text-sm uppercase tracking-wider hover:no-underline text-left data-[state=open]:text-primary">
                                      {item.question}
                                      <span className="ml-auto shrink-0 transition-transform duration-200 group-data-[state=closed]:block hidden italic text-primary">↓</span>
                                      <span className="ml-auto shrink-0 transition-transform duration-200 group-data-[state=open]:block hidden italic text-primary">↑</span>
                                  </AccordionTrigger>
                                  <AccordionContent className="p-6 pt-0 text-muted-foreground text-left">
                                      {item.answer}
                                  </AccordionContent>
                              </AccordionItem>
                          ))}
                      </Accordion>
                    </ClientOnly>
                </div>
            </div>
        </section>

      </main>
    </div>
  );
}

    

    