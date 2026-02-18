'use client';

import { useRef, useEffect } from 'react';

interface FeatureVideoProps {
  src: string;
  alt: string;
  playbackRate?: number;
}

export default function FeatureVideo({ src, alt, playbackRate = 1 }: FeatureVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        src={src}
        aria-label={alt}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-contain"
      />
    </div>
  );
}
