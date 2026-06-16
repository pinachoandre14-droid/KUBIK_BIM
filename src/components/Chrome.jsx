// Fixed chrome: progress bar, topbar, side chapter nav, scroll cue.
const CHAPTERS = [
  { target: 'prologue', label: 'Prólogo' },
  { target: 'ch01', label: 'El Reto' },
  { target: 'ch02', label: 'Gemelo Digital' },
  { target: 'ch03', label: 'Coordinación' },
  { target: 'ch04', label: 'Desarrollo' },
  { target: 'ch05', label: 'Resultado Final' },
];

export default function Chrome() {
  return (
    <>
      <div className="progress-track"><div className="progress-bar" /></div>

      <header className="topbar">
        <a className="brand" href="#cover">KUBIK<span>·</span>STUDIO</a>
        <div className="ticker">
          <span className="dot" />
          <span>BUILDING INFORMATION MODELING</span>
          <span>BIM · LOD 350</span>
        </div>
      </header>

      <nav className="chapternav" aria-label="Capítulos">
        {CHAPTERS.map((c, i) => (
          <button key={c.target} data-target={c.target} className={i === 0 ? 'active' : undefined}>
            <span className="nlabel">{c.label}</span>
            <span className="nline" />
          </button>
        ))}
      </nav>

      <div className="scrollcue"><span>Desliza</span><span className="bar" /></div>
    </>
  );
}
