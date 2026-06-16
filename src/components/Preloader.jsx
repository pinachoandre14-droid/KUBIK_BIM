import { useEffect, useRef, useState } from 'react';

/* Preloader — animated 000→100 counter + progress bar, then slide away.
   Locks body scroll while loading and unlocks on completion. */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [width, setWidth] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  const finishedRef = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.classList.add('is-locked');
    const dur = reduce ? 350 : 1700;
    const start = performance.now();
    let closed = false;
    let raf;

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      onDone?.();
    };

    const close = () => {
      if (closed) return;
      closed = true;
      clearTimeout(hardClose);
      setCount(100);
      setWidth(100);
      setDone(true);
      document.body.classList.remove('is-locked');
      finish();
      setTimeout(() => setGone(true), 1200);
    };

    const tick = (t) => {
      if (closed) return;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      setWidth(eased * 100);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(close, 320);
    };
    raf = requestAnimationFrame(tick);

    // Hard fallback: rAF is throttled in background tabs.
    const hardClose = setTimeout(close, dur + 1400);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hardClose);
      document.body.classList.remove('is-locked');
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <div className={'preloader' + (done ? ' done' : '')}>
      <div className="pl-mark"><span>KUBIK&nbsp;STUDIO</span></div>
      <div className="pl-line"><i style={{ width: width + '%' }} /></div>
      <div className="pl-sub">
        <span>Cargando el gemelo digital</span>
        <span className="pl-count">{String(count).padStart(3, '0')}</span>
      </div>
    </div>
  );
}
