
'use client';

import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const NotFoundPage = () => {
  const mainRef = useRef<HTMLElement>(null);
  const logsContainerRef = useRef<HTMLDivElement>(null);
  const repairOverlayRef = useRef<HTMLDivElement>(null);
  const repairBarRef = useRef<HTMLDivElement>(null);
  const repairStatusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // 1. Fragment Generator
    const createFragments = () => {
      const existingContainer = document.getElementById('fragment-container');
      if (existingContainer) return; // Don't create if it already exists

      const fragmentContainer = document.createElement('div');
      fragmentContainer.id = 'fragment-container';
      document.body.appendChild(fragmentContainer);

      for (let i = 0; i < 20; i++) {
        const fragment = document.createElement('div');
        fragment.className = 'fragment';
        const size = Math.random() * 50 + 20;
        fragment.style.width = size + 'px';
        fragment.style.height = '2px';
        fragment.style.left = Math.random() * 100 + 'vw';
        fragment.style.top = Math.random() * 100 + 'vh';
        fragment.style.opacity = (Math.random() * 0.5).toString();
        fragmentContainer.appendChild(fragment);
        animateFragment(fragment);
      }
    };

    const animateFragment = (el: HTMLDivElement) => {
      const duration = Math.random() * 3000 + 2000;
      el.animate(
        [
          { transform: 'translateX(0) rotate(0deg)', opacity: 0 },
          { transform: `translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`, opacity: 0.5 },
          { transform: 'translateX(0) rotate(0deg)', opacity: 0 },
        ],
        {
          duration: duration,
          iterations: Infinity,
        }
      );
    };

    // 2. Interactive Mouse Effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!mainRef.current) return;
      const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
      mainRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;

      const errorCode = document.getElementById('error-code');
      if (errorCode) {
        errorCode.style.textShadow = `${moveX}px ${moveY}px 0px rgba(79, 70, 229, 0.3), ${-moveX}px ${-moveY}px 0px rgba(244, 63, 94, 0.3)`;
      }
    };

    // 3. Fake Logs Loop
    const logs = [
      "> TRACING PATH: /users/dimensi/404.exe",
      "> ERROR: NULL_POINTER_IN_NEURAL_NODE_7",
      "> STATUS: REBOOTING_EMOTIONAL_CORE...",
      "> WARNING: REALITY_LEAK_DETECTED",
      "> BYPASSING_SECURITY_LAYER_01...",
      "> HANDSHAKE_WITH_GEMINI_AI: SUCCESS",
      "> ATTEMPTING_SYNAPTIC_RECOVERY...",
      "> LOG: USER_IS_STILL_WAITING_FOR_CREATIVITY",
      "> STACK_OVERFLOW_IN_IMAGINATION_VALVE"
    ];
    let logIndex = 0;
    const logInterval = setInterval(() => {
      const container = logsContainerRef.current;
      if (!container) return;
      const p = document.createElement('p');
      p.innerText = logs[logIndex % logs.length];
      container.appendChild(p);
      if (container.children.length > 8) {
        container.removeChild(container.firstChild as Node);
      }
      logIndex++;
    }, 1500);

    createFragments();
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(logInterval);
      const fragmentContainer = document.getElementById('fragment-container');
      if (fragmentContainer && fragmentContainer.parentNode) {
        fragmentContainer.parentNode.removeChild(fragmentContainer);
      }
    };
  }, []);

  const initiateRepair = () => {
    const overlay = repairOverlayRef.current;
    const bar = repairBarRef.current;
    const statusText = repairStatusRef.current;

    if (!overlay || !bar || !statusText) return;

    overlay.style.display = 'flex';

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        statusText.innerText = "Reality Synchronized! Redirecting...";
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }
      bar.style.width = progress + '%';
      statusText.innerText = `Synchronizing reality... ${Math.floor(progress)}%`;
    }, 50);
  };

  return (
    <>
      <style jsx global>{`
        :root {
            --neon-blue: #4f46e5;
            --neon-pink: #f43f5e;
        }
        body { 
            background-color: #020617 !important; 
            color: white !important;
        }
        .heading-premium { 
            font-weight: 900; 
            font-style: italic; 
            text-transform: uppercase; 
            letter-spacing: -0.05em; 
            line-height: 0.85; 
        }
        .grid-bg {
            background-image: 
                linear-gradient(rgba(79, 70, 229, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(79, 70, 229, 0.1) 1px, transparent 1px);
            background-size: 50px 50px;
            perspective: 1000px;
            transform: rotateX(45deg);
            position: absolute;
            bottom: -50%;
            left: -50%;
            right: -50%;
            top: 0;
            z-index: 0;
        }
        @keyframes glitch {
            0% { transform: translate(0); text-shadow: -2px 0 var(--neon-pink), 2px 0 var(--neon-blue); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); text-shadow: -2px 0 var(--neon-pink), 2px 0 var(--neon-blue); }
        }
        .glitch { animation: glitch 0.3s infinite; }
        .fragment {
            position: absolute;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            pointer-events: none;
            z-index: 1;
        }
        .scanline {
            width: 100%;
            height: 100px;
            z-index: 20;
            background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(79, 70, 229, 0.2) 50%, rgba(0, 0, 0, 0) 100%);
            opacity: 0.1;
            position: absolute;
            bottom: 100%;
            animation: scan 4s linear infinite;
        }
        @keyframes scan {
            from { bottom: 100%; }
            to { bottom: -100%; }
        }
        .btn-cyber {
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        .btn-cyber::after {
            content: '';
            position: absolute;
            top: 0; left: -100%;
            width: 100%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            transition: 0.5s;
        }
        .btn-cyber:hover::after { left: 100%; }
        #repair-overlay {
            display: none;
            background: #4f46e5;
            z-index: 200;
        }
      `}</style>
      
      <div className="flex items-center justify-center min-h-screen bg-[#020617] text-white font-body py-16">
        <div className="grid-bg"></div>
        <div className="scanline"></div>

        <main ref={mainRef} className="relative z-10 w-full max-w-5xl px-6 text-center">
            <div className="relative inline-block mb-12">
                <h1 id="error-code" className="heading-premium text-[14rem] md:text-[25rem] text-white/5 tracking-tighter select-none glitch">404</h1>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="bg-indigo-600 px-8 py-4 rounded-2xl rotate-[-5deg] shadow-[0_0_50px_rgba(79,70,229,0.5)] border-4 border-white mb-6">
                        <p className="font-black italic uppercase text-2xl md:text-4xl tracking-tighter">Synaptic Failure.</p>
                    </div>
                    <div className="p-4 bg-rose-500 rounded-xl rotate-[3deg] shadow-xl">
                        <p className="font-bold uppercase text-[10px] tracking-[0.4em]">Connection: Terminated</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4 mb-16">
                <h2 className="heading-premium text-4xl md:text-7xl text-white">Dimensi Tidak <br/><span className="text-indigo-500 italic">Ditemukan.</span></h2>
                <p className="max-w-2xl mx-auto text-slate-500 font-medium italic text-lg leading-relaxed">
                    Terjadi kebocoran data pada core SMANSA. Halaman yang kamu tuju telah terhapus dari realitas digital atau sedang dipindahkan ke server lain.
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <button onClick={initiateRepair} className="btn-cyber w-full md:w-auto bg-indigo-600 text-white px-16 py-6 rounded-full font-black italic uppercase text-xs tracking-[0.3em] shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:scale-105 active:scale-95 transition-all">
                    Initiate Repair
                </button>
                <Link href="/" className="btn-cyber w-full md:w-auto border-2 border-slate-800 bg-slate-900/50 backdrop-blur-md text-slate-400 px-16 py-6 rounded-full font-black italic uppercase text-xs tracking-[0.3em] hover:text-white hover:border-white transition-all">
                    Return to Base
                </Link>
            </div>

            <div className="mt-24 text-left font-mono text-[8px] md:text-[10px] text-slate-700 max-w-lg mx-auto h-20 overflow-hidden opacity-50">
                <div ref={logsContainerRef} className="space-y-1">
                    <p>&gt; TRACING PATH: /users/dimensi/404.exe</p>
                    <p>&gt; ERROR: NULL_POINTER_IN_NEURAL_NODE_7</p>
                    <p>&gt; STATUS: REBOOTING_EMOTIONAL_CORE...</p>
                </div>
            </div>
        </main>
        
        <div ref={repairOverlayRef} id="repair-overlay" className="fixed inset-0 hidden flex-col items-center justify-center text-center p-10">
            <h3 className="heading-premium text-6xl md:text-8xl mb-8">Repairing <br/>Neural Link.</h3>
            <div className="w-full max-w-xl h-2 bg-white/10 rounded-full overflow-hidden mb-6">
                <div ref={repairBarRef} className="h-full bg-white w-0 transition-all duration-100 ease-linear shadow-[0_0_20px_#fff]"></div>
            </div>
            <p ref={repairStatusRef} className="font-black italic uppercase text-xs tracking-[0.5em]">Synchronizing reality... 0%</p>
        </div>
    </div>
    </>
  );
};

export default NotFoundPage;

    