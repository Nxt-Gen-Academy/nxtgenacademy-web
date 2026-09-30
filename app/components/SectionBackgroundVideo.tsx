"use client";

import { useEffect, useRef } from "react";

export default function SectionBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    void video.play().catch(() => {});
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-cover opacity-75"
      >
        <source src="/hero_bg_video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-background/70" />
    </div>
  );
}
