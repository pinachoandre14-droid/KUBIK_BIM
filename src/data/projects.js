// Otras Sucursales · Liverpool Express — carrusel + lightbox data
export const projects = [
  {
    branch: 'tizayuca',
    title: 'Liverpool Express Tizayuca',
    loc: 'Tizayuca · Hidalgo',
    place: 'Plaza Tizara',
    area: '100 m²',
    height: '4.6 m',
    lod: 'LOD 350',
    year: '2024',
    disc: 'Arquitectura · Estructura · Hidráulica · Sanitaria · Pluvial · PCI · HVAC · Eléctrica',
    desc: 'Sucursal dentro de Plaza Tizara con fachada de muro cortina y doble altura al centro, con dos niveles de lecho bajo plafón. Estructura de marcos de acero sobre cimentación de concreto. Incluye sanitario y cuarto de site, con cerca de 25 piezas de mobiliario de exhibición.',
  },
  {
    branch: 'tulum',
    title: 'Liverpool Express Tulum',
    loc: 'Tulum · Quintana Roo',
    place: 'Hunab Lifestyle Center',
    area: '430 m²',
    height: '4.0 m',
    lod: 'LOD 350',
    year: '2024',
    disc: 'Arquitectura · Estructura · Hidráulica · Sanitaria · Pluvial · PCI · HVAC · Eléctrica',
    desc: 'Sucursal dentro de Hunab Lifestyle Center, en una plaza comercial abierta de usos mixtos. Estructura de concreto y acero reforzado (~4 m de altura). Integra área de ventas, tecnología, hogar, mobiliario de exhibición, bodega de apoyo y espacios de operación omnicanal. La selección de materiales atiende el clima cálido y húmedo de Tulum.',
  },
  {
    branch: 'ensenada',
    title: 'Liverpool Express Ensenada',
    loc: 'Ensenada · Baja California',
    place: 'Plaza Santa Lucía',
    area: '300 m²',
    height: '3.0 m',
    lod: 'LOD 350',
    year: '2024',
    disc: 'Arquitectura · Estructura · Hidráulica · Sanitaria · Pluvial · PCI · HVAC · Eléctrica',
    desc: 'Sucursal dentro de Plaza Santa Lucía con fachada de muro cortina. Estructura de marcos de acero sobre cimentación de concreto (3 m de altura). Integra área de tecnología, probadores, hogar, sanitario, bodegas y cuarto de site, con cerca de 75 piezas de mobiliario de exhibición.',
  },
  {
    branch: 'tuxtla',
    title: 'Liverpool Express San Andrés Tuxtla',
    loc: 'San Andrés Tuxtla · Veracruz',
    place: 'Plaza comercial',
    area: '112 m²',
    height: '5.0 m',
    lod: 'LOD 350',
    year: '2024',
    disc: 'Arquitectura · Estructura · Hidráulica · Sanitaria · Pluvial · PCI · HVAC · Eléctrica',
    desc: 'Sucursal con fachada de muro cortina, integrada en una plaza comercial de una sola planta. Estructura de marcos de acero sobre cimentación de concreto (5 m de altura). Integra área de tecnología, probadores, hogar, sanitario y bodegas, con cerca de 15 piezas de mobiliario de exhibición.',
  },
  {
    branch: 'cardenas',
    title: 'Liverpool Express Lázaro Cárdenas',
    loc: 'Lázaro Cárdenas · Michoacán',
    place: 'Plaza Las Américas',
    area: '311 m²',
    height: '—',
    lod: 'LOD 350',
    year: '2024',
    disc: 'Arquitectura · Estructura · Hidráulica · Sanitaria · Pluvial · PCI · HVAC · Eléctrica',
    desc: 'Sucursal dentro de Plaza Las Américas, con fachada hacia el interior del centro comercial. Integra área de ventas, tecnología, probadores, hogar, sanitario, bodega y mobiliario de exhibición. La estructura y las instalaciones se coordinan con las condiciones existentes del local y de la plaza.',
  },
];

// Gallery file descriptors for the lightbox
export const galleryFiles = [
  { f: 'render-ext', label: 'Render Exterior', type: 'img', ext: 'png' },
  { f: 'render-int', label: 'Render Interior', type: 'img', ext: 'png' },
  { f: 'fed', label: 'Modelo Federado', type: 'video', ext: 'mp4' },
];

export const mediaPath = (branch, o) =>
  `uploads/carrusel/liverpool-${branch}/liverpool-${branch}-${o.f}.${o.ext}`;
export const thumbPath = (branch) =>
  `uploads/carrusel/liverpool-${branch}/liverpool-${branch}-thumb.png`;

// Build the ordered media list for a branch
export const buildGallery = (branch) =>
  galleryFiles.map((o) => ({
    src: mediaPath(branch, o),
    label: o.label,
    type: o.type,
    thumb: o.type === 'video' ? thumbPath(branch) : mediaPath(branch, o),
  }));
