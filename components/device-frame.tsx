'use client';

import { ReactNode } from 'react';

interface DeviceFrameProps {
  children: ReactNode;
  className?: string;
}

export default function DeviceFrame({ children, className = '' }: DeviceFrameProps) {
  return (
    <div className={`relative mx-auto ${className}`}>
      {/* Device Frame - Outer black border */}
      <div className="relative bg-black rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[3.5rem] p-2 sm:p-3 md:p-[10px] shadow-2xl">
        {/* Screen Bezel - Inner frame */}
        <div className="relative bg-white rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 md:w-40 h-5 sm:h-6 md:h-7 bg-black rounded-b-xl sm:rounded-b-2xl md:rounded-b-3xl z-10" />
          {/* Screen Content Area */}
          <div className="relative w-full aspect-[9/19.5]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

