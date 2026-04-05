import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Epilogue: React.FC = () => {
    const epRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = epRef.current;
        if (!el) return;

        gsap.fromTo(el.querySelectorAll('.ep-fade'), 
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0, duration: 1.2, stagger: 0.3, ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 85%' }
            }
        );
    }, []);

    return (
        <section id="epilogue" className="sec-pad" ref={epRef} style={{ background: '#FFFFFF', padding: '150px 20px', textAlign: 'center' }}>
            <div className="ep-fade" style={{ color: '#B8860B', fontSize: '32px', marginBottom: '20px' }}>❤️</div>
            <h2 className="ep-fade" style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(40px, 8vw, 80px)', color: '#2C2C2C', marginBottom: '30px' }}>
                ఎప్పటికీ మొదలు
            </h2>
            <p className="ep-fade" style={{ maxWidth: '800px', margin: '0 auto', fontSize: 'clamp(18px, 2.5vw, 22px)', color: '#444', lineHeight: '1.9' }}>
                ఒక చిన్న చూపు తో మొదలైన ఈ కథా… ఇప్పుడు ఒక అనంతమైన ప్రయాణం అయింది… <br/>
                Strangers గా start అయి… soulmates గా మారారు… ప్రతి క్షణం… ఒక memory అయింది… <br/><br/>
                ఇప్పుడు… ఒక మాట్రమే మిగిలింది… కలిసి ఉండేదాం… ఎప్పటికీ ❤️
            </p>
            
            <div className="ep-fade" style={{ marginTop: '80px', padding: '40px', border: '1px solid #F0DDBB', display: 'inline-block' }}>
                <p style={{ color: '#666', fontStyle: 'italic', fontSize: '20px', marginBottom: '20px' }}>
                    "నువ్వు నా జీవితం లో వచ్చినప్పుడు… నా ప్రపంచం మారలేదు… కానీ నేను మారిపోయాను… ❤️"
                </p>
                <div style={{ fontSize: '32px', color: '#2C2C2C' }}>Uma ❤️ Vasu</div>
            </div>
        </section>
    );
};

export default Epilogue;
