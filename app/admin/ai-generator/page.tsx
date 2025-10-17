import { db } from "@/lib/db";
import AIGeneratorClient from "./AIGeneratorClient";

export const dynamic = 'force-dynamic';

export default async function AIGeneratorPage() {
  // Fetch categories for the form
  const categories = await db.category.findMany({
    orderBy: { order: 'asc' },
    select: { id: true, name: true, slug: true },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Generador de Contenido con IA
          </h1>
          <p className="text-zinc-500 mt-2">
            Crea artículos periodísticos profesionales con inteligencia artificial
          </p>
        </div>
        <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-sm">
          Powered by Gemini AI
        </div>
      </div>

      {/* Client Component */}
      <AIGeneratorClient categories={categories} />
    </div>
  );
}
