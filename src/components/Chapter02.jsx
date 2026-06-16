import { useEffect, useRef, useState } from 'react';

const disciplines = [
  ['01', 'Estructura'],
  ['02', 'Arquitectura'],
  ['03', 'Hidrosanitaria'],
  ['04', 'HVAC'],
  ['05', 'Eléctrica'],
];

// Per-stage captions (ported from the original sticky-sequence script).
const captions = [
  'Esqueleto estructural — cimentación, columnas, trabes y las losas de mezzanine / azotea a +3.94 m y +7.87 m.',
  'Intención arquitectónica — envolvente, muros divisorios, circulación vertical y acabados resueltos a LOD 350.',
  'Sistemas MEP — instalaciones hidrosanitarias, protección contra incendios, HVAC y eléctricas trazadas y coordinadas en 3D.',
  'Detección de interferencias — todos los conflictos entre disciplinas identificados y resueltos en Navisworks antes de llegar a obra.',
  'Modelo federado — todas las disciplinas integradas en un único gemelo digital coordinado.',
];

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

// Ch02 · Gemelo Digital — scroll-scrubbed discipline-sequence video.
// A tall (1000vh) section pins a 100vh stage; scroll progress 0→1 drives
// video.currentTime, scrubbing the whole clip instead of looping it.
export default function Chapter02() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const durationRef = useRef(0);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let ticking = false;

    const update = () => {
      const dur = durationRef.current;
      const rect = section.getBoundingClientRect();
      const distance = section.offsetHeight - window.innerHeight;
      const progress = distance <= 0 ? 0 : clamp(-rect.top / distance, 0, 1);

      // Scrub the video. Skip tiny deltas to avoid seek thrashing.
      if (dur) {
        const t = progress * dur;
        if (Math.abs(video.currentTime - t) > 0.03) {
          try { video.currentTime = t; } catch (_) { /* not seekable yet */ }
        }
      }

      if (progressRef.current) progressRef.current.style.width = progress * 100 + '%';

      const n = disciplines.length;
      const next = progress >= 1 ? n - 1 : Math.min(n - 1, Math.floor(progress * n));
      setIdx((prev) => (prev === next ? prev : next));

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const onMeta = () => {
      durationRef.current = video.duration || 0;
      video.pause();
      update();
    };

    video.addEventListener('loadedmetadata', onMeta);
    if (video.readyState >= 1) onMeta();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      video.removeEventListener('loadedmetadata', onMeta);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="chapter" id="ch02">
      <div className="wrap chapter-pad" style={{ paddingBottom: 'clamp(40px,8vh,90px)' }}>
        <div className="chapter-head">
          <div className="ch-index" data-reveal>
            <span className="ch-num">Capítulo 02</span>
            <span className="ch-kicker">Del Edificio al Gemelo Digital</span>
          </div>
          <h2 className="display" data-reveal style={{ '--d': '120ms' }}>El modelo se ensambla, <em>capa por capa.</em></h2>
          <p className="lead" data-reveal style={{ '--d': '220ms' }}>Desliza para ver el edificio levantarse — de un volumen abstracto a un gemelo digital federado y multidisciplinario.</p>
        </div>
      </div>

      {/* Tall scroll track — pins the stage and scrubs the video across 2000vh. */}
      <div className="seq" ref={sectionRef} style={{ height: '2000vh' }}>
        <div className="seq-sticky">
          <div className="seq-stage">
            <video
              ref={videoRef}
              id="ch02-video" muted playsInline preload="auto"
              src="uploads/videos/ch02-secuencia/ch02-secuencia-disciplinas.mp4"
              style={{ width: '100%', height: '100%', objectFit: 'cover', background: '#0a0a0a', display: 'block', pointerEvents: 'none' }}
            />
          </div>
          <div className="seq-overlay">
            <div className="wrap">
              <div className="seq-step-num">PASO {String(idx + 1).padStart(2, '0')} / {String(disciplines.length).padStart(2, '0')}</div>
              <div className="seq-stages-list">
                {disciplines.map(([n, label], i) => (
                  <div className={'seq-stage-item' + (i === idx ? ' on' : i < idx ? ' done' : '')} key={n}>
                    <span className="si-n">{n}</span> {label}
                  </div>
                ))}
              </div>
              <p className="seq-caption">{captions[idx]}</p>
            </div>
          </div>
          <div className="seq-progress"><i ref={progressRef} /></div>
        </div>
      </div>
    </section>
  );
}
