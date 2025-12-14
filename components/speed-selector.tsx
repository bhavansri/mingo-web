'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface SpeedSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSpeed: number;
  onSelect: (speed: number) => void;
}

export default function SpeedSelector({
  open,
  onOpenChange,
  selectedSpeed,
  onSelect,
}: SpeedSelectorProps) {
  const speeds = [1.0, 0.95, 0.9, 0.85];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border-gray-800 text-white max-w-md w-[calc(100%-2rem)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-bold">
            Playback Speed
          </DialogTitle>
        </DialogHeader>
        <div className="w-full px-5 space-y-3">
          {speeds.map((speed) => (
            <Button
              key={speed}
              onClick={() => {
                onSelect(speed);
                onOpenChange(false);
              }}
              className="w-full p-4 bg-[#1e2939] text-white hover:bg-[#2a3441] text-lg"
            >
              {speed.toFixed(2)}x
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

