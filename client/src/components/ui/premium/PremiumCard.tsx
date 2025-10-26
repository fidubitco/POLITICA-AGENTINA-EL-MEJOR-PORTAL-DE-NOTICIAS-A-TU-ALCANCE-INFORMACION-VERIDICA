import React from 'react';
import { motion } from 'framer-motion';

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient';
  hover?: boolean;
  onClick?: () => void;
}

export const PremiumCard: React.FC<PremiumCardProps> = ({
  children,
  className = '',
  variant = 'default',
  hover = true,
  onClick,
}) => {
  const baseStyles = 'rounded-xl p-6 transition-all duration-300';
  
  const variantStyles = {
    default: 'bg-white shadow-md',
    glass: 'glass',
    gradient: 'gradient-primary text-white',
  };
  
  const hoverStyles = hover
    ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'
    : '';
  
  return (
    <motion.div
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { scale: 1.02 } : {}}
    >
      {children}
    </motion.div>
  );
};

