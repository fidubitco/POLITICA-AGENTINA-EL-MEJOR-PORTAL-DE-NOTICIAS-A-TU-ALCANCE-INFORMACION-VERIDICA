import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const GEMINI_MODELS = {
  FLASH_2_0: { name: "gemini-2.0-flash-exp", description: "Newest and fastest" },
  PRO_1_5: { name: "gemini-1.5-pro", description: "Max quality" },
  FLASH_1_5: { name: "gemini-1.5-flash", description: "Fast and efficient" },
  FLASH_8B: { name: "gemini-1.5-flash-8b", description: "Ultra fast" },
} as const;

export function selectModel(taskType: string): string {
  switch (taskType) {
    case "ultra-long-article": return GEMINI_MODELS.PRO_1_5.name;
    case "article-rewrite": return GEMINI_MODELS.FLASH_2_0.name;
    case "translation": return GEMINI_MODELS.FLASH_1_5.name;
    case "keywords": return GEMINI_MODELS.FLASH_1_5.name;
    default: return GEMINI_MODELS.FLASH_2_0.name;
  }
}

export async function generateWithModel(prompt: string, modelName: string): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error with Gemini model:", error);
    if (modelName !== GEMINI_MODELS.FLASH_1_5.name) {
      const fallbackModel = genAI.getGenerativeModel({ model: GEMINI_MODELS.FLASH_1_5.name });
      const result = await fallbackModel.generateContent(prompt);
      const response = await result.response;
      return response.text();
    }
    throw error;
  }
}

export async function generateJSON<T>(prompt: string, modelName: string): Promise<T> {
  const content = await generateWithModel(prompt, modelName);
  const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/\{[\s\S]*\}/);
  const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : content;
  return JSON.parse(jsonString.trim());
}

export async function generateParallel(prompts: Array<{ prompt: string; taskType: string }>): Promise<string[]> {
  const promises = prompts.map(({ prompt, taskType }) => {
    const model = selectModel(taskType);
    return generateWithModel(prompt, model);
  });
  return await Promise.all(promises);
}

export async function generateWithComparison(prompt: string, models: string[]): Promise<{ results: Array<{ model: string; content: string; length: number }>; best: string }> {
  const results = await Promise.all(
    models.map(async (model) => {
      const content = await generateWithModel(prompt, model);
      return { model, content, length: content.length };
    })
  );
  const best = results.reduce((prev, current) => current.length > prev.length ? current : prev).content;
  return { results, best };
}

export const modelStats = {
  calls: new Map<string, number>(),
  errors: new Map<string, number>(),
  recordCall(model: string) { this.calls.set(model, (this.calls.get(model) || 0) + 1); },
  recordError(model: string) { this.errors.set(model, (this.errors.get(model) || 0) + 1); },
  getStats() { return { calls: Object.fromEntries(this.calls), errors: Object.fromEntries(this.errors) }; },
};
