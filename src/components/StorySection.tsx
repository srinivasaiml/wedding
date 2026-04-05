import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const episodes = [
  {
    id: 1,
    side: 'left',
    title: 'Modati Choopu',
    telHeading: 'మొదటి చూపు',
    date: 'March 18, 2021',
    image: '/image1.jpeg',
    text: `నేను తనని మొదటి సారి చూశా… అది exam రోజు… <br/><br/>
    అందరు paper లో busy ga unnaru… కానీ నా life లో important question paper kaadu… తను… <br/><br/>
    తను తన అమ్మయిన అందం తో… చిలిపి నవ్వుతో నవుతుంది 😊 <br/><br/>
    ఆ నవ్వు చూసిన క్షణం లో… నేను నా exam మర్చిపోయా… <br/>
    Paper లో ఉన్న questions kuda కనిపడలేదు… నా mind లో ఒకటే question… <br/><br/>
    👉 "ఎవరు ఈ అమ్మయి…?" <br/>
    నేను అలా తనని చూస్తూ ఉండిపోయా… తను కూడా నన్ను చూసి… చూడనట్టు చూసింది… 😌 <br/><br/>
    కొంచెం ధైర్యం చేసి… number అడిగా… <br/><br/>
    👉 "మోకం మీద ఒకటి ఇస్తా…" 😄 <br/>
    ఆ మాటకి భయం తో… నేను అక్కడే ఆగిపోయా… <br/><br/>
    ఆలా కొన్ని రోజులు గడిచాయి… Final year exams start అయ్యాయి… ప్రతి రోజు ఒకరి మోకం ఒకరు చూసుకున్నాం… కానీ… మాటలు లేవు… <br/><br/>
    నేను తనని చూడటం లో busy… తను నన్ను observe చేయటం లో busy… <br/><br/>
    ఆలా తెలియకుండా… తను కూడా నా మీద మనసు పెట్టింది ❤️ <br/><br/>
    చివరి exam రోజు… నా దగ్గర కి వచ్చి… 👉 తన number ఇచ్చింది… <br/>
    ఆ క్షణం… నా life లో first victory లా అనిపించింది…`
  },
  {
    id: 2,
    side: 'right',
    title: 'Prema Prarambham',
    telHeading: 'ప్రేమ ప్రారంభం',
    date: 'September 29, 2021',
    image: '/image2.jpeg',
    text: `Exam అయిన evening… phone ring అయింది… <br/><br/>
    👉 "Uma Calling…" <br/>
    Call lift చేశా… <br/><br/>
    👩 "Hello…" <br/>
    ఆ ఒక్క "Hello"… honey కన్నా sweet గా ఉంది 🍯 కోకిల స్వరం కన్నా మధురం గా ఉంది 🕊️ <br/><br/>
    ఆ voice వింటుంటే… నా గుండె silent గా నవ్వింది ❤️ <br/>
    ఆలా రోజు రోజు కి calls start అయ్యాయి… college అయిన తర్వాత కూడా… ప్రతి రోజు… hours మాట్లాడుకున్నాం… <br/><br/>
    ఆలా ఒక 10 రోజుల తర్వాత… నేను ధైర్యం చేసి… నా మనసులో ఉన్న మాటని చెప్పా… <br/><br/>
    👉 "I love you…" ❤️ <br/>
    10 seconds silence… <br/><br/>
    Uma గుండె కూడా fast గా కొట్టుకుంది… నా heartbeat కూడా వినిపిస్తుంది… <br/><br/>
    తర్వాత… <br/><br/>
    👉 "I love you too…" 💖 <br/>
    ఆ మాటతో… మా ప్రేమ కథా మొదలైంది…`
  },
  {
    id: 3,
    side: 'left',
    title: 'Nijamaina Kalupu',
    telHeading: 'నిజమైన కలుపు',
    date: 'October 18, 2023',
    image: '/image3.jpeg',
    text: `ఒక రోజు… Uma call చేసి… <br/><br/>
    👉 "నేను నీ college కి వచ్చా…" <br/>
    ఆ మాటకి… నా మనసులో తెలియని భయం… ఆమె మనసులో కూడా అదే feeling… <br/><br/>
    కలిసి… ఒకరి మోకం ఒకరు చూసుకొని… silent అయిపోయాం… 😶 <br/><br/>
    కానీ ఆ silence లో… చాలా ప్రేమ ఉంది… <br/>
    తర్వాత… photos తీసుకున్నాం 📸 College మొత్తం తిరిగాం… మనకి మాత్రం అది ఒక కొత్త ప్రపంచం లా అనిపించింది 🌍 <br/><br/>
    కొంచెం తర్వాత… కలిసి భోజనం చేశాం… నేను నా చేతితో… Uma కి తినిపిస్తున్నప్పుడు… <br/><br/>
    నా వేలు… తన పెదవులని touch అయ్యాయి… <br/>
    ఆ క్షణం… నా మనసులో ఒకటే మాట… 👉 "ఇది కదా జీవితం…" ❤️ <br/><br/>
    తర్వాత… bus లో కలిసి ఇంటికి వచ్చాం… ఆ రోజు… simple గా కనిపించిన… నా life లో unforgettable memory అయింది…`
  },
  {
    id: 4,
    side: 'right',
    title: 'Movie & మొదటి ముద్దు',
    telHeading: 'మొదటి ముద్దు',
    date: 'July 1, 2024',
    image: '/image4.jpeg',
    text: `ఒక రోజు… ఇద్దరం కలిసి movie కి వెళ్ళాం 🎥 <br/><br/>
    Theatre లో movie నడుస్తుంది… కానీ మన focus movie మీద కాదు… ఒకరి మీద ఒకరికి… <br/><br/>
    నేను మెల్లగా… Uma hand పై నా hand పెట్టాను… ఆమె hand కొంచెం తడిమికింది… <br/><br/>
    ఒకరి కళ్ళు ఒకరు చూసుకున్నాం… 👀 Slow ga… ఇంక దగ్గర అయ్యాం… <br/><br/>
    మన శ్వాసం ఒకటి అయింది… గుండె దడకన ఒకటే అయింది… 💓 <br/>
    ఆ చూపు లో ఉన్న ప్రేమ… ఆ క్షణం లో ఉన్న magic… నేను నేను కాదు… తను తను కాదు… <br/><br/>
    👉 మనం ఒకరం అయ్యం… <br/>
    💋 నేను Uma ని kiss చేశా… <br/>
    Uma… తన కళ్ళు మూసిక్కోకుండా… నా వైపునే చూస్తుంది… <br/><br/>
    ఆ క్షణం… మా life లో ఎప్పటికీ మర్చిపోని memory అయింది… <br/>
    👉 Movie flop… 👉 మాన love story super hit ❤️🔥`
  },
  {
    id: 5,
    side: 'left',
    title: 'ప్రయాణం – కలిసి నడిచే దూరం',
    telHeading: 'ప్రయాణం',
    date: 'March 11, 2026',
    image: '/image5.jpeg',
    text: `రాత్రి సమయం… train మెల్లగా నడుస్తుంది… 🚆 బయట lights అన్నీ fast గా వెళ్తున్నాయి… కానీ మా మధ్య time slow అయింది… <br/><br/>
    Window పక్కన కూర్చొని… ఇద్దరం silent గా ఉన్నాం… ఈ సారి silence awkward కాదు… అది comfort ❤️ <br/><br/>
    Uma మెల్లగా… నా shoulder మీద తన తల పెట్టి… 😌 <br/><br/>
    ఆ క్షణం లో… నా గుండె దడకన… తన కి వినిపిస్తుంది… 💓 <br/><br/>
    కొంచెం time తర్వాత… తను slow గా అడిగింది… <br/><br/>
    👉 "Vasu…" 👉 "Hmm…" 👉 "ఇది ఎప్పటికీ ఇలానే ఉంటుందా…?" <br/>
    నేను కొంచెం నవ్వాను… తన hand ని strong గా పట్టుకొని… <br/><br/>
    👉 "Train ఆగిపోతుంది… కానీ మా journey ఆగలేదు…" ❤️ <br/>
    తను ఏమీ మాట్లాడలేదు… కానీ తన grip ఇంకొంచెం strong అయింది… ఆ grip లో… భయం లేదు… doubt లేదు… <br/><br/>
    👉 నమ్మకం ఉంది… <br/>
    Train ముందుకి వెళుతుంది… మన life కూడా అలానే… కానీ ఇప్పుడు… ఒక్కరి తో ఒకరు కాదు… <br/><br/>
    👉 కలిసి ❤️ <br/>
    ఆ రాత్రి… simple journey లా అనిపించిన… నిజంగా… మా "forever" start అయిన రోజు అది…`
  }
];

const StorySection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const rows = containerRef.current?.querySelectorAll('.story-row');
        rows?.forEach((row) => {
            const img = row.querySelector('.st-image-wrap');
            const content = row.querySelector('.st-content');
            
            gsap.fromTo(img, 
                { opacity: 0, x: row.classList.contains('reverse') ? 80 : -80, scale: 0.95 },
                { opacity: 1, x: 0, scale: 1, duration: 1.5, scrollTrigger: { trigger: row, start: 'top 80%', scrub: 1 }}
            );

            gsap.fromTo(content, 
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1.5, scrollTrigger: { trigger: row, start: 'top 75%', scrub: 1 }}
            );
        });
    }, []);

    return (
        <div id="story-container" ref={containerRef} style={{ background: '#FFFFFF' }}>
            <section style={{ padding: '120px 20px', textAlign: 'center', background: '#FFFFFF' }}>
                <div style={{ color: '#B8860B', fontSize: '24px', marginBottom: '20px' }}>✦</div>
                <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '48px', color: '#2C2C2C', marginBottom: '10px' }}>Oka Nijamaina Prema Kathaa</h2>
                <h3 style={{ fontSize: '32px', color: '#B8860B', marginBottom: '30px' }}>నిజమైన ప్రేమ కథ</h3>
                <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '18px', color: '#555', lineHeight: '1.8' }}>
                Every love story is beautiful, but ours is our favorite. <br/>
                Five moments that changed everything — five memories we'll carry forever.
                </p>
            </section>

            {episodes.map((ep) => (
                <div key={ep.id} className={`story-row ${ep.side === 'right' ? 'reverse' : ''}`}>
                    <div className="st-image-wrap">
                        <img src={ep.image} alt={ep.title} />
                    </div>
                    <div className="st-content">
                        <div style={{ color: '#B8860B', letterSpacing: '4px', fontSize: '12px', marginBottom: '10px' }}>EPISODE 0{ep.id}</div>
                        <div style={{ fontSize: '14px', color: '#999', marginBottom: '20px' }}>{ep.date}</div>
                        <h4 style={{ fontFamily: 'Cormorant Garamond', fontSize: '40px', color: '#2C2C2C', marginBottom: '10px' }}>{ep.title}</h4>
                        <h5 style={{ fontSize: '26px', color: '#B8860B', marginBottom: '30px' }}>{ep.telHeading}</h5>
                        <div 
                            style={{ fontSize: '18px', color: '#444', lineHeight: '1.9', borderLeft: '2px solid #F0DDBB', paddingLeft: '30px' }} 
                            dangerouslySetInnerHTML={{ __html: ep.text }} 
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StorySection;
