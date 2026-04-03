import React from 'react';

interface StoryItem {
    id: number;
    title: string;
    date: string;
    description: string;
    image: string;
}

const stories: StoryItem[] = [
    {
        id: 1,
        title: "The First Look 👀",
        date: "March 18, 2021",
        description: "It was just another college day. The environmental exam was going on and Vasu was sitting quietly in the hall, trying to focus on his paper. Then he looked up — and there she was. Uma. Something happened in that moment that he still cannot fully explain. He looked into her eyes and it was like the exam, the hall, the noise — all of it disappeared. His heart did not ask for permission. It just fell.",
        image: "https://picsum.photos/seed/look/500/300"
    },
    {
        id: 2,
        title: "He Proposed. She Said Yes 💍",
        date: "September 29, 2021",
        description: "After days of talking — long calls, shared laughs, messages that went late into the night — Vasu knew he could not wait any longer. His heart was full and his feelings were too big to keep inside. So one day, with a nervous voice and a heart beating out of his chest, he told her everything. And then he asked. A few seconds passed. Just a few — but they felt like forever. Then Uma said yes.",
        image: "https://picsum.photos/seed/prop/500/300"
    },
    {
        id: 3,
        title: "Their First Meeting 🤝",
        date: "October 18, 2023",
        description: "It was a college event. They had spoken so many times before but always through a screen. Now they were actually standing near each other and neither of them knew what to say. Both their hearts were beating fast. Uma was shy, looking down more than up. Vasu was nervous, smiling too much to hide it. But little by little the nervousness melted. And what was left felt warm and real.",
        image: "https://picsum.photos/seed/meet/500/300"
    },
    {
        id: 4,
        title: "Their First Kiss 💋",
        date: "July 1, 2024",
        description: "It was during a movie neither of them remembers now. The screen was glowing, the hall was dark, and at some point they both turned to look at each other at the exact same moment. There was a pause — a quiet, warm, heart-thumping pause. Then he leaned in slowly and she let him. It was gentle and soft and a little bit nervous and it meant everything.",
        image: "https://picsum.photos/seed/kiss/500/300"
    },
    {
        id: 5,
        title: "Their First Trip Together ✈️",
        date: "March 11, 2026",
        description: "They were traveling by train, sitting together at the window seat as the world moved past them outside. It was night. The moon was following them — or at least it felt that way. At some point Uma stopped looking outside and slowly rested her head on Vasu's chest. He did not move. He barely breathed. That train ride was not just a trip. It was the moment they both knew — this is it.",
        image: "https://picsum.photos/seed/trip/500/300"
    }
];

const Journey: React.FC = () => {
    return (
        <section id="journey" className="timeline-section">
            <div className="section-title reveal">
                <span className="icon">❦</span>
                <h2>How It All Began</h2>
                <p>Every love story is beautiful, but ours is our favorite.</p>
            </div>

            <div className="timeline">
                {stories.map((story) => (
                    <div key={story.id} className="timeline-item reveal">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <img src={story.image} alt={story.title} className="timeline-img" />
                            <span className="timeline-date">{story.date}</span>
                            <h4>{story.title}</h4>
                            <p>{story.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Journey;
