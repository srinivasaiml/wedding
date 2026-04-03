import React, { useState, useEffect } from 'react';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    isMarried: boolean;
  }>({
    days: '000',
    hours: '00',
    minutes: '00',
    seconds: '00',
    isMarried: false
  });

  useEffect(() => {
    const weddingDate = new Date("March 20, 2030 18:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft(prev => ({ ...prev, isMarried: true }));
        return;
      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: d.toString().padStart(3, '0'),
        hours: h < 10 ? "0" + h : h.toString(),
        minutes: m < 10 ? "0" + m : m.toString(),
        seconds: s < 10 ? "0" + s : s.toString(),
        isMarried: false
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeLeft.isMarried) {
    return (
      <section className="countdown-section">
        <h3>Happily Married!</h3>
      </section>
    );
  }

  return (
    <section className="countdown-section">
      <h3>Counting Down To Our Forever</h3>
      <div className="countdown-timer">
        <div className="time-box">
          <span className="time-val">{timeLeft.days}</span>
          <span className="time-label">Days</span>
        </div>
        <div className="time-box">
          <span className="time-val">{timeLeft.hours}</span>
          <span className="time-label">Hours</span>
        </div>
        <div className="time-box">
          <span className="time-val">{timeLeft.minutes}</span>
          <span className="time-label">Minutes</span>
        </div>
        <div className="time-box">
          <span className="time-val">{timeLeft.seconds}</span>
          <span className="time-label">Seconds</span>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
