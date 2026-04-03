import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Episode {
    id: number;
    title: string;
    subTitle: string;
    date: string;
    description: string;
    image: string;
    frameClass?: string;
}

const episodes: Episode[] = [
    {
        id: 1,
        title: "Modati ",
        subTitle: "Choopu",
        date: "March 18, 2021",
        description: `Nenu tanani modati sari chusaa…\nadi exam roju…\n\nAndaru paper lo busy ga unnaru…\nkani naa life lo important question paper kaadu…\ntanu…\n\nTanu tana ammayina andam tho…\nchilipi navvutho navuthundi 😊\n\nAa navvu chusina kshanam lo…\nnenu naa exam marchipoyaa…\n\nPaper lo unna questions kuda kanapadaledu…\nnaa mind lo okkate question…\n\n👉 “Evaru ee ammayi…?”\n\nNenu alaa tanani chustuu undipoyaa…\ntanu kuda nannu chusi… chudanattu chusindi… 😌\n\nKonchem dhairyam chesi…\nnumber adigaa…\n\nTanu navvuthu cheppindi…\n👉 “Mokam meeda okati ista…” 😄\n\nAa maataki bayam tho…\nnenu akkadey aagipoyaa…\n\nAla konni rojulu gadichayi…\n\nFinal year exams start ayyayi…\nprati roju okari mokam okaru chusukunna…\n\nKani… matalu levu…\n\nNenu tanani chudatam lo busy…\ntanu nannu observe cheyatam lo busy…\n\nAla teliyakunda…\ntanu kuda naa meeda manasu padesindi ❤️\n\nChivari exam roju…\nnaa daggara ki ochi…\n\n👉 tana number ichindi…\n\nAa kshanam…\nnaa life lo first victory laga anipinchindi…`,
        image: "image1.jpeg"
    },
    {
        id: 2,
        title: "Prema ",
        subTitle: "Prarambham",
        date: "September 29, 2021",
        description: `Exam aipoyina evening…\nphone ring ayyindi…\n\n👉 “Uma Calling…”\n\nCall lift chesaa…\n\n👩 “Hello…”\n\nAa okka “Hello”…\nhoney kanna sweet ga undi 🍯\nkokila swaram kanna madhuram ga undi 🕊️\n\nAa voice vintunte…\nnaa gunde silent ga navvindi ❤️\n\nAla roju roju ki calls start ayyayi…\ncollege aipoyina tarvata kuda…\n\nPrati roju…\nhours maatladukunna…\n\nAla oka 10 rojula tarvata…\n\nNenu dhairyam chesi…\nnaa manasulo unna maatani cheppaa…\n\n👉 “I love you…” ❤️\n\n10 seconds silence…\n\nUma gunde kuda fast ga kotthukundi…\nnaa heartbeat kuda vinipisthundi…\n\nTarvata…\n\n👉 “I love you too…” 💖\n\nAa maatato…\nmaa prema kathaa modhalu ayyindi…`,
        image: "image2.jpeg",
        frameClass: "ring-frame"
    },
    {
        id: 3,
        title: "Nijamaina ",
        subTitle: "Kalupu",
        date: "October 18, 2023",
        description: `Oka roju…\nUma call chesi…\n\n👉 “Nenu nee college ki vachaa…”\n\nAa maataki…\nnaa manasulo teliyani bayam…\naame manasulo kuda ade feeling…\n\nKalisi…\nokari mokam okaru chusukoni…\nsilent ayyipoyaam… 😶\n\nKani aa silence lo…\nchala prema undi…\n\nTarvata…\nphotos teesukunnam 📸\n\nCollege motham tirigam…\nmanaki matram adi oka kottha prapancham laga anipinchindi 🌍\n\nKonchem tarvata…\nkalisi bhojanam chesam…\n\nNenu naa chethitho…\nUma ki tinipistunnappudu…\n\nnaa velu…\ntana pedavulani touch ayyayi…\n\nAa kshanam…\nnaa manasulo okate maat…\n\n👉 “Idi kada jeevitham…” ❤️\n\nTarvata…\nbus lo kalisi intiki vachesam…\n\nAa roju…\nsimple ga kanipinchina…\nnaa life lo unforgettable memory ayyindi…`,
        image: "image3.jpeg"
    },
    {
        id: 4,
        title: "Movie & ",
        subTitle: "Modati Muddu",
        date: "July 1, 2024",
        description: `Oka roju…\niddaram kalisi movie ki vellam 🎥\n\nTheatre lo movie nadusthundi…\nkani mana focus movie meeda kaadu…\n\nokari meeda okariki…\n\nNenu mellaga…\nUma hand pai naa hand pettanu…\n\nAame hand konchem tadumukundi…\n\nOkari kallu okaru chusukunna… 👀\n\nSlow ga…\ninka daggara ayyamu…\n\nMana swasam okati ayindi…\ngunde dhadkan okate ayyindi… 💓\n\nAa choopu lo unna prema…\naa kshanam lo unna magic…\n\nNenu nenu kaadhu…\ntanu tanu kaadhu…\n\n👉 manam okaram ayyam…\n\n💋 Nenu Uma ni kiss chesaa…\n\nUma… tana kallu mooyakunda…\nnaa veipune chusthundi…\n\nAa kshanam…\nmaa life lo eppatiki marchipoleni memory ayyindi…\n\n👉 Movie flop…\n👉 Mana love story super hit ❤️🔥`,
        image: "image4.jpeg",
        frameClass: "heartbeat-frame"
    },
    {
        id: 5,
        title: "Prayanam – ",
        subTitle: "Kalisi Nadiche Dhooram",
        date: "March 11, 2026",
        description: `Ratri samayam…\ntrain mellaga nadusthundi… 🚆\n\nBayata lights anni fast ga velthunnayi…\nkani maa madhya time slow ayyindi…\n\nWindow pakkana kurchoni…\niddaram silent ga unnam…\n\nEe sari silence awkward kaadu…\nadi comfort ❤️\n\nUma mellaga…\nnaa shoulder meedha tana thala petti… 😌\n\nAa kshanam lo…\nnaa gunde dhadkan…\ntana ki vinipisthundi… 💓\n\nKonchem time tarvata…\ntanu slow ga adagindi…\n\n👉 “Vasu…”\n\n👉 “Hmm…”\n\n👉 “Idi eppatiki ilaane untundaa…?”\n\nNenu konchem navvanu…\ntana hand ni strong ga pattukoni…\n\n👉 “Train aagipothundi…\nkani mana journey aagadu…” ❤️\n\nTanu emi maatladaledu…\nkani tana grip inkonchem strong ayyindi…\n\nAa grip lo…\nbayam ledu…\ndoubt ledu…\n\n👉 nammakam undi…\n\nTrain munduku velthundi…\nmana life kuda alane…\n\nkani ippudu…\nokkari tho okaru kaadu…\n\n👉 kalisi ❤️\n\nAa ratri…\nsimple journey la anipinchina…\n\nnijanga…\nmaa “forever” start ayina roju adi…`,
        image: "image5.jpeg"
    }
];

const StorySection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sections = containerRef.current?.querySelectorAll('.story-item');
        sections?.forEach((section) => {
            const inner = section.querySelector('.story-inner');
            if (inner) {
                gsap.fromTo(inner, 
                    { opacity: 0, y: 80, scale: 0.92, filter: 'blur(6px)' },
                    {
                        opacity: 1, 
                        y: 0, 
                        scale: 1, 
                        filter: 'blur(0px)', 
                        duration: 1.2, 
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }
        });

        // 3D Tilt for frames
        const frames = containerRef.current?.querySelectorAll('.story-img-frame');
        frames?.forEach((frame) => {
            const handleMouseMove = (e: any) => {
                const r = frame.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                gsap.to(frame, { rotateY: x * 12, rotateX: -y * 12, transformPerspective: 600, duration: 0.4, ease: 'power2.out' });
            };
            const handleMouseLeave = () => {
                gsap.to(frame, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' });
            };
            frame.addEventListener('mousemove', handleMouseMove);
            frame.addEventListener('mouseleave', handleMouseLeave);
        });

    }, []);

    return (
        <div id="story-container" ref={containerRef}>
            <section className="sec-pad" id="love-story">
                <div className="story-bg"></div>
                <div className="sec-center" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="sec-label">💖 UMA ❤️ VASU</div>
                    <h2 className="sec-title">Oka Nijamaina <em>Prema Kathaa</em></h2>
                    <p className="sec-desc">Every love story is beautiful, but ours is our favorite. Five moments that changed everything — five memories we'll carry forever.</p>
                </div>
            </section>

            {episodes.map((ep) => (
                <React.Fragment key={ep.id}>
                    <div className="story-connector"></div>
                    <div className="story-item">
                        <div className="story-inner">
                            <div className="story-num">Episode 0{ep.id}</div>
                            <div className={`story-img-frame ${ep.frameClass || ''}`}>
                                <img src={ep.image} alt={ep.title} />
                            </div>
                            <div className="story-date">{ep.date}</div>
                            <h3 className="story-heading">{ep.title}<em>{ep.subTitle}</em></h3>
                            <p className="story-text" dangerouslySetInnerHTML={{ __html: ep.description.replace(/\n/g, '<br>') }}></p>
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default StorySection;
