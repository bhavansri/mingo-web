'use client';

import CurrentPhrase from '@/components/current-phrase';
import LanguageSelector from '@/components/language-selector';
import LyricsList from '@/components/lyrics-list';
import SongMeaning from '@/components/song-meaning';
import SpeedSelector from '@/components/speed-selector';
import { Button } from '@/components/ui/button';
import YoutubePlayerComponent, { YoutubePlayerRef } from '@/components/youtube-player';
import { supabase } from '@/lib/supabase';
import { Gauge, Languages, Sparkles } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface Phrase {
  start_time: number;
  end_time: number;
  tamil: string;
  romanization: string;
  english_translation: string;
}

interface Song {
  id: number;
  created_at: string;
  title: string | null;
  youtube_id: string | null;
  phrases: Phrase[] | null;
  word_translations: Record<string, string> | null;
}

function LearnPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showSongMeaning, setShowSongMeaning] = useState(false);
  const [videoSpeed, setVideoSpeed] = useState(1.0);
  const [showSpeedModal, setShowSpeedModal] = useState(false);
  const [lyricsLang, setLyricsLang] = useState<'EN' | 'TA' | 'PN'>('EN');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const playerRef = useRef<YoutubePlayerRef>(null);
  const previousSpeedRef = useRef<number | null>(null);
  
  // Song data state
  const [youtubeId, setYoutubeId] = useState<string>('');
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [wordTranslations, setWordTranslations] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    setShowSpeedModal(false);
    
    // If speed changed, update URL and reload page
    if (speed !== videoSpeed) {
      const songId = searchParams.get('id');
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('speed', speed.toString());
      if (songId) {
        currentUrl.searchParams.set('id', songId);
      }
      window.location.href = currentUrl.toString();
    }
  }, [videoSpeed, searchParams]);

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

  // Initialize video speed from URL params
  useEffect(() => {
    const speedParam = searchParams.get('speed');
    if (speedParam) {
      const speed = parseFloat(speedParam);
      if (!isNaN(speed) && speed > 0) {
        setVideoSpeed(speed);
        previousSpeedRef.current = speed;
      }
    } else {
      previousSpeedRef.current = 1.0;
    }
  }, [searchParams]);

  // Fetch song data from Supabase
  useEffect(() => {
    const fetchSong = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const songId = searchParams.get('id');
        if (!songId) {
          setError('Song ID is required in URL parameter (e.g., ?id=1)');
          setLoading(false);
          return;
        }

        const { data, error: fetchError } = await supabase
          .from('song')
          .select('*')
          .eq('id', parseInt(songId, 10))
          .single();

        if (fetchError) {
          throw fetchError;
        }

        if (!data) {
          setError(`Song with ID ${songId} not found`);
          setLoading(false);
          return;
        }

        const song = data as Song;
        
        if (!song.youtube_id) {
          setError('Song is missing YouTube ID');
          setLoading(false);
          return;
        }

        // Handle phrases - stored as { phrases: [...] }
        if (!song.phrases || typeof song.phrases !== 'object' || !('phrases' in song.phrases)) {
          setError('Song is missing phrases data');
          setLoading(false);
          return;
        }
        const phrasesObj = song.phrases as { phrases: Phrase[] };
        const phrasesArray = phrasesObj.phrases;

        if (!phrasesArray || phrasesArray.length === 0) {
          setError('Song is missing phrases data');
          setLoading(false);
          return;
        }

        // Handle word_translations - stored as { word_translations: {...} }
        let wordTranslationsObj: Record<string, string> = {};
        if (song.word_translations && typeof song.word_translations === 'object' && 'word_translations' in song.word_translations) {
          wordTranslationsObj = (song.word_translations as unknown as { word_translations: Record<string, string> }).word_translations;
        }

        setYoutubeId(song.youtube_id);
        setPhrases(phrasesArray);
        setWordTranslations(wordTranslationsObj);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching song:', err);
        setError(err instanceof Error ? err.message : 'Failed to load song data');
        setLoading(false);
      }
    };

    fetchSong();
  }, [searchParams]);

  // Resume playback when modal closes
  useEffect(() => {
    if (!showSongMeaning && !showSpeedModal && !showLanguageModal) {
      const timer = setTimeout(() => {
        setPlaying(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showSongMeaning, showSpeedModal, showLanguageModal]);

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-black text-white items-center justify-center">
        <div className="text-lg">Loading song data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen bg-black text-white items-center justify-center px-4">
        <div className="text-lg text-red-400 mb-2">Error</div>
        <div className="text-sm text-gray-400 text-center">{error}</div>
      </div>
    );
  }

  if (!youtubeId || phrases.length === 0) {
    return (
      <div className="flex flex-col h-screen bg-black text-white items-center justify-center px-4">
        <div className="text-lg text-gray-400">No song data available</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      {/* Header Controls */}
      <div className="flex flex-row justify-between items-center mx-2.5 gap-2 flex-wrap sm:flex-nowrap shrink-0 py-2">
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
          videoId={youtubeId} 
          playing={playing}
          playbackRate={videoSpeed}
          onStateChange={onChangeState}
          onTimeUpdate={setElapsed}
        />
      </div>
      <div className="px-2.5 shrink-0">
        <CurrentPhrase phrase={currentPhrase} wordTranslations={wordTranslations} />
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

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex flex-col h-screen bg-black text-white items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    }>
      <LearnPage />
    </Suspense>
  );
}
