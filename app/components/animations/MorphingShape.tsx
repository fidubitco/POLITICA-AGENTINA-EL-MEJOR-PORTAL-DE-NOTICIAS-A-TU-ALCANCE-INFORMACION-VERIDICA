'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(MorphSVGPlugin);

interface MorphingShapeProps {
  shapes: string[];
  className?: string;
  duration?: number;
  delay?: number;
  repeat?: number;
}

export function MorphingShape({
  shapes,
  className = '',
  duration = 2,
  delay = 0,
  repeat = -1,
}: MorphingShapeProps) {
  const shapeRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!shapeRef.current || shapes.length < 2) return;

    const element = shapeRef.current;

    // Create morphing animation
    const tl = gsap.timeline({ repeat, delay });

    shapes.forEach((shape, index) => {
      if (index === 0) return;

      tl.to(element, {
        morphSVG: shape,
        duration,
        ease: 'power2.inOut',
      });
    });

    // Add hover effect
    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      tl.kill();
    };
  }, [shapes, duration, delay, repeat]);

  if (!shapes.length) return null;

  return (
    <svg
      className={`morphing-shape ${className}`}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={shapeRef}
        d={shapes[0]}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
      />
    </svg>
  );
}

// Predefined shapes for common use cases
export const commonShapes = {
  circle: 'M50,10 A40,40 0 1,1 49.9,10 Z',
  square: 'M10,10 L90,10 L90,90 L10,90 Z',
  triangle: 'M50,10 L90,90 L10,90 Z',
  star: 'M50,10 L61,35 L88,35 L69,57 L76,83 L50,69 L24,83 L31,57 L12,35 L39,35 Z',
  hexagon: 'M50,10 L83,30 L83,70 L50,90 L17,70 L17,30 Z',
  diamond: 'M50,10 L80,50 L50,90 L20,50 Z',
  heart: 'M50,20 C45,15 35,15 30,25 C25,35 35,45 50,60 C65,45 75,35 70,25 C65,15 55,15 50,20 Z',
};

