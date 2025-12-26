
'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Gamepad2, Rocket, Trophy, ArrowRight, Star } from 'lucide-react';

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

export default function LandingPage() {
  return (
    <div className="w-full bg-background text-foreground min-h-screen flex flex-col justify-center">
      <main className="container mx-auto px-4 py-16 md:py-24">
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

        {/* 3D Grid Section */}
        <section className="mt-24 md:mt-32">
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
      </main>
    </div>
  );
}
