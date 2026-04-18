import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import './FloatingAudio.css';

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="none">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="none">
    <rect x="6" y="4" width="4" height="16"/>
    <rect x="14" y="4" width="4" height="16"/>
  </svg>
);

const FloatingAudio = () => {
  const { settings } = useAppContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Use only the first available track (no looping through multiple)
  const track = settings?.audioTracks?.[0];

  // Attempt to autoplay on first user interaction
  useEffect(() => {
    if (!track) return;

    const playAudio = async () => {
      if (isPlaying) return;
      try {
        await audioRef.current?.play();
        setIsPlaying(true);
        cleanupListeners();
      } catch (e) {
        console.log("Autoplay blocked, waiting for interaction...");
      }
    };

    const cleanupListeners = () => {
      ['click', 'touchstart', 'keyup'].forEach(event => {
        window.removeEventListener(event, handleInteraction);
      });
    };

    const handleInteraction = () => {
      playAudio();
    };

    // Initial attempt
    playAudio();

    // Fallback: Start audio on hard interaction
    ['click', 'touchstart', 'keyup'].forEach(event => {
      window.addEventListener(event, handleInteraction);
    });

    return () => cleanupListeners();
  }, [track, isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!track) return null;

  return (
    <div className="floating-audio">
      <audio 
        ref={audioRef} 
        src={track.url} 
        loop
      />
      
      <button 
        className={`audio-play-btn ${isPlaying ? 'playing' : ''}`} 
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
};

export default FloatingAudio;
