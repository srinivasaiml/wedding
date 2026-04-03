import { useEffect } from 'react';

export const useReveal = () => {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
      revealOnScroll.observe(reveal);
    });

    return () => {
      reveals.forEach(reveal => {
        revealOnScroll.unobserve(reveal);
      });
    };
  }, []);
};
