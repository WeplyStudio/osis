
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

    useEffect(() => {
      if (!marqueeRef.current) return;

      const items = marqueeRef.current.children;
      if (items.length <= 1) return;

      const itemWidth = items[0].getBoundingClientRect().width;
      const totalWidth = itemWidth * items.length;
      gsap.set(items, {
        x: (i) => i * itemWidth,
      });

      const animate = () => {
        const speed = baseVelocity;
        const firstItem = items[0];
        const lastItem = items[items.length - 1];

        if (speed < 0) {
          xPercent.current -= Math.abs(speed) / 100;
          if (firstItem.getBoundingClientRect().right <= 0) {
             xPercent.current = 0;
          }
        } else {
          xPercent.current += Math.abs(speed) / 100;
           if (lastItem.getBoundingClientRect().left >= window.innerWidth) {
             xPercent.current = 0;
           }
        }
        
        gsap.set(items, { xPercent: xPercent.current });
        requestAnimationFrame(animate);
      };

      const resizeObserver = new ResizeObserver(() => {
          const newWidth = items[0].getBoundingClientRect().width;
          gsap.set(items, {
            x: (i) => i * newWidth,
          });
      });
      resizeObserver.observe(items[0]);
      
      requestAnimationFrame(animate);

      return () => {
        resizeObserver.disconnect();
      };
    }, [baseVelocity]);

    return (
      <div
        ref={ref}
        className={cn("relative flex w-full overflow-hidden", className)}
      >
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {React.Children.map(children, (child) => (
            <div className="shrink-0">{child}</div>
          ))}
           {React.Children.map(children, (child) => (
            <div className="shrink-0">{child}</div>
          ))}
          {React.Children.map(children, (child) => (
            <div className="shrink-0">{child}</div>
          ))}
           {React.Children.map(children, (child) => (
            <div className="shrink-0">{child}</div>
          ))}
           {React.Children.map(children, (child) => (
            <div className="shrink-0">{child}</div>
          ))}
           {React.Children.map(children, (child) => (
            <div className="shrink-0">{child}</div>
          ))}
        </div>
      </div>
    );
  }
);

Marquee.displayName = "Marquee";

export default Marquee;
