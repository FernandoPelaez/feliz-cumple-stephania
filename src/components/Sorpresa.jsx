import React, { useEffect, useState, useRef } from 'react';
import './Sorpresa.css';
import { useNavigate } from 'react-router-dom';
import { Fireworks } from 'fireworks-js';

export default function Sorpresa() {
  const [contador, setContador] = useState(null);
  const [mostrarVamos, setMostrarVamos] = useState(false);
  const [mostrarBoom, setMostrarBoom] = useState(true);
  const [boomList, setBoomList] = useState([]);
  const [mostrarFuegos, setMostrarFuegos] = useState(true);
  const [globos, setGlobos] = useState([]);
  const [mostrarPastel, setMostrarPastel] = useState(true);
  const [tituloAnimado, setTituloAnimado] = useState('');
  const [mostrarMensajeFinal, setMostrarMensajeFinal] = useState(false);
  const navigate = useNavigate();
  const fireworksRef = useRef(null);

  useEffect(() => {
    const titulo = '¡Cierra los ojos y pide un deseo!';
    let i = 0;
    const intervalo = setInterval(() => {
      setTituloAnimado(titulo.slice(0, i));
      i++;
      if (i > titulo.length) clearInterval(intervalo);
    }, 80);
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    const nuevosBooms = Array.from({ length: 6 }).map(() => ({
      top: Math.random() * 80 + 10 + '%',
      left: Math.random() * 80 + 10 + '%',
      id: crypto.randomUUID(),
    }));
    setBoomList(nuevosBooms);

    const boomTimeout = setTimeout(() => {
      setMostrarBoom(false);

      const container = document.querySelector('.sorpresa');
      fireworksRef.current = new Fireworks(container, {
        hue: { min: 0, max: 360 },
        delay: { min: 15, max: 30 },
        speed: 3,
        acceleration: 1.05,
        friction: 0.95,
        gravity: 1.5,
        particles: 75,
        trace: 3,
        explosion: 5,
        autoresize: true,
        brightness: {
          min: 50,
          max: 80,
          decay: { min: 0.015, max: 0.03 },
        },
        boundaries: {
          top: 50,
          bottom: container.clientHeight,
          left: 50,
          right: container.clientWidth,
        },
        sound: { enable: false },
      });
      fireworksRef.current.start();

      const secuencia = [3, 2, 1, 0];
      let i = 0;
      setContador(secuencia[i]);
      const interval = setInterval(() => {
        i++;
        if (i < secuencia.length) {
          setContador(secuencia[i]);
        } else {
          clearInterval(interval);
        }
      }, 1500);
    }, 2500);

    return () => {
      clearTimeout(boomTimeout);
      if (fireworksRef.current) {
        fireworksRef.current.stop();
        fireworksRef.current.clear();
      }
    };
  }, []);

  useEffect(() => {
    if (contador === 0) {
      setMostrarVamos(true);
      setTimeout(() => {
        setMostrarFuegos(false);
        setMostrarVamos(false);
        if (fireworksRef.current) {
          fireworksRef.current.stop();
          fireworksRef.current.clear();
        }

        const mensajesGlobos = [
          { texto: "Consentida 💖", color: "#ff9eb5" },
          { texto: "Traviesa 😏", color: "#ffb74d" },
          { texto: "Risueña 😊", color: "#fff176" },
          { texto: "Dulzura 🍯", color: "#ffcc80" },
          { texto: "Encantadora ✨", color: "#ce93d8" },
          { texto: "Bonita 💕", color: "#f48fb1" },
          { texto: "Rayito 🌞", color: "#ffd54f" },
          { texto: "Tiernita 🥺", color: "#b39ddb" },
          { texto: "Chispa ⚡", color: "#80deea" }
        ];

        const nuevosGlobos = Array.from({ length: 12 }).map(() => {
          const mensajeAleatorio = mensajesGlobos[Math.floor(Math.random() * mensajesGlobos.length)];
          return {
            id: crypto.randomUUID(),
            left: Math.random() * 85 + '%',
            delay: Math.random() * 5 + 's',
            duration: Math.random() * 3 + 6,
            texto: mensajeAleatorio.texto,
            color: mensajeAleatorio.color
          };
        });
        setGlobos(nuevosGlobos);

        setTimeout(() => {
          setMostrarPastel(false);
          setGlobos([]);
          setMostrarMensajeFinal(true);
        }, 10000);
      }, 3000);
    }
  }, [contador]);

  const colores = ['rojo', 'azul', 'amarillo', 'verde', 'morado', 'rosa'];
  const banderas = Array.from({ length: 20 }).map((_, i) => colores[i % colores.length]);

  return (
    <div className="sorpresa">
      {!mostrarMensajeFinal && (
        <h1 className="mensaje titulo-animado">{tituloAnimado}</h1>
      )}

      <div className="guirnaldas">
        {banderas.map((color, index) => (
          <span key={index} className={`bandera ${color}`} />
        ))}
      </div>

      {!mostrarMensajeFinal && globos.map((globo) => (
        <div
          key={globo.id}
          className="globo-decorado"
          style={{
            left: globo.left,
            animationDelay: globo.delay,
            animationDuration: `${globo.duration}s`
          }}
        >
          <div
            className="globo-cuerpo"
            style={{ backgroundColor: globo.color }}
          >
            <div className="globo-texto-nombre">{globo.texto.split(' ')[0]}</div>
            <div className="globo-texto-emoji">{globo.texto.split(' ')[1]}</div>
          </div>
          <div className="globo-cuerda"></div>
        </div>
      ))}

      {contador === null && <p className="texto aparecer-centro">Prepárate... 🙈</p>}

      {contador !== null && contador > 0 && (
        <div className="numero-central" key={contador}>
          <span>{contador}</span>
        </div>
      )}

      {mostrarVamos && (
        <div className="numero-central" key="go"></div>
      )}

      {mostrarBoom &&
        boomList.map((boom) => (
          <div
            key={boom.id}
            className="boom-texto aleatorio"
            style={{ top: boom.top, left: boom.left }}
          >
            🎇 ¡Boom! 🎉
          </div>
        ))}

      {contador === 0 && mostrarPastel && (
        <div className="contenido-final" style={{ marginTop: '6rem' }}>
          <div className="pastel-animado">
            <div className="plato"></div>
            <div className="capa-inferior"></div>
            <div className="capa-superior"></div>
            <div className="velas">
              <div className="vela"><span className="flama delay-1"></span></div>
              <div className="vela"><span className="flama delay-2"></span></div>
              <div className="vela"><span className="flama delay-3"></span></div>
            </div>
          </div>
        </div>
      )}

        {mostrarMensajeFinal && (
          <div className="mensaje-final">
            <div className="constelacion">Stephania</div>
            <div className="emoji-linea">⭐ ✨ 💫 🌟 ✨ 💫 🌙 ⭐ ✨</div>

            <p className="mensaje-texto">
              Tu nombre debería estar en el cielo...<br />
              ...porque desde que llegaste, todo brilla diferente ✨🌌<br /><br />
              Gracias por existir, por ser tú, por ser magia.<br />
              Este rincón digital siempre va a esperarte,<br />
              como yo, con una sonrisa y un millón de razones para celebrarte.<br /><br />
              Con cariño eterno,<br />
              <strong>Fer 💗</strong>
            </p>
          </div>
        )}

      {!mostrarFuegos && (
        <style>{`.fireworks-canvas { display: none !important; }`}</style>
      )}
    </div>
  );
}
