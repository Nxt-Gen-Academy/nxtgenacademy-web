"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "fade";
  delay?: number;
  duration?: number;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 700,
  threshold = 0.1,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ua = window.navigator.userAgent.toLowerCase();
    const safari =
      ua.includes("safari") &&
      !ua.includes("chrome") &&
      !ua.includes("chromium") &&
      !ua.includes("android");

    setIsSafari(safari);

    if (safari) {
      setIsVisible(true);
      return;
    }

    const currentRef = ref.current;
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      requestAnimationFrame(() => setIsVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (currentRef) observer.unobserve(currentRef);
        }
      },
      {
        root: null,
        rootMargin: "100px 0px 100px 0px",
        threshold: 0.01,
      }
    );

    if (currentRef) {
      // Immediate viewport check for Firefox initial render
      const rect = currentRef.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
        setIsVisible(true);
      } else {
        observer.observe(currentRef);
      }
    }

    // Safety fallback: if IntersectionObserver hasn't fired after 1s,
    // reveal content anyway. Prevents permanently invisible content
    // on browsers with IntersectionObserver edge cases (e.g. Firefox).
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      clearTimeout(fallbackTimer);
    };
  }, [threshold]);

  const baseClasses = isSafari ? "" : "transition-all ease-out";
  
  const initialStyles = {
    up: isSafari ? "" : "opacity-0 translate-y-12",
    down: isSafari ? "" : "opacity-0 -translate-y-12",
    left: isSafari ? "" : "opacity-0 translate-x-12",
    right: isSafari ? "" : "opacity-0 -translate-x-12",
    fade: isSafari ? "" : "opacity-0",
  };

  const finalStyles = isSafari ? "" : "opacity-100 translate-y-0 translate-x-0";

  return (
    <div
      ref={ref}
      className={cn(
        baseClasses,
        isVisible ? finalStyles : initialStyles[direction],
        className
      )}
      style={
        isSafari
          ? {}
          : {
              transitionDuration: `${duration}ms`,
              transitionDelay: `${delay}ms`,
            }
      }
    >
      {children}
    </div>
  );
}

