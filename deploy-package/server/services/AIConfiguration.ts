// ===========================================
// CONFIGURACIÓN DE SERVICIOS DE IA
// Sistema Híbrido Full-Stack Ultra Mejorado
// ===========================================

export interface AIConfiguration {
  openai: {
    apiKey: string;
    organization?: string;
    model: string;
    temperature: number;
    maxTokens: number;
    timeout: number;
    rateLimit: number;
  };
  anthropic: {
    apiKey: string;
    model: string;
    temperature: number;
    maxTokens: number;
    timeout: number;
    rateLimit: number;
  };
  google: {
    apiKey: string;
    model: string;
    temperature: number;
    maxTokens: number;
    timeout: number;
    rateLimit: number;
  };
  translation: {
    provider: 'openai' | 'anthropic' | 'google';
    model: string;
    temperature: number;
    maxTokens: number;
    quality: 'low' | 'medium' | 'high';
    speed: 'fast' | 'balanced' | 'slow';
  };
  contentAnalysis: {
    provider: 'openai' | 'anthropic' | 'google';
    model: string;
    temperature: number;
    maxTokens: number;
  };
  seoOptimization: {
    provider: 'openai' | 'anthropic' | 'google';
    model: string;
    temperature: number;
    maxTokens: number;
  };
  contentGeneration: {
    provider: 'openai' | 'anthropic' | 'google';
    model: string;
    temperature: number;
    maxTokens: number;
  };
  cache: {
    enabled: boolean;
    ttl: number;
    maxSize: number;
  };
  monitoring: {
    enabled: boolean;
    metrics: boolean;
    alerts: boolean;
  };
  security: {
    keyRotation: boolean;
    rotationInterval: number;
    backup: boolean;
  };
}

export const getAIConfiguration = (): AIConfiguration => {
  return {
    openai: {
      apiKey: process.env.OPENAI_API_KEY || '',
      organization: process.env.OPENAI_ORGANIZATION,
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
      temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.3'),
      maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '4000'),
      timeout: parseInt(process.env.OPENAI_TIMEOUT || '30000'),
      rateLimit: parseInt(process.env.OPENAI_RATE_LIMIT || '100'),
    },
    anthropic: {
      apiKey: process.env.ANTHROPIC_API_KEY || '',
      model: process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022',
      temperature: parseFloat(process.env.ANTHROPIC_TEMPERATURE || '0.2'),
      maxTokens: parseInt(process.env.ANTHROPIC_MAX_TOKENS || '4000'),
      timeout: parseInt(process.env.ANTHROPIC_TIMEOUT || '30000'),
      rateLimit: parseInt(process.env.ANTHROPIC_RATE_LIMIT || '50'),
    },
    google: {
      apiKey: process.env.GOOGLE_API_KEY || '',
      model: process.env.GOOGLE_MODEL || 'gemini-pro',
      temperature: parseFloat(process.env.GOOGLE_TEMPERATURE || '0.1'),
      maxTokens: parseInt(process.env.GOOGLE_MAX_TOKENS || '4000'),
      timeout: parseInt(process.env.GOOGLE_TIMEOUT || '30000'),
      rateLimit: parseInt(process.env.GOOGLE_RATE_LIMIT || '200'),
    },
    translation: {
      provider: (process.env.TRANSLATION_PROVIDER as 'openai' | 'anthropic' | 'google') || 'openai',
      model: process.env.TRANSLATION_MODEL || 'gpt-4-turbo-preview',
      temperature: parseFloat(process.env.TRANSLATION_TEMPERATURE || '0.3'),
      maxTokens: parseInt(process.env.TRANSLATION_MAX_TOKENS || '4000'),
      quality: (process.env.TRANSLATION_QUALITY as 'low' | 'medium' | 'high') || 'high',
      speed: (process.env.TRANSLATION_SPEED as 'fast' | 'balanced' | 'slow') || 'balanced',
    },
    contentAnalysis: {
      provider: (process.env.CONTENT_ANALYSIS_PROVIDER as 'openai' | 'anthropic' | 'google') || 'anthropic',
      model: process.env.CONTENT_ANALYSIS_MODEL || 'claude-3-5-sonnet-20241022',
      temperature: parseFloat(process.env.CONTENT_ANALYSIS_TEMPERATURE || '0.2'),
      maxTokens: parseInt(process.env.CONTENT_ANALYSIS_MAX_TOKENS || '4000'),
    },
    seoOptimization: {
      provider: (process.env.SEO_OPTIMIZATION_PROVIDER as 'openai' | 'anthropic' | 'google') || 'google',
      model: process.env.SEO_OPTIMIZATION_MODEL || 'gemini-pro',
      temperature: parseFloat(process.env.SEO_OPTIMIZATION_TEMPERATURE || '0.1'),
      maxTokens: parseInt(process.env.SEO_OPTIMIZATION_MAX_TOKENS || '4000'),
    },
    contentGeneration: {
      provider: (process.env.CONTENT_GENERATION_PROVIDER as 'openai' | 'anthropic' | 'google') || 'openai',
      model: process.env.CONTENT_GENERATION_MODEL || 'gpt-4-turbo-preview',
      temperature: parseFloat(process.env.CONTENT_GENERATION_TEMPERATURE || '0.7'),
      maxTokens: parseInt(process.env.CONTENT_GENERATION_MAX_TOKENS || '4000'),
    },
    cache: {
      enabled: process.env.CACHE_ENABLED === 'true',
      ttl: parseInt(process.env.CACHE_TTL || '3600000'),
      maxSize: parseInt(process.env.CACHE_MAX_SIZE || '1000'),
    },
    monitoring: {
      enabled: process.env.MONITORING_ENABLED === 'true',
      metrics: process.env.METRICS_ENABLED === 'true',
      alerts: process.env.ALERTS_ENABLED === 'true',
    },
    security: {
      keyRotation: process.env.API_KEY_ROTATION_ENABLED === 'true',
      rotationInterval: parseInt(process.env.API_KEY_ROTATION_INTERVAL || '30'),
      backup: process.env.API_KEY_BACKUP_ENABLED === 'true',
    },
  };
};

export const validateAIConfiguration = (config: AIConfiguration): boolean => {
  // Validar OpenAI
  if (!config.openai.apiKey) {
    console.warn('OpenAI API key not configured');
  }

  // Validar Anthropic
  if (!config.anthropic.apiKey) {
    console.warn('Anthropic API key not configured');
  }

  // Validar Google
  if (!config.google.apiKey) {
    console.warn('Google API key not configured');
  }

  // Al menos una API debe estar configurada
  return !!(config.openai.apiKey || config.anthropic.apiKey || config.google.apiKey);
};

export const getAvailableProviders = (config: AIConfiguration): string[] => {
  const providers: string[] = [];
  
  if (config.openai.apiKey) providers.push('openai');
  if (config.anthropic.apiKey) providers.push('anthropic');
  if (config.google.apiKey) providers.push('google');
  
  return providers;
};

export const getProviderConfig = (config: AIConfiguration, provider: string) => {
  switch (provider) {
    case 'openai':
      return config.openai;
    case 'anthropic':
      return config.anthropic;
    case 'google':
      return config.google;
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
};
