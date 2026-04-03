import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TimelineStrip: React.FC = () => {
    const stripRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const nodes = stripRef.current?.querySelectorAll('.tl-node');
        if (nodes) {
            gsap.fromTo(nodes, 
                { opacity: 0, scale: 0 }, 
                {
                    opacity: 1, 
                    scale: 1, 
                    duration: 0.5, 
                    ease: 'back.out(1.7)',
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: stripRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }
    }, []);

    return (
        <div className="timeline-strip" ref={stripRef}>
            <div className="tl-node">
                <div className="tl-dot"></div>
                <div className="tl-date">Mar 2021</div>
                <div className="tl-label">Modati Choopu</div>
            </div>
            <div className="tl-node">
                <div className="tl-dot"></div>
                <div className="tl-date">Sep 2021</div>
                <div className="tl-label">Prema Prakatinchadam</div>
            </div>
            <div className="tl-node">
                <div className="tl-dot"></div>
                <div className="tl-date">Oct 2023</div>
                <div className="tl-label">Nijamaina Kalupu</div>
            </div>
            <div className="tl-node">
                <div className="tl-dot"></div>
                <div className="tl-date">Jul 2024</div>
                <div className="tl-label">Modati Muddu</div>
            </div>
            <div className="tl-node">
                <div className="tl-dot"></div>
                <div className="tl-date">Mar 2026</div>
                <div className="tl-label">Prayanam</div>
            </div>
        </div>
    );
};

export default TimelineStrip;
