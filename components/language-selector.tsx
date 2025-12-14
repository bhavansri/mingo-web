'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface LanguageSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLang: 'EN' | 'TA' | 'PN';
  onSelect: (lang: 'EN' | 'TA' | 'PN') => void;
}

export default function LanguageSelector({
  open,
  onOpenChange,
  selectedLang,
  onSelect,
}: LanguageSelectorProps) {
  const getLanguageDisplayText = (lang: string) => {
    switch (lang) {
      case 'EN':
        return 'English';
      case 'TA':
        return 'Tamil';
      case 'PN':
        return 'Pronounce';
      default:
        return 'English';
    }
  };

  const languages: Array<'EN' | 'TA' | 'PN'> = ['EN', 'TA', 'PN'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border-gray-800 text-white max-w-md w-[calc(100%-2rem)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-bold">
            Select Language
          </DialogTitle>
        </DialogHeader>
        <div className="w-full px-5 space-y-3">
          {languages.map((lang) => (
            <Button
              key={lang}
              onClick={() => {
                onSelect(lang);
                onOpenChange(false);
              }}
              className="w-full p-4 bg-[#1e2939] text-white hover:bg-[#2a3441] text-lg"
            >
              {getLanguageDisplayText(lang)}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

