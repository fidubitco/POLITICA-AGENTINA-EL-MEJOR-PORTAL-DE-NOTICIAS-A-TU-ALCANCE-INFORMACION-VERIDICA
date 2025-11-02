'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

// Componente para partículas flotantes en el fondo
export function FloatingParticles({ count = 50, className = '' }: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

// Componente para gradiente animado
export function AnimatedGradient({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      animate={{
        background: [
          'linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4)',
          'linear-gradient(45deg, #8b5cf6, #06b6d4, #3b82f6)',
          'linear-gradient(45deg, #06b6d4, #3b82f6, #8b5cf6)',
          'linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4)',
        ],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

// Componente para ondas de fondo
export function BackgroundWaves({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-50 to-transparent"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-blue-100/50 to-transparent"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-200/30 to-transparent"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </div>
  );
}

// Componente para efecto de vidrio con animación
export function AnimatedGlassmorphism({ children, className = '' }: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.02,
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
      }}
    >
      {children}
    </motion.div>
  );
}

// Componente para efecto de neón pulsante
export function NeonGlow({ children, color = 'blue', className = '' }: {
  children: React.ReactNode;
  color?: 'blue' | 'purple' | 'green' | 'red';
  className?: string;
}) {
  const colors = {
    blue: 'shadow-blue-500/50',
    purple: 'shadow-purple-500/50',
    green: 'shadow-green-500/50',
    red: 'shadow-red-500/50'
  };

  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        boxShadow: [
          `0 0 5px rgba(59, 130, 246, 0.5)`,
          `0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6)`,
          `0 0 5px rgba(59, 130, 246, 0.5)`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// Componente para estrellas twinkling
export function TwinklingStars({ count = 20, className = '' }: {
  count?: number;
  className?: string;
}) {
  const [stars, setStars] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const newStars = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3
    }));
    setStars(newStars);
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Componente para efecto de typing
export function TypingEffect({ text, speed = 50, className = '' }: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  );
}

// Componente para morphing shapes
export function MorphingShape({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`w-32 h-32 ${className}`}
      animate={{
        borderRadius: ['0%', '50%', '25%', '0%'],
        rotate: [0, 90, 180, 270, 360],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
      }}
    />
  );
}
