'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingAnimationProps {
  type?: 'spinner' | 'dots' | 'pulse' | 'bars' | 'wave';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export function LoadingAnimation({
  type = 'spinner',
  size = 'md',
  color = '#3b82f6',
  className = '',
}: LoadingAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const sizes = {
    sm: 24,
    md: 40,
    lg: 64,
  };

  const sizeValue = sizes[size];

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    switch (type) {
      case 'spinner':
        // Spinner animation
        gsap.to(container.querySelector('.spinner'), {
          rotation: 360,
          duration: 1,
          ease: 'none',
          repeat: -1,
        });
        break;

      case 'dots':
        // Dots animation
        const dots = container.querySelectorAll('.dot');
        gsap.set(dots, { y: 0 });
        gsap.to(dots, {
          y: -10,
          duration: 0.5,
          ease: 'power2.inOut',
          stagger: 0.1,
          repeat: -1,
          yoyo: true,
        });
        break;

      case 'pulse':
        // Pulse animation
        gsap.to(container.querySelector('.pulse'), {
          scale: 1.2,
          opacity: 0.5,
          duration: 1,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
        });
        break;

      case 'bars':
        // Bars animation
        const bars = container.querySelectorAll('.bar');
        gsap.set(bars, { scaleY: 0.3 });
        gsap.to(bars, {
          scaleY: 1,
          duration: 0.8,
          ease: 'power2.inOut',
          stagger: 0.1,
          repeat: -1,
          yoyo: true,
        });
        break;

      case 'wave':
        // Wave animation
        const waves = container.querySelectorAll('.wave');
        gsap.to(waves, {
          scaleY: 1.5,
          duration: 0.6,
          ease: 'power2.inOut',
          stagger: 0.1,
          repeat: -1,
          yoyo: true,
        });
        break;
    }

    return () => {
      gsap.killTweensOf(container);
    };
  }, [type]);

  const renderSpinner = () => (
    <div
      className="spinner border-4 border-gray-200 rounded-full"
      style={{
        width: sizeValue,
        height: sizeValue,
        borderTopColor: color,
      }}
    />
  );

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="dot bg-current rounded-full"
          style={{
            width: sizeValue / 6,
            height: sizeValue / 6,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div
      className="pulse bg-current rounded-full"
      style={{
        width: sizeValue / 2,
        height: sizeValue / 2,
        backgroundColor: color,
      }}
    />
  );

  const renderBars = () => (
    <div className="flex items-end space-x-1">
      {[0, 1, 2, 3].map(i => (
        <div
          key={i}
          className="bar bg-current rounded-sm"
          style={{
            width: sizeValue / 8,
            height: sizeValue,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );

  const renderWave = () => (
    <div className="flex items-center space-x-1">
      {[0, 1, 2, 3, 4].map(i => (
        <div
          key={i}
          className="wave bg-current rounded-sm"
          style={{
            width: sizeValue / 10,
            height: sizeValue / 4,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );

  const renderAnimation = () => {
    switch (type) {
      case 'spinner':
        return renderSpinner();
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'bars':
        return renderBars();
      case 'wave':
        return renderWave();
      default:
        return renderSpinner();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-center ${className}`}
      style={{ color }}
    >
      {renderAnimation()}
    </div>
  );
}

