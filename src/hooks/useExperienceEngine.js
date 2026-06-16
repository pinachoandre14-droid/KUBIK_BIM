import { useEffect } from 'react';

/* =========================================================================
   SUBURBIA SATÉLITE — interaction engine (React port of script.js)
   Runs once after the experience has mounted. Drives the DOM directly via
   IntersectionObserver + a single rAF scroll loop, exactly like the vanilla
   original. Returns a teardown that removes every listener/observer.
   ========================================================================= */
export function useExperienceEngine() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups = [];
    const observers = [];
    const addEvt = (target, type, fn, opts) => {
      target.addEventListener(type, fn, opts);
      cleanups.push(() => target.removeEventListener(type, fn, opts));
    };

    /* ---------- REVEAL ---------- */
    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            revealIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    observers.push(revealIO);

    function revealScan() {
      document.querySelectorAll('[data-reveal]:not(.in)').forEach((el) => revealIO.observe(el));
      document.querySelectorAll('.reveal-words:not(.in)').forEach((el) => revealIO.observe(el));
    }
    function revealFallback() {
      const vh = window.innerHeight;
      document.querySelectorAll('[data-reveal]:not(.in), .reveal-words:not(.in)').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add('in');
      });
    }

    /* ---------- STAGGER ---------- */
    function applyStagger() {
      document.querySelectorAll('[data-stagger]').forEach((c) => {
        const step = parseInt(c.getAttribute('data-stagger'), 10) || 90;
        c.querySelectorAll('[data-reveal]').forEach((k, i) => {
          k.style.setProperty('--d', i * step + 'ms');
        });
      });
    }

    /* ---------- WORD SPLIT (preserves <em> accent) ---------- */
    function splitWords() {
      document.querySelectorAll('[data-words]').forEach((el) => {
        if (el.dataset.split === '1') return;
        el.dataset.split = '1';
        const nodes = [].slice.call(el.childNodes);
        el.textContent = '';
        el.classList.add('reveal-words');
        let i = 0;
        const addWord = (word, accent) => {
          const span = document.createElement('span');
          span.className = 'w';
          const inner = document.createElement('i');
          if (accent) inner.className = 'accent';
          inner.textContent = word;
          inner.style.setProperty('--wd', i * 70 + 'ms');
          span.appendChild(inner);
          el.appendChild(span);
          el.appendChild(document.createTextNode(' '));
          i++;
        };
        nodes.forEach((node) => {
          const accent = node.nodeType === 1 && node.tagName.toLowerCase() === 'em';
          const txt = (node.textContent || '').trim();
          if (!txt) return;
          txt.split(/\s+/).forEach((w) => addWord(w, accent));
        });
      });
    }
    function kickHeroWords() {
      document.querySelectorAll('.cover [data-words]').forEach((el) => el.classList.add('in'));
    }

    /* ---------- PARALLAX + scroll chrome ---------- */
    let parallaxEls = [];
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const vh = window.innerHeight;
        const docH = document.documentElement.scrollHeight - vh;
        const sy = window.scrollY;

        const bar = document.querySelector('.progress-bar');
        if (bar) bar.style.width = (docH > 0 ? (sy / docH) * 100 : 0) + '%';

        if (!reduce) {
          const tmult = typeof window.__TEMPO_MULT === 'number' ? window.__TEMPO_MULT : 1;
          for (let i = 0; i < parallaxEls.length; i++) {
            const el = parallaxEls[i];
            const speed = (parseFloat(el.getAttribute('data-parallax')) || 0.15) * tmult;
            const r = el.getBoundingClientRect();
            const mid = r.top + r.height / 2 - vh / 2;
            el.style.transform = 'translate3d(0,' + (-mid * speed).toFixed(2) + 'px,0)';
          }
        }

        revealFallback();
        const cue = document.querySelector('.scrollcue');
        if (cue) cue.style.opacity = sy > vh * 0.5 ? '0' : '1';

        ticking = false;
      });
    }

    /* ---------- CHAPTER NAV ---------- */
    function setupChapterNav() {
      const buttons = [].slice.call(document.querySelectorAll('.chapternav button'));
      if (!buttons.length) return;
      const map = {};
      buttons.forEach((b) => {
        const id = b.getAttribute('data-target');
        const sec = document.getElementById(id);
        if (sec) map[id] = { btn: b, sec };
        const handler = () => {
          const t = document.getElementById(id);
          if (t) t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
        };
        b.addEventListener('click', handler);
        cleanups.push(() => b.removeEventListener('click', handler));
      });
      const navIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const id = e.target.id;
            if (e.isIntersecting && map[id]) {
              buttons.forEach((b) => b.classList.remove('active'));
              map[id].btn.classList.add('active');
            }
          });
        },
        { threshold: 0.0, rootMargin: '-45% 0px -45% 0px' }
      );
      Object.keys(map).forEach((k) => navIO.observe(map[k].sec));
      observers.push(navIO);
    }

    /* ---------- BEFORE / AFTER COMPARISON ---------- */
    function setupCompare() {
      document.querySelectorAll('.compare').forEach((cmp) => {
        const after = cmp.querySelector('.cmp-after');
        const handle = cmp.querySelector('.cmp-handle');
        let dragging = false;
        const pt = (e) => (e.touches ? e.touches[0].clientX : e.clientX);
        const setPos = (clientX) => {
          const r = cmp.getBoundingClientRect();
          const x = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
          const pct = x * 100;
          if (after) after.style.clipPath = 'inset(0 0 0 ' + pct + '%)';
          if (handle) handle.style.left = pct + '%';
        };
        const down = (e) => { dragging = true; setPos(pt(e)); e.preventDefault(); };
        const move = (e) => { if (dragging) setPos(pt(e)); };
        const up = () => { dragging = false; };
        cmp.addEventListener('mousedown', down);
        cmp.addEventListener('touchstart', down, { passive: false });
        window.addEventListener('mousemove', move);
        window.addEventListener('touchmove', move, { passive: false });
        window.addEventListener('mouseup', up);
        window.addEventListener('touchend', up);
        cleanups.push(() => {
          cmp.removeEventListener('mousedown', down);
          cmp.removeEventListener('touchstart', down);
          window.removeEventListener('mousemove', move);
          window.removeEventListener('touchmove', move);
          window.removeEventListener('mouseup', up);
          window.removeEventListener('touchend', up);
        });
        const io = new IntersectionObserver(
          (en) => en.forEach((x) => { if (x.isIntersecting) { cmp.classList.add('in'); io.unobserve(cmp); } }),
          { threshold: 0.3 }
        );
        io.observe(cmp);
        observers.push(io);
      });
    }

    /* ---------- COUNTERS ---------- */
    function setupCounters() {
      const format = (target, dec) => target.toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target;
            io.unobserve(el);
            const target = parseFloat(el.getAttribute('data-count'));
            const dec = parseInt(el.getAttribute('data-dec') || '0', 10);
            const dur = reduce ? 1 : 1500;
            const start = performance.now();
            let done = false;
            const tick = (t) => {
              const p = Math.min(1, (t - start) / dur);
              const v = (1 - Math.pow(1 - p, 3)) * target;
              el.textContent = format(v, dec);
              if (p < 1) requestAnimationFrame(tick);
              else { el.textContent = format(target, dec); done = true; }
            };
            requestAnimationFrame(tick);
            setTimeout(() => { if (!done) el.textContent = format(target, dec); }, dur + 1200);
          });
        },
        { threshold: 0.5 }
      );
      document.querySelectorAll('[data-count]').forEach((el) => io.observe(el));
      observers.push(io);
    }

    /* ---------- IN-VIEW (timeline, bep, charts) ---------- */
    function setupInView() {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
        { threshold: 0.25 }
      );
      document.querySelectorAll('.tl-row, .chart-cell, .bep-stage').forEach((el) => io.observe(el));
      observers.push(io);
    }

    /* ---------- HERO MOUSE PARALLAX ---------- */
    function setupMouseParallax() {
      if (reduce) return;
      const scopes = [].slice.call(document.querySelectorAll('[data-mouse]'));
      if (!scopes.length) return;
      const handler = (e) => {
        const mx = e.clientX / window.innerWidth - 0.5;
        const my = e.clientY / window.innerHeight - 0.5;
        const tmult = typeof window.__TEMPO_MULT === 'number' ? window.__TEMPO_MULT : 1;
        scopes.forEach((sc) => {
          sc.querySelectorAll('[data-mouse-depth]').forEach((el) => {
            const d = (parseFloat(el.getAttribute('data-mouse-depth')) || 10) * tmult;
            el.style.transform =
              'translate3d(' + (-mx * d).toFixed(2) + 'px,' + (-my * d).toFixed(2) + 'px,0)';
          });
        });
      };
      addEvt(window, 'mousemove', handler);
    }

    /* ---------- INIT ---------- */
    splitWords();
    applyStagger();
    revealScan();
    parallaxEls = [].slice.call(document.querySelectorAll('[data-parallax]'));
    onScroll();
    setupChapterNav();
    setupCompare();
    setupCounters();
    setupInView();
    setupMouseParallax();
    addEvt(window, 'scroll', onScroll, { passive: true });
    addEvt(window, 'resize', onScroll);

    // Kick first reveals (preloader handles its own; this covers the cover hero)
    revealScan();
    kickHeroWords();
    revealFallback();

    return () => {
      cleanups.forEach((fn) => fn());
      observers.forEach((o) => o.disconnect());
    };
  }, []);
}
