import { drizzle } from "drizzle-orm/mysql2";
import {
  languages,
  categories,
  categoryTranslations,
  tags,
  tagTranslations,
  articles,
  articleTranslations,
  settings,
} from "../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

const LANGUAGES = [
  { code: "es", name: "Spanish", nativeName: "Español", isActive: true, isDefault: true },
  { code: "en", name: "English", nativeName: "English", isActive: true, isDefault: false },
  { code: "pt", name: "Portuguese", nativeName: "Português", isActive: true, isDefault: false },
  { code: "fr", name: "French", nativeName: "Français", isActive: true, isDefault: false },
  { code: "de", name: "German", nativeName: "Deutsch", isActive: true, isDefault: false },
  { code: "it", name: "Italian", nativeName: "Italiano", isActive: true, isDefault: false },
  { code: "zh", name: "Chinese", nativeName: "中文", isActive: true, isDefault: false },
  { code: "ja", name: "Japanese", nativeName: "日本語", isActive: true, isDefault: false },
  { code: "ko", name: "Korean", nativeName: "한국어", isActive: true, isDefault: false },
  { code: "ru", name: "Russian", nativeName: "Русский", isActive: true, isDefault: false },
  { code: "ar", name: "Arabic", nativeName: "العربية", isActive: true, isDefault: false },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", isActive: true, isDefault: false },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", isActive: true, isDefault: false },
  { code: "pl", name: "Polish", nativeName: "Polski", isActive: true, isDefault: false },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", isActive: true, isDefault: false },
  { code: "sv", name: "Swedish", nativeName: "Svenska", isActive: true, isDefault: false },
  { code: "no", name: "Norwegian", nativeName: "Norsk", isActive: true, isDefault: false },
  { code: "da", name: "Danish", nativeName: "Dansk", isActive: true, isDefault: false },
  { code: "fi", name: "Finnish", nativeName: "Suomi", isActive: true, isDefault: false },
  { code: "el", name: "Greek", nativeName: "Ελληνικά", isActive: true, isDefault: false },
  { code: "cs", name: "Czech", nativeName: "Čeština", isActive: true, isDefault: false },
  { code: "hu", name: "Hungarian", nativeName: "Magyar", isActive: true, isDefault: false },
  { code: "ro", name: "Romanian", nativeName: "Română", isActive: true, isDefault: false },
  { code: "uk", name: "Ukrainian", nativeName: "Українська", isActive: true, isDefault: false },
  { code: "th", name: "Thai", nativeName: "ไทย", isActive: true, isDefault: false },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", isActive: true, isDefault: false },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", isActive: true, isDefault: false },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", isActive: true, isDefault: false },
  { code: "tl", name: "Tagalog", nativeName: "Tagalog", isActive: true, isDefault: false },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili", isActive: true, isDefault: false },
  { code: "he", name: "Hebrew", nativeName: "עברית", isActive: true, isDefault: false },
  { code: "fa", name: "Persian", nativeName: "فارسی", isActive: true, isDefault: false },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", isActive: true, isDefault: false },
  { code: "ur", name: "Urdu", nativeName: "اردو", isActive: true, isDefault: false },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", isActive: true, isDefault: false },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", isActive: true, isDefault: false },
  { code: "mr", name: "Marathi", nativeName: "मराठी", isActive: true, isDefault: false },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", isActive: true, isDefault: false },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", isActive: true, isDefault: false },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", isActive: true, isDefault: false },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", isActive: true, isDefault: false },
  { code: "si", name: "Sinhala", nativeName: "සිංහල", isActive: true, isDefault: false },
  { code: "ne", name: "Nepali", nativeName: "नेपाली", isActive: true, isDefault: false },
  { code: "my", name: "Burmese", nativeName: "မြန်မာ", isActive: true, isDefault: false },
  { code: "km", name: "Khmer", nativeName: "ខ្មែរ", isActive: true, isDefault: false },
  { code: "lo", name: "Lao", nativeName: "ລາວ", isActive: true, isDefault: false },
  { code: "am", name: "Amharic", nativeName: "አማርኛ", isActive: true, isDefault: false },
  { code: "zu", name: "Zulu", nativeName: "isiZulu", isActive: true, isDefault: false },
  { code: "xh", name: "Xhosa", nativeName: "isiXhosa", isActive: true, isDefault: false },
  { code: "af", name: "Afrikaans", nativeName: "Afrikaans", isActive: true, isDefault: false },
];

const CATEGORIES = [
  { slug: "politica", icon: "🏛️", color: "#1E40AF", sortOrder: 1, isActive: true },
  { slug: "economia", icon: "💰", color: "#059669", sortOrder: 2, isActive: true },
  { slug: "sociedad", icon: "👥", color: "#DC2626", sortOrder: 3, isActive: true },
  { slug: "internacional", icon: "🌎", color: "#7C3AED", sortOrder: 4, isActive: true },
  { slug: "deportes", icon: "⚽", color: "#EA580C", sortOrder: 5, isActive: true },
  { slug: "tecnologia", icon: "💻", color: "#0891B2", sortOrder: 6, isActive: true },
  { slug: "cultura", icon: "🎭", color: "#DB2777", sortOrder: 7, isActive: true },
  { slug: "salud", icon: "🏥", color: "#16A34A", sortOrder: 8, isActive: true },
  { slug: "educacion", icon: "📚", color: "#2563EB", sortOrder: 9, isActive: true },
  { slug: "medio-ambiente", icon: "🌱", color: "#65A30D", sortOrder: 10, isActive: true },
];

const CATEGORY_TRANSLATIONS = [
  // Política
  { slug: "politica", languageCode: "es", name: "Política", description: "Noticias sobre política argentina e internacional" },
  { slug: "politica", languageCode: "en", name: "Politics", description: "News about Argentine and international politics" },
  { slug: "politica", languageCode: "pt", name: "Política", description: "Notícias sobre política argentina e internacional" },
  { slug: "politica", languageCode: "fr", name: "Politique", description: "Actualités sur la politique argentine et internationale" },
  
  // Economía
  { slug: "economia", languageCode: "es", name: "Economía", description: "Noticias económicas, finanzas y mercados" },
  { slug: "economia", languageCode: "en", name: "Economy", description: "Economic news, finance and markets" },
  { slug: "economia", languageCode: "pt", name: "Economia", description: "Notícias econômicas, finanças e mercados" },
  { slug: "economia", languageCode: "fr", name: "Économie", description: "Actualités économiques, finances et marchés" },
  
  // Sociedad
  { slug: "sociedad", languageCode: "es", name: "Sociedad", description: "Noticias sobre la sociedad argentina" },
  { slug: "sociedad", languageCode: "en", name: "Society", description: "News about Argentine society" },
  { slug: "sociedad", languageCode: "pt", name: "Sociedade", description: "Notícias sobre a sociedade argentina" },
  { slug: "sociedad", languageCode: "fr", name: "Société", description: "Actualités sur la société argentine" },
  
  // Internacional
  { slug: "internacional", languageCode: "es", name: "Internacional", description: "Noticias del mundo" },
  { slug: "internacional", languageCode: "en", name: "International", description: "World news" },
  { slug: "internacional", languageCode: "pt", name: "Internacional", description: "Notícias do mundo" },
  { slug: "internacional", languageCode: "fr", name: "International", description: "Actualités du monde" },
  
  // Deportes
  { slug: "deportes", languageCode: "es", name: "Deportes", description: "Noticias deportivas" },
  { slug: "deportes", languageCode: "en", name: "Sports", description: "Sports news" },
  { slug: "deportes", languageCode: "pt", name: "Esportes", description: "Notícias esportivas" },
  { slug: "deportes", languageCode: "fr", name: "Sports", description: "Actualités sportives" },
  
  // Tecnología
  { slug: "tecnologia", languageCode: "es", name: "Tecnología", description: "Noticias de tecnología e innovación" },
  { slug: "tecnologia", languageCode: "en", name: "Technology", description: "Technology and innovation news" },
  { slug: "tecnologia", languageCode: "pt", name: "Tecnologia", description: "Notícias de tecnologia e inovação" },
  { slug: "tecnologia", languageCode: "fr", name: "Technologie", description: "Actualités technologiques et innovation" },
  
  // Cultura
  { slug: "cultura", languageCode: "es", name: "Cultura", description: "Noticias culturales y espectáculos" },
  { slug: "cultura", languageCode: "en", name: "Culture", description: "Cultural news and entertainment" },
  { slug: "cultura", languageCode: "pt", name: "Cultura", description: "Notícias culturais e entretenimento" },
  { slug: "cultura", languageCode: "fr", name: "Culture", description: "Actualités culturelles et divertissement" },
  
  // Salud
  { slug: "salud", languageCode: "es", name: "Salud", description: "Noticias de salud y bienestar" },
  { slug: "salud", languageCode: "en", name: "Health", description: "Health and wellness news" },
  { slug: "salud", languageCode: "pt", name: "Saúde", description: "Notícias de saúde e bem-estar" },
  { slug: "salud", languageCode: "fr", name: "Santé", description: "Actualités santé et bien-être" },
  
  // Educación
  { slug: "educacion", languageCode: "es", name: "Educación", description: "Noticias sobre educación" },
  { slug: "educacion", languageCode: "en", name: "Education", description: "Education news" },
  { slug: "educacion", languageCode: "pt", name: "Educação", description: "Notícias sobre educação" },
  { slug: "educacion", languageCode: "fr", name: "Éducation", description: "Actualités éducation" },
  
  // Medio Ambiente
  { slug: "medio-ambiente", languageCode: "es", name: "Medio Ambiente", description: "Noticias ambientales y cambio climático" },
  { slug: "medio-ambiente", languageCode: "en", name: "Environment", description: "Environmental news and climate change" },
  { slug: "medio-ambiente", languageCode: "pt", name: "Meio Ambiente", description: "Notícias ambientais e mudança climática" },
  { slug: "medio-ambiente", languageCode: "fr", name: "Environnement", description: "Actualités environnementales et changement climatique" },
];

const SETTINGS = [
  { key: "site_name", value: "Política Argentina", type: "string", description: "Nombre del sitio" },
  { key: "site_description", value: "Portal de noticias líder en Argentina", type: "string", description: "Descripción del sitio" },
  { key: "site_keywords", value: "noticias, argentina, política, economía", type: "string", description: "Palabras clave del sitio" },
  { key: "site_email", value: "contacto@politica-argentina.com", type: "string", description: "Email de contacto" },
  { key: "articles_per_page", value: "20", type: "number", description: "Artículos por página" },
  { key: "enable_comments", value: "true", type: "boolean", description: "Habilitar comentarios" },
  { key: "require_comment_approval", value: "true", type: "boolean", description: "Requerir aprobación de comentarios" },
  { key: "enable_newsletter", value: "true", type: "boolean", description: "Habilitar newsletter" },
  { key: "enable_ai_generation", value: "true", type: "boolean", description: "Habilitar generación con IA" },
  { key: "ai_model", value: "llama3", type: "string", description: "Modelo de IA a utilizar" },
];

async function seed() {
  try {
    console.log("🌱 Starting database seed...");

    // Seed languages
    console.log("📚 Seeding languages...");
    for (const lang of LANGUAGES) {
      await db.insert(languages).values(lang).onDuplicateKeyUpdate({ set: { isActive: lang.isActive } });
    }
    console.log(`✅ Seeded ${LANGUAGES.length} languages`);

    // Seed categories
    console.log("📁 Seeding categories...");
    for (const cat of CATEGORIES) {
      await db.insert(categories).values(cat).onDuplicateKeyUpdate({ set: { isActive: cat.isActive } });
    }
    console.log(`✅ Seeded ${CATEGORIES.length} categories`);

    // Get category IDs
    const categoriesResult = await db.select().from(categories);
    const categoryMap = new Map(categoriesResult.map((c) => [c.slug, c.id]));

    // Seed category translations
    console.log("🌐 Seeding category translations...");
    for (const trans of CATEGORY_TRANSLATIONS) {
      const categoryId = categoryMap.get(trans.slug);
      if (categoryId) {
        await db
          .insert(categoryTranslations)
          .values({
            categoryId,
            languageCode: trans.languageCode,
            name: trans.name,
            description: trans.description,
          })
          .onDuplicateKeyUpdate({ set: { name: trans.name } });
      }
    }
    console.log(`✅ Seeded ${CATEGORY_TRANSLATIONS.length} category translations`);

    // Seed settings
    console.log("⚙️ Seeding settings...");
    for (const setting of SETTINGS) {
      await db.insert(settings).values(setting).onDuplicateKeyUpdate({ set: { value: setting.value } });
    }
    console.log(`✅ Seeded ${SETTINGS.length} settings`);

    console.log("🎉 Database seed completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();

