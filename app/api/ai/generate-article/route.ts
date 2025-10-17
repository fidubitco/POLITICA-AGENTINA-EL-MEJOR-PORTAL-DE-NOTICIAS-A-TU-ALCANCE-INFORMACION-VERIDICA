import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface GenerateRequest {
  topic: string;
  keywords?: string[];
  tone: "formal" | "neutral" | "informal";
  length: "short" | "medium" | "long";
  category?: string;
  seoOptimized: boolean;
}

const LENGTH_CONFIGS = {
  short: { words: 400, sections: 3 },
  medium: { words: 800, sections: 5 },
  long: { words: 1500, sections: 8 },
};

export async function POST(request: Request) {
  try {
    const body: GenerateRequest = await request.json();
    const { topic, keywords = [], tone, length, category, seoOptimized } = body;

    if (!topic || !tone || !length) {
      return NextResponse.json(
        { error: "Faltan parámetros requeridos" },
        { status: 400 }
      );
    }

    const config = LENGTH_CONFIGS[length];

    // Construir prompt optimizado para contenido político argentino
    const prompt = `
Eres un periodista político argentino experto con años de experiencia escribiendo para medios de comunicación de primer nivel.

TAREA: Escribe un artículo periodístico completo sobre: "${topic}"

CONTEXTO:
- Categoría: ${category || 'Política General'}
- Palabras clave a incluir: ${keywords.join(', ') || 'ninguna específica'}
- Tono: ${tone === 'formal' ? 'Formal y profesional' : tone === 'neutral' ? 'Neutral y objetivo' : 'Cercano pero respetuoso'}
- Extensión: ${config.words} palabras aproximadamente
- SEO optimizado: ${seoOptimized ? 'SÍ - Incluir keywords naturalmente' : 'NO'}

ESTRUCTURA REQUERIDA:
1. Título impactante y preciso (máximo 60 caracteres)
2. Bajada/Excerpt (resumen en 2-3 oraciones, máximo 160 caracteres)
3. Contenido dividido en ${config.sections} secciones con subtítulos
4. Conclusión o cierre

REQUISITOS:
- Lenguaje periodístico argentino (usar términos como: Congreso, diputados, senadores, Casa Rosada, etc.)
- Datos y cifras relevantes cuando sea posible
- Contexto político actual de Argentina
- Evitar sesgos políticos excesivos
- Párrafos cortos y legibles
- Usar negritas para destacar conceptos clave
- Citas textuales cuando sea relevante

${seoOptimized ? `
OPTIMIZACIÓN SEO:
- Incluir keywords: ${keywords.join(', ')} de forma natural
- Usar sinónimos y términos relacionados
- Estructurar con H2 y H3
- Primera mención del tema en el primer párrafo
` : ''}

FORMATO DE SALIDA (JSON):
{
  "title": "Título del artículo",
  "excerpt": "Resumen breve del artículo",
  "content": "Contenido completo del artículo en formato HTML",
  "suggestedTags": ["tag1", "tag2", "tag3"],
  "metaTitle": "Título optimizado para SEO (si SEO está activado)",
  "metaDescription": "Descripción meta (si SEO está activado)"
}

IMPORTANTE: Responde ÚNICAMENTE con el JSON, sin texto adicional antes o después.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Limpiar respuesta y parsear JSON
    let cleanedText = text.trim();

    // Remover markdown code blocks si existen
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/g, '');
    }

    const article = JSON.parse(cleanedText);

    return NextResponse.json({
      success: true,
      article: {
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        suggestedTags: article.suggestedTags || [],
        metaTitle: article.metaTitle || article.title,
        metaDescription: article.metaDescription || article.excerpt,
        generatedAt: new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error('Error generating article:', error);

    return NextResponse.json(
      {
        error: 'Error al generar el artículo',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
