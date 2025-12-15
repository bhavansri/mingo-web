'use client';

import CurrentPhrase from '@/components/current-phrase';
import LanguageSelector from '@/components/language-selector';
import LyricsList from '@/components/lyrics-list';
import SongMeaning from '@/components/song-meaning';
import SpeedSelector from '@/components/speed-selector';
import { Button } from '@/components/ui/button';
import YoutubePlayerComponent, { YoutubePlayerRef } from '@/components/youtube-player';
import phrasesData from '@/data/phrases.json';
import { Gauge, Languages, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface Phrase {
  start_time: number;
  end_time: number;
  tamil: string;
  romanization: string;
  english_translation: string;
}

export default function Home() {
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showSongMeaning, setShowSongMeaning] = useState(false);
  const [videoSpeed, setVideoSpeed] = useState(1.0);
  const [showSpeedModal, setShowSpeedModal] = useState(false);
  const [lyricsLang, setLyricsLang] = useState<'EN' | 'TA' | 'PN'>('EN');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const playerRef = useRef<YoutubePlayerRef>(null);
  const phrases = phrasesData.phrases as Phrase[];

  const currentPhrase = useMemo(() => {
    return phrases.find((phrase) => elapsed >= phrase.start_time && elapsed <= phrase.end_time) || null;
  }, [elapsed, phrases]);

  const onPhraseClick = (phrase: Phrase) => {
    if (playerRef.current) {
      playerRef.current.seekTo(phrase.start_time);
      setPlaying(true);
    }
  };

  const onChangeState = (state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    } else if (state === 'paused') {
      setPlaying(false);
    } else if (state === 'playing') {
      setPlaying(true);
    }
  };

  const getLanguageDisplayText = useCallback((lang: string) => {
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
  }, []);

  const onModalOpen = useCallback(() => {
    setPlaying(false);
    setShowSongMeaning(true);
  }, []);

  const onModalClose = useCallback(() => {
    setShowSongMeaning(false);
  }, []);

  const onSpeedModalOpen = useCallback(() => {
    setShowSpeedModal(true);
    setPlaying(false);
  }, []);

  const onSpeedModalClose = useCallback(() => {
    setShowSpeedModal(false);
  }, []);

  const onSpeedSelect = useCallback((speed: number) => {
    setVideoSpeed(speed);
    setShowSpeedModal(false);
  }, []);

  const onLanguageModalOpen = useCallback(() => {
    setShowLanguageModal(true);
    setPlaying(false);
  }, []);

  const onLanguageModalClose = useCallback(() => {
    setShowLanguageModal(false);
  }, []);

  const onLanguageSelect = useCallback((lang: 'EN' | 'TA' | 'PN') => {
    setLyricsLang(lang);
    setShowLanguageModal(false);
  }, []);

  // Resume playback when modal closes
  useEffect(() => {
    if (!showSongMeaning && !showSpeedModal && !showLanguageModal) {
      const timer = setTimeout(() => {
        setPlaying(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showSongMeaning, showSpeedModal, showLanguageModal]);

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      {/* Header Controls */}
      <div className="flex flex-row justify-between items-center mx-2.5 gap-2 flex-wrap sm:flex-nowrap flex-shrink-0 py-2">
        <Button
          onClick={onLanguageModalOpen}
          className="flex flex-row items-center gap-1 bg-[#1e2939] text-white hover:bg-[#2a3441] px-2.5 py-2.5 rounded-lg min-h-[44px] flex-1 sm:flex-initial"
        >
          <Languages className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-sm sm:text-base">
            {getLanguageDisplayText(lyricsLang)}
          </span>
        </Button>
        <Button
          onClick={onSpeedModalOpen}
          className="flex flex-row items-center gap-1 bg-[#1e2939] text-white hover:bg-[#2a3441] px-2.5 py-2.5 rounded-lg min-h-[44px] flex-1 sm:flex-initial"
        >
          <Gauge className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-sm sm:text-base">{videoSpeed.toFixed(2)}x</span>
        </Button>
        <Button
          onClick={onModalOpen}
          className="flex flex-row items-center gap-1 bg-[#1e2939] text-white hover:bg-[#2a3441] px-2.5 py-2.5 rounded-lg min-h-[44px] flex-1 sm:flex-initial"
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Song Meaning</span>
        </Button>
      </div>

      {/* Modals */}
      <SongMeaning open={showSongMeaning} onOpenChange={onModalClose} />
      <SpeedSelector
        open={showSpeedModal}
        onOpenChange={onSpeedModalClose}
        selectedSpeed={videoSpeed}
        onSelect={onSpeedSelect}
      />
      <LanguageSelector
        open={showLanguageModal}
        onOpenChange={onLanguageModalClose}
        selectedLang={lyricsLang}
        onSelect={onLanguageSelect}
      />

      <div className="w-full px-2.5 pt-4 pb-2 shrink-0">
        <YoutubePlayerComponent 
          ref={playerRef}
          videoId="2hBZTzopw7w" 
          playing={playing}
          playbackRate={videoSpeed}
          onStateChange={onChangeState}
          onTimeUpdate={setElapsed}
        />
      </div>
      <div className="px-2.5 shrink-0">
        <CurrentPhrase phrase={currentPhrase} />
      </div>
      <div className="flex-1 min-h-0 px-2.5 flex flex-col">
        <LyricsList
          phrases={phrases}
          currentPhrase={currentPhrase}
          lyricsLang={lyricsLang}
          onPhraseClick={onPhraseClick}
        />
      </div>
    </div>
  );
}

