import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Quote: React.FC = () => {
    const quoteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = quoteRef.current;
        if (!el) return;

        gsap.fromTo(el.querySelector('.quote-content'), 
            { opacity: 0, y: 50, scale: 0.95 },
            {
                opacity: 1, y: 0, scale: 1, duration: 1.5,
                scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 20%', scrub: 1 }
            }
        );
    }, []);

    return (
        <section id="quote" className="sec-pad" ref={quoteRef} style={{ background: '#FFFBF5', borderTop: '1px solid #F0DDBB', padding: '180px 20px' }}>
            <div className="sec-center quote-content" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                <span style={{ fontSize: '32px', color: '#B8860B', display: 'block', marginBottom: '40px' }}>💭</span>
                <p style={{ 
                    fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(24px, 4vw, 42px)', 
                    fontStyle: 'italic', color: '#2C2C2C', lineHeight: '1.5' 
                }}>
                    ఈ లోకంలో తాత్కాలికమైనవి చాలా ఉన్నాయి… కానీ నువ్వు ఒక శాశ్వత భావన… ఒక క్షణం కాదు — మనం పంచుకునే ప్రతి క్షణంలో నివసించే నిత్యత్వం.
                </p>
                <div style={{ marginTop: '3rem', color: '#B8860B', fontSize: '14px', letterSpacing: '4px' }}>— UMA & VASU</div>
            </div>
        </section>
    );
};

export default Quote;
