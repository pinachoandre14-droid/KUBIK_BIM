// Cover hero — looping background video, scrim, parallax grid, mouse tracking.
export default function Cover() {
  return (
    <section className="cover" id="cover" data-mouse>
      <video
        autoPlay muted loop playsInline
        src="uploads/zoom-principal-1080-v2.mp4"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, display: 'block' }}
      />
      <div className="cover-bg" style={{ zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(170deg,rgba(20,21,25,0.65) 0%,rgba(20,21,25,0.32) 45%,rgba(20,21,25,0.92) 100%)', pointerEvents: 'none' }} />
      <div className="grid-lines" data-parallax="0.06" style={{ opacity: 0.5, zIndex: 2 }} />

      <div className="wrap cover-top" style={{ zIndex: 3 }}>
        <div className="mono">ITESM CEM</div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
          <img
            src="uploads/LOGO_KUBIK_STUDIO.png" alt="Kubik Studio"
            style={{ width: 320, height: 88, objectFit: 'cover', filter: 'brightness(0) invert(1)', opacity: 0.9 }}
          />
          <div className="mono" style={{ textAlign: 'right' }}>Cd. Satélite<br />Naucalpan · México</div>
        </div>
      </div>

      <div className="wrap cover-title" data-mouse-depth="14" style={{ position: 'relative', zIndex: 3 }}>
        <div className="eyebrow" style={{ marginBottom: 'clamp(14px,2vh,28px)' }}>Modelo BIM · LOD 350</div>
        <h1 className="display" data-words>Kubik <em>Studio</em></h1>
      </div>

      <div className="wrap" style={{ position: 'relative', zIndex: 3 }}>
        <div className="cover-meta">
          <div className="col"><span className="k">Disciplinas</span><span className="v">Arquitectura · Estructura · MEP</span></div>
          <div className="col"><span className="k">Superficie construida</span><span className="v">5,200 m²</span></div>
          <div className="col"><span className="k">Niveles</span><span className="v">Mezzanine +3.94 · Azotea +7.87</span></div>
          <div className="col"><span className="k">Desarrollado por</span><span className="v">KUBIK STUDIO</span></div>
        </div>
      </div>
    </section>
  );
}
