import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PremiumInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const PremiumInput: React.FC<PremiumInputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
  disabled = false,
  required = false,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  
  return (
    <div className={`relative ${className}`}>
      {label && (
        <motion.label
          className={`absolute left-3 transition-all duration-200 pointer-events-none ${
            isFocused || hasValue
              ? 'top-0 text-xs bg-white px-1 -translate-y-1/2'
              : 'top-1/2 -translate-y-1/2 text-base'
          } ${
            error
              ? 'text-red-500'
              : isFocused
              ? 'text-blue-600'
              : 'text-gray-500'
          }`}
          initial={false}
          animate={{
            fontSize: isFocused || hasValue ? '0.75rem' : '1rem',
            top: isFocused || hasValue ? '0' : '50%',
          }}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={!label ? placeholder : ''}
          disabled={disabled}
          className={`
            w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500' : isFocused ? 'border-blue-600' : 'border-gray-300'}
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            focus:outline-none focus:ring-4
            ${error ? 'focus:ring-red-100' : 'focus:ring-blue-100'}
          `}
        />
      </div>
      
      {error && (
        <motion.p
          className="text-red-500 text-sm mt-1 ml-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

