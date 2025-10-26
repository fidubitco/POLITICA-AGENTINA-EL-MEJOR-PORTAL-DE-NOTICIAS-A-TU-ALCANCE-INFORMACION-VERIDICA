import React from 'react';
import { motion } from 'framer-motion';

interface PremiumBadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  pulse?: boolean;
  className?: string;
}

export const PremiumBadge: React.FC<PremiumBadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  pulse = false,
  className = '',
}) => {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };
  
  const variantStyles = {
    success: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    error: 'bg-red-100 text-red-700 border-red-200',
    info: 'bg-blue-100 text-blue-700 border-blue-200',
    default: 'bg-gray-100 text-gray-700 border-gray-200',
  };
  
  return (
    <motion.span
      className={`
        inline-flex items-center gap-1.5 font-semibold rounded-full border
        ${sizeStyles[size]} ${variantStyles[variant]} ${className}
      `}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            variant === 'success' ? 'bg-green-400' :
            variant === 'warning' ? 'bg-yellow-400' :
            variant === 'error' ? 'bg-red-400' :
            variant === 'info' ? 'bg-blue-400' :
            'bg-gray-400'
          }`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${
            variant === 'success' ? 'bg-green-500' :
            variant === 'warning' ? 'bg-yellow-500' :
            variant === 'error' ? 'bg-red-500' :
            variant === 'info' ? 'bg-blue-500' :
            'bg-gray-500'
          }`} />
        </span>
      )}
      
      {icon && <span>{icon}</span>}
      
      <span>{children}</span>
    </motion.span>
  );
};

