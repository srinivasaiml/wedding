import React from 'react';

interface WeddingEvent {
    id: number;
    title: string;
    date: string;
    time: string;
    venue: string;
    icon: React.ReactNode;
}

const events: WeddingEvent[] = [
    {
        id: 1,
        title: "Mehendi Ceremony",
        date: "March 18, 2030",
        time: "4:00 PM onwards",
        venue: "Cherukuri Kalyana Mandapam, JN Road",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
        )
    },
    {
        id: 2,
        title: "Wedding Ceremony",
        date: "March 20, 2030",
        time: "6:00 PM",
        venue: "Cherukuri Kalyana Mandapam, JN Road",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
        )
    },
    {
        id: 3,
        title: "Reception",
        date: "March 21, 2030",
        time: "7:00 PM onwards",
        venue: "Cherukuri Kalyana Mandapam, JN Road",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
        )
    }
];

const Events: React.FC = () => {
    return (
        <section id="events" className="big-day-section">
            <div className="section-title reveal">
                <span className="icon">💍</span>
                <h2>Join Us For The Celebration</h2>
                <p>Rajahmundry, India</p>
            </div>

            <div className="events-container">
                {events.map((event) => (
                    <div key={event.id} className="event-card reveal">
                        <div className="event-icon">
                            {event.icon}
                        </div>
                        <h3>{event.title}</h3>
                        <p className="script-font" style={{ color: 'var(--text-light)' }}>
                            {event.id === 1 ? '🌸' : event.id === 2 ? '💍' : '🎉'}
                        </p>
                        <p><strong>{event.date}</strong></p>
                        <p>{event.time}</p>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>{event.venue}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Events;
