import React, { useEffect, useState } from 'react';

export default function CicloDeGifs() {
  const gifs = [
    '/assets/gif1.gif',
    '/assets/gif2.gif',
    '/assets/gif3.gif',
    '/assets/gif4.gif',
    '/assets/gif5.gif',
    '/assets/gif6.gif',
  ];
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice(prev => (prev + 1) % gifs.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <img
        src={gifs[indice]}
        alt={`Gif ${indice + 1}`}
        style={{ maxWidth: '300px', borderRadius: '20px' }}
      />
    </div>
  );
}
