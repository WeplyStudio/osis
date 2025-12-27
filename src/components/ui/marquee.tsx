
import { cn } from "@/lib/utils";
import React from "react";

const Marquee = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative flex w-full overflow-hidden", className)}
      {...props}
    >
      <div className="flex min-w-full shrink-0 items-center justify-around animate-marquee [animation-play-state:running]">
        {children}
        {children}
        {children}
        {children}
      </div>
       <div className="absolute top-0 flex min-w-full shrink-0 items-center justify-around animate-marquee2 [animation-play-state:running]">
        {children}
        {children}
        {children}
        {children}
      </div>
    </div>
  );
});

Marquee.displayName = "Marquee";

export default Marquee;

    