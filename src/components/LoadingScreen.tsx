
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

const LoadingScreen = ({ animationClassName }: { animationClassName: string }) => {
  return (
    <div className={cn("fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground", animationClassName)}>
      <div className="flex items-center gap-3 animate-pulse">
        <h1 className="text-3xl font-body font-extrabold text-foreground italic uppercase">
          OSIS<span className="text-primary">Kigra</span>
        </h1>
      </div>
      <p className="mt-2 text-sm text-muted-foreground tracking-widest uppercase">Empowering Future Leaders</p>
    </div>
  );
};

export default LoadingScreen;
