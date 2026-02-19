'use client';

import Image from 'next/image';
import FeatureScreenshot from '@/components/feature-screenshot';
import FeatureVideo from '@/components/feature-video';
import DeviceFrame from '@/components/device-frame';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="w-full px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <span className="relative h-10 w-10 shrink-0">
              <Image
                src="/logo.png"
                alt="SayKili.ai"
                fill
                className="object-contain"
              />
            </span>
            <span className="text-lg font-semibold text-black">SayKili.ai</span>
          </a>
        </div>
      </header>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto text-center space-y-8 sm:space-y-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Learn Tamil in Real Situations 🎯
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-black/70 max-w-2xl mx-auto">
            Master phrases through scenarios—greetings, food, family, travel, and more. Listen, speak, and translate your way to fluency.
          </p>
          {/* Main Hero - Learn this word demo */}
          <div className="relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] mx-auto mt-8 sm:mt-12">
            <DeviceFrame className="w-full">
              <FeatureVideo
                src="/screenshots/feature-1.mp4"
                alt="Learn this word screen: Good morning with Kaalai, Vanakkam, Listen to phrase, Hold to speak"
                playbackRate={1.25}
              />
            </DeviceFrame>
          </div>
          <div className="pt-4 sm:pt-6 w-full max-w-md mx-auto">
            <a
              href="https://testflight.apple.com/join/Z7WynQCu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 min-h-[56px] px-8 py-4 rounded-xl bg-black text-white text-lg font-medium hover:opacity-90 transition-opacity border border-[#86868b] w-full sm:w-auto"
              aria-label="Download on TestFlight"
            >
              <svg className="h-7 w-7 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span>Download on TestFlight</span>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto space-y-24 sm:space-y-32 md:space-y-40">
          {/* Feature 1: Translate phrase (bumped up) */}
          <div className="flex flex-col lg:flex-row items-center gap-12 sm:gap-16 lg:gap-20">
            <div className="flex-1 order-2 lg:order-1">
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  Translate & Practice ⏱️
                </h2>
                <p className="text-base sm:text-lg text-black/70 leading-relaxed">
                  Test yourself by translating phrases. See a phrase like “Good morning” and respond with the Tamil translation. 
                  Use “Show Hint” when you need a nudge, and hold to speak your answer for natural, voice-first practice.
                </p>
              </div>
            </div>
            <div className="flex-1 order-1 lg:order-2 w-full">
              <div className="relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] mx-auto">
                <DeviceFrame className="w-full">
                  <FeatureVideo
                    src="/screenshots/feature-2.mp4"
                    alt="Translate this phrase screen with Show Hint and Hold to speak"
                    playbackRate={1.5}
                  />
                </DeviceFrame>
              </div>
            </div>
          </div>

          {/* Feature 2: Scenarios (hero.png) */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 sm:gap-16 lg:gap-20">
            <div className="flex-1 order-2 lg:order-2">
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  Learn in real-world scenarios 🪄
                </h2>
                <p className="text-base sm:text-lg text-black/70 leading-relaxed">
                  Choose from scenarios like Greetings, Question Words, Food Convos, Family, 
                  Introducing Yourself, and Travel. Each scenario has bite-sized lessons with clear progress.
                </p>
                <p className="text-base sm:text-lg text-black/70 leading-relaxed">
                  Unlock new scenarios as you go and track your progress (e.g. 5/5, 3/5) so you always know where you stand.
                </p>
              </div>
            </div>
            <div className="flex-1 order-1 lg:order-1 w-full">
              <div className="relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] mx-auto">
                <DeviceFrame className="w-full">
                  <FeatureScreenshot
                    src="/screenshots/hero.png"
                    alt="SayKili app - Scenarios: Greetings, Question Words, Food Convos, Family, and more"
                  />
                </DeviceFrame>
              </div>
            </div>
          </div>

          {/* Feature 3: Learn phrases */}
          <div className="flex flex-col lg:flex-row items-center gap-12 sm:gap-16 lg:gap-20">
            <div className="flex-1 order-2 lg:order-1">
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  Learn Every Word ✨
                </h2>
                <p className="text-base sm:text-lg text-black/70 leading-relaxed">
                  Each phrase is broken down so you see the Tamil words, their meanings, and how they fit together. 
                  Learn phrases like &ldquo;Good morning&rdquo; with &ldquo;Kaalai&rdquo; (Morning) and &ldquo;Vanakkam&rdquo; (Hello) at a glance.
                </p>
                <p className="text-base sm:text-lg text-black/70 leading-relaxed">
                  Listen to the phrase with one tap, then hold to speak and practice your pronunciation. 
                  Build your vocabulary and confidence in real conversations.
                </p>
              </div>
            </div>
            <div className="flex-1 order-1 lg:order-2 w-full">
              <div className="relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] mx-auto">
                <DeviceFrame className="w-full">
                  <FeatureScreenshot
                    src="/screenshots/feature-1.png"
                    alt="Learn this word screen: Good morning with Kaalai, Vanakkam, Listen to phrase, Hold to speak"
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
            Join thousands of learners mastering Tamil through scenarios—listen, speak, and translate your way to fluency.
            Start your journey today.
          </p>
          <div className="pt-4 sm:pt-6">
            <a
              href="https://testflight.apple.com/join/Z7WynQCu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 min-h-[56px] px-8 py-4 rounded-xl bg-black text-white text-lg font-medium hover:opacity-90 transition-opacity border border-[#86868b]"
              aria-label="Download on TestFlight"
            >
              <svg className="h-7 w-7 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span>Download on TestFlight</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
