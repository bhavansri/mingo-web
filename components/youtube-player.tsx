'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube';

interface YoutubePlayerProps {
  videoId: string;
  playing?: boolean;
  playbackRate?: number;
  onStateChange?: (state: string) => void;
  onTimeUpdate?: (time: number) => void;
}

export interface YoutubePlayerRef {
  seekTo: (time: number) => void;
}

const YoutubePlayerComponent = forwardRef<YoutubePlayerRef, YoutubePlayerProps>(
  ({ videoId, playing = false, playbackRate = 1.0, onStateChange, onTimeUpdate }, ref) => {
    const playerRef = useRef<any>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [playerHeight, setPlayerHeight] = useState(200);

    useImperativeHandle(ref, () => ({
      seekTo: (time: number) => {
        if (playerRef.current) {
          playerRef.current.seekTo(time / 1000, true); // Convert milliseconds to seconds
        }
      },
    }));

    // Update player height based on screen size
    useEffect(() => {
      const updateHeight = () => {
        // Mobile: 200px, Tablet and up: 400px
        const height = window.innerWidth >= 768 ? 400 : 200;
        setPlayerHeight(height);
      };

      // Set initial height
      updateHeight();

      // Update on resize
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }, []);

    const opts: YouTubeProps['opts'] = {
      height: playerHeight.toString(),
      width: '100%',
      playerVars: {
        autoplay: 0,
        controls: 1,
        rel: 0,
        modestbranding: 1,
      },
    };

    const handleReady: YouTubeProps['onReady'] = (event: YouTubeEvent<any>) => {
      playerRef.current = event.target;
      setIsReady(true);
      
      // Set playback rate when player is ready (only on initial load)
      // This works reliably when set before the video starts playing
      if (event.target) {
        try {
          event.target.setPlaybackRate(playbackRate);
        } catch (error) {
          console.error('Error setting initial playback rate:', error);
        }
      }
      
      // Get initial time when player is ready
      if (event.target && onTimeUpdate) {
        try {
          const timeResult = event.target.getCurrentTime();
          if (timeResult && typeof timeResult.then === 'function') {
            // It's a Promise
            timeResult.then((time: number) => {
              if (time !== undefined && !isNaN(time)) {
                onTimeUpdate(Math.floor(time * 1000));
              }
            }).catch((error: any) => {
              console.error('Error getting initial time:', error);
            });
          } else if (typeof timeResult === 'number') {
            // It's a number directly
            if (timeResult !== undefined && !isNaN(timeResult)) {
              onTimeUpdate(Math.floor(timeResult * 1000));
            }
          }
        } catch (error) {
          // Silently handle errors
        }
      }
    };

    const handleStateChange: YouTubeProps['onStateChange'] = (event: YouTubeEvent<any>) => {
      const state = event.data;
      if (onStateChange) {
        if (state === -1) {
          // Unstarted
        } else if (state === 0) {
          onStateChange('ended');
        } else if (state === 2) {
          onStateChange('paused');
          // Update time when paused to ensure phrase is shown
          if (playerRef.current && onTimeUpdate) {
            try {
              const timeResult = playerRef.current.getCurrentTime();
              if (timeResult && typeof timeResult.then === 'function') {
                // It's a Promise
                timeResult.then((time: number) => {
                  if (time !== undefined && !isNaN(time)) {
                    onTimeUpdate(Math.floor(time * 1000));
                  }
                }).catch(() => {});
              } else if (typeof timeResult === 'number') {
                // It's a number directly
                if (timeResult !== undefined && !isNaN(timeResult)) {
                  onTimeUpdate(Math.floor(timeResult * 1000));
                }
              }
            } catch (error) {
              // Silently handle errors
            }
          }
        } else if (state === 1) {
          onStateChange('playing');
        }
      }
    };

    useEffect(() => {
      if (!playerRef.current) return;

      if (playing) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }, [playing]);

    useEffect(() => {
      // Track time continuously once player is ready, not just when playing
      // This ensures we can show the current phrase even when paused
      if (!isReady || !playerRef.current || !onTimeUpdate) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return;
      }

      // Get initial time when player is ready
      const updateTime = async () => {
        if (playerRef.current) {
          try {
            const timeResult = playerRef.current.getCurrentTime();
            let currentTime: number;
            
            if (timeResult && typeof timeResult.then === 'function') {
              // It's a Promise
              currentTime = await timeResult;
            } else if (typeof timeResult === 'number') {
              // It's a number directly
              currentTime = timeResult;
            } else {
              return;
            }
            
            if (currentTime !== undefined && !isNaN(currentTime)) {
              onTimeUpdate(Math.floor(currentTime * 1000)); // Convert to milliseconds
            }
          } catch (error) {
            // Silently handle errors (player might not be ready yet)
          }
        }
      };

      // Update immediately
      updateTime();

      // Then update every 100ms
      intervalRef.current = setInterval(updateTime, 100);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }, [isReady, onTimeUpdate]);

    return (
      <div className="w-full">
        <div className="w-full max-w-full">
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={handleReady}
            onStateChange={handleStateChange}
            className="w-full"
          />
        </div>
      </div>
    );
  }
);

YoutubePlayerComponent.displayName = 'YoutubePlayerComponent';

export default YoutubePlayerComponent;

