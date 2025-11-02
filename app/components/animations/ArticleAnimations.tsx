'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedArticleCardProps {
  children: ReactNode;
  index: number;
  className?: string;
}

// Animación para cards de artículos en lista
export function AnimatedArticleCard({ children, index, className = '' }: AnimatedArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 }
      }}
      className={className}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        {children}
      </motion.div>
    </motion.article>
  );
}

// Animación para hover en elementos interactivos
export function HoverLift({ children, className = '' }: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animación para botones
export function AnimatedButton({ children, className = '', variant = 'primary' }: {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}) {
  const variants = {
    primary: {
      hover: { scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' },
      tap: { scale: 0.95 }
    },
    secondary: {
      hover: { scale: 1.02, backgroundColor: 'rgba(0,0,0,0.05)' },
      tap: { scale: 0.98 }
    },
    outline: {
      hover: { scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.5)' },
      tap: { scale: 0.98 }
    }
  };

  return (
    <motion.button
      whileHover={variants[variant].hover}
      whileTap={variants[variant].tap}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// Animación para elementos de lista escalonados
export function StaggeredList({ children, staggerDelay = 0.1 }: {
  children: ReactNode;
  staggerDelay?: number;
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children
      }
    </motion.div>
  );
}

// Animación para texto que se revela
export function TextReveal({ children, delay = 0 }: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
}

// Animación para iconos con bounce
export function BouncingIcon({ children, className = '' }: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animación para loading spinner
export function LoadingSpinner({ size = 'md', className = '' }: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
      className={`${sizes[size]} border-2 border-gray-300 border-t-blue-600 rounded-full ${className}`}
    />
  );
}

// Animación para elementos que aparecen al hacer scroll
export function ScrollReveal({ children, className = '' }: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
