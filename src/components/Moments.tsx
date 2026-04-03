import React from 'react';

interface Moment {
    id: number;
    year: string;
    title: string;
    image: string;
}

const moments: Moment[] = [
    { id: 1, year: "2021", title: "First Glance", image: "https://picsum.photos/seed/2021/400/300" },
    { id: 2, year: "2022", title: "Golden Days", image: "https://picsum.photos/seed/2022/400/300" },
    { id: 3, year: "2023", title: "First Meeting", image: "https://picsum.photos/seed/2023/400/300" },
    { id: 4, year: "2024", title: "Cinema Kisses", image: "https://picsum.photos/seed/2024/400/300" },
    { id: 5, year: "2026", title: "Train Journey", image: "https://picsum.photos/seed/2026/400/300" },
    { id: 6, year: "2030", title: "Forever Begins", image: "https://picsum.photos/seed/2030/400/300" }
];

const Moments: React.FC = () => {
    return (
        <section id="moments" className="moments-section">
            <div className="section-title reveal">
                <span className="icon">✦</span>
                <h2>Moments Together</h2>
            </div>
            
            <div className="gallery-grid">
                {moments.map((moment) => (
                    <div key={moment.id} className="gallery-card reveal">
                        <div className="gallery-img-wrap">
                            <img src={moment.image} alt={moment.title} />
                        </div>
                        <div className="gallery-info">
                            <div className="gallery-year">{moment.year}</div>
                            <h4>{moment.title}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Moments;
