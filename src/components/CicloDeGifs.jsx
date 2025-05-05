import React, { useEffect, useState } from 'react';
import gif1 from '../assets/gif1.gif';
import gif2 from '../assets/gif2.gif';
import gif3 from '../assets/gif3.gif';
import gif3 from '../assets/gif4.gif';
import gif3 from '../assets/gif5.gif';
import gif3 from '../assets/gif6.gif';


export default function CicloDeGifs() {
  const gifs = [gif1, gif2, gif3];
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
