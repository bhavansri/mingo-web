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
  cinematicMode?: boolean;
}

export default function CurrentPhrase({ phrase, wordTranslations, cinematicMode = false }: CurrentPhraseProps) {
  if (!phrase) {
    return <div className="h-[75px] flex items-center justify-center" />;
  }

  const tamilWords = phrase.tamil.split(' ');
  const romanWords = phrase.romanization.split(' ');

  return (
    <div className={`flex flex-col items-center justify-center mb-2 ${cinematicMode ? 'px-6' : ''}`}>
      <div className="flex flex-row items-center justify-center flex-wrap gap-2">
        {tamilWords.map((word, index) => {
          const translation = wordTranslations[word] || '';
          return (
            <div key={index} className={`flex flex-col items-center bg-gray-800 rounded ${cinematicMode ? 'px-4 py-2' : 'p-2'}`}>
              <p className="text-sm text-white font-bold">{romanWords[index] || ''}</p>
              {translation && (
                <p className="text-sm text-[#ff637e] mt-1 font-bold">{translation}</p>
              )}
              <p className="text-sm text-gray-400 font-bold">{word}</p>
            </div>
          );
        })}
      </div>
      <p className="text-sm text-[#ff637e] text-center mt-6 mb-2 font-bold">
        {phrase.english_translation}
      </p>
      
    </div>
  );
}

