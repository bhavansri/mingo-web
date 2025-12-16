'use client';

interface Phrase {
  start_time: number;
  end_time: number;
  tamil: string;
  romanization: string;
  english_translation: string;
}

interface CurrentPhraseProps {
  phrase: Phrase | null;
  wordTranslations: Record<string, string>;
}

export default function CurrentPhrase({ phrase, wordTranslations }: CurrentPhraseProps) {
  if (!phrase) {
    return <div className="h-[75px] flex items-center justify-center" />;
  }

  const tamilWords = phrase.tamil.split(' ');
  const romanWords = phrase.romanization.split(' ');

  return (
    <div className="flex flex-col items-center justify-center mb-2">
      <p className="text font-bold text-[#ec003f] text-center mb-2">
        {phrase.english_translation}
      </p>
      <div className="flex flex-row items-center justify-center flex-wrap">
        {tamilWords.map((word, index) => {
          const translation = wordTranslations[word] || '';
          return (
            <div key={index} className="p-2 flex flex-col items-center">
              <p className="text-xs text-gray-400">{word}</p>
              <p className="text-sm text-white">{romanWords[index] || ''}</p>
              {translation && (
                <p className="text-sm text-[#ff637e] mt-1">{translation}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

