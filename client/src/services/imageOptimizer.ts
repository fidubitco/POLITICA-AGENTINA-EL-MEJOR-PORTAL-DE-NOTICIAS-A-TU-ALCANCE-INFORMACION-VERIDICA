/**
 * 🖼️ OPTIMIZADOR DE IMÁGENES - ENTERPRISE GRADE
 * Sistema automático de optimización de imágenes
 */

export interface ImageOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

/**
 * Optimizar imagen del lado del cliente
 */
export const optimizeImage = async (
  file: File,
  options: ImageOptimizationOptions = {}
): Promise<Blob> => {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.85,
    format = 'webp'
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      // Calcular nuevas dimensiones manteniendo aspect ratio
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      // Crear canvas
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Dibujar imagen redimensionada
      ctx.drawImage(img, 0, 0, width, height);

      // Convertir a blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Could not create blob'));
          }
        },
        `image/${format}`,
        quality
      );
    };

    img.onerror = () => {
      reject(new Error('Could not load image'));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Generar múltiples tamaños de imagen (responsive)
 */
export const generateResponsiveImages = async (
  file: File
): Promise<{ thumbnail: Blob; medium: Blob; large: Blob; original: Blob }> => {
  const [thumbnail, medium, large, original] = await Promise.all([
    optimizeImage(file, { maxWidth: 400, maxHeight: 300, quality: 0.8 }),
    optimizeImage(file, { maxWidth: 800, maxHeight: 600, quality: 0.85 }),
    optimizeImage(file, { maxWidth: 1920, maxHeight: 1080, quality: 0.9 }),
    optimizeImage(file, { maxWidth: 3840, maxHeight: 2160, quality: 0.95 })
  ]);

  return { thumbnail, medium, large, original };
};

/**
 * Validar imagen
 */
export const validateImage = (file: File): { valid: boolean; error?: string } => {
  // Validar tipo
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Tipo de archivo no válido. Use JPEG, PNG o WebP.'
    };
  }

  // Validar tamaño (máximo 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'El archivo es demasiado grande. Máximo 10MB.'
    };
  }

  return { valid: true };
};

/**
 * Generar nombre de archivo único
 */
export const generateUniqueFilename = (originalName: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop();
  return `${timestamp}-${random}.${extension}`;
};

/**
 * Extraer metadata de imagen
 */
export const extractImageMetadata = async (file: File): Promise<{
  width: number;
  height: number;
  size: number;
  type: string;
  aspectRatio: number;
}> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
        size: file.size,
        type: file.type,
        aspectRatio: img.width / img.height
      });
    };

    img.onerror = () => {
      reject(new Error('Could not load image'));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Componente de carga de imagen con preview
 */
export class ImageUploader {
  private file: File | null = null;
  private preview: string | null = null;

  async setFile(file: File): Promise<void> {
    const validation = validateImage(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    this.file = file;
    this.preview = await this.generatePreview(file);
  }

  private async generatePreview(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  getFile(): File | null {
    return this.file;
  }

  getPreview(): string | null {
    return this.preview;
  }

  clear(): void {
    this.file = null;
    this.preview = null;
  }
}

/**
 * Hook de React para optimización de imágenes
 */
export const useImageOptimization = () => {
  const optimizeAndUpload = async (
    file: File,
    options?: ImageOptimizationOptions
  ): Promise<Blob> => {
    // Validar
    const validation = validateImage(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Optimizar
    const optimized = await optimizeImage(file, options);

    return optimized;
  };

  const generateResponsive = async (file: File) => {
    return await generateResponsiveImages(file);
  };

  return {
    optimizeAndUpload,
    generateResponsive,
    validateImage,
    extractImageMetadata
  };
};

