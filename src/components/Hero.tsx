import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import CanvasParticles from './CanvasParticles';

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const centerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial setup for GSAP
        gsap.set(['#ht', '#hn1', '#ha', '#hn2', '#hsub', '#si'], { y: 30, opacity: 0 });

        const tl = gsap.timeline({ delay: 5.3 });
        tl.to('#ht', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
          .fromTo('#hn1', { opacity: 0, y: 50, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: 'power3.out' }, '-=.4')
          .to('#ha', { opacity: 1, duration: 0.9, ease: 'power2.out' }, '-=.7')
          .fromTo('#hn2', { opacity: 0, y: 50, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: 'power3.out' }, '-=.7')
          .to('#hsub', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=.5')
          .to('#si', { opacity: 0.7, duration: 0.8 }, '-=.3');

        // Scroll animation for hero center
        gsap.to(centerRef.current, {
            scale: 0.75,
            opacity: 0,
            y: -80,
            filter: 'blur(8px)',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1.2
            }
        });

        // 3D Tilt Effect
        const handleMouseMove = (e: MouseEvent) => {
            const px = (e.clientX / window.innerWidth - 0.5) * 2;
            const py = (e.clientY / window.innerHeight - 0.5) * 2;
            gsap.to(centerRef.current, {
                rotateY: px * 2.5,
                rotateX: -py * 2.5,
                duration: 0.8,
                ease: 'power2.out'
            });
        };

        const handleMouseLeave = () => {
            gsap.to(centerRef.current, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        };

        const heroEl = heroRef.current;
        heroEl?.addEventListener('mousemove', handleMouseMove);
        heroEl?.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            heroEl?.removeEventListener('mousemove', handleMouseMove);
            heroEl?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <section id="hero" ref={heroRef}>
            <CanvasParticles id="hero-canvas" particleCount={55} />
            
            <svg className="hero-float hero-float-1" width="220" height="220" viewBox="0 0 200 200" fill="none" style={{ position: 'absolute', opacity: 0.12 }}>
                <path d="M100 15C100 15 145 55 145 105C145 155 100 190 100 190C100 190 55 155 55 105C55 55 100 15 100 15Z" fill="rgba(212,175,122,0.06)" stroke="rgba(212,175,122,0.15)" strokeWidth="0.5" />
            </svg>
            <svg className="hero-float hero-float-2" width="180" height="180" viewBox="0 0 200 200" fill="none" style={{ position: 'absolute', opacity: 0.12 }}>
                <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(212,144,138,0.1)" strokeWidth="0.5" />
            </svg>

            <div className="hero-center" ref={centerRef}>
                <div className="hero-tagline" id="ht">The Journey of Two Souls</div>
                <span className="hero-name" id="hn1">Uma</span>
                <span className="hero-amp" id="ha">&</span>
                <span className="hero-name" id="hn2">Vasu</span>
                <div className="hero-subtitle" id="hsub">
                    <span>Some stories are written in the stars — this one is written in the heart</span>
                </div>
            </div>

            <div className="scroll-indicator" id="si">
                <span>Scroll to begin</span>
                <div className="scroll-arrow"></div>
            </div>
        </section>
    );
};

export default Hero;
