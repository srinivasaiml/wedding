import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import CanvasParticles from './CanvasParticles';

const Epilogue: React.FC = () => {
    const epilogueRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const reveals = epilogueRef.current?.querySelectorAll('[data-reveal]');
        reveals?.forEach((el) => {
            gsap.fromTo(el, 
                { opacity: 0, y: 45 }, 
                {
                    opacity: 1, 
                    y: 0, 
                    duration: 0.9, 
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: epilogueRef.current,
                        start: 'top 88%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    }, []);

    return (
        <section id="epilogue" ref={epilogueRef}>
            <CanvasParticles id="epilogue-canvas" particleCount={70} />
            <div className="epilogue-content" data-reveal>
                <div className="epilogue-big">Eppatiki Modalu</div>
                <p className="epilogue-text">Oka chinna choopu tho modalaina ee kathaa… Ippudu oka ananthamaina prayanam ayyindi… Strangers ga start ayi… soulmates ga maararu… Prathi kshanam… oka memory ayyindi…</p>
                <p className="epilogue-text" style={{ color: 'var(--text3)', fontSize: 'clamp(15px,1.8vw,18px)' }}>Ippudu… Oka maatram migilindi… Kalisi undedam… eppatiki ❤️</p>
                <br />
                <p className="epilogue-text" style={{ color: 'var(--rose-light)', fontStyle: 'italic', fontSize: 'clamp(18px, 2.5vw, 24px)' }}>
                    “Nuvvu naa jeevitham lo vachinappudu… naa prapancham maraledu… kani nenu maripoyaanu… ❤️”
                </p>
                <div className="epilogue-names">Uma ❤️ Vasu</div>
                <span className="pulse-heart" style={{ fontSize: '32px', display: 'block', margin: '16px 0' }}>❤️</span>
            </div>
        </section>
    );
};

export default Epilogue;
