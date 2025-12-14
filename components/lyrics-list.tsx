'use client';

import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    if (currentPhrase && currentPhraseRef.current && listRef.current) {
      // Use a small delay to ensure DOM is fully rendered
      const timeoutId = setTimeout(() => {
        const container = listRef.current;
        const element = currentPhraseRef.current;
        
        if (!container || !element) return;
        
        // Get bounding rectangles
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        
        // Calculate element's position relative to container's scrollable content
        const elementTopRelativeToContainer = elementRect.top - containerRect.top + container.scrollTop;
        const elementHeight = elementRect.height;
        const containerHeight = containerRect.height;
        
        // Calculate target scroll to center the element
        const targetScrollTop = elementTopRelativeToContainer - (containerHeight / 2) + (elementHeight / 2);
        
        container.scrollTo({
          top: Math.max(0, targetScrollTop),
          behavior: 'smooth',
        });
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [currentPhrase]);

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
      ref={listRef}
      className="flex-1 overflow-y-auto w-full h-full"
      style={{ maxHeight: '100%' }}
    >
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
                ? 'bg-[#18181b] text-white'
                : 'bg-[#18181b] text-gray-400 hover:text-gray-200'
            }`}
          >
            <p className="text-sm">{getDisplayText(phrase)}</p>
          </div>
        );
      })}
    </div>
  );
}
