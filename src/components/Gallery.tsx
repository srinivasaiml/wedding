import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { id: 1, src: "/image1.jpeg", label: "మొదటి చూపు" },
  { id: 2, src: "/image2.jpeg", label: "ప్రేమ వికసిస్తుంది" },
  { id: 3, src: "/image3.jpeg", label: "బంగారు గంటలు" },
  { id: 4, src: "/image4.jpeg", label: "కలిసి ఉన్నాం" },
  { id: 5, src: "/image5.jpeg", label: "స్వప్న రోజులు" },
  { id: 6, src: "/image6.jpeg", label: "నిత్యం లాగా" },
  { id: 7, src: "/image1.jpeg", label: "శుద్ధ ఆనందం" }
];

const Gallery: React.FC = () => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const track = trackRef.current;
        const wrap = wrapRef.current;
        if (!track || !wrap) return;

        const totalScroll = track.scrollWidth - window.innerWidth + 200;

        const anim = gsap.to(track, {
            x: -totalScroll,
            ease: 'none',
            scrollTrigger: {
                trigger: wrap,
                start: 'top top',
                end: () => `+=${totalScroll}`,
                scrub: 1.2,
                pin: true,
                anticipatePin: 1
            }
        });

        // Individual Card Parallax within the track
        const cards = track.querySelectorAll('.gallery-card');
        cards.forEach((card: any) => {
           gsap.fromTo(card.querySelector('img'), 
             { scale: 1.2 }, 
             { scale: 1.0, scrollTrigger: { trigger: card, start: 'left right', end: 'right left', scrub: true }}
           );
        });

        return () => {
            anim.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section id="gallery" className="sec-pad" style={{ background: '#FFFFFF' }}>
            <div className="sec-center" style={{ position: 'relative', zIndex: 10, marginBottom: '60px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎬 Captured Moments</div>
                <h2 style={{ fontSize: '42px', color: '#B8860B' }}>మా గ్యాలరీ</h2>
            </div>
            
            <div className="gallery-wrap" ref={wrapRef}>
                <div className="gallery-track" ref={trackRef}>
                    {galleryItems.map((item) => (
                        <div key={item.id} className="gallery-card">
                            <img src={item.src} alt={item.label} loading="lazy" />
                            <div style={{ 
                                position: 'absolute', bottom: '0', left: '0', right: '0', padding: '20px', 
                                background: 'linear-gradient(transparent, rgba(0,0,0,0.4))', 
                                color: '#FFF', fontSize: '20px', textAlign: 'center' 
                            }}>
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
