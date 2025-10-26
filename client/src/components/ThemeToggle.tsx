/**
 * 🌓 THEME TOGGLE - Botón para cambiar entre Dark/Light
 */

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
      aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
      title={theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
    >
      {/* Background con gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-yellow-400 dark:to-orange-500 opacity-90 transition-opacity duration-300" />
      
      {/* Icono */}
      <div className="relative z-10 flex items-center justify-center">
        {theme === 'light' ? (
          <Moon className="w-5 h-5 text-white transition-transform duration-300 rotate-0" />
        ) : (
          <Sun className="w-5 h-5 text-white transition-transform duration-300 rotate-180" />
        )}
      </div>
      
      {/* Efecto de brillo */}
      <div className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-20 transition-opacity duration-300" />
    </button>
  );
};

export default ThemeToggle;

