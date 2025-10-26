import { drizzle } from "drizzle-orm/mysql2";
import { articles, articleTranslations, categories } from "../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

const SAMPLE_ARTICLES = [
  {
    slug: "milei-anuncia-reforma-economica-2025",
    categorySlug: "politica",
    status: "published" as const,
    featuredImage: "/images/milei-1.jpg",
    featuredImageAlt: "Javier Milei, Presidente de Argentina",
    isFeatured: true,
    isBreaking: true,
    views: 15420,
    likes: 892,
    shares: 234,
    publishedAt: new Date(),
    translations: {
      es: {
        title: "Milei anuncia ambiciosa reforma económica para 2025",
        excerpt: "El presidente presenta un paquete de medidas que busca transformar la economía argentina con foco en la reducción del gasto público y la apertura comercial.",
        content: "<p>El presidente Javier Milei anunció hoy un ambicioso plan de reformas económicas que busca transformar profundamente la estructura económica argentina. El paquete de medidas incluye una reducción significativa del gasto público, la eliminación de subsidios y una mayor apertura comercial.</p><p>Durante una conferencia de prensa en Casa Rosada, el mandatario detalló que las reformas se implementarán de manera gradual durante 2025, con el objetivo de lograr un superávit fiscal sostenible y reducir la inflación a un dígito.</p><p>Las medidas han generado reacciones mixtas entre economistas y sectores políticos, con algunos aplaudiendo la valentía de las reformas y otros advirtiendo sobre posibles impactos sociales negativos.</p><p>El plan incluye la privatización de empresas estatales, la desregulación de sectores clave de la economía y la implementación de un nuevo régimen fiscal que busca atraer inversión extranjera.</p>",
        seoTitle: "Milei anuncia reforma económica 2025 | Política Argentina",
        seoDescription: "El presidente Javier Milei presenta un paquete de medidas económicas para transformar la economía argentina en 2025.",
        seoKeywords: "Milei, reforma económica, Argentina, 2025, política económica",
      },
      en: {
        title: "Milei announces ambitious economic reform for 2025",
        excerpt: "The president presents a package of measures aimed at transforming the Argentine economy with a focus on reducing public spending and trade openness.",
        content: "<p>President Javier Milei today announced an ambitious economic reform plan aimed at profoundly transforming Argentina's economic structure. The package includes a significant reduction in public spending, elimination of subsidies, and greater trade openness.</p><p>During a press conference at Casa Rosada, the president detailed that reforms will be implemented gradually during 2025, aiming to achieve sustainable fiscal surplus and reduce inflation to single digits.</p><p>The measures have generated mixed reactions among economists and political sectors, with some applauding the courage of the reforms and others warning about possible negative social impacts.</p><p>The plan includes privatization of state-owned companies, deregulation of key economic sectors, and implementation of a new tax regime to attract foreign investment.</p>",
        seoTitle: "Milei announces economic reform 2025 | Argentine Politics",
        seoDescription: "President Javier Milei presents economic measures to transform Argentina's economy in 2025.",
        seoKeywords: "Milei, economic reform, Argentina, 2025, economic policy",
      },
    },
  },
  {
    slug: "dolar-blue-supera-barrera-1600-pesos",
    categorySlug: "economia",
    status: "published" as const,
    featuredImage: "/images/dolar-blue-1.jpg",
    featuredImageAlt: "Billetes de dólar y pesos argentinos",
    isFeatured: true,
    isBreaking: false,
    views: 23150,
    likes: 456,
    shares: 789,
    publishedAt: new Date(Date.now() - 3600000),
    translations: {
      es: {
        title: "El dólar blue supera la barrera de los $1.600 en medio de la incertidumbre económica",
        excerpt: "La divisa informal alcanza un nuevo récord histórico mientras los analistas debaten sobre las causas y consecuencias de esta escalada.",
        content: "<p>El dólar blue cerró hoy en $1.620, superando por primera vez la barrera psicológica de los $1.600 y marcando un nuevo récord histórico. Esta escalada se produce en un contexto de alta incertidumbre económica y expectativas sobre las próximas medidas del gobierno.</p><p>Analistas económicos señalan que la suba responde a múltiples factores, incluyendo la demanda de cobertura ante la inflación, las restricciones cambiarias vigentes y las dudas sobre la sostenibilidad del programa económico.</p><p>El Banco Central continúa interviniendo en el mercado oficial para mantener la estabilidad del tipo de cambio, mientras las reservas internacionales muestran una leve recuperación.</p><p>La brecha cambiaria entre el dólar oficial y el blue se amplió a más del 100%, generando preocupación en el mercado sobre el impacto en las expectativas inflacionarias.</p>",
        seoTitle: "Dólar blue supera $1.600 | Economía Argentina",
        seoDescription: "El dólar blue alcanza un nuevo récord histórico superando los $1.600 en medio de la incertidumbre económica.",
        seoKeywords: "dólar blue, tipo de cambio, economía argentina, BCRA",
      },
      en: {
        title: "Blue dollar exceeds $1,600 barrier amid economic uncertainty",
        excerpt: "The informal currency reaches a new historical record while analysts debate causes and consequences.",
        content: "<p>The blue dollar closed today at $1,620, surpassing for the first time the psychological barrier of $1,600 and marking a new historical record. This escalation occurs amid high economic uncertainty and expectations about the government's next measures.</p><p>Economic analysts point out that the rise responds to multiple factors, including demand for inflation coverage, existing exchange restrictions, and doubts about the economic program's sustainability.</p><p>The Central Bank continues intervening in the official market to maintain exchange rate stability, while international reserves show slight recovery.</p><p>The exchange rate gap between the official and blue dollar widened to over 100%, generating market concern about the impact on inflation expectations.</p>",
        seoTitle: "Blue dollar exceeds $1,600 | Argentine Economy",
        seoDescription: "Blue dollar reaches new historical record exceeding $1,600 amid economic uncertainty.",
        seoKeywords: "blue dollar, exchange rate, Argentine economy, BCRA",
      },
    },
  },
  {
    slug: "argentina-clasifica-mundial-futbol-2026",
    categorySlug: "deportes",
    status: "published" as const,
    featuredImage: "/images/argentina-celebracion-1.jpg",
    featuredImageAlt: "Multitud celebrando a la Selección Argentina",
    isFeatured: false,
    isBreaking: true,
    views: 45230,
    likes: 3421,
    shares: 1567,
    publishedAt: new Date(Date.now() - 7200000),
    translations: {
      es: {
        title: "¡Argentina clasificó al Mundial 2026! Victoria histórica ante Brasil",
        excerpt: "La Albiceleste selló su pase al próximo Mundial con una contundente victoria 3-0 sobre Brasil en el Monumental.",
        content: "<p>La Selección Argentina logró una victoria histórica ante Brasil por 3-0 en el Estadio Monumental, sellando así su clasificación al Mundial 2026 que se disputará en Estados Unidos, México y Canadá.</p><p>Los goles de Lionel Messi, Lautaro Martínez y Julián Álvarez le dieron al equipo dirigido por Lionel Scaloni una victoria contundente que desató la euforia en todo el país. Con este resultado, Argentina suma 35 puntos en las Eliminatorias Sudamericanas.</p><p>El capitán Lionel Messi declaró: 'Estamos muy felices de haber logrado la clasificación. El equipo jugó un partido perfecto y ahora vamos por más'.</p><p>Miles de hinchas se congregaron en las calles de Buenos Aires para celebrar, con el Obelisco como epicentro de los festejos.</p>",
        seoTitle: "Argentina clasificó al Mundial 2026 | Deportes",
        seoDescription: "La Selección Argentina clasificó al Mundial 2026 con victoria 3-0 sobre Brasil.",
        seoKeywords: "Argentina, Mundial 2026, clasificación, Brasil, Messi, fútbol",
      },
      en: {
        title: "Argentina qualified for 2026 World Cup! Historic victory against Brazil",
        excerpt: "The Albiceleste sealed their pass to the next World Cup with a resounding 3-0 victory over Brazil.",
        content: "<p>The Argentine National Team achieved a historic 3-0 victory against Brazil at Monumental Stadium, sealing qualification for the 2026 World Cup in the United States, Mexico, and Canada.</p><p>Goals from Lionel Messi, Lautaro Martínez, and Julián Álvarez gave the team led by Lionel Scaloni a resounding victory that unleashed euphoria nationwide. With this result, Argentina adds 35 points in South American Qualifiers.</p><p>Captain Lionel Messi declared: 'We are very happy to have achieved qualification. The team played a perfect match and now we go for more'.</p><p>Thousands of fans gathered in Buenos Aires streets to celebrate, with the Obelisk as the epicenter of festivities.</p>",
        seoTitle: "Argentina qualified for 2026 World Cup | Sports",
        seoDescription: "Argentine National Team qualified for 2026 World Cup with 3-0 victory over Brazil.",
        seoKeywords: "Argentina, World Cup 2026, qualification, Brazil, Messi, soccer",
      },
    },
  },
  {
    slug: "inflacion-argentina-desacelera-febrero",
    categorySlug: "economia",
    status: "published" as const,
    featuredImage: "/images/economia-argentina-1.jpg",
    featuredImageAlt: "Mercado en Argentina",
    isFeatured: false,
    isBreaking: false,
    views: 12340,
    likes: 234,
    shares: 156,
    publishedAt: new Date(Date.now() - 86400000),
    translations: {
      es: {
        title: "La inflación en Argentina desacelera pero se mantiene en niveles elevados",
        excerpt: "El índice de precios al consumidor mostró una leve baja en el último mes, aunque los analistas advierten que aún falta mucho camino.",
        content: "<p>La inflación en Argentina registró una desaceleración, ubicándose en 18,3% mensual frente al 25,5% del mes anterior, según el INDEC. A pesar de la mejora, los precios acumulan un incremento del 254% en los últimos 12 meses.</p><p>Los rubros que más aumentaron fueron alimentos y bebidas (22,1%), transporte (19,8%) y vivienda (17,4%). Los sectores de comunicaciones y educación mostraron aumentos más moderados.</p><p>Economistas señalan que la desaceleración responde a la política monetaria restrictiva, aunque advierten que el proceso de desinflación será largo y requerirá mantener la disciplina fiscal.</p><p>El Banco Central continúa con altas tasas de interés para contener expectativas inflacionarias, mientras el gobierno busca un acuerdo con el FMI.</p>",
        seoTitle: "Inflación Argentina desacelera | Economía",
        seoDescription: "La inflación en Argentina mostró desaceleración aunque se mantiene en niveles elevados.",
        seoKeywords: "inflación, Argentina, economía, INDEC, precios",
      },
      en: {
        title: "Inflation in Argentina slows but remains at high levels",
        excerpt: "Consumer price index showed a slight decrease, though analysts warn there's still a long way to go.",
        content: "<p>Inflation in Argentina registered deceleration, standing at 18.3% monthly compared to 25.5% the previous month, according to INDEC. Despite improvement, prices have accumulated a 254% increase in the last 12 months.</p><p>Categories that increased most were food and beverages (22.1%), transportation (19.8%), and housing (17.4%). Communications and education sectors showed more moderate increases.</p><p>Economists point out that deceleration responds to restrictive monetary policy, though they warn the disinflation process will be long and require maintaining fiscal discipline.</p><p>The Central Bank continues with high interest rates to contain inflationary expectations, while the government seeks an IMF agreement.</p>",
        seoTitle: "Argentina Inflation slows | Economy",
        seoDescription: "Inflation in Argentina showed deceleration though it remains at high levels.",
        seoKeywords: "inflation, Argentina, economy, INDEC, prices",
      },
    },
  },
  {
    slug: "nueva-ley-educacion-debate-congreso",
    categorySlug: "educacion",
    status: "published" as const,
    featuredImage: "/images/casa-rosada-2.jpg",
    featuredImageAlt: "Congreso Nacional Argentino",
    isFeatured: false,
    isBreaking: false,
    views: 8920,
    likes: 178,
    shares: 92,
    publishedAt: new Date(Date.now() - 172800000),
    translations: {
      es: {
        title: "Nueva ley de educación genera debate en el Congreso",
        excerpt: "El proyecto busca modernizar el sistema educativo argentino con foco en tecnología y formación profesional.",
        content: "<p>El Congreso Nacional debate esta semana un proyecto de ley que busca reformar el sistema educativo argentino, incorporando nuevas tecnologías y fortaleciendo la formación profesional.</p><p>La iniciativa del Ministerio de Educación propone crear un programa nacional de alfabetización digital, actualizar contenidos curriculares y fortalecer la educación técnica.</p><p>Sindicatos docentes expresaron preocupación por aspectos de la reforma, particularmente sobre condiciones laborales e inversión presupuestaria necesaria.</p><p>El ministro de Educación defendió el proyecto argumentando que es fundamental para preparar a las nuevas generaciones para los desafíos del siglo XXI.</p>",
        seoTitle: "Nueva ley de educación en debate | Argentina",
        seoDescription: "El Congreso debate proyecto de ley para modernizar el sistema educativo argentino.",
        seoKeywords: "educación, Argentina, ley, congreso, reforma educativa",
      },
      en: {
        title: "New education law generates debate in Congress",
        excerpt: "The project seeks to modernize the Argentine educational system focusing on technology and professional training.",
        content: "<p>National Congress debates this week a bill seeking to reform the Argentine educational system, incorporating new technologies and strengthening professional training.</p><p>The Ministry of Education initiative proposes creating a national digital literacy program, updating curricular content, and strengthening technical education.</p><p>Teachers' unions expressed concern about reform aspects, particularly regarding working conditions and necessary budgetary investment.</p><p>The Minister of Education defended the project, arguing it's essential to prepare new generations for 21st century challenges.</p>",
        seoTitle: "New education law under debate | Argentina",
        seoDescription: "Congress debates bill to modernize Argentine educational system.",
        seoKeywords: "education, Argentina, law, congress, educational reform",
      },
    },
  },
];

async function seedArticles() {
  try {
    console.log("📰 Starting articles seed with updated images...");

    const categoriesResult = await db.select().from(categories);
    const categoryMap = new Map(categoriesResult.map((c) => [c.slug, c.id]));
    const authorId = 1;

    console.log("🗑️  Deleting existing articles...");
    await db.delete(articles);

    for (const articleData of SAMPLE_ARTICLES) {
      const categoryId = categoryMap.get(articleData.categorySlug);
      if (!categoryId) {
        console.log(`⚠️  Category ${articleData.categorySlug} not found, skipping`);
        continue;
      }

      const result = await db.insert(articles).values({
        slug: articleData.slug,
        authorId,
        categoryId,
        status: articleData.status,
        featuredImage: articleData.featuredImage,
        featuredImageAlt: articleData.featuredImageAlt,
        views: articleData.views,
        likes: articleData.likes,
        shares: articleData.shares,
        isFeatured: articleData.isFeatured,
        isBreaking: articleData.isBreaking,
        publishedAt: articleData.publishedAt,
      });

      const articleId = Number(result[0].insertId);

      for (const [langCode, translation] of Object.entries(articleData.translations)) {
        await db.insert(articleTranslations).values({
          articleId,
          languageCode: langCode,
          title: translation.title,
          excerpt: translation.excerpt,
          content: translation.content,
          seoTitle: translation.seoTitle,
          seoDescription: translation.seoDescription,
          seoKeywords: translation.seoKeywords,
        });
      }

      console.log(`✅ Created article: ${articleData.slug}`);
    }

    console.log("🎉 Articles seed completed successfully with updated images!");
  } catch (error) {
    console.error("❌ Error seeding articles:", error);
    process.exit(1);
  }
}

seedArticles();

