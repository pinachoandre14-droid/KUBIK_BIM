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

// Ch02 · Gemelo Digital — canvas scroll-scrub of the discipline-sequence video.
// A tall sticky section maps scroll progress 0→1 to video.currentTime; each
// settled frame (on 'seeked') is drawn to a <canvas> cover-fit. Drawing decoded
// frames to canvas avoids the stale/black-frame snapping of element scrubbing.
export default function Chapter02() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const durationRef = useRef(0);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!section || !canvas || !video) return;
    const ctx = canvas.getContext('2d');

    let target = 0;
    let seeking = false;
    let ticking = false;

    const draw = () => {
      if (!video.videoWidth) return;
      const cw = canvas.width, ch = canvas.height;
      const vw = video.videoWidth, vh = video.videoHeight;
      const scale = Math.max(cw / vw, ch / vh); // cover
      const w = vw * scale, h = vh * scale;
      ctx.drawImage(video, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      draw();
    };

    // After a seek settles, paint it — then chase the target if scroll moved on.
    const onSeeked = () => {
      draw();
      const dur = durationRef.current;
      if (dur && Math.abs(video.currentTime - target) > 0.05) {
        seeking = true;
        try { video.currentTime = target; } catch (_) { seeking = false; }
      } else {
        seeking = false;
      }
    };

    const update = () => {
      ticking = false;
      const dur = durationRef.current;
      const rect = section.getBoundingClientRect();
      const distance = section.offsetHeight - window.innerHeight;
      const progress = distance <= 0 ? 0 : clamp(-rect.top / distance, 0, 1);

      if (progressRef.current) progressRef.current.style.width = progress * 100 + '%';

      const n = disciplines.length;
      const next = progress >= 1 ? n - 1 : Math.min(n - 1, Math.floor(progress * n));
      setIdx((prev) => (prev === next ? prev : next));

      if (dur) {
        target = progress * dur;
        if (!seeking && Math.abs(video.currentTime - target) > 0.01) {
          seeking = true;
          try { video.currentTime = target; } catch (_) { seeking = false; }
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    const onResize = () => { sizeCanvas(); onScroll(); };
    const onMeta = () => {
      durationRef.current = video.duration || 0;
      // iOS Safari won't decode any frames until playback has started at
      // least once — silently warm it up, then pause immediately. Muted
      // playback is allowed without a user gesture.
      const playPromise = video.play();
      if (playPromise && playPromise.then) {
        playPromise.then(() => video.pause()).catch(() => video.pause());
      } else {
        video.pause();
      }
      sizeCanvas();
      update();
    };

    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('loadeddata', draw);
    video.addEventListener('seeked', onSeeked);
    if (video.readyState >= 1) onMeta();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('loadeddata', draw);
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
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

      {/* Tall scroll track — pins the canvas stage and scrubs across 450vh. */}
      <div className="seq" ref={sectionRef} style={{ height: '450vh' }}>
        <div className="seq-sticky">
          <div className="seq-stage">
            {/* Hidden source video — decoded frames are drawn to the canvas.
                Kept at full size (not 0x0) and opacity:0: iOS Safari skips
                decoding zero-size video elements, so this needs real
                dimensions to actually buffer/seek frames. */}
            <video
              ref={videoRef}
              id="ch02-video" muted playsInline preload="auto"
              src="uploads/videos/ch02-secuencia/ch02-secuencia-disciplinas.mp4"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, pointerEvents: 'none', zIndex: 0 }}
            />
            <canvas ref={canvasRef} style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', display: 'block', background: '#0a0a0a' }} />
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
