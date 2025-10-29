/**
 * 📝 LOGGER UTILITY
 * Sistema de logging que solo funciona en desarrollo
 */

const isDevelopment = import.meta.env.DEV;

export const logger = {
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  
  error: (...args: any[]) => {
    // Los errores siempre se muestran
    console.error(...args);
  },
  
  warn: (...args: any[]) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  
  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
  
  debug: (...args: any[]) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },
};

// Suprimir console.log en producción
if (!isDevelopment) {
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
  // Mantener console.error y console.warn para debugging crítico
}

export default logger;

