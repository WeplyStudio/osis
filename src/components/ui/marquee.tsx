
'use client';
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  /**
   * The base velocity of the marquee animation, in pixels per second.
   * A positive value moves the marquee to the left, while a negative value moves it to the right.
   * @default -50
   */
  baseVelocity?: number;
}

const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  ({ className, children, baseVelocity = -50 }, ref) => {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const xPercent = useRef(0);
    const requestRef = useRef<number | null>(null);

    useEffect(() => {
      if (!marqueeRef.current) return;

      const items = marqueeRef.current.children;
      if (items.length <= 1) return;
      
      gsap.set(marqueeRef.current, {
        width: 'max-content'
      });

      const animate = () => {
        if (!marqueeRef.current) return;
        
        xPercent.current += baseVelocity * 0.016; // Approx 60fps
        
        // Loop logic: Since we have 5 duplicates, reset at 1/5th
        // Actually simpler logic for GSAP:
        if (baseVelocity < 0) {
            if (xPercent.current < -20) { // Reset after 1/5th
                xPercent.current = 0;
            }
        } else {
            if (xPercent.current > 0) {
                xPercent.current = -20;
            }
        }

        gsap.set(marqueeRef.current, {
            xPercent: xPercent.current
        });
        
        requestRef.current = requestAnimationFrame(animate);
      };
      
      requestRef.current = requestAnimationFrame(animate);

      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
      };

    }, [baseVelocity, children]);

    return (
      <div
        ref={ref}
        className={cn("relative flex w-full overflow-hidden", className)}
      >
        <div ref={marqueeRef} className="flex whitespace-nowrap">
           {/* Duplicate 5 times for a seamless loop across large screens */}
           {[...Array(5)].map((_, i) => (
             <React.Fragment key={i}>
                {React.Children.map(children, (child) => (
                    <div className="shrink-0">{child}</div>
                ))}
             </React.Fragment>
           ))}
        </div>
      </div>
    );
  }
);

Marquee.displayName = "Marquee";

export default Marquee;
