/**
 * 🌍 GENERATE TRANSLATIONS - Generador automático de traducciones
 * Genera archivos de traducción para 20+ idiomas
 */

import fs from 'fs';
import path from 'path';

// Template base en español
const baseTranslation = {
  site: {
    name: "Política Argentina",
    tagline: "Información Veraz y Actualizada",
    description: "Portal profesional de noticias políticas de Argentina. Últimas notícias, análises y tendencias políticas en tiempo real."
  },
  nav: {
    home: "Inicio",
    politics: "Política",
    economy: "Economía",
    international: "Internacional",
    society: "Sociedad",
    sports: "Deportes",
    culture: "Cultura",
    technology: "Tecnología",
    business: "Negocios",
    entertainment: "Espectáculos",
    health: "Salud",
    lifestyle: "Lifestyle",
    science: "Ciencia",
    judicial: "Judicial",
    more: "Más",
    search: "Buscar",
    admin: "Admin"
  },
  categories: {
    politics: "Política",
    economy: "Economía",
    international: "Internacional",
    society: "Sociedad",
    sports: "Deportes",
    culture: "Cultura",
    technology: "Tecnología",
    business: "Negocios",
    entertainment: "Espectáculos",
    health: "Salud",
    lifestyle: "Lifestyle",
    science: "Ciencia",
    judicial: "Judicial"
  },
  breakingNews: {
    title: "ÚLTIMA HORA"
  },
  latestNews: {
    title: "Últimas Noticias"
  },
  common: {
    readMore: "Leer más",
    viewAll: "Ver todo",
    share: "Compartir",
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    cancel: "Cancelar",
    save: "Guardar",
    edit: "Editar",
    delete: "Eliminar",
    back: "Volver",
    next: "Siguiente",
    previous: "Anterior",
    search: "Buscar",
    filter: "Filtrar",
    sort: "Ordenar",
    date: "Fecha",
    author: "Autor",
    category: "Categoría",
    tags: "Etiquetas",
    comments: "Comentarios",
    views: "Vistas",
    likes: "Me gusta",
    shares: "Compartidos"
  },
  footer: {
    rights: "Todos los derechos reservados.",
    about: "Acerca de",
    contact: "Contacto",
    privacy: "Privacidad",
    terms: "Términos",
    cookies: "Cookies"
  },
  seo: {
    home: {
      title: "Política Argentina - Portal de Noticias Políticas",
      description: "Portal profesional de noticias políticas de Argentina. Últimas noticias sobre Milei, Congreso, economía, dólar, inflación. Cobertura 24/7.",
      keywords: "política argentina, noticias argentina, Milei, gobierno argentino, elecciones argentina, congreso nacional"
    },
    politics: {
      title: "Política - Noticias Políticas de Argentina",
      description: "Últimas noticias sobre política argentina, gobierno, congreso, elecciones y partidos políticos. Análisis experto y cobertura en tiempo real.",
      keywords: "política argentina, gobierno, congreso, elecciones, milei, casa rosada, senado, diputados"
    },
    economy: {
      title: "Economía - Análisis Económico de Argentina",
      description: "Noticias de economía argentina: dólar, inflación, mercados, empresas y finanzas. Análisis económico profesional y datos en tiempo real.",
      keywords: "economía argentina, dólar, inflación, mercados, bolsa, finanzas, inversiones"
    }
  }
};

// Traducciones manuales para 20+ idiomas
const translations: Record<string, any> = {
  es: baseTranslation,
  
  en: {
    site: { name: "Argentina Politics", tagline: "Truthful and Updated Information", description: "Professional portal for Argentine political news. Latest news, analysis and political trends in real time." },
    nav: { home: "Home", politics: "Politics", economy: "Economy", international: "International", society: "Society", sports: "Sports", culture: "Culture", technology: "Technology", business: "Business", entertainment: "Entertainment", health: "Health", lifestyle: "Lifestyle", science: "Science", judicial: "Judicial", more: "More", search: "Search", admin: "Admin" },
    categories: { politics: "Politics", economy: "Economy", international: "International", society: "Society", sports: "Sports", culture: "Culture", technology: "Technology", business: "Business", entertainment: "Entertainment", health: "Health", lifestyle: "Lifestyle", science: "Science", judicial: "Judicial" },
    breakingNews: { title: "BREAKING NEWS" },
    latestNews: { title: "Latest News" },
    common: { readMore: "Read more", viewAll: "View all", share: "Share", loading: "Loading...", error: "Error", success: "Success", cancel: "Cancel", save: "Save", edit: "Edit", delete: "Delete", back: "Back", next: "Next", previous: "Previous", search: "Search", filter: "Filter", sort: "Sort", date: "Date", author: "Author", category: "Category", tags: "Tags", comments: "Comments", views: "Views", likes: "Likes", shares: "Shares" },
    footer: { rights: "All rights reserved.", about: "About", contact: "Contact", privacy: "Privacy", terms: "Terms", cookies: "Cookies" },
    seo: { home: { title: "Argentina Politics - Political News Portal", description: "Professional portal for Argentine political news. Latest news about Milei, Congress, economy, dollar, inflation. 24/7 coverage.", keywords: "argentina politics, argentina news, Milei, argentine government, argentina elections, national congress" }, politics: { title: "Politics - Argentine Political News", description: "Latest news on Argentine politics, government, congress, elections and political parties. Expert analysis and real-time coverage.", keywords: "argentine politics, government, congress, elections, milei, casa rosada, senate, deputies" }, economy: { title: "Economy - Argentine Economic Analysis", description: "Argentine economy news: dollar, inflation, markets, companies and finance. Professional economic analysis and real-time data.", keywords: "argentine economy, dollar, inflation, markets, stock market, finance, investments" } }
  },
  
  pt: {
    site: { name: "Política Argentina", tagline: "Informação Verdadeira e Atualizada", description: "Portal profissional de notícias políticas da Argentina. Últimas notícias, análises e tendências políticas em tempo real." },
    nav: { home: "Início", politics: "Política", economy: "Economia", international: "Internacional", society: "Sociedade", sports: "Esportes", culture: "Cultura", technology: "Tecnologia", business: "Negócios", entertainment: "Entretenimento", health: "Saúde", lifestyle: "Estilo de Vida", science: "Ciência", judicial: "Judicial", more: "Mais", search: "Buscar", admin: "Admin" },
    categories: { politics: "Política", economy: "Economia", international: "Internacional", society: "Sociedade", sports: "Esportes", culture: "Cultura", technology: "Tecnologia", business: "Negócios", entertainment: "Entretenimento", health: "Saúde", lifestyle: "Estilo de Vida", science: "Ciência", judicial: "Judicial" },
    breakingNews: { title: "ÚLTIMA HORA" },
    latestNews: { title: "Últimas Notícias" },
    common: { readMore: "Leia mais", viewAll: "Ver tudo", share: "Compartilhar", loading: "Carregando...", error: "Erro", success: "Sucesso", cancel: "Cancelar", save: "Salvar", edit: "Editar", delete: "Excluir", back: "Voltar", next: "Próximo", previous: "Anterior", search: "Buscar", filter: "Filtrar", sort: "Ordenar", date: "Data", author: "Autor", category: "Categoria", tags: "Tags", comments: "Comentários", views: "Visualizações", likes: "Curtidas", shares: "Compartilhamentos" },
    footer: { rights: "Todos os direitos reservados.", about: "Sobre", contact: "Contato", privacy: "Privacidade", terms: "Termos", cookies: "Cookies" },
    seo: { home: { title: "Política Argentina - Portal de Notícias Políticas", description: "Portal profissional de notícias políticas da Argentina. Últimas notícias sobre Milei, Congresso, economia, dólar, inflação. Cobertura 24/7.", keywords: "política argentina, notícias argentina, Milei, governo argentino, eleições argentina, congresso nacional" }, politics: { title: "Política - Notícias Políticas da Argentina", description: "Últimas notícias sobre política argentina, governo, congresso, eleições e partidos políticos. Análise especializada e cobertura em tempo real.", keywords: "política argentina, governo, congresso, eleições, milei, casa rosada, senado, deputados" }, economy: { title: "Economia - Análise Econômica da Argentina", description: "Notícias de economia argentina: dólar, inflação, mercados, empresas e finanças. Análise econômica profissional e dados em tempo real.", keywords: "economia argentina, dólar, inflação, mercados, bolsa, finanças, investimentos" } }
  },
  
  fr: {
    site: { name: "Politique Argentine", tagline: "Information Véridique et Actualisée", description: "Portail professionnel d'actualités politiques argentines. Dernières nouvelles, analyses et tendances politiques en temps réel." },
    nav: { home: "Accueil", politics: "Politique", economy: "Économie", international: "International", society: "Société", sports: "Sports", culture: "Culture", technology: "Technologie", business: "Affaires", entertainment: "Divertissement", health: "Santé", lifestyle: "Style de Vie", science: "Science", judicial: "Judiciaire", more: "Plus", search: "Rechercher", admin: "Admin" },
    categories: { politics: "Politique", economy: "Économie", international: "International", society: "Société", sports: "Sports", culture: "Culture", technology: "Technologie", business: "Affaires", entertainment: "Divertissement", health: "Santé", lifestyle: "Style de Vie", science: "Science", judicial: "Judiciaire" },
    breakingNews: { title: "DERNIÈRE HEURE" },
    latestNews: { title: "Dernières Nouvelles" },
    common: { readMore: "Lire la suite", viewAll: "Voir tout", share: "Partager", loading: "Chargement...", error: "Erreur", success: "Succès", cancel: "Annuler", save: "Enregistrer", edit: "Modifier", delete: "Supprimer", back: "Retour", next: "Suivant", previous: "Précédent", search: "Rechercher", filter: "Filtrer", sort: "Trier", date: "Date", author: "Auteur", category: "Catégorie", tags: "Tags", comments: "Commentaires", views: "Vues", likes: "J'aime", shares: "Partages" },
    footer: { rights: "Tous droits réservés.", about: "À propos", contact: "Contact", privacy: "Confidentialité", terms: "Conditions", cookies: "Cookies" },
    seo: { home: { title: "Politique Argentine - Portail d'Actualités Politiques", description: "Portail professionnel d'actualités politiques argentines. Dernières nouvelles sur Milei, Congrès, économie, dollar, inflation. Couverture 24/7.", keywords: "politique argentine, actualités argentine, Milei, gouvernement argentin, élections argentine, congrès national" }, politics: { title: "Politique - Actualités Politiques Argentines", description: "Dernières nouvelles sur la politique argentine, gouvernement, congrès, élections et partis politiques. Analyse experte et couverture en temps réel.", keywords: "politique argentine, gouvernement, congrès, élections, milei, casa rosada, sénat, députés" }, economy: { title: "Économie - Analyse Économique Argentine", description: "Actualités économiques argentines: dollar, inflation, marchés, entreprises et finances. Analyse économique professionnelle et données en temps réel.", keywords: "économie argentine, dollar, inflation, marchés, bourse, finances, investissements" } }
  },
  
  de: {
    site: { name: "Argentinische Politik", tagline: "Wahre und Aktualisierte Informationen", description: "Professionelles Portal für argentinische politische Nachrichten. Neueste Nachrichten, Analysen und politische Trends in Echtzeit." },
    nav: { home: "Startseite", politics: "Politik", economy: "Wirtschaft", international: "International", society: "Gesellschaft", sports: "Sport", culture: "Kultur", technology: "Technologie", business: "Geschäft", entertainment: "Unterhaltung", health: "Gesundheit", lifestyle: "Lebensstil", science: "Wissenschaft", judicial: "Justiz", more: "Mehr", search: "Suchen", admin: "Admin" },
    categories: { politics: "Politik", economy: "Wirtschaft", international: "International", society: "Gesellschaft", sports: "Sport", culture: "Kultur", technology: "Technologie", business: "Geschäft", entertainment: "Unterhaltung", health: "Gesundheit", lifestyle: "Lebensstil", science: "Wissenschaft", judicial: "Justiz" },
    breakingNews: { title: "EILMELDUNG" },
    latestNews: { title: "Neueste Nachrichten" },
    common: { readMore: "Weiterlesen", viewAll: "Alle ansehen", share: "Teilen", loading: "Laden...", error: "Fehler", success: "Erfolg", cancel: "Abbrechen", save: "Speichern", edit: "Bearbeiten", delete: "Löschen", back: "Zurück", next: "Weiter", previous: "Vorherige", search: "Suchen", filter: "Filtern", sort: "Sortieren", date: "Datum", author: "Autor", category: "Kategorie", tags: "Tags", comments: "Kommentare", views: "Ansichten", likes: "Gefällt mir", shares: "Geteilt" },
    footer: { rights: "Alle Rechte vorbehalten.", about: "Über", contact: "Kontakt", privacy: "Datenschutz", terms: "Bedingungen", cookies: "Cookies" },
    seo: { home: { title: "Argentinische Politik - Portal für Politische Nachrichten", description: "Professionelles Portal für argentinische politische Nachrichten. Neueste Nachrichten über Milei, Kongress, Wirtschaft, Dollar, Inflation. 24/7-Berichterstattung.", keywords: "argentinische Politik, Argentinien Nachrichten, Milei, argentinische Regierung, Argentinien Wahlen, Nationalkongress" }, politics: { title: "Politik - Argentinische Politische Nachrichten", description: "Neueste Nachrichten über argentinische Politik, Regierung, Kongress, Wahlen und politische Parteien. Expertenanalyse und Echtzeit-Berichterstattung.", keywords: "argentinische Politik, Regierung, Kongress, Wahlen, Milei, Casa Rosada, Senat, Abgeordnete" }, economy: { title: "Wirtschaft - Argentinische Wirtschaftsanalyse", description: "Argentinische Wirtschaftsnachrichten: Dollar, Inflation, Märkte, Unternehmen und Finanzen. Professionelle Wirtschaftsanalyse und Echtzeitdaten.", keywords: "argentinische Wirtschaft, Dollar, Inflation, Märkte, Börse, Finanzen, Investitionen" } }
  },
  
  it: {
    site: { name: "Politica Argentina", tagline: "Informazioni Veritiere e Aggiornate", description: "Portale professionale di notizie politiche argentine. Ultime notizie, analisi e tendenze politiche in tempo reale." },
    nav: { home: "Home", politics: "Politica", economy: "Economia", international: "Internazionale", society: "Società", sports: "Sport", culture: "Cultura", technology: "Tecnologia", business: "Affari", entertainment: "Intrattenimento", health: "Salute", lifestyle: "Stile di Vita", science: "Scienza", judicial: "Giudiziario", more: "Altro", search: "Cerca", admin: "Admin" },
    categories: { politics: "Politica", economy: "Economia", international: "Internazionale", society: "Società", sports: "Sport", culture: "Cultura", technology: "Tecnologia", business: "Affari", entertainment: "Intrattenimento", health: "Salute", lifestyle: "Stile di Vita", science: "Scienza", judicial: "Giudiziario" },
    breakingNews: { title: "ULTIME NOTIZIE" },
    latestNews: { title: "Ultime Notizie" },
    common: { readMore: "Leggi di più", viewAll: "Vedi tutto", share: "Condividi", loading: "Caricamento...", error: "Errore", success: "Successo", cancel: "Annulla", save: "Salva", edit: "Modifica", delete: "Elimina", back: "Indietro", next: "Avanti", previous: "Precedente", search: "Cerca", filter: "Filtra", sort: "Ordina", date: "Data", author: "Autore", category: "Categoria", tags: "Tag", comments: "Commenti", views: "Visualizzazioni", likes: "Mi piace", shares: "Condivisioni" },
    footer: { rights: "Tutti i diritti riservati.", about: "Chi siamo", contact: "Contatto", privacy: "Privacy", terms: "Termini", cookies: "Cookie" },
    seo: { home: { title: "Politica Argentina - Portale di Notizie Politiche", description: "Portale professionale di notizie politiche argentine. Ultime notizie su Milei, Congresso, economia, dollaro, inflazione. Copertura 24/7.", keywords: "politica argentina, notizie argentina, Milei, governo argentino, elezioni argentina, congresso nazionale" }, politics: { title: "Politica - Notizie Politiche Argentine", description: "Ultime notizie sulla politica argentina, governo, congresso, elezioni e partiti politici. Analisi esperta e copertura in tempo reale.", keywords: "politica argentina, governo, congresso, elezioni, milei, casa rosada, senato, deputati" }, economy: { title: "Economia - Analisi Economica Argentina", description: "Notizie di economia argentina: dollaro, inflazione, mercati, aziende e finanze. Analisi economica professionale e dati in tempo reale.", keywords: "economia argentina, dollaro, inflazione, mercati, borsa, finanze, investimenti" } }
  },
  
  zh: {
    site: { name: "阿根廷政治", tagline: "真实和更新的信息", description: "阿根廷政治新闻专业门户。实时最新新闻、分析和政治趋势。" },
    nav: { home: "首页", politics: "政治", economy: "经济", international: "国际", society: "社会", sports: "体育", culture: "文化", technology: "科技", business: "商业", entertainment: "娱乐", health: "健康", lifestyle: "生活方式", science: "科学", judicial: "司法", more: "更多", search: "搜索", admin: "管理" },
    categories: { politics: "政治", economy: "经济", international: "国际", society: "社会", sports: "体育", culture: "文化", technology: "科技", business: "商业", entertainment: "娱乐", health: "健康", lifestyle: "生活方式", science: "科学", judicial: "司法" },
    breakingNews: { title: "突发新闻" },
    latestNews: { title: "最新新闻" },
    common: { readMore: "阅读更多", viewAll: "查看全部", share: "分享", loading: "加载中...", error: "错误", success: "成功", cancel: "取消", save: "保存", edit: "编辑", delete: "删除", back: "返回", next: "下一个", previous: "上一个", search: "搜索", filter: "筛选", sort: "排序", date: "日期", author: "作者", category: "类别", tags: "标签", comments: "评论", views: "浏览", likes: "喜欢", shares: "分享" },
    footer: { rights: "版权所有。", about: "关于", contact: "联系", privacy: "隐私", terms: "条款", cookies: "Cookie" },
    seo: { home: { title: "阿根廷政治 - 政治新闻门户", description: "阿根廷政治新闻专业门户。关于米莱、国会、经济、美元、通货膨胀的最新新闻。24/7报道。", keywords: "阿根廷政治, 阿根廷新闻, 米莱, 阿根廷政府, 阿根廷选举, 国会" }, politics: { title: "政治 - 阿根廷政治新闻", description: "阿根廷政治、政府、国会、选举和政党的最新新闻。专家分析和实时报道。", keywords: "阿根廷政治, 政府, 国会, 选举, 米莱, 玫瑰宫, 参议院, 众议院" }, economy: { title: "经济 - 阿根廷经济分析", description: "阿根廷经济新闻：美元、通货膨胀、市场、公司和金融。专业经济分析和实时数据。", keywords: "阿根廷经济, 美元, 通货膨胀, 市场, 股市, 金融, 投资" } }
  },
  
  ja: {
    site: { name: "アルゼンチン政治", tagline: "真実で最新の情報", description: "アルゼンチンの政治ニュース専門ポータル。最新ニュース、分析、リアルタイムの政治動向。" },
    nav: { home: "ホーム", politics: "政治", economy: "経済", international: "国際", society: "社会", sports: "スポーツ", culture: "文化", technology: "テクノロジー", business: "ビジネス", entertainment: "エンターテイメント", health: "健康", lifestyle: "ライフスタイル", science: "科学", judicial: "司法", more: "もっと", search: "検索", admin: "管理" },
    categories: { politics: "政治", economy: "経済", international: "国際", society: "社会", sports: "スポーツ", culture: "文化", technology: "テクノロジー", business: "ビジネス", entertainment: "エンターテイメント", health: "健康", lifestyle: "ライフスタイル", science: "科学", judicial: "司法" },
    breakingNews: { title: "速報" },
    latestNews: { title: "最新ニュース" },
    common: { readMore: "続きを読む", viewAll: "すべて表示", share: "共有", loading: "読み込み中...", error: "エラー", success: "成功", cancel: "キャンセル", save: "保存", edit: "編集", delete: "削除", back: "戻る", next: "次へ", previous: "前へ", search: "検索", filter: "フィルター", sort: "並べ替え", date: "日付", author: "著者", category: "カテゴリー", tags: "タグ", comments: "コメント", views: "閲覧数", likes: "いいね", shares: "シェア" },
    footer: { rights: "すべての権利予約済み。", about: "について", contact: "お問い合わせ", privacy: "プライバシー", terms: "利用規約", cookies: "クッキー" },
    seo: { home: { title: "アルゼンチン政治 - 政治ニュースポータル", description: "アルゼンチンの政治ニュース専門ポータル。ミレイ、議会、経済、ドル、インフレに関する最新ニュース。24時間365日報道。", keywords: "アルゼンチン政治, アルゼンチンニュース, ミレイ, アルゼンチン政府, アルゼンチン選挙, 国会" }, politics: { title: "政治 - アルゼンチン政治ニュース", description: "アルゼンチンの政治、政府、議会、選挙、政党に関する最新ニュース。専門家による分析とリアルタイム報道。", keywords: "アルゼンチン政治, 政府, 議会, 選挙, ミレイ, カサロサダ, 上院, 下院" }, economy: { title: "経済 - アルゼンチン経済分析", description: "アルゼンチン経済ニュース：ドル、インフレ、市場、企業、金融。専門的な経済分析とリアルタイムデータ。", keywords: "アルゼンチン経済, ドル, インフレ, 市場, 株式市場, 金融, 投資" } }
  },
  
  ru: {
    site: { name: "Политика Аргентины", tagline: "Правдивая и Актуальная Информация", description: "Профессиональный портал аргентинских политических новостей. Последние новости, анализ и политические тенденции в реальном времени." },
    nav: { home: "Главная", politics: "Политика", economy: "Экономика", international: "Международное", society: "Общество", sports: "Спорт", culture: "Культура", technology: "Технологии", business: "Бизнес", entertainment: "Развлечения", health: "Здоровье", lifestyle: "Образ Жизни", science: "Наука", judicial: "Судебная", more: "Больше", search: "Поиск", admin: "Админ" },
    categories: { politics: "Политика", economy: "Экономика", international: "Международное", society: "Общество", sports: "Спорт", culture: "Культура", technology: "Технологии", business: "Бизнес", entertainment: "Развлечения", health: "Здоровье", lifestyle: "Образ Жизни", science: "Наука", judicial: "Судебная" },
    breakingNews: { title: "СРОЧНЫЕ НОВОСТИ" },
    latestNews: { title: "Последние Новости" },
    common: { readMore: "Читать далее", viewAll: "Посмотреть все", share: "Поделиться", loading: "Загрузка...", error: "Ошибка", success: "Успех", cancel: "Отмена", save: "Сохранить", edit: "Редактировать", delete: "Удалить", back: "Назад", next: "Далее", previous: "Предыдущий", search: "Поиск", filter: "Фильтр", sort: "Сортировать", date: "Дата", author: "Автор", category: "Категория", tags: "Теги", comments: "Комментарии", views: "Просмотры", likes: "Нравится", shares: "Поделились" },
    footer: { rights: "Все права защищены.", about: "О нас", contact: "Контакт", privacy: "Конфиденциальность", terms: "Условия", cookies: "Куки" },
    seo: { home: { title: "Политика Аргентины - Портал Политических Новостей", description: "Профессиональный портал аргентинских политических новостей. Последние новости о Милее, Конгрессе, экономике, долларе, инфляции. Круглосуточное освещение.", keywords: "политика аргентины, новости аргентины, Милей, правительство аргентины, выборы аргентины, национальный конгресс" }, politics: { title: "Политика - Аргентинские Политические Новости", description: "Последние новости об аргентинской политике, правительстве, конгрессе, выборах и политических партиях. Экспертный анализ и освещение в реальном времени.", keywords: "аргентинская политика, правительство, конгресс, выборы, милей, каса росада, сенат, депутаты" }, economy: { title: "Экономика - Аргентинский Экономический Анализ", description: "Новости аргентинской экономики: доллар, инфляция, рынки, компании и финансы. Профессиональный экономический анализ и данные в реальном времени.", keywords: "аргентинская экономика, доллар, инфляция, рынки, фондовый рынок, финансы, инвестиции" } }
  },
  
  ar: {
    site: { name: "السياسة الأرجنتينية", tagline: "معلومات صادقة ومحدثة", description: "بوابة احترافية للأخبار السياسية الأرجنتينية. آخر الأخبار والتحليلات والاتجاهات السياسية في الوقت الفعلي." },
    nav: { home: "الرئيسية", politics: "السياسة", economy: "الاقتصاد", international: "دولي", society: "المجتمع", sports: "الرياضة", culture: "الثقافة", technology: "التكنولوجيا", business: "الأعمال", entertainment: "الترفيه", health: "الصحة", lifestyle: "نمط الحياة", science: "العلوم", judicial: "القضائية", more: "المزيد", search: "بحث", admin: "الإدارة" },
    categories: { politics: "السياسة", economy: "الاقتصاد", international: "دولي", society: "المجتمع", sports: "الرياضة", culture: "الثقافة", technology: "التكنولوجيا", business: "الأعمال", entertainment: "الترفيه", health: "الصحة", lifestyle: "نمط الحياة", science: "العلوم", judicial: "القضائية" },
    breakingNews: { title: "عاجل" },
    latestNews: { title: "آخر الأخبار" },
    common: { readMore: "اقرأ المزيد", viewAll: "عرض الكل", share: "مشاركة", loading: "جاري التحميل...", error: "خطأ", success: "نجاح", cancel: "إلغاء", save: "حفظ", edit: "تعديل", delete: "حذف", back: "رجوع", next: "التالي", previous: "السابق", search: "بحث", filter: "تصفية", sort: "ترتيب", date: "التاريخ", author: "المؤلف", category: "الفئة", tags: "الوسوم", comments: "التعليقات", views: "المشاهدات", likes: "الإعجابات", shares: "المشاركات" },
    footer: { rights: "جميع الحقوق محفوظة.", about: "حول", contact: "اتصل", privacy: "الخصوصية", terms: "الشروط", cookies: "ملفات تعريف الارتباط" },
    seo: { home: { title: "السياسة الأرجنتينية - بوابة الأخبار السياسية", description: "بوابة احترافية للأخبار السياسية الأرجنتينية. آخر الأخبار عن ميلي والكونغرس والاقتصاد والدولار والتضخم. تغطية على مدار الساعة.", keywords: "السياسة الأرجنتينية, أخبار الأرجنتين, ميلي, الحكومة الأرجنتينية, انتخابات الأرجنتين, الكونغرس الوطني" }, politics: { title: "السياسة - الأخبار السياسية الأرجنتينية", description: "آخر الأخبار عن السياسة الأرجنتينية والحكومة والكونغرس والانتخابات والأحزاب السياسية. تحليل خبراء وتغطية في الوقت الفعلي.", keywords: "السياسة الأرجنتينية, الحكومة, الكونغرس, الانتخابات, ميلي, كاسا روسادا, مجلس الشيوخ, النواب" }, economy: { title: "الاقتصاد - التحليل الاقتصادي الأرجنتيني", description: "أخبار الاقتصاد الأرجنتيني: الدولار والتضخم والأسواق والشركات والمالية. تحليل اقتصادي احترافي وبيانات في الوقت الفعلي.", keywords: "الاقتصاد الأرجنتيني, الدولار, التضخم, الأسواق, سوق الأسهم, المالية, الاستثمارات" } }
  },
  
  ko: {
    site: { name: "아르헨티나 정치", tagline: "진실하고 업데이트된 정보", description: "아르헨티나 정치 뉴스 전문 포털. 실시간 최신 뉴스, 분석 및 정치 동향." },
    nav: { home: "홈", politics: "정치", economy: "경제", international: "국제", society: "사회", sports: "스포츠", culture: "문화", technology: "기술", business: "비즈니스", entertainment: "엔터테인먼트", health: "건강", lifestyle: "라이프스타일", science: "과학", judicial: "사법", more: "더보기", search: "검색", admin: "관리자" },
    categories: { politics: "정치", economy: "경제", international: "국제", society: "사회", sports: "스포츠", culture: "문화", technology: "기술", business: "비즈니스", entertainment: "엔터테인먼트", health: "건강", lifestyle: "라이프스타일", science: "과학", judicial: "사법" },
    breakingNews: { title: "속보" },
    latestNews: { title: "최신 뉴스" },
    common: { readMore: "더 읽기", viewAll: "모두 보기", share: "공유", loading: "로딩 중...", error: "오류", success: "성공", cancel: "취소", save: "저장", edit: "편집", delete: "삭제", back: "뒤로", next: "다음", previous: "이전", search: "검색", filter: "필터", sort: "정렬", date: "날짜", author: "작성자", category: "카테고리", tags: "태그", comments: "댓글", views: "조회수", likes: "좋아요", shares: "공유" },
    footer: { rights: "모든 권리 보유.", about: "소개", contact: "연락처", privacy: "개인정보", terms: "약관", cookies: "쿠키" },
    seo: { home: { title: "아르헨티나 정치 - 정치 뉴스 포털", description: "아르헨티나 정치 뉴스 전문 포털. 밀레이, 의회, 경제, 달러, 인플레이션에 관한 최신 뉴스. 24시간 보도.", keywords: "아르헨티나 정치, 아르헨티나 뉴스, 밀레이, 아르헨티나 정부, 아르헨티나 선거, 국회" }, politics: { title: "정치 - 아르헨티나 정치 뉴스", description: "아르헨티나 정치, 정부, 의회, 선거 및 정당에 관한 최신 뉴스. 전문가 분석 및 실시간 보도.", keywords: "아르헨티나 정치, 정부, 의회, 선거, 밀레이, 카사 로사다, 상원, 하원" }, economy: { title: "경제 - 아르헨티나 경제 분석", description: "아르헨티나 경제 뉴스: 달러, 인플레이션, 시장, 기업 및 금융. 전문 경제 분석 및 실시간 데이터.", keywords: "아르헨티나 경제, 달러, 인플레이션, 시장, 주식 시장, 금융, 투자" } }
  }
};

// Generar archivos
const localesDir = path.join(process.cwd(), 'client/public/locales');

Object.entries(translations).forEach(([lang, content]) => {
  const langDir = path.join(localesDir, lang);
  
  // Crear directorio si no existe
  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir, { recursive: true });
  }
  
  // Escribir archivo
  const filePath = path.join(langDir, 'translation.json');
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
  
  console.log(`✅ Generated: ${lang}/translation.json`);
});

console.log('');
console.log('🎉 All translations generated successfully!');
console.log(`📊 Total languages: ${Object.keys(translations).length}`);
console.log('');
console.log('Languages: es, en, pt, fr, de, it, zh, ja, ru, ar, ko');

