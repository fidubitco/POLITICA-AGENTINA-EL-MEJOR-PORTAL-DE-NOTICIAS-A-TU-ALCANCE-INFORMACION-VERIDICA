export const newsSources = [
  {
    name: "Infobae",
    url: "https://www.infobae.com",
    rssFeeds: [
      "https://www.infobae.com/feeds/rss/",
      "https://www.infobae.com/america/rss.xml",
      "https://www.infobae.com/politica/rss.xml",
      "https://www.infobae.com/economia/rss.xml",
    ],
    category: "General",
    selectors: {
      title: "h1.headline",
      content: ".article-content p",
      image: "meta[property='og:image']",
      author: ".author-name",
    },
  },
  {
    name: "El Perfil",
    url: "https://www.perfil.com",
    rssFeeds: [
      "https://www.perfil.com/feed",
      "https://www.perfil.com/politica/feed",
      "https://www.perfil.com/economia/feed",
    ],
    category: "General",
    selectors: {
      title: "h1.title",
      content: ".article-body p",
      image: "meta[property='og:image']",
      author: ".author",
    },
  },
];

export type NewsSource = typeof newsSources[number];
