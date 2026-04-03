import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import CanvasParticles from './CanvasParticles';

interface LoaderProps {
    onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
    const loaderRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: onComplete
        });

        tl.to(contentRef.current, { opacity: 1, duration: 1, ease: 'power2.out' }, 0.6)
          .to('.loader-sub', { opacity: 1, duration: 0.7, ease: 'power2.out' }, 1.4)
          .to('.curtain-left', { xPercent: -105, duration: 2.8, ease: 'expo.inOut' }, 2.2)
          .to('.curtain-right', { xPercent: 105, duration: 2.8, ease: 'expo.inOut' }, 2.2)
          .to('.curtain-top', { yPercent: -200, duration: 2.4, ease: 'expo.inOut' }, 2.8)
          .to(loaderRef.current, { scale: 1.6, opacity: 0, filter: 'blur(24px)', duration: 1.6, ease: 'power3.inOut' }, 4)
          .set(loaderRef.current, { display: 'none' });

        return () => {
            tl.kill();
        };
    }, [onComplete]);

    return (
        <div id="loader" ref={loaderRef}>
            <CanvasParticles id="loader-canvas" particleCount={90} />
            <div className="curtain curtain-left"></div>
            <div className="curtain curtain-right"></div>
            <div className="curtain-top"></div>
            <div className="loader-glow"></div>
            <div className="loader-content" ref={contentRef} style={{ opacity: 0 }}>
                <div className="loader-names">
                    Uma <span className="pulse-heart">❤️</span> Vasu
                </div>
                <div className="loader-sub" style={{ opacity: 0 }}>A Love Story</div>
            </div>
        </div>
    );
};

export default Loader;
