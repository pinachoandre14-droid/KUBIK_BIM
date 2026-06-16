import { useExperienceEngine } from './hooks/useExperienceEngine.js';
import Preloader from './components/Preloader.jsx';
import Chrome from './components/Chrome.jsx';
import Cover from './components/Cover.jsx';
import Prologue from './components/Prologue.jsx';
import Chapter01 from './components/Chapter01.jsx';
import Chapter02 from './components/Chapter02.jsx';
import Chapter03 from './components/Chapter03.jsx';
import Chapter04 from './components/Chapter04.jsx';
import Chapter05 from './components/Chapter05.jsx';
import Projects from './components/Projects.jsx';
import End from './components/End.jsx';

export default function App() {
  // Engine attaches once the static experience DOM is mounted.
  useExperienceEngine();

  return (
    <>
      <Preloader />
      <Chrome />
      <main>
        <Cover />
        <Prologue />
        <Chapter01 />
        <Chapter02 />
        <Chapter03 />
        <Chapter04 />
        <Chapter05 />
        <Projects />
        <End />
      </main>
    </>
  );
}
