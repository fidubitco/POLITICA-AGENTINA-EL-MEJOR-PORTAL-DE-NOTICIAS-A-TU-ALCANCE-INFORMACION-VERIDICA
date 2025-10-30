'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ParticleBackgroundProps {
  density?: number;
  speed?: number;
  size?: number;
  color?: string;
  className?: string;
}

export function ParticleBackground({
  density = 50,
  speed = 0.5,
  size = 2,
  color = '#3b82f6',
  className = '',
}: ParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particles: HTMLDivElement[] = [];

    // Create particles
    for (let i = 0; i < density; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        opacity: ${Math.random() * 0.5 + 0.2};
      `;

      // Random initial position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      container.appendChild(particle);
      particles.push(particle);
    }

    // Animate particles
    particles.forEach((particle, index) => {
      const tl = gsap.timeline({ repeat: -1, delay: index * 0.1 });

      // Random movement
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 200;
      const duration = 10 + Math.random() * 20;

      tl.to(particle, {
        x,
        y,
        duration,
        ease: 'none',
      })
      .to(particle, {
        x: 0,
        y: 0,
        duration,
        ease: 'none',
      });
    });

    // Mouse interaction
    let mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      particles.forEach((particle) => {
        const rect = particle.getBoundingClientRect();
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(mouse.x - particleX, 2) + Math.pow(mouse.y - particleY, 2)
        );

        if (distance < 100) {
          const force = (100 - distance) / 100;
          gsap.to(particle, {
            scale: 1 + force * 0.5,
            duration: 0.3,
            overwrite: 'auto',
          });
        } else {
          gsap.to(particle, {
            scale: 1,
            duration: 0.3,
            overwrite: 'auto',
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, [density, speed, size, color]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    />
  );
}

