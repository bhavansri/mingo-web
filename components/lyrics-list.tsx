'use client';

import { useRef, useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Phrase {
  start_time: number;
  end_time: number;
  tamil: string;
  romanization: string;
  english_translation: string;
}

interface LyricsListProps {
  phrases: Phrase[];
  currentPhrase: Phrase | null;
  lyricsLang?: 'EN' | 'TA' | 'PN';
  onPhraseClick: (phrase: Phrase) => void;
}

export default function LyricsList({
  phrases,
  currentPhrase,
  lyricsLang = 'EN',
  onPhraseClick,
}: LyricsListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const currentPhraseRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getDisplayText = (phrase: Phrase) => {
    switch (lyricsLang) {
      case 'EN':
        return phrase.english_translation;
      case 'TA':
        return phrase.tamil;
      case 'PN':
        return phrase.romanization;
      default:
        return phrase.english_translation;
    }
  };

  return (
    <div
      className={`bg-[#18181b] ${
        isFullscreen
          ? 'fixed inset-4 z-50 rounded-lg'
          : 'flex-1 w-full h-full'
      }`}
    >
      <div className="relative w-full h-full flex flex-col">
        {/* Header with toggle button */}
        <div className="relative shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="absolute top-2 right-2 z-10 text-gray-400 hover:bg-gray-800 hover:text-gray-400"
            aria-label={isFullscreen ? 'Minimize' : 'Maximize'}
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Scrollable lyrics list */}
        <div
          ref={listRef}
          className={`flex-1 overflow-y-auto w-full ${
            isFullscreen ? 'h-full' : ''
          }`}
          style={{ maxHeight: isFullscreen ? '100%' : undefined }}
        >
          <div className={isFullscreen ? 'py-4' : ''}>
            {phrases.map((phrase, index) => {
            const isCurrent =
              currentPhrase &&
              phrase.start_time === currentPhrase.start_time &&
              phrase.end_time === currentPhrase.end_time;

            return (
              <div
                key={`${phrase.start_time}-${phrase.end_time}-${index}`}
                ref={isCurrent ? currentPhraseRef : null}
                onClick={() => onPhraseClick(phrase)}
                className={`p-2 text-center cursor-pointer transition-colors ${
                  isCurrent
                    ? 'bg-[#18181b] text-white font-bold'
                    : 'bg-[#18181b] text-gray-400 hover:text-gray-200'
                }`}
              >
                <p className="text-sm">{getDisplayText(phrase)}</p>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
}
