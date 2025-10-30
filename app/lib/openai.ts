import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;

// Funciones de IA para el sistema
export async function generateArticleContent(topic: string, category: string): Promise<{
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
}> {
  const prompt = `
Escribe un artículo completo sobre "${topic}" en la categoría "${category}" para un portal de noticias políticas argentino.

El artículo debe ser:
- Objetivo y bien fundamentado
- Entre 800-1200 palabras
- En español de Argentina
- Con estructura clara: introducción, desarrollo y conclusión
- Incluir fuentes y datos relevantes
- Usar lenguaje periodístico profesional

Responde en formato JSON con:
{
  "title": "Título atractivo",
  "excerpt": "Resumen de 2-3 oraciones",
  "content": "Contenido completo en HTML",
  "tags": ["tag1", "tag2", "tag3"]
}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: "Eres un periodista especializado en política argentina. Escribe artículos objetivos, bien documentados y atractivos."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 4000,
  });

  const response = completion.choices[0]?.message?.content;
  if (!response) {
    throw new Error('No se pudo generar el contenido');
  }

  return JSON.parse(response);
}

export async function optimizeSEO(content: string, keywords: string[]): Promise<{
  title: string;
  description: string;
  keywords: string[];
}> {
  const prompt = `
Optimiza el siguiente contenido para SEO:

Contenido: ${content.substring(0, 1000)}...

Palabras clave principales: ${keywords.join(', ')}

Devuelve un JSON con:
{
  "title": "Título optimizado para SEO",
  "description": "Meta description de 150-160 caracteres",
  "keywords": ["keyword1", "keyword2", ...]
}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: "Eres un experto en SEO. Optimiza títulos, descripciones y palabras clave para motores de búsqueda."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.3,
    max_tokens: 1000,
  });

  const response = completion.choices[0]?.message?.content;
  if (!response) {
    throw new Error('No se pudo optimizar el SEO');
  }

  return JSON.parse(response);
}

export async function generateImageDescription(content: string): Promise<string> {
  const prompt = `
Analiza el siguiente contenido de artículo y genera una descripción detallada para generar una imagen representativa:

Contenido: ${content.substring(0, 500)}...

La descripción debe ser específica, mencionar elementos visuales concretos, colores, composición, estilo (fotografía periodística profesional), y ser adecuada para un portal de noticias políticas.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: "Eres un experto en descripción de imágenes para medios periodísticos."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.5,
    max_tokens: 300,
  });

  return completion.choices[0]?.message?.content || '';
}
