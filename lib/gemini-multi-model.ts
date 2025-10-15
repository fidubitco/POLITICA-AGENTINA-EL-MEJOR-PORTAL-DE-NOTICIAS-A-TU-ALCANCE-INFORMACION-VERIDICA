/**
 * Sistema Multi-Modelo de Gemini
 * Integra TODOS los modelos de Gemini para máxima eficiencia y calidad
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicializar cliente
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * Modelos de Gemini disponibles con sus casos de uso
 */
export const GEMINI_MODELS = {
  // Gemini 2.0 - Lo más nuevo y potente
  FLASH_2_0: {
    name: "gemini-2.0-flash-exp",
    description: "Modelo más nuevo, rápido y potente (experimental)",
    useCases: ["generación de contenido complejo", "análisis profundo", "creatividad"],
    costLevel: "medium",
  },
  
  // Gemini 1.5 Pro - Máxima calidad
  PRO_1_5: {
    name: "gemini-1.5-pro",
    description: "Máxima calidad y contexto largo (2M tokens)",
    useCases: ["artículos ultra-extensos", "investigación profunda", "análisis complejo"],
    costLevel: "high",
  },
  
  // Gemini 1.5 Flash - Balanceado
  FLASH_1_5: {
    name: "gemini-1.5-flash",
    description: "Rápido y eficiente, buena calidad",
    useCases: ["keywords", "traducciones", "resúmenes", "contenido corto"],
    costLevel: "low",
  },
  
  // Gemini Flash 8B - Ultra rápido
  FLASH_8B: {
    name: "gemini-1.5-flash-8b",
    description: "Ultra rápido y barato, tareas simples",
    useCases: ["validaciones", "formateo", "tareas simples"],
    costLevel: "very-low",
  },
} as const;

/**
 * Selector inteligente de modelo según la tarea
 */
export function selectModel(taskType: string): string {
  switch (taskType) {
    case "ultra-long-article":
    case "deep-investigation":
      return GEMINI_MODELS.PRO_1_5.name;
    
    case "article-rewrite":
    case "content-generation":
    case "creative-writing":
      return GEMINI_MODELS.FLASH_2_0.name;
    
    case "translation":
    case "keywords":
    case "summary":
      return GEMINI_MODELS.FLASH_1_5.name;
    
    case "validation":
    case "formatting":
    case "simple-task":
      return GEMINI_MODELS.FLASH_8B.name;
    
    default:
      return GEMINI_MODELS.FLASH_2_0.name;
  }
}

/**
 * Generar contenido con el modelo especificado
 */
export async function generateWithModel(
  prompt: string,
  modelName: string = GEMINI_MODELS.FLASH_2_0.name
): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY no configurada");
  }

  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error(\`Error con modelo \${modelName}:\`, error);
    
    // Fallback: intentar con Flash 1.5 si falla
    if (modelName !== GEMINI_MODELS.FLASH_1_5.name) {
      console.log("Reintentando con Gemini 1.5 Flash...");
      const fallbackModel = genAI.getGenerativeModel({ model: GEMINI_MODELS.FLASH_1_5.name });
      const result = await fallbackModel.generateContent(prompt);
      const response = await result.response;
      return response.text();
    }
    
    throw error;
  }
}

/**
 * Generar con streaming (para respuestas largas)
 */
export async function generateWithStreaming(
  prompt: string,
  modelName: string = GEMINI_MODELS.FLASH_2_0.name,
  onChunk?: (chunk: string) => void
): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY no configurada");
  }

  const model = genAI.getGenerativeModel({ model: modelName });
  const result = await model.generateContentStream(prompt);
  
  let fullText = "";
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    fullText += chunkText;
    if (onChunk) onChunk(chunkText);
  }
  
  return fullText;
}

/**
 * Generar JSON con validación
 */
export async function generateJSON<T>(
  prompt: string,
  modelName: string = GEMINI_MODELS.FLASH_2_0.name,
  maxRetries: number = 3
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const content = await generateWithModel(prompt, modelName);
      
      // Extraer JSON de markdown code blocks
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || 
                       content.match(/```\n([\s\S]*?)\n```/) ||
                       content.match(/\{[\s\S]*\}/);
      
      const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : content;
      return JSON.parse(jsonString.trim());
    } catch (error) {
      console.error(\`Intento \${attempt + 1}/\${maxRetries} falló:\`, error);
      if (attempt === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  throw new Error("Failed to generate valid JSON after retries");
}

/**
 * Procesamiento en paralelo con múltiples modelos
 */
export async function generateParallel(prompts: Array<{
  prompt: string;
  taskType: string;
}>): Promise<string[]> {
  const promises = prompts.map(({ prompt, taskType }) => {
    const model = selectModel(taskType);
    return generateWithModel(prompt, model);
  });
  
  return await Promise.all(promises);
}

/**
 * Comparar resultados de múltiples modelos (para calidad máxima)
 */
export async function generateWithComparison(
  prompt: string,
  models: string[] = [GEMINI_MODELS.FLASH_2_0.name, GEMINI_MODELS.PRO_1_5.name]
): Promise<{
  results: Array<{ model: string; content: string; length: number }>;
  best: string;
}> {
  const results = await Promise.all(
    models.map(async (model) => {
      const content = await generateWithModel(prompt, model);
      return {
        model,
        content,
        length: content.length,
      };
    })
  );
  
  // Seleccionar el mejor (el más largo y completo)
  const best = results.reduce((prev, current) => 
    current.length > prev.length ? current : prev
  ).content;
  
  return { results, best };
}

/**
 * Generar con sistema de caché (para prompts repetidos)
 */
const promptCache = new Map<string, { result: string; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hora

export async function generateWithCache(
  prompt: string,
  modelName: string = GEMINI_MODELS.FLASH_2_0.name,
  useCache: boolean = true
): Promise<string> {
  if (useCache) {
    const cached = promptCache.get(prompt);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      console.log("✓ Usando resultado cacheado");
      return cached.result;
    }
  }
  
  const result = await generateWithModel(prompt, modelName);
  
  if (useCache) {
    promptCache.set(prompt, { result, timestamp: Date.now() });
  }
  
  return result;
}

/**
 * Estadísticas de uso de modelos
 */
export const modelStats = {
  calls: new Map<string, number>(),
  errors: new Map<string, number>(),
  
  recordCall(model: string) {
    this.calls.set(model, (this.calls.get(model) || 0) + 1);
  },
  
  recordError(model: string) {
    this.errors.set(model, (this.errors.get(model) || 0) + 1);
  },
  
  getStats() {
    return {
      calls: Object.fromEntries(this.calls),
      errors: Object.fromEntries(this.errors),
    };
  },
};
