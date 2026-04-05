import React, { useEffect, useRef } from 'react';
import './Loader.css';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const fhWrapRef    = useRef<HTMLDivElement>(null);
  const grainInRef   = useRef<HTMLDivElement>(null);
  const hwRef        = useRef<HTMLDivElement>(null);
  const hStrokeRef   = useRef<SVGPathElement>(null);
  const hFillRef     = useRef<SVGPathElement>(null);
  const heartSecRef  = useRef<HTMLDivElement>(null);
  const ph1Ref       = useRef<HTMLDivElement>(null);
  const f1Ref        = useRef<HTMLDivElement>(null);
  const d1Ref        = useRef<HTMLDivElement>(null);
  const p1Ref        = useRef<HTMLSpanElement>(null);
  const tbRef        = useRef<HTMLDivElement>(null);
  const rUVRef       = useRef<HTMLDivElement>(null);
  const rLoveRef     = useRef<HTMLDivElement>(null);
  const rStoryRef    = useRef<HTMLDivElement>(null);
  const ornRef       = useRef<HTMLDivElement>(null);
  const lsRef        = useRef<HTMLDivElement>(null);
  const ph2Ref       = useRef<HTMLDivElement>(null);
  const f2Ref        = useRef<HTMLDivElement>(null);
  const p2Ref        = useRef<HTMLSpanElement>(null);
  const subRef       = useRef<HTMLDivElement>(null);
  const cGlowRef     = useRef<HTMLDivElement>(null);
  const lbTRef       = useRef<HTMLDivElement>(null);
  const lbBRef       = useRef<HTMLDivElement>(null);
  // keeps a reference to the hSvg element for coordinate transform
  const hSvgRef      = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // ── utils ──
    const easeIO = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const wait = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    // ── grain texture ──
    if (grainInRef.current) {
      const c = document.createElement('canvas');
      c.width = 150; c.height = 150;
      const x = c.getContext('2d')!;
      const d = x.createImageData(150, 150);
      for (let i = 0; i < d.data.length; i += 4) {
        const v = Math.random() * 255;
        d.data[i] = d.data[i + 1] = d.data[i + 2] = v;
        d.data[i + 3] = 255;
      }
      x.putImageData(d, 0, 0);
      grainInRef.current.style.backgroundImage = `url(${c.toDataURL()})`;
    }

    // ── floating hearts ──
    if (fhWrapRef.current) {
      for (let i = 0; i < 18; i++) {
        const s = document.createElement('span');
        s.className = 'ldr-fh';
        s.innerHTML = '&#9829;';
        s.style.setProperty('--dl', `${Math.random() * 9}s`);
        s.style.setProperty('--d',  `${9 + Math.random() * 8}s`);
        s.style.setProperty('--s',  `${9 + Math.random() * 15}px`);
        s.style.setProperty('--o',  `${0.04 + Math.random() * 0.08}`);
        s.style.setProperty('--r',  `${-35 + Math.random() * 70}deg`);
        s.style.left = `${Math.random() * 100}%`;
        fhWrapRef.current.appendChild(s);
      }
    }

    // ── bokeh canvas ──
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // bokeh particles
    let bokehBurst = false;
    interface BokehParticle {
      x: number; y: number; r: number; op: number;
      vx: number; vy: number; gold: boolean;
      pulse: number; ps: number;
    }
    const bokehs: BokehParticle[] = [];
    const makeBokeh = (init: boolean): BokehParticle => ({
      x:     Math.random() * W,
      y:     init ? Math.random() * H : H + 50,
      r:     18 + Math.random() * 45,
      op:    0.008 + Math.random() * 0.035,
      vx:    (Math.random() - 0.5) * 0.25,
      vy:    -(0.12 + Math.random() * 0.35),
      gold:  Math.random() > 0.55,
      pulse: Math.random() * 6.28,
      ps:    0.008 + Math.random() * 0.015,
    });
    for (let i = 0; i < 45; i++) bokehs.push(makeBokeh(true));

    // tip (trail) particles
    interface TipParticle {
      x: number; y: number; vx: number; vy: number;
      life: number; decay: number; sz: number; gold: boolean;
    }
    const tipParts: TipParticle[] = [];

    function drawFrame() {
      ctx.clearRect(0, 0, W, H);

      // bokeh
      for (const b of bokehs) {
        b.x += b.vx; b.y += b.vy; b.pulse += b.ps;
        if (b.y < -60 || b.x < -60 || b.x > W + 60) {
          Object.assign(b, makeBokeh(false));
        }
        if (bokehBurst) { b.op *= 2.8; b.vy *= 1.6; }
        const o = b.op * (0.55 + 0.45 * Math.sin(b.pulse));
        const rr = Math.max(1, b.r);
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, rr);
        if (b.gold) {
          g.addColorStop(0, `rgba(212,168,83,${o})`);
          g.addColorStop(1, 'rgba(212,168,83,0)');
        } else {
          g.addColorStop(0, `rgba(232,54,78,${o})`);
          g.addColorStop(1, 'rgba(232,54,78,0)');
        }
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(b.x, b.y, rr, 0, Math.PI * 2); ctx.fill();
      }

      // tip particles
      ctx.globalCompositeOperation = 'lighter';
      for (let i = tipParts.length - 1; i >= 0; i--) {
        const p = tipParts[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.015; p.life -= p.decay;
        if (p.life <= 0) { tipParts.splice(i, 1); continue; }
        const a = p.life * 0.7;
        ctx.fillStyle = p.gold
          ? `rgba(212,168,83,${a * 0.25})`
          : `rgba(232,54,78,${a * 0.25})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0.1, p.sz * 3), 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = p.gold
          ? `rgba(240,212,138,${a * 0.7})`
          : `rgba(255,180,180,${a * 0.7})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0.1, p.sz), 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';

      rafId = requestAnimationFrame(drawFrame);
    }
    let rafId = requestAnimationFrame(drawFrame);

    // ── helpers ──
    function svgToScreen(sx: number, sy: number) {
      const svg = hSvgRef.current;
      if (!svg) return { x: 0, y: 0 };
      const r  = svg.getBoundingClientRect();
      const vb = svg.viewBox.baseVal;
      return {
        x: r.left + (sx / vb.width)  * r.width,
        y: r.top  + (sy / vb.height) * r.height,
      };
    }

    function emitTip(sx: number, sy: number) {
      const sc = svgToScreen(sx, sy);
      for (let i = 0; i < 3; i++) {
        tipParts.push({
          x: sc.x + (Math.random() - 0.5) * 8,
          y: sc.y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 0.6,
          life: 1,
          decay: 0.018 + Math.random() * 0.02,
          sz: 1 + Math.random() * 1.8,
          gold: Math.random() > 0.4,
        });
      }
    }

    function burstSparkles(el: HTMLElement) {
      const r  = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top  + r.height / 2;
      const cols = ['#e8364e','#d4a853','#f0d48a','#fff5eb','#ff6b81'];
      for (let i = 0; i < 10; i++) {
        const s   = document.createElement('span');
        s.className = 'ldr-spk';
        const a    = (Math.PI * 2 / 10) * i + (Math.random() - 0.5) * 0.6;
        const dist = 22 + Math.random() * 30;
        s.style.setProperty('--tx', `${Math.cos(a) * dist}px`);
        s.style.setProperty('--ty', `${Math.sin(a) * dist}px`);
        const sz = 2 + Math.random() * 3;
        s.style.width      = sz + 'px';
        s.style.height     = sz + 'px';
        s.style.left       = cx + 'px';
        s.style.top        = cy + 'px';
        s.style.background = cols[Math.floor(Math.random() * cols.length)];
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 600);
      }
    }

    // ── build title chars ──
    const uvChars:    HTMLSpanElement[] = [];
    const loveChars:  HTMLSpanElement[] = [];
    const storyChars: HTMLSpanElement[] = [];

    const makeChars = (
      container: HTMLElement | null,
      text: string,
      cls: string,
      arr: HTMLSpanElement[],
    ) => {
      if (!container) return;
      for (const ch of text) {
        const s = document.createElement('span');
        s.className   = `ldr-tc ${cls}`;
        s.textContent = ch;
        container.appendChild(s);
        arr.push(s);
      }
    };
    makeChars(rUVRef.current,    'UV',    'uv', uvChars);
    makeChars(rLoveRef.current,  'Love',  'sc', loveChars);
    makeChars(rStoryRef.current, 'Story', 'st', storyChars);
    const allChars = [...uvChars, ...loveChars, ...storyChars];

    function revealSeq(chars: HTMLSpanElement[], interval: number) {
      return new Promise<void>(resolve => {
        let i = 0;
        function next() {
          if (i >= chars.length) { resolve(); return; }
          chars[i].classList.add('rev');
          burstSparkles(chars[i]);
          i++;
          setTimeout(next, interval);
        }
        next();
      });
    }

    // ── phase 1 – heart draw + bar ──
    function runPhase1(dur: number) {
      return new Promise<void>(resolve => {
        const hStroke = hStrokeRef.current;
        const hFill   = hFillRef.current;
        if (!hStroke || !hFill) { resolve(); return; }

        const pathLen = hStroke.getTotalLength();
        hStroke.style.strokeDasharray  = String(pathLen);
        hStroke.style.strokeDashoffset = String(pathLen);

        const t0 = performance.now();
        function tick(now: number) {
          const t = Math.min((now - t0) / dur, 1);
          const e = easeIO(t);

          hStroke.style.strokeDashoffset = String(pathLen * (1 - e));
          hFill.setAttribute('opacity', String(e * 0.85));

          const pct = Math.round(e * 100);
          if (f1Ref.current) f1Ref.current.style.width = pct + '%';
          if (d1Ref.current) d1Ref.current.style.left  = pct + '%';
          if (p1Ref.current) p1Ref.current.textContent  = pct + '%';

          if (t < 0.98) {
            const pt = hStroke.getPointAtLength(e * pathLen);
            emitTip(pt.x, pt.y);
          }

          if (t < 1) { requestAnimationFrame(tick); } else { resolve(); }
        }
        requestAnimationFrame(tick);
      });
    }

    // ── phase 2 – golden bar ──
    function runPhase2(dur: number) {
      return new Promise<void>(resolve => {
        const t0 = performance.now();
        function tick(now: number) {
          const t   = Math.min((now - t0) / dur, 1);
          const e   = easeIO(t);
          const pct = Math.round(e * 100);
          if (f2Ref.current) f2Ref.current.style.width  = pct + '%';
          if (p2Ref.current) p2Ref.current.textContent   = pct + '%';
          if (t < 1) { requestAnimationFrame(tick); } else { resolve(); }
        }
        requestAnimationFrame(tick);
      });
    }

    // ── main animation sequence ──
    async function startSequence() {
      await wait(300);
      hwRef.current?.classList.add('show');
      await wait(200);
      ph1Ref.current?.classList.add('show');
      await wait(100);

      await runPhase1(2400);

      hwRef.current?.classList.add('beat');
      await wait(750);

      hwRef.current?.classList.remove('beat');
      hwRef.current?.classList.add('die');
      ph1Ref.current?.classList.remove('show');
      ph1Ref.current?.classList.add('hide');
      await wait(550);
      if (heartSecRef.current) heartSecRef.current.style.display = 'none';

      tbRef.current?.classList.add('show');
      await wait(350);

      await revealSeq(uvChars, 220);
      await wait(120);

      ornRef.current?.classList.add('show');
      await wait(450);

      await revealSeq(loveChars, 190);
      await wait(100);

      await revealSeq(storyChars, 180);
      await wait(350);

      lsRef.current?.classList.add('go');
      await wait(900);

      ph2Ref.current?.classList.add('show');
      await wait(150);
      await runPhase2(2000);

      ph2Ref.current?.classList.remove('show');
      ph2Ref.current?.classList.add('hide');
      await wait(450);
      if (ph2Ref.current) ph2Ref.current.style.display = 'none';

      cGlowRef.current?.classList.add('flash');
      bokehBurst = true;
      setTimeout(() => (bokehBurst = false), 1800);

      lbTRef.current?.classList.add('open');
      lbBRef.current?.classList.add('open');

      allChars.forEach((c, i) => {
        setTimeout(() => {
          c.classList.add('shimmer');
          setTimeout(() => c.classList.remove('shimmer'), 550);
        }, i * 70);
      });

      subRef.current?.classList.add('show');

      // small pause so the subtitle breathes before unmounting
      await wait(2000);
      onComplete();
    }

    startSequence();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="loader-container">
      {/* Mesh blobs */}
      <div className="ldr-mesh">
        <div className="ldr-mesh-b" />
        <div className="ldr-mesh-b" />
        <div className="ldr-mesh-b" />
      </div>

      {/* Bokeh canvas */}
      <canvas id="ldr-bokeh" ref={canvasRef} />

      {/* Floating hearts */}
      <div className="ldr-fh-wrap" ref={fhWrapRef} />

      {/* Film grain */}
      <div className="ldr-grain">
        <div className="ldr-grain-in" ref={grainInRef} />
      </div>

      {/* Vignette */}
      <div className="ldr-vignette" />

      {/* Completion glow */}
      <div className="ldr-c-glow" ref={cGlowRef} />

      {/* Letterbox bars */}
      <div className="ldr-lb t" ref={lbTRef} />
      <div className="ldr-lb b" ref={lbBRef} />

      {/* ── Scene ── */}
      <main className="ldr-scene">

        {/* Heart + Phase 1 */}
        <div ref={heartSecRef}>
          <div className="ldr-hw" ref={hwRef}>
            <div className="ldr-hr" />
            <div className="ldr-hr" />
            <div className="ldr-hr" />
            <svg viewBox="0 0 64 64" ref={hSvgRef}>
              <defs>
                <linearGradient id="ldr-hgF" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#e8364e" />
                  <stop offset="100%" stopColor="#d4a853" />
                </linearGradient>
                <linearGradient id="ldr-hgS" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#ff6b81" />
                  <stop offset="100%" stopColor="#f0d48a" />
                </linearGradient>
                <filter id="ldr-hGl">
                  <feGaussianBlur stdDeviation="1.8" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                ref={hFillRef}
                d="M32 58C32 58 4 38 4 20 4 10 12 4 20 4 26 4 30 8 32 12 34 8 38 4 44 4 52 4 60 10 60 20 60 38 32 58 32 58Z"
                fill="url(#ldr-hgF)"
                opacity="0"
              />
              <path
                ref={hStrokeRef}
                d="M32 58C32 58 4 38 4 20 4 10 12 4 20 4 26 4 30 8 32 12 34 8 38 4 44 4 52 4 60 10 60 20 60 38 32 58 32 58Z"
                fill="none"
                stroke="url(#ldr-hgS)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#ldr-hGl)"
              />
            </svg>
          </div>

          {/* Phase 1 bar */}
          <div className="ldr-ph" ref={ph1Ref}>
            <span className="ldr-pl">Preparing the story</span>
            <div className="ldr-ptw">
              <div className="ldr-pt">
                <div className="ldr-pf rb" ref={f1Ref} />
              </div>
              <div className="ldr-pd" ref={d1Ref} />
            </div>
            <span className="ldr-pp" ref={p1Ref}>0%</span>
          </div>
        </div>

        {/* Title block */}
        <div className="ldr-tb" ref={tbRef}>
          <div className="ldr-tr" ref={rUVRef} />
          <div className="ldr-orn" ref={ornRef}>
            <div className="ldr-ol" />
            <span className="ldr-oh">&#9829;</span>
            <div className="ldr-ol" />
          </div>
          <div className="ldr-tr" ref={rLoveRef} />
          <div className="ldr-tr" ref={rStoryRef} />
          <div className="ldr-ls" ref={lsRef} />
        </div>

        {/* Phase 2 bar */}
        <div className="ldr-ph" ref={ph2Ref}>
          <span className="ldr-pl">Writing your chapter</span>
          <div className="ldr-ptw">
            <div className="ldr-pt p2t">
              <div className="ldr-pf gb" ref={f2Ref} />
            </div>
          </div>
          <span className="ldr-pp" ref={p2Ref}>0%</span>
        </div>

        {/* Subtitle */}
        <div className="ldr-sub" ref={subRef}>a tale written in the stars</div>
      </main>
    </div>
  );
};

export default Loader;
