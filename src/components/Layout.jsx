import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const audioRef = useRef(null);
  const [play, setPlay] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    const isPaused = audioRef.current.paused;

    if (isPaused) {
      audioRef.current.play()
        .then(() => setPlay(true))
        .catch((err) => {
          console.warn('Autoplay bloqueado o error al reproducir:', err);
        });
    } else {
      audioRef.current.pause();
      setPlay(false);
    }
  };

  useEffect(() => {
    const tryAutoPlay = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => setPlay(true))
          .catch(() => {
            console.warn('Autoplay bloqueado, esperando interacción del usuario.');
          });
      }
    };

    tryAutoPlay();

    const handleFirstUserInteraction = () => {
      tryAutoPlay();
      window.removeEventListener('click', handleFirstUserInteraction);
    };

    window.addEventListener('click', handleFirstUserInteraction);

    return () => {
      window.removeEventListener('click', handleFirstUserInteraction);
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}assets/birthday-song.mp3`}
        loop
        preload="auto"
        playsInline
      />
      <Outlet context={{ toggleMusic, play }} />
    </>
  );
}
