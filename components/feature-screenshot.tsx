'use client';

import { useState } from 'react';
import Image from 'next/image';

interface FeatureScreenshotProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export default function FeatureScreenshot({ src, alt, priority = false }: FeatureScreenshotProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-black/40 text-sm text-center p-8">
        <div className="mb-2">Screenshot placeholder</div>
        <div className="text-xs">Add {src.split('/').pop()} to /public/screenshots/</div>
      </div>
    );
  }

  return (
    <Image
      src={`${src}?v=2`}
      alt={alt}
      fill
      className="object-contain"
      priority={priority}
      onError={() => setImageError(true)}
      unoptimized
    />
  );
}

