'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface SongMeaningProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  aiSummary?: string | null;
}

export default function SongMeaning({ open, onOpenChange, aiSummary }: SongMeaningProps) {
  const displayText = aiSummary || 'No description available for this song.';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border-gray-800 text-white max-w-2xl max-h-[90vh] w-[calc(100%-2rem)] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-bold">
            Song Summary & Interpretation
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[500px] px-4 mt-5 pb-5">
          <p className="text-sm text-white leading-relaxed whitespace-pre-line">
            {displayText}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

