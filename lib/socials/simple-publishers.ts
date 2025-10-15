// Versión simplificada de publishers para evitar errores de sintaxis en build

export interface ArticleData {
  title: string;
  excerpt: string;
  url: string;
  coverImage?: string;
  category?: string;
  language?: string;
  hashtags?: string[];
}

export interface PublishResult {
  platform: string;
  success: boolean;
  error?: string;
}

export async function publishToTelegram(article: ArticleData): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const channelId = process.env.TELEGRAM_CHANNEL_ID;
  
  if (!token || !channelId) {
    console.log("Telegram not configured");
    return false;
  }

  try {
    const message = `📰 **${article.title}**\n\n${article.excerpt}\n\n👉 ${article.url}`;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: channelId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("Telegram error:", error);
    return false;
  }
}

export async function publishToDiscord(article: ArticleData): Promise<boolean> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.log("Discord not configured");
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: "📰 **Nueva noticia publicada**",
        embeds: [
          {
            title: article.title,
            description: article.excerpt,
            url: article.url,
            color: 0x0099ff,
            image: article.coverImage ? { url: article.coverImage } : undefined,
          },
        ],
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("Discord error:", error);
    return false;
  }
}

export async function publishToAll(article: ArticleData): Promise<PublishResult[]> {
  const results: PublishResult[] = [];

  try {
    const telegramSuccess = await publishToTelegram(article);
    results.push({ platform: "Telegram", success: telegramSuccess });
  } catch (error) {
    results.push({ platform: "Telegram", success: false, error: String(error) });
  }

  try {
    const discordSuccess = await publishToDiscord(article);
    results.push({ platform: "Discord", success: discordSuccess });
  } catch (error) {
    results.push({ platform: "Discord", success: false, error: String(error) });
  }

  return results;
}
