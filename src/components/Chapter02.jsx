const disciplines = [
  ['01', 'Estructura'],
  ['02', 'Arquitectura'],
  ['03', 'Hidrosanitaria'],
  ['04', 'HVAC'],
  ['05', 'Eléctrica'],
];

// Ch02 · Gemelo Digital — looping discipline-sequence video + fixed legend.
export default function Chapter02() {
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

      <div className="seq" style={{ height: '100vh' }}>
        <div className="seq-sticky">
          <div className="seq-stage">
            <video
              id="ch02-video" autoPlay muted loop playsInline preload="auto"
              src="uploads/videos/ch02-secuencia/ch02-secuencia-disciplinas.mp4"
              style={{ width: '100%', height: '100%', objectFit: 'cover', background: '#0a0a0a', display: 'block' }}
            />
          </div>
          <div className="seq-overlay">
            <div className="wrap">
              <div className="seq-step-num">Secuencia de Disciplinas</div>
              <div className="seq-stages-list">
                {disciplines.map(([n, label]) => (
                  <div className="seq-stage-item on" key={n}><span className="si-n">{n}</span> {label}</div>
                ))}
              </div>
              <p className="seq-caption">Cinco disciplinas — Estructura, Arquitectura, Hidrosanitaria, HVAC y Eléctrica — federadas capa por capa en un único gemelo digital.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
