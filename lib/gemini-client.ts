import { generateWithModel, GEMINI_MODELS, modelStats } from "./gemini-multi-model";

export async function generateKeywords(title: string, category: string): Promise<string[]> {
  const prompt = "Genera 30 keywords SEO para: " + title + " Categoría: " + category;
  const model = GEMINI_MODELS.FLASH_1_5.name;
  modelStats.recordCall(model);
  const response = await generateWithModel(prompt, model);
  return response.split(",").map(k => k.trim()).filter(k => k.length > 2).slice(0, 30);
}

export async function translateContent(text: string, targetLang: string): Promise<string> {
  const prompt = "Traduce al idioma " + targetLang + ": " + text;
  const model = GEMINI_MODELS.FLASH_1_5.name;
  modelStats.recordCall(model);
  return await generateWithModel(prompt, model);
}

export function getModelUsageStats() {
  return modelStats.getStats();
}
