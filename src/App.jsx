import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { useNavigate, useOutletContext } from 'react-router-dom';
import confetti from 'canvas-confetti';

export default function App() {
  const navigate = useNavigate();
  const { toggleMusic, play } = useOutletContext();

  const titulo = '🎀 ¡Feliz Cumpleaños, Stephania! 🎂💖';
  const [tituloAnimado, setTituloAnimado] = useState('');
  
  const gifs = [
    'assets/gif1.gif',
    'assets/gif2.gif',
    'assets/gif3.gif',
    'assets/gif4.gif',
    'assets/gif5.gif',
    'assets/gif6.gif',
  ];
  const [indiceGif, setIndiceGif] = useState(0);

  useEffect(() => {
    const shootConfetti = () => {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#00ff00', '#0000ff'],
      });
    };

    shootConfetti();
    const timer1 = setTimeout(shootConfetti, 1000);
    const timer2 = setTimeout(shootConfetti, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndiceGif((prev) => (prev + 1) % gifs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fullMessage = `Felicidades a la niña más hermosa y chipilona. 
Hoy no solo celebras un año más, celebras todo lo que has crecido,
lo que has superado y lo mucho que has brillado sin darte cuenta.
Tienes esa forma tan tuya de hacer que todo se sienta más bonito, más ligero, más real.
Eres fuerte, incluso cuando dudas; dulce, incluso cuando estás seria; y valiente, aunque a veces no lo notes. 
Deseo que este nuevo año te traiga momentos que te hagan reír hasta que te duela la panza, personas que te abracen con acciones y no con promesas, y días tan bonitos como tú.
Que nunca te falte cariño del bueno, tranquilidad en el alma y motivos para ser feliz. 🎂💖🌷✨.`;

  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTituloAnimado(titulo.slice(0, i));
      i++;
      if (i > titulo.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullMessage.slice(0, index));
      index++;
      if (index > fullMessage.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const goToSurprise = () => {
    navigate('/sorpresa');
  };

  const floatingElements = useMemo(
    () =>
      [...Array(40)].map((_, i) => {
        const elements = ['🎈', '🎊', '🥳', '🎁', '✨', '🪄', '🎉'];
        const emoji = elements[Math.floor(Math.random() * elements.length)];
        const randomLeft = `${Math.random() * 100}%`;
        const randomSize = `${1 + Math.random() * 2}rem`;
        const animationDuration = `${6 + Math.random() * 4}s`;
        const animationDelay = `${Math.random() * 4}s`;
        const randomX = `${(Math.random() - 0.5) * 40}px`;
        const randomRotate = `${Math.random() * 360}deg`;

        return (
          <span
            key={i}
            className="float-balloon"
            style={{
              '--random-left': randomLeft,
              '--random-size': randomSize,
              '--animation-duration': animationDuration,
              '--animation-delay': animationDelay,
              '--random-x-movement': randomX,
              '--random-rotate': randomRotate,
            }}
          >
            {emoji}
          </span>
        );
      }),
    []
  );

  return (
    <div className="app">
      <div className="content">
        <h1 className="title neon">{tituloAnimado}</h1>

        <div className="message-text">{displayedText}</div>

        {/* Contenedor de GIF dinámico */}
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <img
            src={gifs[indiceGif]}
            alt={`gif ${indiceGif + 1}`}
            style={{
              maxWidth: '250px',
              borderRadius: '20px',
              boxShadow: '0 0 10px rgba(0,0,0,0.2)',
              transition: 'opacity 0.5s ease-in-out',
            }}
          />
        </div>

        <div className="buttons">
          <button
            className="btn-music"
            onClick={() => {
              console.log('🎵 Se hizo clic en el botón de música');
              toggleMusic();
            }}
            aria-label={play ? 'Pausar música' : 'Reproducir música'}
          >
            {play ? '🔇 Detener música' : '🎵 Reproducir música'}
          </button>

          <button
            className="btn-sorpresa"
            onClick={goToSurprise}
            aria-label="Abrir regalo sorpresa"
          >
            🎁 Presiona aquí
          </button>
        </div>
      </div>

      <div className="emoji-container">{floatingElements}</div>
    </div>
  );
}
