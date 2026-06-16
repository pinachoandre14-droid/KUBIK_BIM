import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { DISC, RADAR, MULTIPLIERS, readTokens } from '../data/charts.js';

// Ch03 · Coordinación — clash compare slider, metrics, Clash Detective dashboard.
export default function Chapter03() {
  const radarRef = useRef(null);
  const barsRef = useRef(null);
  const discGridRef = useRef(null);

  useEffect(() => {
    const t = readTokens();
    const charts = [];
    const TOTAL = DISC.reduce((s, d) => s + d.count, 0);
    const MAXC = Math.max(...DISC.map((d) => d.count));
    const hexA = (h, a) => (h && h[0] === '#' ? h + a : h);

    Chart.defaults.color = t.t3;
    Chart.defaults.borderColor = t.line;
    Chart.defaults.font.family = "'IBM Plex Mono', ui-monospace, monospace";
    Chart.defaults.font.size = 11;

    const darkTooltip = {
      backgroundColor: t.bg3, borderColor: t.lineStrong, borderWidth: 1,
      titleColor: t.t1, bodyColor: t.t2, padding: 10, cornerRadius: 0,
      titleFont: { weight: '700' }, displayColors: false,
    };

    // ── RADAR ──
    if (radarRef.current) {
      charts.push(new Chart(radarRef.current, {
        type: 'radar',
        data: {
          labels: RADAR.map((d) => d.disc),
          datasets: [
            { label: 'Severidad', data: RADAR.map((d) => d.sev), borderColor: '#C0563E', backgroundColor: '#C0563E20', pointBackgroundColor: '#C0563E', pointRadius: 3, borderWidth: 2 },
            { label: 'Costo', data: RADAR.map((d) => d.cost), borderColor: t.accent, backgroundColor: hexA(t.accent, '22'), pointBackgroundColor: t.accent, pointRadius: 3, borderWidth: 2 },
            { label: 'Tiempo', data: RADAR.map((d) => d.time), borderColor: '#6E8CA8', backgroundColor: '#6E8CA820', pointBackgroundColor: '#6E8CA8', pointRadius: 3, borderWidth: 2 },
            { label: 'Concentración', data: RADAR.map((d) => d.conc), borderColor: '#8E7CA8', backgroundColor: '#8E7CA820', pointBackgroundColor: '#8E7CA8', pointRadius: 3, borderWidth: 2 },
          ],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 10, padding: 14, color: t.t2, font: { size: 11 } } },
            tooltip: darkTooltip,
          },
          scales: {
            r: {
              min: 0, max: 10,
              ticks: { stepSize: 2, font: { size: 9 }, color: t.t3, backdropColor: 'transparent' },
              grid: { color: t.line }, angleLines: { color: t.line },
              pointLabels: { font: { size: 11, weight: '600' }, color: t.t2 },
            },
          },
        },
      }));
    }

    // ── DISCIPLINE CARDS ──
    if (discGridRef.current) {
      discGridRef.current.innerHTML = DISC.map((d) =>
        '<div class="clash-disc-card">' +
        '<div class="clash-disc-header">' +
        `<span class="clash-disc-name" style="color:${d.color}">${d.key}</span>` +
        `<span class="clash-disc-count" style="color:${d.color}">${d.count}</span>` +
        '</div>' +
        `<div class="clash-disc-full">${d.full}</div>` +
        `<div class="clash-disc-bar"><div class="clash-disc-bar-fill" data-w="${((d.count / MAXC) * 100).toFixed(1)}%" style="background:${d.color}"></div></div>` +
        (d.count === 0 ? '<div class="clash-disc-tag-zero">✓ Sin interferencias detectadas</div>' : '') +
        '</div>'
      ).join('');

      const fills = [].slice.call(discGridRef.current.querySelectorAll('.clash-disc-bar-fill'));
      const fillIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          fills.forEach((f, i) => setTimeout(() => { f.style.width = f.getAttribute('data-w'); }, i * 90));
          fillIO.disconnect();
        });
      }, { threshold: 0.3 });
      fillIO.observe(discGridRef.current);
      charts.push({ destroy: () => fillIO.disconnect() });
    }

    // ── HORIZONTAL BARS ──
    if (barsRef.current) {
      charts.push(new Chart(barsRef.current, {
        type: 'bar',
        data: {
          labels: DISC.map((d) => d.key),
          datasets: [{ data: DISC.map((d) => d.count), backgroundColor: DISC.map((d) => d.color), borderRadius: 2, barPercentage: 0.66 }],
        },
        options: {
          indexAxis: 'y', responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { ...darkTooltip, callbacks: { label: (ctx) => {
              const d = DISC[ctx.dataIndex];
              const pct = TOTAL ? ((d.count / TOTAL) * 100).toFixed(1) : '0';
              return ' ' + d.count + ' interferencias (' + pct + '% del total)';
            } } },
          },
          scales: {
            x: { grid: { color: t.line }, ticks: { font: { size: 10 }, color: t.t3 } },
            y: { grid: { display: false }, ticks: { font: { size: 11, weight: '600' }, color: t.t2 } },
          },
        },
      }));
    }

    return () => charts.forEach((c) => c.destroy());
  }, []);

  return (
    <section className="chapter" id="ch03" style={{ background: 'var(--bg-2)' }}>
      <div className="wrap chapter-pad" style={{ paddingBottom: 'clamp(40px,7vh,80px)' }}>
        <div className="chapter-head">
          <div className="ch-index" data-reveal>
            <span className="ch-num">Capítulo 03</span>
            <span className="ch-kicker">Coordinación</span>
          </div>
          <h2 className="display" data-reveal style={{ '--d': '120ms' }}>Donde los sistemas se cruzan, <em>nosotros resolvemos.</em></h2>
          <p className="lead" data-reveal style={{ '--d': '220ms' }}>El modelo federado se verifica en Navisworks. Cada interferencia se detecta, se registra y se resuelve — antes de llegar a obra.</p>
        </div>
      </div>

      <div className="wrap" style={{ paddingBottom: 'clamp(40px,7vh,80px)' }}>
        <div className="mono" data-reveal style={{ marginBottom: 18 }}>Detección de Interferencias · Arrastra para comparar conflicto ↔ resolución</div>
        <div className="compare" data-reveal="fade">
          <div className="cmp-side cmp-before">
            <img src="uploads/clash-detection/clash_before.png" alt="Modelo Federado · Conflicto" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <span className="cmp-tag l">Antes · Conflicto</span>
            <div className="clash" style={{ left: '22%', top: '38%' }} />
            <div className="clash" style={{ left: '48%', top: '28%' }} />
            <div className="clash" style={{ left: '72%', top: '42%' }} />
            <div className="clash" style={{ left: '36%', top: '62%' }} />
          </div>
          <div className="cmp-side cmp-after">
            <img src="uploads/clash-detection/clash_after.png" alt="Modelo Federado · Resuelto" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <span className="cmp-tag r">Después · Resuelto</span>
          </div>
          <div className="cmp-handle"><div className="knob">↔</div></div>
        </div>
      </div>

      <div className="wrap" style={{ paddingBottom: 'clamp(110px,16vh,230px)' }}>
        <div className="coord-metrics" data-stagger="100">
          <div className="cm" data-reveal><div className="cmv"><span data-count="6">0</span></div><div className="cmk">Disciplinas federadas</div></div>
          <div className="cm" data-reveal><div className="cmv"><span data-count="463">0</span></div><div className="cmk">Interferencias detectadas</div></div>
          <div className="cm" data-reveal><div className="cmv"><span data-count="100">0</span><span className="u">%</span></div><div className="cmk">Conflictos resueltos</div></div>
          <div className="cm" data-reveal><div className="cmv"><span data-count="0">0</span></div><div className="cmk">Pendientes en obra</div></div>
        </div>
      </div>

      <div className="wrap clash-dash" style={{ paddingBottom: 'clamp(110px,16vh,230px)' }}>
        <div className="mono" data-reveal style={{ marginBottom: 40 }}>Clash Detective · Análisis por Disciplina</div>

        <div className="clash-card" data-reveal>
          <div className="clash-sec-title"><span className="ic">◎</span> Perfil de Riesgo por Disciplina</div>
          <div className="clash-radar-wrap"><canvas ref={radarRef} /></div>
        </div>

        <div className="clash-disc-grid" ref={discGridRef} data-reveal />

        <div className="clash-card" data-reveal>
          <div className="clash-sec-title"><span className="ic">▦</span> Total de Interferencias por Disciplina</div>
          <div className="clash-bar-wrap"><canvas ref={barsRef} /></div>
        </div>

        <div className="clash-card" data-reveal>
          <div className="clash-sec-title"><span className="ic">×</span> Multiplicadores de Impacto en Obra</div>
          <div className="clash-mult-grid">
            {MULTIPLIERS.map((m) => (
              <div className="clash-mult-card" key={m.name}>
                <div className="clash-mult-top"><span className="clash-mult-name">{m.name}</span><span className="clash-mult-value">{m.value}</span></div>
                <div className="clash-mult-reason">{m.reason}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
