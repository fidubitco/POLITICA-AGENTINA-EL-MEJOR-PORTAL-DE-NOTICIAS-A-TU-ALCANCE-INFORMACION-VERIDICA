'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: number;
  opacity?: number;
  borderRadius?: string;
  glow?: boolean;
  glowColor?: string;
}

export function GlassmorphismCard({
  children,
  className = '',
  blur = 10,
  opacity = 0.1,
  borderRadius = '1rem',
  glow = false,
  glowColor = 'rgba(59, 130, 246, 0.5)',
}: GlassmorphismCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    // Initial animation
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 20,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      }
    );

    // Hover effects
    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -5,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      });

      if (glow) {
        gsap.to(card, {
          boxShadow: `0 0 30px ${glowColor}`,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      if (glow) {
        gsap.to(card, {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          duration: 0.3,
        });
      }
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [glow, glowColor]);

  return (
    <div
      ref={cardRef}
      className={`glass-card ${className}`}
      style={{
        background: `rgba(255, 255, 255, ${opacity})`,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius,
        boxShadow: glow
          ? `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
    >
      {children}
    </div>
  );
}

