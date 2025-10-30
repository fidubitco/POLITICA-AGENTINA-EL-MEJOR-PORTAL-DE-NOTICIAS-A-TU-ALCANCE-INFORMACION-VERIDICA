'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  trigger?: string;
}

export function TextReveal({
  text,
  className = '',
  delay = 0,
  duration = 0.05,
  stagger = 0.02,
  trigger,
}: TextRevealProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;
    const chars = text.split('');

    // Wrap each character in a span
    element.innerHTML = chars
      .map(char => `<span class="text-reveal-char inline-block">${char === ' ' ? '\u00A0' : char}</span>`)
      .join('');

    const charElements = element.querySelectorAll('.text-reveal-char');

    // Set initial state
    gsap.set(charElements, {
      opacity: 0,
      y: 20,
      rotateX: -90,
    });

    // Create animation
    const tl = gsap.timeline({
      delay,
      scrollTrigger: trigger ? {
        trigger,
        start: 'top 80%',
      } : undefined,
    });

    tl.to(charElements, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration,
      ease: 'back.out(1.7)',
      stagger,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [text, delay, duration, stagger, trigger]);

  return (
    <span
      ref={textRef}
      className={`text-reveal ${className}`}
    >
      {text}
    </span>
  );
}

