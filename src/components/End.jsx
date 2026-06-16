// End — credits screen.
export default function End() {
  return (
    <section className="end" id="end">
      <div className="grid-lines" data-parallax="0.05" />
      <div className="wrap">
        <div className="eyebrow" data-reveal style={{ justifyContent: 'center', marginBottom: 30 }}>Fin de la Exhibición</div>
        <h2 className="display" data-reveal>Kubik Studio</h2>
        <p className="end-sub" data-reveal style={{ '--d': '140ms', marginTop: 26 }}>Modelo BIM · LOD 350</p>
        <div className="end-by" data-reveal style={{ '--d': '240ms' }}>Desarrollado por <b style={{ fontFamily: 'IBM Plex Mono' }}>KUBIK STUDIO</b></div>
        <div className="end-credits" data-stagger="80">
          <div className="ec" data-reveal><span className="k">Disciplinas</span><span className="v">Arquitectura · Estructura · MEP</span></div>
          <div className="ec" data-reveal><span className="k">Superficie</span><span className="v">5,200 m²</span></div>
          <div className="ec" data-reveal><span className="k">Ubicación</span><span className="v">Cd. Satélite · Naucalpan, México</span></div>
        </div>
      </div>
    </section>
  );
}
