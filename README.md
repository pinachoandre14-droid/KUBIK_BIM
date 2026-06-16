# Suburbia Satélite — BIM Experience · KUBIK STUDIO

Experiencia web tipo *scroll-storytelling* que documenta el proceso de modelado BIM (LOD 350) del proyecto **Suburbia Satélite** en Cd. Satélite, Naucalpan. Migrada del prototipo HTML/CSS/JS vanilla a **React + Vite**.

## Stack

- **React 18** + **Vite 5**
- **Chart.js 4** para los dashboards de clash detection y presupuesto de obra
- CSS puro con design tokens (sin framework de estilos)

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera /dist
npm run preview  # sirve el build de producción
```

## Estructura

```
public/uploads/          Assets (videos, renders, fotos) — servidos en la raíz
src/
  main.jsx               Punto de entrada
  App.jsx                Composición de capítulos
  index.css              Design tokens + todos los estilos
  hooks/
    useExperienceEngine.js   Motor de scroll/reveal/parallax/counters (port de script.js)
  data/
    projects.js          Datos del carrusel de sucursales
    charts.js            Datos de clash detection y presupuesto
  components/
    Preloader.jsx        Contador 000→100 + lock de scroll
    Chrome.jsx           Barra de progreso, topbar, nav de capítulos, scroll cue
    Cover.jsx            Hero con video
    Prologue.jsx         Equipo, misión/visión, orgchart, BEP constellation
    Chapter01–05.jsx     Los cinco capítulos
    Projects.jsx         Carrusel + lightbox de Otras Sucursales
    End.jsx              Créditos
```

## Capítulos

| ID | Título | Contenido |
|----|--------|-----------|
| `cover` | Cover | Hero con video en loop, logo, datos del proyecto |
| `prologue` | Prólogo · El Estudio | Foto de equipo, BEP constellation, orgchart, team strip |
| `ch01` | El Reto | Hero full-bleed con video, datos del edificio |
| `ch02` | Gemelo Digital | Video en loop de 5 disciplinas + leyenda |
| `ch03` | Coordinación | Clash detection dashboard (radar + barras), compare slider |
| `ch04` | Desarrollo | Timeline del proyecto |
| `ch05` | Resultado Final | Hero render + presupuesto de obra + galería 4-up |
| `proyectos` | Otras Sucursales | Carrusel horizontal + lightbox con galería por proyecto |
| `end` | Fin | Pantalla de créditos |

## Design Tokens

Definidos en `:root` dentro de [src/index.css](src/index.css). Tema por defecto: terracota.
El sistema soporta atmósferas alternativas vía `data-atmo` en `<html>` (`blueprint`, `concrete`, `ember`).

## Notas

- Los datos de presupuesto son de referencia (UniFormat 2010 · BIMSA 2025–2026). Sustituir por datos reales antes de publicar.
- Los videos del carrusel usan `preload="auto"`; considerar `preload="metadata"` en producción para reducir descarga inicial.
- El panel de Tweaks del handoff original (atmósfera/voz/tempo) no se incluye en esta migración; las atmósferas pueden activarse manualmente con el atributo `data-atmo`.
