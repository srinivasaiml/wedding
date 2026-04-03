import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Quote: React.FC = () => {
    const quoteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const reveals = quoteRef.current?.querySelectorAll('[data-reveal]');
        reveals?.forEach((el) => {
            gsap.fromTo(el, 
                { opacity: 0, y: 45 }, 
                {
                    opacity: 1, 
                    y: 0, 
                    duration: 0.9, 
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 88%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    }, []);

    return (
        <section id="quote" className="sec-pad" ref={quoteRef}>
            <div className="quote-bg-icon">"</div>
            <div className="sec-center" style={{ position: 'relative', zIndex: 2 }}>
                <span className="quote-mark" data-reveal>"</span>
                <p className="quote-text" data-reveal>
                    In a world full of temporary things, <em>you</em> are a perpetual feeling. Not a moment — but the <em>forever</em> that lives inside every moment we share.
                </p>
                <div className="quote-author" data-reveal>— Uma & Vasu</div>
            </div>
        </section>
    );
};

export default Quote;
