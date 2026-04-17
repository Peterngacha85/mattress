import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause, Play, SkipForward, SkipBack } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './FloatingAudio.css';

const FloatingAudio = () => {
  const { settings } = useAppContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  const tracks = settings?.audioTracks || [];

  // Attempt to play on mount (or when tracks load)
  useEffect(() => {
    if (tracks.length > 0) {
      const playAudio = async () => {
        try {
          await audioRef.current?.play();
          setIsPlaying(true);
        } catch (e) {
          console.log("Autoplay blocked, waiting for interaction...");
        }
      };

      playAudio();

      // Robust Fallback: Start audio on any common interaction
      const handleInteraction = () => {
        playAudio();
        // Remove all listeners once interaction happens
        ['click', 'touchstart', 'mousedown', 'keydown', 'scroll'].forEach(event => {
          window.removeEventListener(event, handleInteraction);
        });
      };

      ['click', 'touchstart', 'mousedown', 'keydown', 'scroll'].forEach(event => {
        window.addEventListener(event, handleInteraction, { once: true });
      });

      return () => {
        ['click', 'touchstart', 'mousedown', 'keydown', 'scroll'].forEach(event => {
          window.removeEventListener(event, handleInteraction);
        });
      };
    }
  }, [tracks]);

  // Handle track changes
  useEffect(() => {
    if (tracks.length > 0 && isPlaying) {
      audioRef.current?.play().catch(e => console.log("Audio play failed:", e));
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  if (tracks.length === 0) return null;

  return (
    <div className="floating-audio">
      <audio 
        ref={audioRef} 
        src={tracks[currentTrackIndex]?.url} 
        onEnded={nextTrack}
      />
      
      <div className={`audio-controls ${isPlaying ? 'active' : ''}`}>
        <button onClick={prevTrack} className="audio-btn small"><SkipBack size={16} /></button>
        <button onClick={togglePlay} className="audio-btn main">
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button onClick={nextTrack} className="audio-btn small"><SkipForward size={16} /></button>
      </div>

      <div className={`music-icon ${isPlaying ? 'pulse' : ''}`} onClick={togglePlay}>
        <Music size={24} />
      </div>
    </div>
  );
};

export default FloatingAudio;
