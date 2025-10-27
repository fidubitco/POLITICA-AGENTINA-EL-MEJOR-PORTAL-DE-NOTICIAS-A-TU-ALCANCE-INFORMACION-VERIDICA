import TelegramBot from 'node-telegram-bot-api';
import { db } from '../api/database';
import { articles, users } from '../db/schema';
import { eq, desc } from 'drizzle-orm';

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8403562309:AAHSqxvWRWhhjHfQi4qBV6pm0_Fpv45v_5Q';

class TelegramBotService {
  private bot: TelegramBot;
  private subscribers: Set<number> = new Set();

  constructor() {
    this.bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
    this.setupCommands();
    this.setupHandlers();
    console.log('🤖 Telegram Bot iniciado: @capitansparrowia_bot');
  }

  private setupCommands() {
    // Comando /start
    this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      const welcomeMessage = `
🇦🇷 *Bienvenido a Política Argentina Bot* 🇦🇷

¡Recibe las últimas noticias políticas de Argentina directamente en Telegram!

📰 *Comandos disponibles:*
/start - Mostrar este mensaje
/noticias - Últimas noticias
/suscribir - Suscribirse a notificaciones
/desuscribir - Desuscribirse
/ayuda - Ayuda y comandos

🌐 *Sitio web:* https://politicaargentina.com
📱 *Bot:* @capitansparrowia_bot

¡Mantente informado con las noticias más importantes de Argentina!
      `;
      
      this.bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
    });

    // Comando /noticias
    this.bot.onText(/\/noticias/, async (msg) => {
      const chatId = msg.chat.id;
      try {
        const latestNews = await this.getLatestNews(5);
        
        if (latestNews.length === 0) {
          this.bot.sendMessage(chatId, '📰 No hay noticias disponibles en este momento.');
          return;
        }

        let message = '📰 *Últimas Noticias de Argentina:*\n\n';
        
        latestNews.forEach((article, index) => {
          message += `${index + 1}. *${article.title}*\n`;
          message += `📅 ${new Date(article.created_at).toLocaleDateString('es-AR')}\n`;
          message += `🔗 [Leer más](${article.url})\n\n`;
        });

        message += '🌐 *Más noticias en:* https://politicaargentina.com';
        
        this.bot.sendMessage(chatId, message, { 
          parse_mode: 'Markdown',
          disable_web_page_preview: true 
        });
      } catch (error) {
        console.error('Error getting news:', error);
        this.bot.sendMessage(chatId, '❌ Error al obtener las noticias. Intenta más tarde.');
      }
    });

    // Comando /suscribir
    this.bot.onText(/\/suscribir/, (msg) => {
      const chatId = msg.chat.id;
      this.subscribers.add(chatId);
      
      const message = `
✅ *¡Te has suscrito exitosamente!*

Ahora recibirás notificaciones automáticas de las últimas noticias políticas de Argentina.

📱 *Comandos útiles:*
/desuscribir - Para dejar de recibir notificaciones
/noticias - Ver noticias ahora
/ayuda - Más comandos

¡Gracias por seguirnos! 🇦🇷
      `;
      
      this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    });

    // Comando /desuscribir
    this.bot.onText(/\/desuscribir/, (msg) => {
      const chatId = msg.chat.id;
      this.subscribers.delete(chatId);
      
      this.bot.sendMessage(chatId, '❌ Te has desuscrito de las notificaciones. Usa /suscribir para volver a recibirlas.');
    });

    // Comando /ayuda
    this.bot.onText(/\/ayuda/, (msg) => {
      const chatId = msg.chat.id;
      const helpMessage = `
🆘 *Ayuda - Política Argentina Bot*

📋 *Comandos disponibles:*

/start - Mensaje de bienvenida
/noticias - Últimas 5 noticias
/suscribir - Recibir notificaciones automáticas
/desuscribir - Dejar de recibir notificaciones
/ayuda - Mostrar esta ayuda

🌐 *Enlaces útiles:*
• Sitio web: https://politicaargentina.com
• Bot: @capitansparrowia_bot

📞 *Soporte:*
Si tienes problemas, contacta al administrador del bot.

¡Gracias por usar Política Argentina Bot! 🇦🇷
      `;
      
      this.bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
    });
  }

  private setupHandlers() {
    // Manejar errores
    this.bot.on('error', (error) => {
      console.error('Telegram Bot Error:', error);
    });

    // Manejar mensajes no reconocidos
    this.bot.on('message', (msg) => {
      if (!msg.text?.startsWith('/')) {
        const chatId = msg.chat.id;
        this.bot.sendMessage(chatId, '🤔 No entiendo ese comando. Usa /ayuda para ver los comandos disponibles.');
      }
    });
  }

  private async getLatestNews(limit: number = 5) {
    try {
      const latestArticles = await db
        .select()
        .from(articles)
        .orderBy(desc(articles.created_at))
        .limit(limit);

      return latestArticles.map(article => ({
        id: article.id,
        title: article.title,
        url: `https://politicaargentina.com/articulo/${article.slug}`,
        created_at: article.created_at
      }));
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }

  // Método para enviar notificaciones a todos los suscriptores
  public async sendNotificationToSubscribers(article: any) {
    if (this.subscribers.size === 0) return;

    const message = `
🔥 *¡Nueva Noticia Importante!* 🔥

📰 *${article.title}*

📅 ${new Date(article.created_at).toLocaleDateString('es-AR')}

🔗 [Leer noticia completa](${article.url})

🌐 *Más noticias en:* https://politicaargentina.com

---
🇦🇷 *Política Argentina Bot* - Mantente informado
    `;

    const promises = Array.from(this.subscribers).map(chatId => 
      this.bot.sendMessage(chatId, message, { 
        parse_mode: 'Markdown',
        disable_web_page_preview: true 
      }).catch(error => {
        console.error(`Error sending to ${chatId}:`, error);
        // Remover suscriptor si hay error
        this.subscribers.delete(chatId);
      })
    );

    await Promise.allSettled(promises);
    console.log(`📤 Notificación enviada a ${this.subscribers.size} suscriptores`);
  }

  // Método para obtener estadísticas del bot
  public getStats() {
    return {
      subscribers: this.subscribers.size,
      botUsername: '@capitansparrowia_bot',
      isActive: true
    };
  }

  // Método para detener el bot
  public stop() {
    this.bot.stopPolling();
    console.log('🤖 Telegram Bot detenido');
  }
}

export default TelegramBotService;
