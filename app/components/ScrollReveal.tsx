"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "fade";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
    margin: "0px 0px -40px 0px",
  });

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = 28;

  const initialVariants = {
    up: { opacity: 0, y: offset, x: 0 },
    down: { opacity: 0, y: -offset, x: 0 },
    left: { opacity: 0, x: offset, y: 0 },
    right: { opacity: 0, x: -offset, y: 0 },
    fade: { opacity: 0, x: 0, y: 0 },
  };

  const variants: Variants = {
    hidden: initialVariants[direction],
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: duration / 1000,
        delay: delay / 1000,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={cn("will-change-[transform,opacity]", className)}
    >
      {children}
    </motion.div>
  );
}
