const phases = [
  { phase: 'Fase 01', title: 'Arranque y Volumetría', desc: 'Plan de ejecución BIM, coordenadas compartidas, estructura de niveles y volumetría establecidos.', pct: '100% · Completado' },
  { phase: 'Fase 02', title: 'Modelado por Disciplina', desc: 'Arquitectura, estructura y MEP modeladas en paralelo a LOD 350 sobre la referencia compartida.', pct: '100% · Completado' },
  { phase: 'Fase 03', title: 'Federación e Interferencias', desc: 'Modelos federados en Navisworks, ciclos de detección de interferencias y conflictos resueltos por disciplina.', pct: '100% · Completado' },
  { phase: 'Fase 04', title: 'Entrega y Documentación', desc: 'Entregables coordinados, recorridos virtuales y el modelo federado LOD 350 entregados al cliente.', pct: '100% · Entregado' },
];

// Ch04 · Desarrollo — project development timeline.
export default function Chapter04() {
  return (
    <section className="chapter" id="ch04">
      <div className="wrap chapter-pad" style={{ paddingBottom: 'clamp(40px,7vh,80px)' }}>
        <div className="chapter-head">
          <div className="ch-index" data-reveal>
            <span className="ch-num">Capítulo 04</span>
            <span className="ch-kicker">Desarrollo del Proyecto</span>
          </div>
          <h2 className="display" data-reveal style={{ '--d': '120ms' }}>Un modelo que <em>creció conforme al programa.</em></h2>
          <p className="lead" data-reveal style={{ '--d': '220ms' }}>Del arranque a la entrega — las etapas de desarrollo, los hitos y el avance que construyeron el gemelo digital.</p>
        </div>
      </div>

      <div className="wrap" style={{ paddingBottom: 'clamp(60px,9vh,120px)' }}>
        <div className="timeline">
          {phases.map((p) => (
            <div className="tl-row" style={{ '--pct': '100%' }} key={p.phase}>
              <div className="tl-phase">{p.phase}</div>
              <div className="tl-body">
                <h4 className="display">{p.title}</h4>
                <p>{p.desc}</p>
                <div className="tl-bar"><i /></div>
                <span className="tl-pct">{p.pct}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
