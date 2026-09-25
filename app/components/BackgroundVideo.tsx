"use client";

import { useEffect, useRef } from "react";

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const silence = () => {
      video.muted = true;
      video.defaultMuted = true;
      if (video.volume !== 0) {
        video.volume = 0;
      }
    };

    silence();
    void video.play().catch(() => {});

    video.addEventListener("play", silence);
    video.addEventListener("volumechange", silence);

    return () => {
      video.removeEventListener("play", silence);
      video.removeEventListener("volumechange", silence);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      controls={false}
      disablePictureInPicture
      className="absolute inset-0 h-full w-full object-cover pointer-events-none z-0 opacity-75 md:inset-auto md:left-1/2 md:top-1/2 md:h-auto md:w-[90%] md:-translate-x-1/2 md:-translate-y-1/2 md:aspect-video"
    >
      <source src="/video.mp4" type="video/mp4" />
    </video>
  );
}
