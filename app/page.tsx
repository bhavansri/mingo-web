'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FeatureScreenshot from '@/components/feature-screenshot';
import DeviceFrame from '@/components/device-frame';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const emailSubmitted = localStorage.getItem('emailSubmitted');
    if (emailSubmitted === 'true') {
      // Redirect directly to songs page if email has already been submitted
      router.push('/songs');
    }
  }, [router]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleStartLearning = async () => {
    if (!validateEmail(email)) {
      return;
    }

    // If email hasn't been submitted yet, submit it first
    if (!isSubmitted) {
      setIsSubmitting(true);
      try {
        const { error } = await supabase
          .from('submission')
          .insert([{ email }]);

        if (error) {
          console.error('Error submitting email:', error);
          setIsSubmitting(false);
          return;
        } else {
          setIsSubmitted(true);
          // Store flag in localStorage to remember email submission
          localStorage.setItem('emailSubmitted', 'true');
        }
      } catch (err) {
        console.error('Error submitting email:', err);
        setIsSubmitting(false);
        return;
      } finally {
        setIsSubmitting(false);
      }
    }

    // Navigate to songs page
    router.push('/songs?id=1');
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto text-center space-y-8 sm:space-y-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Learn Tamil Through Music 🤩 🎶
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-black/70 max-w-2xl mx-auto">
            A simple and engaging way to learn Tamil through your favorite songs
          </p>
          {/* Main Hero Image */}
          <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] mx-auto mt-8 sm:mt-12">
            <DeviceFrame className="w-full">
              <FeatureScreenshot
                src="/screenshots/hero.png"
                alt="Mingo - Learn Tamil Through Music app interface"
                priority
              />
            </DeviceFrame>
          </div>
          <div className="pt-4 sm:pt-6 w-full max-w-md mx-auto space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="w-full text-base sm:text-lg px-4 py-3 h-auto border-gray-300 focus:border-[#f12711] focus:ring-[#f12711]"
              required
            />
            <Button 
              onClick={handleStartLearning}
              size="lg" 
              disabled={(!isSubmitted && !validateEmail(email)) || isSubmitting}
              className="bg-linear-to-r from-[#E65100] to-[#FF8F00] text-white hover:opacity-90 text-base sm:text-lg px-10 sm:px-12 py-3 sm:py-4 h-auto rounded-lg font-semibold w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Start Learning for Free'}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto space-y-24 sm:space-y-32 md:space-y-40">
          {/* Feature 1: Synchronized Lyrics */}
          <div className="flex flex-col lg:flex-row items-center gap-12 sm:gap-16 lg:gap-20">
            <div className="flex-1 order-2 lg:order-1">
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  Synchronized Lyrics ✨
                </h2>
                <p className="text-base sm:text-lg text-black/70 leading-relaxed">
                  Watch lyrics highlight in real-time as the music plays. Each phrase is perfectly 
                  synchronized with the song, making it easy to follow along and understand the rhythm 
                  and flow of Tamil language.
                </p>
                <p className="text-base sm:text-lg text-black/70 leading-relaxed">
                  Toggle seamlessly between English translations, Tamil script, and Pronunciation to 
                  understand meaning, recognize Tamil characters, and learn proper pronunciation all at once.
                </p>
              </div>
            </div>
            <div className="flex-1 order-1 lg:order-2 w-full">
              <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] mx-auto">
                <DeviceFrame className="w-full">
                  <FeatureScreenshot
                    src="/screenshots/feature-1.png"
                    alt="Synchronized lyrics feature showing real-time phrase highlighting"
                  />
                </DeviceFrame>
              </div>
            </div>
          </div>

          {/* Feature 2: Speed Control */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 sm:gap-16 lg:gap-20">
            <div className="flex-1 order-2 lg:order-2">
              <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                    Playback Speed Control ⏱️
                  </h2>
                <p className="text-base sm:text-lg text-black/70 leading-relaxed">
                  Adjust playback speed to match your learning level. Slow down to catch every word 
                  and syllable, or speed up as you become more comfortable with the language.
                </p>
              </div>
            </div>
            <div className="flex-1 order-1 lg:order-1 w-full">
              <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] mx-auto">
                <DeviceFrame className="w-full">
                  <FeatureScreenshot
                    src="/screenshots/feature-2.png"
                    alt="Speed Control feature showing adjustable playback speed options"
                  />
                </DeviceFrame>
              </div>
            </div>
          </div>

          {/* Feature 3: AI Summaries */}
          <div className="flex flex-col lg:flex-row items-center gap-12 sm:gap-16 lg:gap-20">
            <div className="flex-1 order-2 lg:order-1">
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  AI-powered Summaries 🪄
                </h2>
                <p className="text-base sm:text-lg text-black/70 leading-relaxed">
                  Get AI-powered summaries that describe the theme, chorus breakdown, and important 
                  metaphors and concepts of each song to assist with your language learning journey.
                </p>
                <p className="text-base sm:text-lg text-black/70 leading-relaxed">
                  Understand the deeper meaning behind the lyrics, cultural context, and poetic devices 
                  used in Tamil music, making your learning experience more meaningful and engaging.
                </p>
              </div>
            </div>
            <div className="flex-1 order-1 lg:order-2 w-full">
              <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] mx-auto">
                <DeviceFrame className="w-full">
                  <FeatureScreenshot
                    src="/screenshots/feature-3.png"
                    alt="AI Summaries feature showing theme, chorus breakdown, and metaphors"
                  />
                </DeviceFrame>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Ready to Start Learning?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-black/70 max-w-2xl mx-auto">
            Join thousands of learners mastering Tamil through the power of music. 
            Start your journey today.
          </p>
          <div className="pt-4 sm:pt-6">
            <Button 
              onClick={handleStartLearning}
              size="lg" 
              disabled={(!isSubmitted && !validateEmail(email)) || isSubmitting}
              className="bg-linear-to-r from-[#E65100] to-[#FF8F00] text-white hover:opacity-90 text-base sm:text-lg px-10 sm:px-12 py-3 sm:py-4 h-auto rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Start Learning for Free'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
