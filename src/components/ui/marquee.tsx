
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

      // Duplicate children to create a seamless loop
      const childArray = React.Children.toArray(children);
      const duplicatedChildren = [...childArray, ...childArray, ...childArray, ...childArray, ...childArray];
      
      gsap.set(marqueeRef.current, {
        width: 'max-content'
      });

      const animate = () => {
        if (!marqueeRef.current) return;
        const { width } = marqueeRef.current.getBoundingClientRect();
        const halfWidth = width / 5; // Since we duplicated 5 times

        xPercent.current += baseVelocity * 0.016; // 60fps
        if (baseVelocity < 0) {
            if (xPercent.current < -100 * (4/5)) {
                xPercent.current = 0;
            }
        } else {
            if (xPercent.current > 0) {
                xPercent.current = -100 * (4/5);
            }
        }

        gsap.set(marqueeRef.current, {
            xPercent: xPercent.current
        });
        
        requestAnimationFrame(animate);
      };
      
      requestAnimationFrame(animate);

    }, [baseVelocity, children]);

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
        </div>
      </div>
    );
  }
);

Marquee.displayName = "Marquee";

export default Marquee;
