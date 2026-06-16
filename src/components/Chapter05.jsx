import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { BUD_COLS, BUD_DONUT, BUD_ENV, BUD_MEP, readTokens } from '../data/charts.js';

const kpis = [
  { cls: 'bud-a', label: 'A · Subestructura', value: '$25.3M', sub: 'Cimentaciones y firmes', pct: '30.0% del costo directo' },
  { cls: 'bud-b', label: 'B · Envolvente', value: '$23.0M', sub: 'Estructura, cubierta y fachada', pct: '27.2% del costo directo' },
  { cls: 'bud-c', label: 'C · Interiores', value: '$13.7M', sub: 'Particiones y acabados', pct: '16.3% del costo directo' },
  { cls: 'bud-d', label: 'D · Servicios', value: '$22.5M', sub: 'MEP — Mecánico, Eléctrico, Plomería', pct: '26.6% del costo directo' },
  { cls: 'bud-t', label: 'Costo Directo Total', value: '$66.6M', sub: 'Sin indirectos ni IVA', pct: '4 capítulos · UniFormat' },
];

const stackSegs = [
  { w: '30.0%', bg: '#1B4F8A', label: 'A · 30.0%' },
  { w: '27.2%', bg: '#2E6FBF', label: 'B · 27.2%' },
  { w: '16.3%', bg: '#5B9BD5', label: 'C · 16.3%' },
  { w: '26.5%', bg: '#A0C0E8', label: 'D · 26.5%', dark: true },
];
const legend = [
  { bg: '#1B4F8A', name: 'A. Subestructura', val: '$25,324,036' },
  { bg: '#2E6FBF', name: 'B. Envolvente', val: '$22,964,619' },
  { bg: '#5B9BD5', name: 'C. Interiores', val: '$13,742,432' },
  { bg: '#A0C0E8', name: 'D. Servicios', val: '$22,482,377' },
];
const costRows = [
  { dot: 'var(--text-2)', name: 'Costo Directo', amount: '$66,600,573', pct: '—', bar: '100%', barBg: '#2E6FBF' },
  { dot: '#4A6FA8', name: 'Indirectos (12%)', amount: '$7,992,069', pct: '12.0%', bar: '12%', barBg: '#4A6FA8' },
  { dot: '#6E8CA8', name: 'Financiamiento (3%)', amount: '$2,237,779', pct: '3.4%', bar: '3.4%', barBg: '#6E8CA8' },
  { dot: '#7BB3DF', name: 'Utilidad (10%)', amount: '$7,683,042', pct: '11.5%', bar: '11.5%', barBg: '#7BB3DF' },
  { dot: '#A0C0E8', name: 'Importe sin IVA', amount: '$84,513,464', pct: '—', strong: true },
  { dot: '#1B4F8A', name: 'I.V.A. (16%)', amount: '$13,522,154', pct: '20.3%', bar: '20.3%', barBg: '#1B4F8A' },
];

const galleryImgs = [
  { cls: 'g1', src: 'uploads/ch05/ch05-render-exterior.png', alt: 'Render Exterior' },
  { cls: 'g2', src: 'uploads/ch05/ch05-render-interior.png', alt: 'Render Interior' },
  { cls: 'g3', src: 'uploads/ch05/ch05-modelo-federado.png', alt: 'Modelo Federado' },
  { cls: 'g4', src: 'uploads/ch05/ch05-recorrido-final.png', alt: 'Recorrido Final' },
];

// Ch05 · Resultado Final — hero render, presupuesto de obra, galería 4-up.
export default function Chapter05() {
  const donutRef = useRef(null);
  const barEnvRef = useRef(null);
  const barMEPRef = useRef(null);

  useEffect(() => {
    const t = readTokens();
    const charts = [];
    const darkTip = {
      backgroundColor: t.bg3, borderColor: t.lineStrong, borderWidth: 1,
      titleColor: t.t1, bodyColor: t.t2, padding: 10, cornerRadius: 0, displayColors: false,
      titleFont: { weight: '700' }, bodyFont: { family: "'IBM Plex Mono', monospace", size: 11 },
    };

    if (donutRef.current) {
      charts.push(new Chart(donutRef.current, {
        type: 'doughnut',
        data: { labels: BUD_DONUT.labels, datasets: [{ data: BUD_DONUT.data, backgroundColor: [BUD_COLS.a, BUD_COLS.b, BUD_COLS.c, BUD_COLS.d], borderWidth: 0, hoverOffset: 8 }] },
        options: {
          responsive: true, maintainAspectRatio: false, cutout: '62%',
          plugins: {
            legend: { position: 'bottom', labels: { font: { family: "'IBM Plex Mono', monospace", size: 10 }, color: t.t2, padding: 14, boxWidth: 10, boxHeight: 10, usePointStyle: true, pointStyleWidth: 10 } },
            tooltip: { ...darkTip, callbacks: { label: (ctx) => {
              const v = ctx.parsed;
              const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
              return ' $' + v.toLocaleString('es-MX') + ' (' + ((v / total) * 100).toFixed(1) + '%)';
            } } },
          },
        },
      }));
    }

    if (barEnvRef.current) {
      charts.push(new Chart(barEnvRef.current, {
        type: 'bar',
        data: { labels: BUD_ENV.labels, datasets: [{ data: BUD_ENV.data, backgroundColor: [BUD_COLS.a, BUD_COLS.b, BUD_COLS.c, BUD_COLS.d], borderRadius: 2, borderWidth: 0 }] },
        options: {
          indexAxis: 'y', responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { ...darkTip, callbacks: { label: (ctx) => ' $' + ctx.parsed.x.toLocaleString('es-MX') } } },
          scales: {
            x: { grid: { color: t.line }, ticks: { font: { family: "'IBM Plex Mono'", size: 9 }, color: t.t3, callback: (v) => '$' + (v / 1e6).toFixed(1) + 'M' } },
            y: { grid: { display: false }, ticks: { font: { family: "'IBM Plex Mono'", size: 10 }, color: t.t2 } },
          },
        },
      }));
    }

    if (barMEPRef.current) {
      charts.push(new Chart(barMEPRef.current, {
        type: 'bar',
        data: { labels: BUD_MEP.labels, datasets: [{ data: BUD_MEP.values, backgroundColor: BUD_MEP.colors, borderRadius: 3, borderWidth: 0, barThickness: 24 }] },
        options: {
          indexAxis: 'y', responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { ...darkTip, callbacks: { label: (ctx) => {
              const v = ctx.parsed.x;
              return ['  $' + v.toLocaleString('es-MX') + ' MN', '  ' + ((v / BUD_MEP.total) * 100).toFixed(1) + '% del capítulo D'];
            } } },
          },
          scales: {
            x: { grid: { color: t.line }, border: { display: false }, ticks: { font: { family: "'IBM Plex Mono'", size: 9 }, color: t.t3, callback: (v) => '$' + (v / 1e6).toFixed(0) + 'M' } },
            y: { grid: { display: false }, border: { display: false }, ticks: { font: { family: "'IBM Plex Mono'", size: 11 }, color: t.t2, crossAlign: 'far' } },
          },
          animation: { duration: 900, easing: 'easeOutQuart' },
          layout: { padding: { right: 26 } },
        },
        plugins: [{
          id: 'budPctLabels',
          afterDatasetsDraw: (chart) => {
            const ctx2 = chart.ctx, xs = chart.scales.x, ys = chart.scales.y;
            chart.data.datasets[0].data.forEach((val, i) => {
              const pct = ((val / BUD_MEP.total) * 100).toFixed(1) + '%';
              const xp = xs.getPixelForValue(val);
              const yp = ys.getPixelForValue(i);
              ctx2.save();
              ctx2.font = "500 10px 'IBM Plex Mono', monospace";
              ctx2.fillStyle = t.t3;
              ctx2.textAlign = 'left';
              ctx2.textBaseline = 'middle';
              ctx2.fillText(pct, xp + 8, yp);
              ctx2.restore();
            });
          },
        }],
      }));
    }

    return () => charts.forEach((c) => c.destroy());
  }, []);

  return (
    <section className="chapter" id="ch05">
      <div className="final-hero" data-mouse>
        <img src="uploads/ch05/ch05-render-exterior.png" alt="Render Exterior Suburbia Satélite" data-parallax="0.1" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: 0, display: 'block' }} />
        <div className="scrim" />
        <div className="wrap">
          <div className="eyebrow" data-reveal style={{ justifyContent: 'center', marginBottom: 24 }}>Capítulo 05 · Resultado Final</div>
          <h2 className="display" data-words>El edificio, <em>completo en datos.</em></h2>
        </div>
      </div>

      <div className="bud-section" id="ch05-presupuesto">
        <div className="wrap" data-reveal>
          <div className="mono" style={{ marginBottom: 20, color: 'var(--text-3)' }}>Capítulo 05 · Resultado Final — Presupuesto de Obra · UniFormat 2010 · BIMSA 2025–2026</div>
          <h3 className="display" style={{ fontSize: 'clamp(2rem,4vw,3.6rem)', marginBottom: 18 }}>
            $98,035,618 <em style={{ fontStyle: 'normal', color: 'var(--text-3)', fontSize: '0.48em', letterSpacing: '0.05em', fontWeight: 400, verticalAlign: 'middle' }}>MN con IVA</em>
          </h3>
          <p style={{ color: 'var(--text-3)', fontSize: '0.76rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Costo directo · Indirectos 12% · Financiamiento 3% · Utilidad 10% · IVA 16%
          </p>
        </div>

        <div className="wrap" style={{ marginTop: 48 }}>
          <div className="bud-divider" data-reveal>
            <h4>Resumen por Capítulo</h4><div className="bud-rule" /><div className="bud-tag">4 capítulos UniFormat</div>
          </div>
          <div className="bud-kpi-row" data-stagger="80">
            {kpis.map((k) => (
              <div className={`bud-kpi-card ${k.cls}`} data-reveal key={k.label}>
                <div className="bud-kpi-label">{k.label}</div>
                <div className="bud-kpi-value">{k.value}</div>
                <div className="bud-kpi-sub">{k.sub}</div>
                <div className="bud-kpi-pct">{k.pct}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="wrap">
          <div className="bud-divider" data-reveal>
            <h4>Distribución del Costo Directo</h4><div className="bud-rule" /><div className="bud-tag">escala proporcional</div>
          </div>
          <div className="bud-stack-bar" data-reveal>
            {stackSegs.map((s) => (
              <div className="bud-stack-seg" style={{ width: s.w, background: s.bg }} key={s.label}>
                <span style={s.dark ? { color: '#0F1F3D' } : undefined}>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="bud-stack-legend" data-stagger="60">
            {legend.map((l) => (
              <div className="bud-legend-item" data-reveal key={l.name}>
                <div className="bud-legend-dot" style={{ background: l.bg }} />
                {l.name}
                <span className="bud-legend-val">{l.val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="wrap">
          <div className="bud-charts-grid" data-reveal>
            <div className="bud-chart-card">
              <div className="bud-chart-title">Capítulos por Importe</div>
              <div className="bud-chart-sub">Sobre costo directo total ($66.6M)</div>
              <div style={{ position: 'relative', height: 260 }}><canvas ref={donutRef} /></div>
            </div>
            <div className="bud-chart-card">
              <div className="bud-chart-title">B · Envolvente — Subcapítulos</div>
              <div className="bud-chart-sub">Desglose del capítulo B ($23.0M)</div>
              <div style={{ position: 'relative', height: 260 }}><canvas ref={barEnvRef} /></div>
            </div>
          </div>
        </div>

        <div className="wrap">
          <div className="bud-divider" data-reveal>
            <h4>D · Servicios — Subsistemas MEP</h4><div className="bud-rule" /><div className="bud-tag">9 subsistemas</div>
          </div>
          <div className="bud-mep-panel" data-reveal>
            <div className="bud-mep-header">
              <div>
                <div className="bud-chart-title">Importe por Subsistema</div>
                <div className="bud-chart-sub" style={{ marginBottom: 0 }}>Escala proporcional al total del capítulo D</div>
              </div>
              <div className="bud-mep-pill">Total D: $22,482,377 MN</div>
            </div>
            <div style={{ position: 'relative', height: 340 }}><canvas ref={barMEPRef} /></div>
          </div>
        </div>

        <div className="wrap">
          <div className="bud-divider" data-reveal>
            <h4>Desglose del Precio de Venta</h4><div className="bud-rule" /><div className="bud-tag">Costo directo + cargas</div>
          </div>
          <table className="bud-cost-table" data-reveal>
            <thead>
              <tr><th>Concepto</th><th>Importe (MN)</th><th>% s/Costo Directo</th><th className="bud-bar-cell">Proporción</th></tr>
            </thead>
            <tbody>
              {costRows.map((r) => (
                <tr key={r.name}>
                  <td><div className="bud-badge"><div className="dot" style={{ background: r.dot }} />{r.strong ? <strong style={{ color: 'var(--text-1)' }}>{r.name}</strong> : r.name}</div></td>
                  <td>{r.strong ? <strong style={{ color: 'var(--text-1)' }}>{r.amount}</strong> : r.amount}</td>
                  <td>{r.pct}</td>
                  <td className="bud-bar-cell">{r.bar ? <div className="bud-mini-bar"><div className="bud-mini-bar-fill" style={{ width: r.bar, background: r.barBg }} /></div> : null}</td>
                </tr>
              ))}
              <tr className="bud-total-row">
                <td>TOTAL DEL PRESUPUESTO (M.N.)</td><td>$98,035,618</td><td>47.2% s/directo</td><td className="bud-bar-cell" />
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="wrap chapter-pad">
        <div className="final-gallery" data-stagger="120">
          {galleryImgs.map((g) => (
            <div className={g.cls} data-reveal="mask" key={g.cls}>
              <img src={g.src} alt={g.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
