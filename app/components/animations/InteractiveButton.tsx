'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  ripple?: boolean;
  magnetic?: boolean;
  glow?: boolean;
}

export function InteractiveButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  ripple = true,
  magnetic = false,
  glow = false,
}: InteractiveButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
    ghost: 'text-blue-600 hover:bg-blue-100',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;

    // Magnetic effect
    let mouse = { x: 0, y: 0 };
    let buttonBounds = button.getBoundingClientRect();

    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetic) return;

      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const buttonCenterX = buttonBounds.left + buttonBounds.width / 2;
      const buttonCenterY = buttonBounds.top + buttonBounds.height / 2;

      const deltaX = mouse.x - buttonCenterX;
      const deltaY = mouse.y - buttonCenterY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 100;

      if (distance < maxDistance) {
        const strength = (maxDistance - distance) / maxDistance;
        const moveX = deltaX * strength * 0.3;
        const moveY = deltaY * strength * 0.3;

        gsap.to(button, {
          x: moveX,
          y: moveY,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.2,
        ease: 'power2.out',
      });

      if (glow) {
        gsap.to(button, {
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
          duration: 0.2,
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.2,
        ease: 'power2.out',
      });

      if (glow) {
        gsap.to(button, {
          boxShadow: 'none',
          duration: 0.2,
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!ripple || !rippleRef.current) return;

      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rippleElement = document.createElement('div');
      rippleElement.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x - 10}px;
        top: ${y - 10}px;
        width: 20px;
        height: 20px;
      `;

      rippleRef.current.appendChild(rippleElement);

      setTimeout(() => {
        if (rippleRef.current && rippleElement.parentNode) {
          rippleRef.current.removeChild(rippleElement);
        }
      }, 600);

      onClick?.();
    };

    if (magnetic) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('click', handleClick);

    // Update bounds on resize
    const handleResize = () => {
      buttonBounds = button.getBoundingClientRect();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, [magnetic, glow, ripple, onClick]);

  return (
    <button
      ref={buttonRef}
      className={`
        relative overflow-hidden rounded-lg font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      <div ref={rippleRef} className="absolute inset-0 pointer-events-none" />
      {children}
    </button>
  );
}

// Add ripple animation to CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

