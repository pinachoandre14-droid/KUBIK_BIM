// Ch01 · El Reto — full-bleed hero video + building facts.
export default function Chapter01() {
  return (
    <section className="chapter hero-full" id="ch01" data-mouse>
      <div className="hero-media" data-parallax="0.12" data-mouse-depth="20">
        <video
          autoPlay muted loop playsInline
          src="uploads/videos/ch01-reto/ch01-reto-hero.MP4"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <div className="hero-scrim" />
      <div className="wrap">
        <div className="chapter-head">
          <div className="ch-index" data-reveal>
            <span className="ch-num">Capítulo 01</span>
            <span className="ch-kicker">El Reto</span>
          </div>
          <h2 className="display" data-words>Suburbia <em>Satélite</em></h2>
        </div>
        <div className="hero-facts" data-stagger="90">
          <div className="f" data-reveal>
            <span className="k">Ubicación</span>
            <span className="v" style={{ fontSize: 'clamp(1rem,1.6vw,1.3rem)' }}>Blvd. Manuel Ávila Camacho 2495<br />Cd. Satélite · 53100 Naucalpan</span>
          </div>
          <div className="f" data-reveal><span className="k">Superficie construida</span><span className="v"><span data-count="5200">0</span> <small>m²</small></span></div>
          <div className="f" data-reveal><span className="k">Desarrollo</span><span className="v">LOD <span data-count="350">0</span></span></div>
          <div className="f" data-reveal><span className="k">Disciplinas</span><span className="v"><span data-count="6">0</span> <small>coordinadas</small></span></div>
        </div>
      </div>
    </section>
  );
}
