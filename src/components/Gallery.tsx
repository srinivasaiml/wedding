import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const galleryItems = [
    { id: 1, src: "image1.jpeg", label: "The First Glance" },
    { id: 2, src: "image2.jpeg", label: "Something Blooming" },
    { id: 3, src: "image3.jpeg", label: "Golden Hours" },
    { id: 4, src: "image4.jpeg", label: "Finally Together" },
    { id: 5, src: "image5.jpeg", label: "Dreamy Days" },
    { id: 6, src: "image6.jpeg", label: "Feels Like Forever" },
    { id: 7, src: "image1.jpeg", label: "Pure Joy" }
];

const Gallery: React.FC = () => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const track = trackRef.current;
        const wrap = wrapRef.current;
        if (!track || !wrap) return;

        const totalScroll = track.scrollWidth - window.innerWidth + 100;

        const anim = gsap.to(track, {
            x: -totalScroll,
            ease: 'none',
            scrollTrigger: {
                trigger: wrap,
                start: 'top top',
                end: () => `+=${totalScroll}`,
                scrub: 1.2,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            }
        });

        // 3D Tilt for cards
        const cards = track.querySelectorAll('.gallery-card');
        cards.forEach((card: any) => {
            const handleMouseMove = (e: MouseEvent) => {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                gsap.to(card, {
                    rotateY: x * 18,
                    rotateX: -y * 18,
                    transformPerspective: 900,
                    duration: 0.35,
                    ease: 'power2.out',
                    boxShadow: `${-x * 25}px ${y * 25}px 50px rgba(0,0,0,0.4)`
                });
            };
            const handleMouseLeave = () => {
                gsap.to(card, { rotateY: 0, rotateX: 0, boxShadow: 'none', duration: 0.6, ease: 'power3.out' });
            };
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            anim.kill();
        };
    }, []);

    return (
        <section id="gallery" className="sec-pad" style={{ paddingTop: '60px' }}>
            <div className="sec-center" style={{ position: 'relative', zIndex: 2, marginBottom: '10px' }}>
                <div className="sec-label">Captured Moments</div>
                <h2 className="sec-title">Our <em>Gallery</em></h2>
            </div>
            <div className="gallery-wrap" ref={wrapRef}>
                <div className="gallery-track" ref={trackRef}>
                    {galleryItems.map((item) => (
                        <div key={item.id} className="gallery-card">
                            <img src={item.src} alt={item.label} loading="lazy" />
                            <div className="gallery-card-label" style={{ 
                                position: 'absolute', bottom: '20px', left: '20px', right: '20px', zIndex: 2,
                                fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', color: 'var(--gold-light)',
                                opacity: 0, transition: 'all 0.4s'
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
