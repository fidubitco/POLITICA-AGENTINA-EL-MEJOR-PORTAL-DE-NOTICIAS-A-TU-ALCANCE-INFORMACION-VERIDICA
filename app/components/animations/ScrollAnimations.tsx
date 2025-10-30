'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationsProps {
  children: React.ReactNode;
}

export function ScrollAnimations({ children }: ScrollAnimationsProps) {
  useEffect(() => {
    // Kill existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Animate hero content
    gsap.fromTo(
      '.hero-title',
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top center',
          end: 'bottom center',
        },
      }
    );

    gsap.fromTo(
      '.hero-subtitle',
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power1.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top center',
        },
      }
    );

    gsap.fromTo(
      '.hero-buttons',
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power1.out',
        delay: 0.6,
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top center',
        },
      }
    );

    // Animate featured news
    gsap.fromTo(
      '.featured-article',
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.featured-section',
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      '.side-article',
      {
        opacity: 0,
        x: 30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power1.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.featured-section',
          start: 'top 80%',
        },
      }
    );

    // Animate category sections
    gsap.fromTo(
      '.category-header',
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.category-section',
          start: 'top 85%',
        },
      }
    );

    gsap.fromTo(
      '.category-article',
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power1.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.category-section',
          start: 'top 80%',
        },
      }
    );

    // Parallax effects
    gsap.to('.parallax-bg', {
      yPercent: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Hover animations for article cards
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach((card) => {
      const image = card.querySelector('.article-image');
      const content = card.querySelector('.article-content');

      card.addEventListener('mouseenter', () => {
        gsap.to(image, {
          scale: 1.05,
          duration: 0.4,
          ease: 'power2.out',
        });
        gsap.to(content, {
          y: -5,
          duration: 0.4,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(image, {
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        });
        gsap.to(content, {
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
    });

    // Loading animations
    gsap.fromTo(
      '.loading-spinner',
      {
        rotation: 0,
      },
      {
        rotation: 360,
        duration: 1,
        ease: 'none',
        repeat: -1,
      }
    );

    // Stagger animations for lists
    gsap.set('.stagger-item', { opacity: 0, y: 20 });
    ScrollTrigger.batch('.stagger-item', {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
        });
      },
      start: 'top 90%',
    });

    // Text reveal animations
    const textElements = document.querySelectorAll('.text-reveal');
    textElements.forEach((element) => {
      const text = element.textContent || '';
      element.innerHTML = text
        .split('')
        .map(char => `<span class="text-reveal-char">${char}</span>`)
        .join('');

      gsap.fromTo(
        element.querySelectorAll('.text-reveal-char'),
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.05,
          ease: 'power1.out',
          stagger: 0.02,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}

