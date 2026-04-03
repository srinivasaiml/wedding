import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    r: number;
    vy: number;
    vx: number;
    o: number;
    g: boolean;
    ph: number;
}

interface CanvasParticlesProps {
    id: string;
    particleCount: number;
}

const CanvasParticles: React.FC<CanvasParticlesProps> = ({ id, particleCount }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const c = canvasRef.current;
        if (!c) return;
        const x = c.getContext('2d');
        if (!x) return;

        let ps: Particle[] = [];

        const rz = () => {
            c.width = window.innerWidth;
            c.height = window.innerHeight;
        };

        rz();
        window.addEventListener('resize', rz);

        for (let i = 0; i < particleCount; i++) {
            ps.push({
                x: Math.random() * c.width,
                y: Math.random() * c.height,
                r: Math.random() * 2 + .5,
                vy: -(Math.random() * .4 + .08),
                vx: (Math.random() - .5) * .2,
                o: Math.random() * .45 + .05,
                g: Math.random() > .75,
                ph: Math.random() * Math.PI * 2
            });
        }

        let animationFrameId: number;

        const draw = () => {
            x.clearRect(0, 0, c.width, c.height);
            const t = Date.now() * .001;

            ps.forEach(p => {
                p.y += p.vy;
                p.x += Math.sin(p.ph + t) * .15 + p.vx;

                if (p.y < -10) {
                    p.y = c.height + 10;
                    p.x = Math.random() * c.width;
                }

                x.save();
                x.globalAlpha = p.o;
                if (p.g) {
                    x.shadowBlur = 12;
                    x.shadowColor = 'rgba(212,175,122,0.5)';
                }
                x.fillStyle = '#D4AF7A';
                x.beginPath();
                x.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                x.fill();
                x.restore();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', rz);
            cancelAnimationFrame(animationFrameId);
        };
    }, [particleCount]);

    return (
        <canvas 
            id={id} 
            ref={canvasRef} 
            style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
        />
    );
};

export default CanvasParticles;
