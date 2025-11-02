import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { redisCache } from './redis';
import { cacheInvalidation } from './cacheMiddleware';

// ===========================================
// INTERFACES Y TIPOS
// ===========================================

interface ArticleData {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  createdAt: Date;
  views: number;
  likes: number;
  shares: number;
}

interface AnalyticsData {
  period: string;
  totalViews: number;
  totalArticles: number;
  totalUsers: number;
  avgEngagement: number;
  topCategories: Array<{
    name: string;
    articles: number;
    views: number;
  }>;
  trafficData: Array<{
    date: string;
    views: number;
    uniqueVisitors: number;
  }>;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  lastLogin?: Date;
}

// ===========================================
// CLASE PRINCIPAL DEL SERVICIO DE EXPORT
// ===========================================

export class ExportService {

  // ===========================================
  // EXPORT PDF
  // ===========================================

  async exportArticlesToPDF(articles: ArticleData[], filename?: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          size: 'A4',
          margin: 50,
          info: {
            Title: 'Reporte de Artículos - Política Argentina',
            Author: 'Sistema de Administración',
            CreationDate: new Date()
          }
        });

        const buffers: Buffer[] = [];

        doc.on('data', (chunk) => buffers.push(chunk));
        doc.on('end', () => {
          const pdfBuffer = Buffer.concat(buffers);
          resolve(pdfBuffer);
        });

        doc.on('error', reject);

        // Encabezado
        this.addPDFHeader(doc, 'REPORTE DE ARTÍCULOS');

        // Estadísticas generales
        doc.moveDown(2);
        doc.fontSize(14).text('Estadísticas Generales', { underline: true });
        doc.moveDown();

        const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
        const totalLikes = articles.reduce((sum, article) => sum + article.likes, 0);
        const totalShares = articles.reduce((sum, article) => sum + article.shares, 0);

        doc.fontSize(12);
        doc.text(`Total de Artículos: ${articles.length}`);
        doc.text(`Vistas Totales: ${totalViews.toLocaleString()}`);
        doc.text(`Likes Totales: ${totalLikes.toLocaleString()}`);
        doc.text(`Compartidos Totales: ${totalShares.toLocaleString()}`);
        doc.moveDown();

        // Lista de artículos
        doc.addPage();
        doc.fontSize(14).text('Lista de Artículos', { underline: true });
        doc.moveDown();

        articles.forEach((article, index) => {
          // Verificar si necesitamos una nueva página
          if (doc.y > 600) {
            doc.addPage();
          }

          doc.fontSize(12).font('Helvetica-Bold');
          doc.text(`${index + 1}. ${article.title}`);
          doc.moveDown(0.5);

          doc.fontSize(10).font('Helvetica');
          doc.text(`Categoría: ${article.category}`);
          doc.text(`Autor: ${article.author}`);
          doc.text(`Fecha: ${article.createdAt.toLocaleDateString('es-AR')}`);
          doc.text(`Estadísticas: ${article.views} vistas, ${article.likes} likes, ${article.shares} compartidos`);
          doc.moveDown();

          // Resumen del contenido (primeros 200 caracteres)
          const summary = article.content.substring(0, 200) + '...';
          doc.fontSize(9).text(`Resumen: ${summary}`);
          doc.moveDown(2);
        });

        // Pie de página
        this.addPDFFooter(doc);

        doc.end();

      } catch (error) {
        reject(error);
      }
    });
  }

  async exportAnalyticsToPDF(analytics: AnalyticsData, filename?: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          size: 'A4',
          margin: 50,
          info: {
            Title: 'Reporte de Analytics - Política Argentina',
            Author: 'Sistema de Administración',
            CreationDate: new Date()
          }
        });

        const buffers: Buffer[] = [];

        doc.on('data', (chunk) => buffers.push(chunk));
        doc.on('end', () => {
          const pdfBuffer = Buffer.concat(buffers);
          resolve(pdfBuffer);
        });

        doc.on('error', reject);

        // Encabezado
        this.addPDFHeader(doc, 'REPORTE DE ANALYTICS');

        // Período del reporte
        doc.moveDown(2);
        doc.fontSize(14).text(`Período: ${analytics.period}`, { underline: true });
        doc.moveDown();

        // Estadísticas principales
        doc.fontSize(12);
        doc.text(`Vistas Totales: ${analytics.totalViews.toLocaleString()}`);
        doc.text(`Artículos Publicados: ${analytics.totalArticles}`);
        doc.text(`Usuarios Activos: ${analytics.totalUsers.toLocaleString()}`);
        doc.text(`Engagement Promedio: ${analytics.avgEngagement}%`);
        doc.moveDown(2);

        // Categorías principales
        doc.fontSize(14).text('Categorías Principales', { underline: true });
        doc.moveDown();

        analytics.topCategories.forEach((category, index) => {
          doc.fontSize(12);
          doc.text(`${index + 1}. ${category.name}`);
          doc.fontSize(10);
          doc.text(`   Artículos: ${category.articles}, Vistas: ${category.views.toLocaleString()}`);
          doc.moveDown(0.5);
        });

        doc.addPage();

        // Datos de tráfico
        doc.fontSize(14).text('Tendencia de Tráfico', { underline: true });
        doc.moveDown();

        analytics.trafficData.forEach((day) => {
          doc.fontSize(10);
          doc.text(`${day.date}: ${day.views.toLocaleString()} vistas (${day.uniqueVisitors.toLocaleString()} visitantes únicos)`);
        });

        // Pie de página
        this.addPDFFooter(doc);

        doc.end();

      } catch (error) {
        reject(error);
      }
    });
  }

  // ===========================================
  // EXPORT EXCEL
  // ===========================================

  async exportArticlesToExcel(articles: ArticleData[], filename?: string): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Política Argentina CMS';
    workbook.created = new Date();

    // Hoja principal de artículos
    const articlesSheet = workbook.addWorksheet('Artículos');

    // Encabezados
    articlesSheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Título', key: 'title', width: 50 },
      { header: 'Categoría', key: 'category', width: 15 },
      { header: 'Autor', key: 'author', width: 20 },
      { header: 'Fecha Creación', key: 'createdAt', width: 15 },
      { header: 'Vistas', key: 'views', width: 10 },
      { header: 'Likes', key: 'likes', width: 10 },
      { header: 'Compartidos', key: 'shares', width: 12 },
      { header: 'Contenido', key: 'content', width: 80 }
    ];

    // Estilo de encabezados
    articlesSheet.getRow(1).font = { bold: true };
    articlesSheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4A5568' }
    };
    articlesSheet.getRow(1).font = { color: { argb: 'FFFFFFFF' }, bold: true };

    // Agregar datos
    articles.forEach((article) => {
      articlesSheet.addRow({
        id: article.id,
        title: article.title,
        category: article.category,
        author: article.author,
        createdAt: article.createdAt,
        views: article.views,
        likes: article.likes,
        shares: article.shares,
        content: article.content.substring(0, 1000) // Limitar contenido
      });
    });

    // Hoja de estadísticas
    const statsSheet = workbook.addWorksheet('Estadísticas');

    statsSheet.columns = [
      { header: 'Métrica', key: 'metric', width: 30 },
      { header: 'Valor', key: 'value', width: 20 }
    ];

    const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
    const totalLikes = articles.reduce((sum, article) => sum + article.likes, 0);
    const totalShares = articles.reduce((sum, article) => sum + article.shares, 0);

    statsSheet.addRows([
      { metric: 'Total de Artículos', value: articles.length },
      { metric: 'Vistas Totales', value: totalViews },
      { metric: 'Likes Totales', value: totalLikes },
      { metric: 'Compartidos Totales', value: totalShares },
      { metric: 'Vistas Promedio por Artículo', value: Math.round(totalViews / articles.length) },
      { metric: 'Engagement Promedio', value: `${((totalLikes + totalShares) / totalViews * 100).toFixed(2)}%` }
    ]);

    // Estilo de estadísticas
    statsSheet.getRow(1).font = { bold: true };
    statsSheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4A5568' }
    };
    statsSheet.getRow(1).font = { color: { argb: 'FFFFFFFF' }, bold: true };

    return await workbook.xlsx.writeBuffer();
  }

  async exportAnalyticsToExcel(analytics: AnalyticsData, filename?: string): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Política Argentina CMS';
    workbook.created = new Date();

    // Hoja de métricas generales
    const metricsSheet = workbook.addWorksheet('Métricas Generales');

    metricsSheet.columns = [
      { header: 'Período', key: 'period', width: 20 },
      { header: 'Vistas Totales', key: 'totalViews', width: 15 },
      { header: 'Artículos', key: 'totalArticles', width: 12 },
      { header: 'Usuarios', key: 'totalUsers', width: 12 },
      { header: 'Engagement', key: 'avgEngagement', width: 12 }
    ];

    metricsSheet.addRow({
      period: analytics.period,
      totalViews: analytics.totalViews,
      totalArticles: analytics.totalArticles,
      totalUsers: analytics.totalUsers,
      avgEngagement: `${analytics.avgEngagement}%`
    });

    // Hoja de categorías
    const categoriesSheet = workbook.addWorksheet('Categorías');

    categoriesSheet.columns = [
      { header: 'Categoría', key: 'name', width: 20 },
      { header: 'Artículos', key: 'articles', width: 12 },
      { header: 'Vistas', key: 'views', width: 15 }
    ];

    analytics.topCategories.forEach(category => {
      categoriesSheet.addRow(category);
    });

    // Hoja de tráfico
    const trafficSheet = workbook.addWorksheet('Tráfico');

    trafficSheet.columns = [
      { header: 'Fecha', key: 'date', width: 12 },
      { header: 'Vistas', key: 'views', width: 12 },
      { header: 'Visitantes Únicos', key: 'uniqueVisitors', width: 18 }
    ];

    analytics.trafficData.forEach(day => {
      trafficSheet.addRow(day);
    });

    // Estilos
    [metricsSheet, categoriesSheet, trafficSheet].forEach(sheet => {
      sheet.getRow(1).font = { bold: true };
      sheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4A5568' }
      };
      sheet.getRow(1).font = { color: { argb: 'FFFFFFFF' }, bold: true };
    });

    return await workbook.xlsx.writeBuffer();
  }

  async exportUsersToExcel(users: UserData[], filename?: string): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Política Argentina CMS';
    workbook.created = new Date();

    const usersSheet = workbook.addWorksheet('Usuarios');

    usersSheet.columns = [
      { header: 'ID', key: 'id', width: 15 },
      { header: 'Nombre', key: 'name', width: 25 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Rol', key: 'role', width: 15 },
      { header: 'Fecha Registro', key: 'createdAt', width: 18 },
      { header: 'Último Login', key: 'lastLogin', width: 18 }
    ];

    users.forEach(user => {
      usersSheet.addRow({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin || 'Nunca'
      });
    });

    // Estilos
    usersSheet.getRow(1).font = { bold: true };
    usersSheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4A5568' }
    };
    usersSheet.getRow(1).font = { color: { argb: 'FFFFFFFF' }, bold: true };

    return await workbook.xlsx.writeBuffer();
  }

  // ===========================================
  // UTILIDADES PDF
  // ===========================================

  private addPDFHeader(doc: PDFKit.PDFDocument, title: string) {
    // Logo o título principal
    doc.fontSize(20).font('Helvetica-Bold');
    doc.text('Política Argentina', { align: 'center' });
    doc.moveDown();

    // Subtítulo
    doc.fontSize(16).font('Helvetica');
    doc.text('Sistema de Administración de Contenidos', { align: 'center' });
    doc.moveDown();

    // Título del reporte
    doc.fontSize(18).font('Helvetica-Bold');
    doc.text(title, { align: 'center' });
    doc.moveDown();

    // Fecha de generación
    doc.fontSize(10).font('Helvetica');
    doc.text(`Generado el: ${new Date().toLocaleDateString('es-AR')} ${new Date().toLocaleTimeString('es-AR')}`, { align: 'right' });
  }

  private addPDFFooter(doc: PDFKit.PDFDocument) {
    const pageCount = doc.bufferedPageRange().count;
    for (let i = 0; i < pageCount; i++) {
      doc.switchToPage(i);

      // Footer
      doc.fontSize(8).font('Helvetica');
      doc.text(
        `Página ${i + 1} de ${pageCount}`,
        50,
        doc.page.height - 50,
        { align: 'center' }
      );
    }
  }

  // ===========================================
  // MÉTODOS DE CONVENIENCIA
  // ===========================================

  async exportToFile(data: Buffer, filename: string, format: 'pdf' | 'xlsx'): Promise<string> {
    const extension = format === 'pdf' ? '.pdf' : '.xlsx';
    const fullFilename = filename.includes(extension) ? filename : filename + extension;
    const filepath = path.join(process.cwd(), 'exports', fullFilename);

    // Crear directorio si no existe
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filepath, data);
    return filepath;
  }
}

// ===========================================
// INSTANCIA GLOBAL DEL SERVICIO
// ===========================================

export const exportService = new ExportService();
