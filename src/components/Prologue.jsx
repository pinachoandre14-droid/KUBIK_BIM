const team = [
  { img: 'member01', name: 'Lucero Nieto', role: 'Directora BIM · Coordinadora BIM' },
  { img: 'member02', name: 'Luis Vázquez', role: 'Arquitectura' },
  { img: 'member03', name: 'André Pinacho', role: 'Estructura' },
  { img: 'member04', name: 'Jesús Ayala', role: 'Sistemas MEP' },
  { img: 'member05', name: 'Diego Chávez', role: 'Coordinador de Costos' },
];

const orgRow = [
  { role: 'Arquitectura', name: 'Luis Vázquez' },
  { role: 'Estructura', name: 'André Pinacho' },
  { role: 'Sistemas MEP', name: 'Jesús Ayala' },
  { role: 'Costos', name: 'Diego Chávez' },
];

// BEP constellation: wires + animated flow lines + term chips
const wires = [
  [256, 140], [800, 80], [1344, 140], [96, 380], [1504, 380],
  [128, 640], [1472, 640], [288, 900], [800, 940], [1312, 900],
];
const terms = [
  { left: '16%', top: '14%', delay: '0.1s', label: 'Objetivos BIM' },
  { left: '50%', top: '8%', delay: '0.18s', label: 'Usos del modelo' },
  { left: '84%', top: '14%', delay: '0.26s', label: 'Roles y responsabilidades' },
  { left: '6%', top: '38%', delay: '0.34s', label: 'Niveles de detalle · LOD 350' },
  { left: '94%', top: '38%', delay: '0.42s', label: 'Coordenadas compartidas' },
  { left: '8%', top: '64%', delay: '0.5s', label: 'Estándares de modelado' },
  { left: '92%', top: '64%', delay: '0.58s', label: 'Software y formatos' },
  { left: '18%', top: '90%', delay: '0.66s', label: 'CDE · Estructura de carpetas' },
  { left: '50%', top: '94%', delay: '0.74s', label: 'Nomenclatura de archivos' },
  { left: '82%', top: '90%', delay: '0.82s', label: 'Control de calidad' },
];

export default function Prologue() {
  return (
    <section className="chapter" id="prologue">
      <div className="wrap" style={{ paddingTop: 'clamp(80px,12vh,180px)', paddingBottom: 'clamp(40px,7vh,80px)' }}>
        <div className="mono" data-reveal style={{ marginBottom: 24 }}>KUBIK STUDIO | TEAM</div>
        <div data-reveal style={{ display: 'block', width: '100%', height: '75vh', overflow: 'hidden' }}>
          <img src="uploads/ch01/team-group-photo.jpg" alt="Equipo KUBIK STUDIO" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
        </div>
        <p data-reveal style={{ marginTop: 18, fontSize: 'clamp(0.78rem,1.1vw,0.92rem)', color: 'var(--text-3)', lineHeight: 1.65, maxWidth: '90ch', fontFamily: 'var(--font-mono)', letterSpacing: '0.01em' }}>
          Kubik Studio es un despacho de arquitectura especializado en metodología BIM, enfocado en la optimización de proyectos a través de una gestión integral del diseño y la construcción. Trabajamos de la mano con desarrolladores para aportar certeza técnica, eficiencia y control en cada etapa del proyecto, integrando herramientas digitales como un medio para potenciar el criterio arquitectónico y elevar la calidad del entorno construido en México.
        </p>
      </div>

      <div className="wrap prologue-intro">
        <div className="eyebrow" data-reveal>Prólogo · El Estudio</div>
        <p className="big-statement" data-reveal style={{ marginTop: 28 }}>
          Construimos los edificios <b>dos veces</b>. <span className="muted">Primero en datos, perfectamente coordinados — para que la segunda vez, en concreto, no haya sorpresas.</span>
        </p>
      </div>

      <div className="wrap grid12 studio-split chapter-pad" style={{ paddingTop: 0 }}>
        <div className="s-left">
          <div className="mono" data-reveal>Acerca de KUBIK STUDIO</div>
          <p className="lead" data-reveal style={{ '--d': '80ms', marginTop: 20 }}>
            Despacho de arquitectura especializado en metodología BIM, enfocado en la optimización de proyectos a través de una gestión integral del diseño y la construcción — integrando herramientas digitales para potenciar el criterio arquitectónico y elevar la calidad del entorno construido en México.
          </p>
        </div>
        <div className="s-right" data-stagger="120">
          <div className="belief" data-reveal>
            <span className="num">01 — Misión</span>
            <h4 className="display">Optimizar la gestión, diseño y construcción de proyectos arquitectónicos en México.</h4>
            <p>Mediante la implementación integral de la metodología BIM —abarcando sus diez dimensiones— brindamos certeza técnica, eficiencia operativa y control real a empresas desarrolladoras y gestoras de proyectos inmobiliarios.</p>
          </div>
          <div className="belief" data-reveal>
            <span className="num">02 — Visión</span>
            <h4 className="display">Ser el referente nacional en metodología BIM en los próximos diez años.</h4>
            <p>Transformar la manera en que se conciben, coordinan y construyen los proyectos en México, impulsando una arquitectura más precisa, eficiente, responsable e innovadora, alineada con los retos contemporáneos del país.</p>
          </div>
          <div className="belief" data-reveal>
            <span className="num">03 — Valores</span>
            <h4 className="display">Innovación con criterio · Precisión técnica · Calidad construida.</h4>
            <p><b>Innovación con criterio —</b> Adoptamos herramientas digitales no por tendencia, sino por su capacidad real de mejorar la arquitectura y la construcción.<br /><br /><b>Precisión técnica —</b> La calidad de un proyecto se construye desde el detalle, la coordinación y la información confiable en cada etapa.<br /><br /><b>Calidad construida —</b> Nuestro objetivo final es que la obra construida refleje fielmente la calidad del proyecto.</p>
          </div>
        </div>
      </div>

      <div className="wrap chapter-pad" style={{ paddingTop: 0 }}>
        <div className="mono" data-reveal style={{ marginBottom: 48 }}>El Equipo · Organización</div>
        <div className="orgchart" data-reveal="fade">
          <div className="org-node lead" data-reveal>
            <div className="role">Director BIM</div>
            <div className="name">Lucero Nieto</div>
          </div>
          <div className="org-connector" />
          <div className="org-row" data-stagger="90">
            {orgRow.map((o) => (
              <div className="org-node" data-reveal key={o.name}>
                <div className="role">{o.role}</div>
                <div className="name">{o.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingBottom: 'clamp(110px,16vh,230px)' }}>
        <div className="team-strip" data-stagger="80">
          {team.map((m) => (
            <div className="team-card" data-reveal key={m.img}>
              <div className="tc-img">
                <img src={`uploads/member-photos/${m.img}.jpeg`} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              </div>
              <div className="tc-meta"><div className="tc-name">{m.name}</div><div className="tc-role">{m.role}</div></div>
            </div>
          ))}
        </div>
      </div>

      <div className="wrap bep-wrap" style={{ paddingBottom: 'clamp(110px,16vh,230px)' }}>
        <div className="bep-head">
          <div className="eyebrow" data-reveal>Prólogo · Punto de Partida</div>
          <h3 data-reveal style={{ '--d': '80ms' }}>Todo converge en el <em>BEP</em></h3>
          <p data-reveal style={{ '--d': '160ms' }}>El BIM Execution Plan es el documento que alimenta y gobierna el proyecto — cada acuerdo, estándar y protocolo fluye hacia él antes de modelar la primera línea.</p>
        </div>

        <div className="bep-stage" data-bep>
          <svg className="bep-svg" viewBox="0 0 1600 1000" preserveAspectRatio="none" aria-hidden="true">
            <g>
              {wires.map(([x, y], i) => (
                <line key={i} className="bep-wire" x1={x} y1={y} x2="800" y2="500" />
              ))}
            </g>
            <g>
              {wires.map(([x, y], i) => (
                <line key={i} className="bep-flow" vectorEffect="non-scaling-stroke" x1={x} y1={y} x2="800" y2="500" style={{ '--del': `${i * 0.25}s` }} />
              ))}
            </g>
          </svg>

          {terms.map((t) => (
            <div key={t.label} className="bep-term" style={{ left: t.left, top: t.top, transitionDelay: t.delay }}>
              <span className="bullet" />{t.label}
            </div>
          ))}

          <div className="bep-core">
            <span className="pulse" />
            <span className="word">BEP</span>
            <span className="sub">BIM Execution Plan</span>
          </div>
        </div>
      </div>
    </section>
  );
}
