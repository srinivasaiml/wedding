import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import CanvasParticles from './CanvasParticles';

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const centerRef = useRef<HTMLDivElement>(null);
    const n1Ref = useRef<HTMLSpanElement>(null);
    const n2Ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        // Initial setup
        gsap.set(['.hero-tagline', '#hn1', '#ha', '#hn2', '.hero-subtitle', '.scroll-indicator'], { 
            y: 30, opacity: 0 
        });

        const tl = gsap.timeline({ delay: 5.5 });
        tl.to('.hero-tagline', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
          .fromTo('#hn1', { opacity: 0, scale: 0.9, x: -30 }, { opacity: 1, scale: 1, x: 0, duration: 1.4, ease: 'expo.out' }, '-=.5')
          .to('#ha', { opacity: 1, scale: 1.2, duration: 1, ease: 'back.out(2)' }, '-=.8')
          .fromTo('#hn2', { opacity: 0, scale: 0.9, x: 30 }, { opacity: 1, scale: 1, x: 0, duration: 1.4, ease: 'expo.out' }, '-=.8')
          .to('.hero-subtitle', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=.6')
          .to('.scroll-indicator', { opacity: 0.7, duration: 1 }, '-=.4');

        // Scroll Parallax
        gsap.to(centerRef.current, {
            y: -100,
            scale: 0.9,
            opacity: 0,
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        // Magnetic Hover Effect for Names
        const magneticEffect = (el: HTMLElement | null) => {
            if (!el) return;
            const onMove = (e: MouseEvent) => {
                const r = el.getBoundingClientRect();
                const x = (e.clientX - (r.left + r.width / 2)) * 0.35;
                const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
                gsap.to(el, { x, y, duration: 0.4, ease: 'power2.out' });
            };
            const onLeave = () => {
                gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
            };
            window.addEventListener('mousemove', (e) => {
                const r = el.getBoundingClientRect();
                const dist = Math.hypot(e.clientX - (r.left + r.width/2), e.clientY - (r.top + r.height/2));
                if (dist < 150) onMove(e); else onLeave();
            });
        };

        magneticEffect(n1Ref.current);
        magneticEffect(n2Ref.current);

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section id="hero" ref={heroRef} style={{ background: 'transparent' }}>
            <div className="silk-bg" />
            <div className="grain-overlay" />
            <CanvasParticles id="hero-canvas" particleCount={40} />
            
            <div className="hero-center" ref={centerRef}>
                <div className="hero-tagline" style={{ letterSpacing: '8px', color: 'var(--gold)', textTransform: 'uppercase', fontSize: '14px', marginBottom: '30px' }}>
                    💖 UMA ❤️ VASU
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px' }}>
                    <span className="hero-name" id="hn1" ref={n1Ref} style={{ fontFamily: 'Great Vibes', fontSize: 'clamp(60px, 12vw, 150px)', color: 'var(--charcoal)' }}>Uma</span>
                    <span className="hero-amp" id="ha" style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(30px, 6vw, 80px)', color: 'var(--gold)', opacity: 0 }}>&</span>
                    <span className="hero-name" id="hn2" ref={n2Ref} style={{ fontFamily: 'Great Vibes', fontSize: 'clamp(60px, 12vw, 150px)', color: 'var(--charcoal)' }}>Vasu</span>
                </div>

                <div className="hero-subtitle" style={{ marginTop: '30px', maxWidth: '600px', margin: '30px auto 0' }}>
                    <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '22px', fontStyle: 'italic', color: 'var(--text)' }}>
                        Some stories are written in the stars — this one is written in the heart
                    </p>
                </div>
            </div>

            <div className="scroll-indicator" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#B8860B' }}>Scroll to begin</span>
                <div className="scroll-arrow" style={{ width: '1px', height: '60px', background: 'var(--gold-light)' }}></div>
            </div>
        </section>
    );
};

export default Hero;
