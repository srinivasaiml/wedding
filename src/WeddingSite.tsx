import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './WeddingSite.css';

// Real assets — imported as module URLs (Vite handles these)
import lookingEachother from './assets/lookingEachother.jpeg';
import callsImg from './assets/calls.jpeg';
import hugImg from './assets/hug.jpeg';
import journeyImg from './assets/journey.jpeg';

const MUSIC_FILES = [
  new URL('./assets/music1.mpeg', import.meta.url).href,
  new URL('./assets/bgm.mpeg', import.meta.url).href
];

import Feedback from './components/Feedback';
import Loader from './components/Loader';

gsap.registerPlugin(ScrollTrigger);

/* ─────────── EPISODES — real images from assets ─────────── */
const EPISODES = [
  {
    id: '01',
    tag: 'Episode 01',
    titleEn: 'Modati Choopu',
    titleTel: 'మొదటి చూపు',
    date: 'March 18, 2021',
    image: lookingEachother,
    text: `నేను తనని మొదటి సారి చూసిన రోజు… అది ఒక సాధారణ exam రోజు… <br/><br/>
అందరూ paper లో busy ga ఉన్నారు… కానీ నా life లో important question paper కాదు… తను… <br/><br/>
తను తన అమాయకమైన అందంతో… చిలిపి నవ్వుతో నవ్వింది 😊 <br/><br/>
ఆ నవ్వు చూసిన క్షణంలో… నేను నా exam మర్చిపోయాను… <br/>
Paper లో ఉన్న questions కూడా కనిపించలేదు… నా mind లో ఒకటే question… <br/><br/>
👉 "ఎవరు ఈ అమ్మాయి…?" <br/><br/>
నేను అలా తనని చూస్తూ ఉండిపోయాను… తను కూడా నన్ను చూసి… చూడనట్టు చూసింది 😌 <br/><br/>
కొంచెం ధైర్యం చేసి… number అడిగాను… <br/><br/>
👉 "మోకం మీద ఒకటి ఇస్తా…" 😄 <br/><br/>
ఆ మాటకి భయపడి… నేను అక్కడే ఆగిపోయాను… <br/><br/>
ఆలా కొన్ని రోజులు గడిచాయి… Final year exams start అయ్యాయి… <br/>
ప్రతి రోజు ఒకరి మోకం ఒకరు చూసుకున్నాం… కానీ మాటలు లేవు… <br/><br/>
నేను తనని చూడటంలో busy… తను నన్ను observe చేయటంలో busy… <br/><br/>
ఆలా తెలియకుండానే… తను కూడా నా మీద మనసు పెట్టింది ❤️ <br/><br/>
చివరి exam రోజు… నా దగ్గరకు వచ్చి… తన number ఇచ్చింది… <br/>
ఆ క్షణం… నా life లో first victory లా అనిపించింది…`
  },
  {
    id: '02',
    tag: 'Episode 02',
    titleEn: 'Prema Prarambham',
    titleTel: 'ప్రేమ ప్రారంభం',
    date: 'September 29, 2021',
    image: callsImg,
    text: `Exam అయిన evening… phone ring అయింది… <br/><br/>
👉 "Uma Calling…" <br/><br/>
Call lift చేశాను… <br/><br/>
👩 "Hello…" <br/><br/>
ఆ ఒక్క "Hello"… honey కన్నా sweet గా ఉంది 🍯 <br/>
కోకిల స్వరం కన్నా మధురంగా ఉంది 🕊️ <br/><br/>
ఆ voice వింటుంటే… నా గుండె silent గా నవ్వింది ❤️ <br/><br/>
ఆలా రోజు రోజుకి calls start అయ్యాయి… <br/>
college అయిన తర్వాత కూడా… ప్రతి రోజు… గంటల కొద్దీ మాట్లాడుకున్నాం… <br/><br/>
ఒక 10 రోజుల తర్వాత… నేను ధైర్యం చేసి… నా మనసులో ఉన్న మాటని చెప్పాను… <br/><br/>
👉 "I love you…" ❤️ <br/><br/>
10 seconds silence… <br/><br/>
Uma గుండె కూడా వేగంగా కొట్టుకుంది… నా heartbeat కూడా వినిపించింది… <br/><br/>
తర్వాత… <br/><br/>
👉 "I love you too…" 💖 <br/><br/>
ఆ మాటతో… మా ప్రేమ కథ మొదలైంది…`
  },
  {
    id: '03',
    tag: 'Episode 03',
    titleEn: 'Nijamaina Kalupu',
    titleTel: 'నిజమైన కలుపు',
    date: 'October 18, 2023',
    image: '/image3.jpeg',
    text: `ఒక రోజు… Uma call చేసి… <br/><br/>
👉 "నేను నీ college కి వచ్చాను…" <br/><br/>
ఆ మాటకి… నా మనసులో తెలియని భయం… ఆమె మనసులో కూడా అదే feeling… <br/><br/>
కలిసి… ఒకరి మోకం ఒకరు చూసుకొని… silent అయ్యాం 😶 <br/><br/>
కానీ ఆ silence లో… చాలా ప్రేమ ఉంది… <br/><br/>
తర్వాత photos తీసుకున్నాం 📸 <br/>
College మొత్తం తిరిగాం… అది మనకి ఒక కొత్త ప్రపంచంలా అనిపించింది 🌍 <br/><br/>
కొంచెం తర్వాత… కలిసి భోజనం చేశాం… <br/><br/>
నేను నా చేతితో Uma కి తినిపిస్తున్నప్పుడు… <br/>
నా వేలు… తన పెదవులను తాకాయి… <br/><br/>
ఆ క్షణం… నా మనసులో ఒకటే మాట… <br/>
👉 "ఇది కదా జీవితం…" ❤️ <br/><br/>
తర్వాత bus లో కలిసి ఇంటికి వచ్చాం… <br/>
ఆ రోజు… simple గా కనిపించినా… నా life లో unforgettable memory అయింది…`
  },
  {
    id: '04',
    tag: 'Episode 04',
    titleEn: 'Modati Muddu',
    titleTel: 'మొదటి ముద్దు',
    date: 'July 1, 2024',
    image: hugImg,
    text: `ఒక రోజు… ఇద్దరం కలిసి movie కి వెళ్ళాం 🎥 <br/><br/>
Theatre లో movie నడుస్తుంది… కానీ మన focus movie మీద కాదు… ఒకరి మీద ఒకరికి… <br/><br/>
నేను మెల్లగా… Uma hand పై నా hand పెట్టాను… <br/>
ఆమె hand కొంచెం తడిమింది… <br/><br/>
ఒకరి కళ్ళు ఒకరు చూసుకున్నాం 👀 <br/>
Slow ga… ఇంక దగ్గర అయ్యాం… <br/><br/>
మన శ్వాస ఒకటి అయింది… గుండె దడకన ఒకటే అయింది 💓 <br/><br/>
ఆ చూపులో ఉన్న ప్రేమ… ఆ క్షణంలో ఉన్న magic… <br/>
నేను నేను కాదు… తను తను కాదు… <br/><br/>
👉 మనం ఒకరం అయ్యాం… <br/><br/>
💋 నేను Uma ని kiss చేశాను… <br/><br/>
Uma… తన కళ్ళు మూసుకోకుండా… నా వైపు చూసింది… <br/><br/>
ఆ క్షణం… మా life లో ఎప్పటికీ మర్చిపోలేని memory అయింది… <br/><br/>
👉 Movie flop… 👉 మన love story super hit ❤️🔥`
  },
  {
    id: '05',
    tag: 'Episode 05',
    titleEn: 'Prayanam',
    titleTel: 'ప్రయాణం – కలిసి నడిచే దూరం',
    date: 'March 11, 2026',
    image: journeyImg,
    text: `రాత్రి సమయం… train మెల్లగా నడుస్తుంది 🚆 <br/>
బయట lights అన్నీ వేగంగా వెళ్తున్నాయి… కానీ మా మధ్య time slow అయింది… <br/><br/>
Window పక్కన కూర్చొని… ఇద్దరం silent గా ఉన్నాం… <br/>
ఈ సారి silence awkward కాదు… అది comfort ❤️ <br/><br/>
Uma మెల్లగా… నా shoulder మీద తన తల పెట్టింది 😌 <br/><br/>
ఆ క్షణంలో… నా గుండె దడకన తనకి వినిపించింది 💓 <br/><br/>
కొంతసేపటి తర్వాత… ఆమె నెమ్మదిగా అడిగింది… <br/><br/>
👉 "Vasu…" <br/>
👉 "Hmm…" <br/>
👉 "ఇది ఎప్పటికీ ఇలానే ఉంటుందా…?" <br/><br/>
నేను కొంచెం నవ్వి… తన చేతిని గట్టిగా పట్టుకుని… <br/><br/>
👉 "Train ఆగిపోతుంది… కానీ మా journey ఆగదు…" ❤️ <br/><br/>
ఆమె ఏమీ మాట్లాడలేదు… కానీ తన grip ఇంకొంచెం strong అయింది… <br/><br/>
ఆ grip లో… భయం లేదు… doubt లేదు… <br/>
👉 నమ్మకం ఉంది… <br/><br/>
Train ముందుకు వెళ్తుంది… మన life కూడా అలాగే… <br/>
కానీ ఇప్పుడు… ఒక్కరి తో ఒకరు కాదు… <br/><br/>
👉 కలిసి ❤️ <br/><br/>
ఆ రాత్రి… simple journey లా అనిపించినా… <br/>
నిజంగా… మా "forever" start అయిన రోజు అది…`
  }
];

/* ─────────── GALLERY — all 6 real public images ─────────── */
const GALLERY = [
  { id: 1, src: '/image1.jpeg', label: 'మొదటి చూపు', sublabel: 'The First Glance' },
  { id: 2, src: '/image2.jpeg', label: 'ప్రేమ మొదలు', sublabel: 'Love Begins' },
  { id: 3, src: '/image3.jpeg', label: 'నిజమైన కలుపు', sublabel: 'Real Meeting' },
  { id: 4, src: '/image4.jpeg', label: 'మొదటి ముద్దు', sublabel: 'First Kiss' },
  { id: 5, src: '/image5.jpeg', label: 'ప్రయాణం', sublabel: 'The Journey' },
  { id: 6, src: '/image6.jpeg', label: 'నిత్యం లాగా', sublabel: 'Feels Like Forever' },
];

/* ─────────── STARS ─────────── */
const StarsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let stars: { x: number; y: number; r: number; o: number; s: number }[] = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 180 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.2,
        o: Math.random() * 0.7 + 0.1,
        s: Math.random() * 0.3 + 0.05,
      }));
    };
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${s.o})`;
        ctx.fill();
        s.o += Math.sin(Date.now() * 0.001 * s.s) * 0.004;
        s.o = Math.max(0.05, Math.min(0.9, s.o));
      });
      raf = requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener('resize', resize);
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} id="stars-canvas" />;
};

/* ─────────── MAIN COMPONENT ─────────── */
const WeddingSite: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const galleryWrapRef = useRef<HTMLDivElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);

  /* Music Initialization & Playlist Logic */
  useEffect(() => {
    // Cleanup previous if exists
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
    }

    const audio = new Audio(MUSIC_FILES[currentTrackIndex]);
    audio.loop = false; // We handle "infinite" via playlist logic
    audio.volume = 0.45;

    // When track ends, play next
    audio.onended = () => {
      setCurrentTrackIndex((prev) => (prev + 1) % MUSIC_FILES.length);
    };

    audioRef.current = audio;

    if (playing) {
      audio.play().catch(e => console.log("Autoplay blocked:", e));
    }

    return () => {
      audio.pause();
      audio.onended = null;
    }
  }, [currentTrackIndex]);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.log("Autoplay blocked:", e));
      setPlaying(true);
    }
  }, [playing]);

    /* Lenis + GSAP */
    useEffect(() => {
      const lenis = new Lenis({ duration: 1.4, smoothWheel: true, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      const tickerHandler = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerHandler);
      gsap.ticker.lagSmoothing(0);

      /* Scroll progress */
      lenis.on('scroll', ({ progress: p }: { progress: number }) => setProgress(p * 100));

      const mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 769px)",
        isMobile: "(max-width: 768px)"
      }, (context) => {
        const { isMobile, isDesktop } = context.conditions as { isMobile: boolean; isDesktop: boolean };

        if (!isLoading) {
          /* Chapter reveals */
          document.querySelectorAll<HTMLElement>('.chapter').forEach((ch) => {
            const img = ch.querySelector<HTMLImageElement>('.chapter-img-side img');
            const content = ch.querySelector('.chapter-content');
            const num = ch.querySelector('.chapter-num');

            if (img) {
              gsap.fromTo(img, { scale: 1.12 }, {
                scale: 1.0, ease: 'none',
                scrollTrigger: { trigger: ch, start: 'top bottom', end: 'bottom top', scrub: true }
              });
            }
            if (content) {
              gsap.fromTo(content, 
                { opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 30 : 0 }, 
                {
                  opacity: 1, x: 0, y: 0, duration: 1.1, ease: 'power3.out',
                  scrollTrigger: { trigger: ch, start: 'top 75%', toggleActions: 'play none none none' }
                }
              );
            }
            if (num) {
              gsap.fromTo(num, { opacity: 0 }, {
                opacity: 1, duration: 1.5,
                scrollTrigger: { trigger: ch, start: 'top 70%' }
              });
            }
          });

          /* Section reveals */
          gsap.utils.toArray<HTMLElement>('.reveal-up').forEach(el => {
            gsap.fromTo(el, { opacity: 0, y: isMobile ? 30 : 50 }, {
              opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' }
            });
          });

          /* Gallery - Hybrid Responsive Model */
          const wrap = galleryWrapRef.current;
          const track = galleryTrackRef.current;
          const cards = gsap.utils.toArray<HTMLElement>('.gallery-card');

          if (isDesktop && wrap && track) {
            /* 🖥️ DESKTOP: Cinematic Horizontal 3D CoverFlow */
            const totalScroll = track.scrollWidth - window.innerWidth;
            if (totalScroll > 0) {
              const scrollTween = gsap.to(track, {
                x: -totalScroll,
                ease: 'none',
                scrollTrigger: {
                  trigger: wrap,
                  start: 'top top',
                  end: () => `+=${totalScroll + 200}`,
                  scrub: 1.0,
                  pin: true,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                }
              });

              cards.forEach((card) => {
                const tl = gsap.timeline({
                  scrollTrigger: {
                    trigger: card,
                    containerAnimation: scrollTween,
                    start: "left right",
                    end: "right left",
                    scrub: true,
                  }
                });
                tl.fromTo(card,
                  { scale: 0.8, opacity: 0.5, rotationY: -25, z: -100 },
                  { scale: 1, opacity: 1, rotationY: 0, z: 0, ease: 'power1.out', duration: 1 }
                ).to(card,
                  { scale: 0.8, opacity: 0.5, rotationY: 25, z: -100, ease: 'power1.in', duration: 1 }
                );
              });
            }
          } else if (isMobile && cards.length > 0) {
            /* 📱 MOBILE: Vertical Stacked Memory Deck */
            cards.forEach((card, i) => {
              if (i < cards.length - 1) {
                gsap.to(card, {
                  scale: 0.85,
                  opacity: 0.3,
                  y: -50,
                  scrollTrigger: {
                    trigger: cards[i + 1],
                    start: "top 80%",
                    end: "top 30%",
                    scrub: true,
                  }
                });
              }
            });
          }
        }
      });

      return () => {
        lenis.destroy();
        gsap.ticker.remove(tickerHandler);
        mm.revert();
      };
    }, [isLoading]);

  /* ─────────── HERO ENTRANCE TRIGGERS ─────────── */
  useEffect(() => {
    if (!isLoading) {
      const heroTl = gsap.timeline({ delay: 0.2 });
      heroTl
        .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' })
        .to('.hero-names', { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' }, '-=0.5')
        .to('.hero-sub', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=0.6')
        .to('.hero-divider', { opacity: 1, scaleX: 1, duration: 1.0, ease: 'power3.out' }, '-=0.8')
        .to('.scroll-label', { opacity: 1, duration: 1.0 }, '-=0.4');
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {/* Scroll progress */}
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      {/* Stars */}
      <StarsCanvas />

      {/* Music button */}
      <button className="music-btn" onClick={toggleMusic} title={playing ? 'Pause music' : 'Play music'}>
        {playing ? '⏸' : '♪'}
      </button>

      <div className="site-root">

        {/* ─── HERO ─── */}

        <section id="hero">
          <div className="hero-bg-img" />

          <div className="hero-content">
            <div className="hero-eyebrow">The Journey of Two Souls</div>
            <h1 className="hero-names">Uma <span style={{ color: '#E8B4B8' }}>❤️</span> Vasu</h1>

            <div className="hero-divider">
              <span className="hero-divider-heart">❤</span>
            </div>

            <p className="hero-sub">
              Some stories are written in the stars —<br />
              this one is written in the heart
            </p>

            <div className="scroll-label">
              <span>Scroll to begin</span>
              <div className="scroll-chevron">︾</div>
            </div>
          </div>
        </section>

        {/* ─── STORY INTRO ─── */}
        <div className="timeline-intro">
          <span className="section-eyebrow reveal-up">✦ Oka Nijamaina Prema Kathaa ✦</span>
          <h2 className="section-title reveal-up">నిజమైన <em>ప్రేమ కథ</em></h2>
          <div className="section-desc reveal-up">
            <p>In a world full of millions, fate had its own plan.</p>
            <p>Two paths crossed… not by chance, but by destiny.</p>
            <p>With every heartbeat, every moment, their story unfolded into something timeless.</p>
            <p style={{ marginTop: '20px', color: 'var(--gold)', fontStyle: 'italic' }}>This is not just love — this is forever. ✨</p>
          </div>
        </div>

        {/* ─── CHAPTERS ─── */}
        {EPISODES.map((ep) => (
          <article className="chapter" key={ep.id}>
            {/* Image side */}
            <div className="chapter-img-side">
              <img
                src={typeof ep.image === 'string' ? ep.image : ep.image}
                alt={ep.titleEn}
              />
              <div className="chapter-img-overlay" />
            </div>

            {/* Content side */}
            <div className="chapter-content">
              <div className="chapter-num">{ep.id}</div>
              <span className="chapter-tag">{ep.tag}</span>
              <span className="chapter-date">{ep.date}</span>
              <h3 className="chapter-title-en">{ep.titleEn}</h3>
              <span className="chapter-title-tel">{ep.titleTel}</span>
              <div
                className="chapter-glass-text"
                dangerouslySetInnerHTML={{ __html: ep.text }}
              />
              <div className="chapter-divider" />
            </div>
          </article>
        ))}

        {/* ─── GALLERY ─── */}
        <section className="gallery-section">
          <div className="gallery-header">
            <span className="section-eyebrow reveal-up">🎬 Captured Moments</span>
            <h2 className="section-title reveal-up">మా <em>గ్యాలరీ</em></h2>
          </div>
          <div className="gallery-wrap" ref={galleryWrapRef}>
            <div className="gallery-track" ref={galleryTrackRef}>
              {GALLERY.map(item => (
                <div className="gallery-card" key={item.id}>
                  <img src={item.src} alt={item.label} loading="lazy" />
                  <div className="gallery-card-overlay">
                    <div>
                      <div className="gallery-card-label">{item.label}</div>
                      <div style={{ fontSize: '12px', color: 'rgba(245,239,230,0.55)', marginTop: '4px' }}>
                        {item.sublabel}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── QUOTE ─── */}
        <section className="quote-section">
          <span className="quote-mark reveal-up">"</span>
          <p className="quote-text reveal-up">
            ఈ లోకంలో తాత్కాలికమైనవి చాలా ఉన్నాయి… <br />
            కానీ నువ్వు ఒక శాశ్వత భావన… <br /><br />
            ఒక క్షణం కాదు — <br />
            మన ఇద్దరం పంచుకునే ప్రతి క్షణంలో ఉండే నిత్యత్వం…
          </p>
          <div className="quote-attribution reveal-up">— Uma &amp; Vasu ❤️</div>
        </section>

        {/* ─── EPILOGUE ─── */}
        <section className="epilogue-section">
          <span className="epilogue-heart reveal-up">❤️</span>
          <h2 className="epilogue-heading reveal-up">ఎప్పటికీ మొదలు</h2>
          <p className="epilogue-body reveal-up">
            ఒక చిన్న చూపుతో మొదలైన ఈ కథ… <br />
            ఇప్పుడు ఒక అనంతమైన ప్రయాణంగా మారింది… <br /><br />
            Strangers గా మొదలై… <br />
            soulmates గా మారాం… <br /><br />
            ప్రతి క్షణం… ఒక memory అయింది… <br /><br />
            ఇప్పుడు… ఒక మాట మాత్రమే మిగిలింది… <br /><br />
            👉 కలిసి ఉండేదాం… ఎప్పటికీ ❤️
          </p>
          <div className="epilogue-card reveal-up">
            <p>"నువ్వు నా జీవితంలో వచ్చినప్పుడు… నా ప్రపంచం మారలేదు… కానీ నేను మారిపోయాను… ❤️"</p>
            <div className="epilogue-signature">Uma ❤️ Vasu</div>
          </div>
        </section>

        {/* ─── FEEDBACK ─── */}
        <Feedback />

        {/* ─── FOOTER ─── */}
        <footer>A Story Told With Love &nbsp;✦&nbsp; Uma &amp; Vasu &nbsp;✦&nbsp; 2026</footer>
      </div>
    </>
  );
};

export default WeddingSite;
