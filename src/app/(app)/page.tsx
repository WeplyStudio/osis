
'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, PartyPopper, Lightbulb, Trophy } from "lucide-react";
import Link from 'next/link';

const FeatureCard = ({ icon, title, description, className }: { icon: React.ReactNode, title: string, description: string, className?: string }) => (
  <div className={`rounded-2xl p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl ${className}`}>
    <div className="mb-4 text-white">{icon}</div>
    <h3 className="font-headline text-2xl font-bold text-white mb-2">{title}</h3>
    <p className="text-white/80">{description}</p>
  </div>
);

export default function LandingPage() {
  return (
    <div className="w-full bg-background text-foreground">
      <main className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-white drop-shadow-lg">
            Selamat Datang di <span className="text-accent">OASISverse</span>!
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 mb-8">
            Pusat kegiatan, acara, dan ide cemerlang OSIS. Mari buat kehidupan sekolah lebih seru dan berwarna bersama!
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg py-7 px-10 rounded-full shadow-lg transition-transform hover:scale-105">
            <Link href="/ideas">
              Mulai Berkontribusi <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </section>

        {/* 3D Grid Section */}
        <section className="mt-20 md:mt-32">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<PartyPopper size={40} />}
                title="Acara Seru"
                description="Jangan lewatkan acara-acara keren yang diadakan oleh OSIS. Dari festival hingga kompetisi, semua ada di sini!"
                className="bg-blue-500"
              />
              <FeatureCard 
                icon={<Lightbulb size={40} />}
                title="Bank Ide Kreatif"
                description="Punya ide brilian untuk sekolah? Sumbangkan idemu dan wujudkan bersama OSIS."
                className="bg-purple-600"
              />
              <FeatureCard 
                icon={<Trophy size={40} />}
                title="Raih Prestasi"
                description="Ikuti berbagai kompetisi dan kegiatan untuk mengasah bakat dan meraih prestasi gemilang."
                className="bg-green-500"
              />
           </div>
        </section>
      </main>
    </div>
  );
}
