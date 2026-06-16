import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { projects, thumbPath, buildGallery } from '../data/projects.js';

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 5l-7 7 7 7" /></svg>
);
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5l7 7-7 7" /></svg>
);

// Otras Sucursales — drag/swipe carousel + keyboard-navigable lightbox.
export default function Projects() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [idx, setIdx] = useState(0);
  const [trackX, setTrackX] = useState(0);

  // Lightbox state
  const [modalBranch, setModalBranch] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [cur, setCur] = useState(0);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const dragStartX = useRef(0);
  const dragging = useRef(false);

  const go = useCallback((n) => {
    setIdx((prev) => Math.max(0, Math.min(projects.length - 1, n)));
  }, []);

  // Center the active card
  const layout = useCallback(() => {
    const vp = viewportRef.current;
    const card = cardRefs.current[idx];
    if (!vp || !card) return;
    const center = vp.clientWidth / 2 - card.offsetWidth / 2;
    setTrackX(center - card.offsetLeft);
  }, [idx]);

  useLayoutEffect(() => { layout(); }, [layout]);

  useEffect(() => {
    const onResize = () => layout();
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);
    let ro;
    if (window.ResizeObserver && viewportRef.current) {
      ro = new ResizeObserver(() => layout());
      ro.observe(viewportRef.current);
    }
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
      ro?.disconnect();
    };
  }, [layout]);

  // Drag / swipe
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const down = (e) => { dragging.current = true; dragStartX.current = e.clientX; };
    const up = (e) => {
      if (!dragging.current) return;
      dragging.current = false;
      const dx = e.clientX - dragStartX.current;
      if (Math.abs(dx) > 50) go(idx + (dx < 0 ? 1 : -1));
    };
    vp.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    return () => {
      vp.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  }, [idx, go]);

  // Lightbox open/close
  const openModal = (branch, e) => {
    // Ignore if the gesture was a drag
    if (e && Math.abs(e.clientX - dragStartX.current) > 10) return;
    setModalBranch(branch);
    setGallery(buildGallery(branch));
    setCur(0);
  };
  const closeModal = useCallback(() => setModalBranch(null), []);

  const showItem = useCallback((i) => {
    setGallery((g) => {
      if (!g.length) return g;
      setCur((i + g.length) % g.length);
      return g;
    });
  }, []);

  // Body scroll lock + keyboard nav while modal is open
  useEffect(() => {
    if (!modalBranch) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowLeft') setCur((c) => (c - 1 + gallery.length) % gallery.length);
      else if (e.key === 'ArrowRight') setCur((c) => (c + 1) % gallery.length);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [modalBranch, gallery.length, closeModal]);

  useEffect(() => { setMediaLoaded(false); }, [cur, modalBranch]);

  const project = projects.find((p) => p.branch === modalBranch);
  const item = gallery[cur];

  const infoCells = project
    ? [
        ['Ubicada en', project.place],
        ['Superficie', project.area],
        ['Altura', project.height],
        ['Detalle', project.lod],
        ['Año', project.year],
        ['Estado', 'Completado'],
      ]
    : [];

  return (
    <>
      <section className="proj-section" id="proyectos" data-screen-label="Otras Sucursales">
        <div className="grid-lines" data-parallax="0.04" style={{ opacity: 0.4 }} />

        <div className="wrap proj-head" data-reveal>
          <div className="eyebrow">Portafolio · Liverpool Express</div>
          <h2 className="display proj-h2">Otras <em>Sucursales</em></h2>
          <p className="proj-intro">Cinco tiendas Liverpool Express modeladas en BIM LOD 350 — cada una con su contexto, superficie y resolución constructiva. Selecciona una para abrir su galería.</p>
        </div>

        <div className="proj-carousel-viewport" ref={viewportRef}>
          <div className="proj-track" ref={trackRef} style={{ transform: `translateX(${trackX}px)` }}>
            {projects.map((p, i) => (
              <article
                key={p.branch}
                ref={(el) => (cardRefs.current[i] = el)}
                className={'proj-card' + (i === idx ? ' is-active' : '')}
                onClick={(e) => openModal(p.branch, e)}
              >
                <div className="proj-card-media">
                  <span className="proj-card-num">{String(i + 1).padStart(2, '0')} / 05</span>
                  <img src={thumbPath(p.branch)} alt={p.title} loading="lazy" />
                  <div className="proj-card-hover"><span>Ver galería</span></div>
                </div>
                <div className="proj-card-body">
                  <div className="proj-card-loc">{p.loc}</div>
                  <h4 className="proj-card-title">{p.title}</h4>
                  <div className="proj-card-meta"><span>{p.area}</span><span>{p.lod}</span><span>{p.year}</span></div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="wrap proj-controls">
          <div className="proj-dots">
            {projects.map((p, i) => (
              <button key={p.branch} type="button" className={'proj-dot' + (i === idx ? ' is-active' : '')} aria-label={`Ir a sucursal ${i + 1}`} onClick={() => go(i)} />
            ))}
          </div>
          <div className="proj-arrows">
            <button type="button" aria-label="Anterior" disabled={idx === 0} onClick={() => go(idx - 1)}><ArrowLeft /></button>
            <button type="button" aria-label="Siguiente" disabled={idx === projects.length - 1} onClick={() => go(idx + 1)}><ArrowRight /></button>
          </div>
        </div>
      </section>

      <div className={'proj-modal' + (modalBranch ? ' open' : '')} aria-hidden={modalBranch ? 'false' : 'true'}>
        <div className="proj-modal-backdrop" onClick={closeModal} />
        <div className="proj-modal-inner" role="dialog" aria-modal="true">
          <button className="proj-modal-close" type="button" aria-label="Cerrar" onClick={closeModal}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <div className="proj-modal-stage">
            <button className="proj-stage-nav prev" type="button" aria-label="Imagen anterior" onClick={() => showItem(cur - 1)}><ArrowLeft /></button>
            <div className="proj-stage-img">
              {item && item.type === 'video' ? (
                <video
                  key={item.src} src={item.src} muted loop playsInline preload="auto" autoPlay
                  className={mediaLoaded ? 'loaded' : ''}
                  onLoadedData={() => setMediaLoaded(true)}
                />
              ) : item ? (
                <img
                  key={item.src} src={item.src} alt={item.label}
                  className={mediaLoaded ? 'loaded' : ''}
                  onLoad={() => setMediaLoaded(true)}
                />
              ) : null}
            </div>
            <button className="proj-stage-nav next" type="button" aria-label="Imagen siguiente" onClick={() => showItem(cur + 1)}><ArrowRight /></button>
            <div className="proj-stage-caption">
              <span>{item?.label}</span>
              <span className="proj-stage-count">{gallery.length ? `${cur + 1} / ${gallery.length}` : ''}</span>
            </div>
            <div className="proj-thumbs">
              {gallery.map((o, i) => (
                <button
                  key={o.src}
                  className={'proj-thumb' + (o.type === 'video' ? ' is-video' : '') + (i === cur ? ' is-active' : '')}
                  type="button" aria-label={o.label} onClick={() => setCur(i)}
                >
                  <img src={o.thumb} alt={o.label} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
          <aside className="proj-modal-info">
            <div className="eyebrow">Sucursal</div>
            <h3 className="display">{project?.title}</h3>
            <div className="proj-info-loc">{project?.loc}</div>
            <div className="proj-info-grid">
              {infoCells.map(([k, v]) => (
                <div className="cell" key={k}><span className="k">{k}</span><span className="v">{v}</span></div>
              ))}
            </div>
            <p className="proj-info-desc">{project?.desc}</p>
            <div className="proj-info-disc">
              <span className="proj-info-disc-label">Disciplinas coordinadas</span>
              <span>{project?.disc}</span>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
