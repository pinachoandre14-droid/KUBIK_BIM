// ── Clash Detective · Ch03 ──
export const DISC = [
  { key: 'HID-ESTR', full: 'Hidráulica vs Estructura', count: 203, color: '#6E8CA8' },
  { key: 'ESTR-ELECT', full: 'Estructura vs Eléctrica', count: 182, color: '#C0563E' },
  { key: 'MEP', full: 'MEP Inter-disciplinas', count: 37, color: '#5B9279' },
  { key: 'PLAFONES', full: 'Plafones ARQ vs Estructura', count: 21, color: '#8E7CA8' },
  { key: 'MUROS', full: 'Muros ARQ vs Estructura', count: 20, color: '#C2895A' },
  { key: 'HVAC', full: 'HVAC vs Estructura', count: 0, color: '#4FB0A3' },
];

export const RADAR = [
  { disc: 'EST-ELE', sev: 8, cost: 9, time: 7, conc: 6 },
  { disc: 'HID-EST', sev: 5, cost: 8, time: 6, conc: 7 },
  { disc: 'MEP', sev: 4, cost: 6, time: 4, conc: 5 },
  { disc: 'Plafones', sev: 3, cost: 4, time: 3, conc: 3 },
  { disc: 'Muros', sev: 4, cost: 7, time: 5, conc: 4 },
];

export const MULTIPLIERS = [
  { name: 'EST-ELE', value: '×1.5', reason: 'Mayor impacto en coordinación y costo de retrabajo' },
  { name: 'HID-EST', value: '×1.4', reason: 'Riesgo de fugas, presión y daño estructural' },
  { name: 'ARQ-EST', value: '×1.3', reason: 'Afectación de acabados y espacios funcionales' },
  { name: 'MEP', value: '×1.2', reason: 'Requiere coordinación multi-disciplinaria' },
  { name: 'HVAC', value: '×1.0', reason: 'Generalmente bajo impacto constructivo' },
];

// ── Presupuesto de Obra · Ch05 ──
export const BUD_COLS = { a: '#1B4F8A', b: '#2E6FBF', c: '#5B9BD5', d: '#A0C0E8' };

export const BUD_DONUT = {
  labels: ['A · Subestructura', 'B · Envolvente', 'C · Interiores', 'D · Servicios'],
  data: [25324036, 22964619, 13742432, 22482377],
};

export const BUD_ENV = {
  labels: ['B1020 Cubierta', 'B1010 Entrepisos', 'B2020 Ventanería', 'B2010 Muros Ext.'],
  data: [14319059, 6563850, 1308380, 773330],
};

export const BUD_MEP = {
  labels: [
    'D3040 · Dist. Aire (HVAC)', 'D5020 · Acometida Eléctrica',
    'D5040 · Iluminación', 'D3050 · Unidades Manejadoras',
    'D5030 · Energía General', 'D2030 · Inst. Pluvial',
    'D2010 · Agua Potable', 'D4010 · Contra Incendio',
    'D2020 · Drenaje Sanitario',
  ],
  values: [15023243, 3578996, 1379867, 1040040, 959272, 329023, 137728, 24252, 9957],
  colors: ['#0F1F3D', '#1B4F8A', '#2463A8', '#2E6FBF', '#3D80CC', '#5B9BD5', '#7BB3DF', '#A0C0E8', '#C5D9F2'],
  total: 22482377,
};

// Read live CSS tokens so charts follow the active atmosphere
export function readTokens() {
  const cs = getComputedStyle(document.documentElement);
  const tok = (n, f) => cs.getPropertyValue(n).trim() || f;
  return {
    line: tok('--line', 'rgba(245,245,243,0.10)'),
    lineStrong: tok('--line-strong', 'rgba(245,245,243,0.22)'),
    t1: tok('--text-1', '#F5F5F3'),
    t2: tok('--text-2', '#B7BDC8'),
    t3: tok('--text-3', '#6E7480'),
    bg3: tok('--bg-3', '#1C212B'),
    accent: tok('--accent-1', '#BB462E'),
  };
}
