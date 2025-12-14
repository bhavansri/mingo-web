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
}

const songMeaning = `🎭 Theme

The core theme of the song is a frank and bold exploration of the relationship between love (Kādal) and lust/physical desire (Kāmam) within an intimate relationship. 
The speaker is seeking honest acceptance from their partner, questioning if they will be loved and forgiven despite prioritizing physical desire.

🎤 Song Breakdown

The recurring chorus, "உண்மை சொன்னால் நேசிப்பாயா, மஞ்சத்தின் மேல் மன்னிப்பாயா" (Umaṇmai connaal nēcippaayaa, mañcattin mēl maṇṇippaayaa), translates to: "If I tell you the truth, will you still love me? Will you forgive me on the bed?" 
This encapsulates the speaker's direct plea for acceptance, specifically acknowledging that while their heart holds love, their body is dominated by desire, and they seek forgiveness for this imbalance in their intimacy.

📝 Summary

The song is a passionate and unreserved confession where the speaker admits that their love is slightly less (கம்மி), and their lust is slightly more (தூக்கல்). 
It celebrates unrestrained desire and physical attraction as a genuine component of a relationship, asking the partner to accept their raw, human impulses without judgment.`;

export default function SongMeaning({ open, onOpenChange }: SongMeaningProps) {
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
            {songMeaning}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

