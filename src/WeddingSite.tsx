import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './WeddingSite.css';
import Feedback from './components/Feedback';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────── CANVAS PARTICLES ─────────────────────────── */
function initParticles(id: string, count: number) {
  const c = document.getElementById(id) as HTMLCanvasElement | null;
  if (!c) return () => {};
  const ctx = c.getContext('2d')!;
  let raf: number;
  const resize = () => { c.width = innerWidth; c.height = innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  const ps = Array.from({ length: count }, () => ({
    x: Math.random() * c.width, y: Math.random() * c.height,
    r: Math.random() * 2 + .5,
    vy: -(Math.random() * .4 + .08),
    vx: (Math.random() - .5) * .2,
    o: Math.random() * .45 + .05,
    g: Math.random() > .75,
    ph: Math.random() * Math.PI * 2,
  }));

  const draw = () => {
    ctx.clearRect(0, 0, c.width, c.height);
    const t = Date.now() * .001;
    ps.forEach(p => {
      p.y += p.vy; p.x += Math.sin(p.ph + t) * .15 + p.vx;
      if (p.y < -10) { p.y = c.height + 10; p.x = Math.random() * c.width; }
      ctx.save(); ctx.globalAlpha = p.o;
      if (p.g) { ctx.shadowBlur = 12; ctx.shadowColor = 'rgba(212,175,122,0.5)'; }
      ctx.fillStyle = '#D4AF7A'; ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    });
    raf = requestAnimationFrame(draw);
  };
  draw();
  return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
}

/* ─────────────────────────── LOADER ─────────────────────────── */
const Loader: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  useEffect(() => {
    const cleanup = initParticles('loader-canvas', 90);
    const tl = gsap.timeline({
      onComplete: () => { onDone(); }
    });
    tl.to('.loader-content',  { opacity: 1, duration: 1, ease: 'power2.out' }, 0.6)
      .to('.loader-sub',      { opacity: 1, duration: .7, ease: 'power2.out' }, 1.4)
      .to('.curtain-left',    { xPercent: -105, duration: 2.8, ease: 'expo.inOut' }, 2.2)
      .to('.curtain-right',   { xPercent: 105,  duration: 2.8, ease: 'expo.inOut' }, 2.2)
      .to('.curtain-top',     { yPercent: -200, duration: 2.4, ease: 'expo.inOut' }, 2.8)
      .to('#loader',          { scale: 1.6, opacity: 0, filter: 'blur(24px)', duration: 1.6, ease: 'power3.inOut' }, 4)
      .set('#loader',         { display: 'none' });
    return () => { cleanup(); tl.kill(); };
  }, [onDone]);

  return (
    <div id="loader">
      <canvas id="loader-canvas" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
      <div className="curtain curtain-left" />
      <div className="curtain curtain-right" />
      <div className="curtain-top" />
      <div className="loader-glow" />
      <div className="loader-content">
        <div className="loader-names">Uma <span className="loader-heart">❤️</span> Vasu</div>
        <div className="loader-sub">A Love Story</div>
      </div>
    </div>
  );
};

/* ─────────────────────────── HERO ─────────────────────────── */
const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = initParticles('hero-canvas', 55);
    gsap.set(['#ht','#hn1','#ha','#hn2','#hsub','#si'], { y: 30 });

    const tl = gsap.timeline({ delay: 5.5 });
    tl.to('#ht',  { opacity: 1, y: 0, duration: .9, ease: 'power3.out' })
      .fromTo('#hn1', { opacity: 0, y: 50, scale: .85 }, { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: 'power3.out' }, '-=.4')
      .to('#ha',  { opacity: 1, duration: .9, ease: 'power2.out' }, '-=.7')
      .fromTo('#hn2', { opacity: 0, y: 50, scale: .85 }, { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: 'power3.out' }, '-=.7')
      .to('#hsub', { opacity: 1, y: 0, duration: .9, ease: 'power3.out' }, '-=.5')
      .to('#si',  { opacity: .7, duration: .8 }, '-=.3');

    gsap.to(centerRef.current, {
      scale: .75, opacity: 0, y: -80, filter: 'blur(8px)',
      scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1.2 }
    });

    const hero = heroRef.current!;
    const onMove = (e: MouseEvent) => {
      const px = (e.clientX / innerWidth - .5) * 2;
      const py = (e.clientY / innerHeight - .5) * 2;
      gsap.to(centerRef.current, { rotateY: px * 2.5, rotateX: -py * 2.5, duration: .8, ease: 'power2.out' });
    };
    const onLeave = () => gsap.to(centerRef.current, { rotateY: 0, rotateX: 0, duration: .8, ease: 'power3.out' });
    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    return () => { cleanup(); hero.removeEventListener('mousemove', onMove); hero.removeEventListener('mouseleave', onLeave); };
  }, []);

  return (
    <section id="hero" ref={heroRef}>
      <canvas id="hero-canvas" />
      <div className="hero-center" id="hero-center" ref={centerRef}>
        <div className="hero-tagline" id="ht">The Journey of Two Souls</div>
        <span className="hero-name" id="hn1">Uma</span>
        <span className="hero-amp" id="ha">&amp;</span>
        <span className="hero-name" id="hn2">Vasu</span>
        <div className="hero-subtitle" id="hsub">
          <span>Some stories are written in the stars — this one is written in the heart</span>
        </div>
      </div>
      <div className="scroll-indicator" id="si">
        <span>Scroll to begin</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
};

/* ─────────────────────────── STORY INTRO (EXTRAORDINARY SKELETON DESIGN) ─────────────────────────── */
const StoryIntro: React.FC = () => {
  useEffect(() => {
    // Basic text reveals
    document.querySelectorAll('[data-reveal]').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 45 }, {
        opacity: 1, y: 0, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      });
    });

    // Mobile check to adjust scroll trigger boundaries
    const isMobile = window.innerWidth <= 900;
    
    // Sticky Scroll Logic
    const cards = gsap.utils.toArray('.story-card');
    const images = document.querySelectorAll('.sticky-img-element');
    
    cards.forEach((card: any, i: number) => {
      ScrollTrigger.create({
        trigger: card,
        start: isMobile ? 'top 70%' : 'top center',
        end: isMobile ? 'bottom 70%' : 'bottom center',
        onEnter: () => activateImage(i),
        onEnterBack: () => activateImage(i),
      });
    });

    function activateImage(index: number) {
      images.forEach((img, i) => {
        if (i === index) {
          img.classList.add('is-active');
        } else {
          img.classList.remove('is-active');
        }
      });
    }

    // Force first image active instantly
    activateImage(0);

    // Subtle Parallax on cards for premium editorial feel
    if (!isMobile) {
      cards.forEach((card: any) => {
         gsap.to(card, {
            yPercent: -5,
            ease: 'none',
            scrollTrigger: {
               trigger: card,
               start: 'top bottom',
               end: 'bottom top',
               scrub: true
            }
         });
      });
    }

    // Ensure layout is recalculated if fonts/lengths change
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

  }, []);

  return (
    <section id="love-story">
      <div className="story-bg" />
      
      <div className="story-wrapper">
        <div className="sec-center" style={{position:'relative', zIndex:2, marginBottom: '60px'}}>
          <div className="sec-label" data-reveal>💖 UMA ❤️ VASU</div>
          <h2 className="sec-title" data-reveal>Oka Nijamaina <em>Prema Kathaa</em></h2>
          <p className="sec-desc" data-reveal>Every love story is beautiful, but ours is our favorite. Five moments that changed everything — five memories we'll carry forever.</p>
        </div>

        <div className="story-container">
          
          <div className="story-left">
            <div className="sticky-image-container">
              <div className="skel-corner tl"></div>
              <div className="skel-corner tr"></div>
              <div className="skel-corner bl"></div>
              <div className="skel-corner br"></div>
              
              {EPISODES.map((ep, i) => (
                <img 
                  key={`img-${ep.id}`} 
                  src={ep.image} 
                  alt={ep.title} 
                  className={`sticky-img-element ${i === 0 ? 'is-active' : ''}`} 
                  loading={i === 0 ? "eager" : "lazy"}
                />
              ))}
            </div>
          </div>
          
          <div className="story-right">
            {EPISODES.map((ep) => (
              <div className="story-card" key={`card-${ep.id}`}>
                <div className="sc-mobile-img">
                   <img src={ep.image} alt={ep.title} loading="lazy" />
                </div>
                <div className="sc-num-bg">0{ep.id}</div>
                <div className="sc-content">
                  <div className="sc-tag">Episode 0{ep.id}</div>
                  <div className="sc-date">{ep.date}</div>
                  <h3 className="sc-heading" dangerouslySetInnerHTML={{__html:ep.heading}} />
                  <p className="sc-text" dangerouslySetInnerHTML={{__html:ep.text}} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────── GALLERY ─────────────────────────── */
const Gallery: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const track = trackRef.current!;
    
    // Premium Horizontal Pinning (Now with more robust calculation)
    const calculateScroll = () => {
      const totalScroll = track.scrollWidth - window.innerWidth + (window.innerWidth * 0.1);
      return totalScroll;
    };

    let anim: gsap.core.Tween;

    const initGallery = () => {
      if (anim) anim.kill();
      const totalScroll = calculateScroll();
      
      anim = gsap.to(track, {
        x: -totalScroll, ease: 'none',
        scrollTrigger: {
          trigger: wrap, start: 'top top',
          end: () => `+=${totalScroll}`,
          scrub: 1.2, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
        }
      });
    };

    // Delay slightly to ensure layout is ready
    const timer = setTimeout(initGallery, 1000);
    window.addEventListener('resize', initGallery);

    track.querySelectorAll('.gallery-card').forEach((card: any) => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        gsap.to(card, { rotateY: x*18, rotateX: -y*18, transformPerspective: 900, duration: .35, ease: 'power2.out', boxShadow: `${-x*25}px ${y*25}px 50px rgba(0,0,0,0.4)` });
      });
      card.addEventListener('mouseleave', () => gsap.to(card, { rotateY:0, rotateX:0, boxShadow:'none', duration:.6, ease:'power3.out' }));
    });

    return () => { 
      clearTimeout(timer);
      if (anim) anim.kill();
      window.removeEventListener('resize', initGallery);
    };
  }, []);

  return (
    <section id="gallery" className="sec-pad">
      <div className="sec-center" style={{position:'relative',zIndex:2,marginBottom:'40px'}}>
        <div className="sec-label" data-reveal>Captured Moments</div>
        <h2 className="sec-title" data-reveal>Our <em>Gallery</em></h2>
      </div>
      <div className="gallery-wrap" ref={wrapRef}>
        <div className="gallery-track" ref={trackRef}>
          {GALLERY_ITEMS.map(g => (
            <div className="gallery-card" key={g.id}>
              <img 
                src={g.src} 
                alt={g.label} 
                loading="eager"
                onError={(e:any) => console.error("Gallery Image Error:", e.target.src)}
              />
              <div className="gallery-card-label">{g.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────── QUOTE ─────────────────────────── */
const Quote: React.FC = () => (
  <section id="quote" className="sec-pad">
    <div className="quote-bg-icon">"</div>
    <div className="sec-center" style={{position:'relative',zIndex:2}}>
      <span className="quote-mark" data-reveal>"</span>
      <p className="quote-text" data-reveal>
        In a world full of temporary things, <em>you</em> are a perpetual feeling. Not a moment — but the <em>forever</em> that lives inside every moment we share.
      </p>
      <div className="quote-author" data-reveal>— Uma &amp; Vasu</div>
    </div>
  </section>
);

/* ─────────────────────────── EPILOGUE ─────────────────────────── */
const Epilogue: React.FC = () => {
  useEffect(() => {
    const cleanup = initParticles('epilogue-canvas', 70);
    return cleanup;
  }, []);

  return (
    <section id="epilogue">
      <canvas id="epilogue-canvas" />
      <div className="epilogue-content" data-reveal>
        <div className="epilogue-big">Eppatiki Modalu</div>
        <p className="epilogue-text">Oka chinna choopu tho modalaina ee kathaa… Ippudu oka ananthamaina prayanam ayyindi… Strangers ga start ayi… soulmates ga maararu… Prathi kshanam… oka memory ayyindi…</p>
        <p className="epilogue-text" style={{color:'var(--text3)',fontSize:'clamp(15px,1.8vw,18px)'}}>Ippudu… Oka maatram migilindi… Kalisi undedam… eppatiki ❤️</p>
        <br/>
        <p className="epilogue-text" style={{color:'var(--rose-light)',fontStyle:'italic',fontSize:'clamp(18px,2.5vw,24px)'}}>
          "Nuvvu naa jeevitham lo vachinappudu… naa prapancham maraledu… kani nenu maripoyaanu… ❤️"
        </p>
        <div className="epilogue-names">Uma ❤️ Vasu</div>
        <span className="epilogue-heart">❤️</span>
      </div>
    </section>
  );
};

/* ─────────────────────────── MUSIC BUTTON ─────────────────────────── */
const MusicBtn: React.FC<{ playing: boolean, onToggle: () => void }> = ({ playing, onToggle }) => {
  return (
    <button id="music-btn" className={playing ? 'playing' : ''} aria-label="Toggle music" onClick={onToggle}>
      <div className="bars">
        <div className="bar"/><div className="bar"/><div className="bar"/><div className="bar"/>
      </div>
    </button>
  );
};

/* ─────────────────────────── CURSOR ─────────────────────────── */
const Cursor: React.FC = () => {
  useEffect(() => {
    const cur = document.getElementById('cursor')!;
    const dot = document.getElementById('cursor-dot')!;
    let mx = 0, my = 0, cx = 0, cy = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx+'px'; dot.style.top = my+'px';
    };
    const loop = () => {
      cx += (mx - cx) * .12; cy += (my - cy) * .12;
      cur.style.left = cx+'px'; cur.style.top = cy+'px';
      raf = requestAnimationFrame(loop);
    };
    document.addEventListener('mousemove', onMove);
    loop();

    const add = () => cur.classList.add('hover');
    const remove = () => cur.classList.remove('hover');
    const els = document.querySelectorAll('a,button,[data-tilt],input,select,textarea');
    els.forEach(el => { el.addEventListener('mouseenter', add); el.addEventListener('mouseleave', remove); });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="cursor" />
      <div id="cursor-dot" />
    </>
  );
};

/* ─────────────────────────── DATA ─────────────────────────── */
const EPISODES = [
  {
    id:1, title:'Modati Choopu', heading:'Modati <em>Choopu</em>', date:'March 18, 2021',
    image:'/image1.jpeg', frameClass:'',
    text:`Nenu tanani modati sari chusaa…<br>adi exam roju…<br><br>Andaru paper lo busy ga unnaru…<br>kani naa life lo important question paper kaadu…<br>tanu…<br><br>Tanu tana ammayina andam tho…<br>chilipi navvutho navuthundi 😊<br><br>Aa navvu chusina kshanam lo…<br>nenu naa exam marchipoyaa…<br><br>Paper lo unna questions kuda kanapadaledu…<br>naa mind lo okkate question…<br><br>👉 “Evaru ee ammayi…?”<br><br>Nenu alaa tanani chustuu undipoyaa…<br>tanu kuda nannu chusi… chudanattu chusindi… 😌<br><br>Konchem dhairyam chesi…<br>number adigaa…<br><br>Tanu navvuthu cheppindi…<br>👉 “Mokam meeda okati ista…” 😄<br><br>Aa maataki bayam tho…<br>nenu akkadey aagipoyaa…<br><br>Ala konni rojulu gadichayi…<br><br>Final year exams start ayyayi…<br>prati roju okari mokam okaru chusukunna…<br><br>Kani… matalu levu…<br><br>Nenu tanani chudatam lo busy…<br>tanu nannu observe cheyatam lo busy…<br><br>Ala teliyakunda…<br>tanu kuda naa meeda manasu padesindi ❤️<br><br>Chivari exam roju…<br>naa daggara ki ochi…<br><br>👉 tana number ichindi…<br><br>Aa kshanam…<br>naa life lo first victory laga anipinchindi…`
  },
  {
    id:2, title:'Prema Prarambham', heading:'Prema <em>Prarambham</em>', date:'September 29, 2021',
    image:'/image2.jpeg', frameClass:'ring-frame',
    text:`Exam aipoyina evening…<br>phone ring ayyindi…<br><br>👉 “Uma Calling…”<br><br>Call lift chesaa…<br><br>👩 “Hello…”<br><br>Aa okka “Hello”…<br>honey kanna sweet ga undi 🍯<br>kokila swaram kanna madhuram ga undi 🕊️<br><br>Aa voice vintunte…<br>naa gunde silent ga navvindi ❤️<br><br>Ala roju roju ki calls start ayyayi…<br>college aipoyina tarvata kuda…<br><br>Prati roju…<br>hours maatladukunna…<br><br>Ala oka 10 rojula tarvata…<br><br>Nenu dhairyam chesi…<br>naa manasulo unna maatani cheppaa…<br><br>👉 “I love you…” ❤️<br><br>10 seconds silence…<br><br>Uma gunde kuda fast ga kotthukundi…<br>naa heartbeat kuda vinipisthundi…<br><br>Tarvata…<br><br>👉 “I love you too…” 💖<br><br>Aa maatato…<br>maa prema kathaa modhalu ayyindi…`
  },
  {
    id:3, title:'Nijamaina Kalupu', heading:'Nijamaina <em>Kalupu</em>', date:'October 18, 2023',
    image:'/image3.jpeg', frameClass:'',
    text:`Oka roju…<br>Uma call chesi…<br><br>👉 “Nenu nee college ki vachaa…”<br><br>Aa maataki…<br>naa manasulo teliyani bayam…<br>aame manasulo kuda ade feeling…<br><br>Kalisi…<br>okari mokam okaru chusukoni…<br>silent ayyipoyaam… 😶<br><br>Kani aa silence lo…<br>chala prema undi…<br><br>Tarvata…<br>photos teesukunnam 📸<br><br>College motham tirigam…<br>manaki matram adi oka kottha prapancham laga anipinchindi 🌍<br><br>Konchem tarvata…<br>kalisi bhojanam chesam…<br><br>Nenu naa chethitho…<br>Uma ki tinipistunnappudu…<br><br>naa velu…<br>tana pedavulani touch ayyayi…<br><br>Aa kshanam…<br>naa manasulo okate maat…<br><br>👉 “Idi kada jeevitham…” ❤️<br><br>Tarvata…<br>bus lo kalisi intiki vachesam…<br><br>Aa roju…<br>simple ga kanipinchina…<br>naa life lo unforgettable memory ayyindi…`
  },
  {
    id:4, title:'Modati Muddu', heading:'Movie & <em>Modati Muddu</em>', date:'July 1, 2024',
    image:'/image4.jpeg', frameClass:'heartbeat-frame',
    text:`Oka roju…<br>iddaram kalisi movie ki vellam 🎥<br><br>Theatre lo movie nadusthundi…<br>kani mana focus movie meeda kaadu…<br><br>okari meeda okariki…<br><br>Nenu mellaga…<br>Uma hand pai naa hand pettanu…<br><br>Aame hand konchem tadumukundi…<br><br>Okari kallu okaru chusukunna… 👀<br><br>Slow ga…<br>inka daggara ayyamu…<br><br>Mana swasam okati ayindi…<br>gunde dhadkan okate ayyindi… 💓<br><br>Aa choopu lo unna prema…<br>aa kshanam lo unna magic…<br><br>Nenu nenu kaadhu…<br>tanu tanu kaadhu…<br><br>👉 manam okaram ayyam…<br><br>💋 Nenu Uma ni kiss chesaa…<br><br>Uma… tana kallu mooyakunda…<br>naa veipune chusthundi…<br><br>Aa kshanam…<br>maa life lo eppatiki marchipoleni memory ayyindi…<br><br>👉 Movie flop…<br>👉 Mana love story super hit ❤️🔥`
  },
  {
    id:5, title:'Prayanam – Kalisi Nadiche Dhooram', heading:'Prayanam – <em>Kalisi Nadiche Dhooram</em>', date:'March 11, 2026',
    image:'/image5.jpeg', frameClass:'',
    text:`Ratri samayam…<br>train mellaga nadusthundi… 🚆<br><br>Bayata lights anni fast ga velthunnayi…<br>kani maa madhya time slow ayyindi…<br><br>Window pakkana kurchoni…<br>iddaram silent ga unnam…<br><br>Ee sari silence awkward kaadu…<br>adi comfort ❤️<br><br>Uma mellaga…<br>naa shoulder meedha tana thala petti… 😌<br><br>Aa kshanam lo…<br>naa gunde dhadkan…<br>tana ki vinipisthundi… 💓<br><br>Konchem time tarvata…<br>tanu slow ga adagindi…<br><br>👉 “Vasu…”<br><br>👉 “Hmm…”<br><br>👉 “Idi eppatiki ilaane untundaa…?”<br><br>Nenu konchem navvanu…<br>tana hand ni strong ga pattukoni…<br><br>👉 “Train aagipothundi…<br>kani mana journey aagadu…” ❤️<br><br>Tanu emi maatladaledu…<br>kani tana grip inkonchem strong ayyindi…<br><br>Aa grip lo…<br>bayam ledu…<br>doubt ledu…<br><br>👉 nammakam undi…<br><br>Train munduku velthundi…<br>mana life kuda alane…<br><br>kani ippudu…<br>okkari tho okaru kaadu…<br><br>👉 kalisi ❤️<br><br>Aa ratri…<br>simple journey la anipinchina…<br><br>nijanga…<br>maa “forever” start ayina roju adi…`
  },
];

const GALLERY_ITEMS = [
  {id:1, src:'/image1.jpeg', label:'The First Glance'},
  {id:2, src:'/image2.jpeg', label:'Something Blooming'},
  {id:3, src:'/image3.jpeg', label:'Golden Hours'},
  {id:4, src:'/image4.jpeg', label:'Finally Together'},
  {id:5, src:'/image5.jpeg', label:'Dreamy Days'},
  {id:6, src:'/image6.jpeg', label:'Feels Like Forever'},
  {id:7, src:'/image1.jpeg', label:'Pure Joy'},
];

/* ─────────────────────────── ROOT APP ─────────────────────────── */
const WeddingSite: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('https://www.chosic.com/wp-content/uploads/2021/04/Romantic-Wedding-Piano-Main-3.mp3');
    audio.loop = true;
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;
    
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  const handleLoaderDone = () => {
    setLoaded(true);
    gsap.to('#music-btn', { opacity: 1, duration: .5 });
    const lenis = new Lenis({ duration: 1.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10*t)), smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t*1000));
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.addEventListener('refresh', () => lenis.resize());

    // Refresh GSAP markers after entering the page to fix any layout shifts
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  };

  return (
    <>
      <div className="grain" />
      <Cursor />
      <MusicBtn playing={playing} onToggle={() => setPlaying(!playing)} />
      <Loader onDone={handleLoaderDone} />

      <div id="main" style={{ opacity: loaded ? 1 : 0, pointerEvents: loaded ? 'auto' : 'none', transition: 'opacity 0.6s ease' }}>
        <Hero />
        <div className="divider">
          <div className="divider-line"/><span className="divider-icon">✦</span><div className="divider-line"/>
        </div>
        <StoryIntro />
        <div className="divider">
          <div className="divider-line"/><span className="divider-icon">🎬</span><div className="divider-line"/>
        </div>
        <Gallery />
        <div className="divider">
          <div className="divider-line"/><span className="divider-icon">💭</span><div className="divider-line"/>
        </div>
        <Quote />
        <div className="divider">
          <div className="divider-line"/><span className="divider-icon">❤️</span><div className="divider-line"/>
        </div>
        <Epilogue />
        <Feedback />
        <footer>
          <div className="fn">A story told with love</div>
        </footer>
      </div>
    </>
  );
};

export default WeddingSite;
