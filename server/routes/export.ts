import { Router } from 'express';
import { exportService } from '../services/export';
import { db } from '../db';
import { articles, pushSubscriptions } from '../db/schema';
import { desc, count } from 'drizzle-orm';

const router = Router();

// ===========================================
// ENDPOINTS DE EXPORT PDF
// ===========================================

// Exportar artículos a PDF
router.get('/articles/pdf', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 100;

    // Obtener artículos de la base de datos
    const articlesData = await db
      .select({
        id: articles.id,
        title: articles.title,
        content: articles.content,
        category: articles.category,
        author: articles.author,
        createdAt: articles.createdAt,
        views: articles.views,
        likes: articles.likes,
        shares: articles.shares
      })
      .from(articles)
      .where(articles.isPublished)
      .orderBy(desc(articles.createdAt))
      .limit(limit);

    const pdfBuffer = await exportService.exportArticlesToPDF(articlesData);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="articulos-politica-argentina.pdf"');
    res.send(pdfBuffer);

  } catch (error: any) {
    console.error('Error exportando artículos a PDF:', error);
    res.status(500).json({
      success: false,
      message: 'Error generando PDF de artículos'
    });
  }
});

// Exportar analytics a PDF
router.get('/analytics/pdf', async (req, res) => {
  try {
    const period = req.query.period as string || '30d';

    // Obtener datos de analytics (simulados por ahora)
    const analyticsData = {
      period,
      totalViews: 245678,
      totalArticles: 159,
      totalUsers: 12450,
      avgEngagement: 3.2,
      topCategories: [
        { name: 'Política', articles: 45, views: 125000 },
        { name: 'Economía', articles: 32, views: 98000 },
        { name: 'Sociedad', articles: 28, views: 76000 },
        { name: 'Internacional', articles: 21, views: 54000 },
        { name: 'Deportes', articles: 18, views: 42000 }
      ],
      trafficData: [
        { date: '01/11', views: 4200, uniqueVisitors: 1200 },
        { date: '02/11', views: 3800, uniqueVisitors: 1100 },
        { date: '03/11', views: 5100, uniqueVisitors: 1400 },
        { date: '04/11', views: 4600, uniqueVisitors: 1300 },
        { date: '05/11', views: 5900, uniqueVisitors: 1600 }
      ]
    };

    const pdfBuffer = await exportService.exportAnalyticsToPDF(analyticsData);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="analytics-${period}-politica-argentina.pdf"`);
    res.send(pdfBuffer);

  } catch (error: any) {
    console.error('Error exportando analytics a PDF:', error);
    res.status(500).json({
      success: false,
      message: 'Error generando PDF de analytics'
    });
  }
});

// ===========================================
// ENDPOINTS DE EXPORT EXCEL
// ===========================================

// Exportar artículos a Excel
router.get('/articles/excel', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 1000;

    // Obtener artículos de la base de datos
    const articlesData = await db
      .select({
        id: articles.id,
        title: articles.title,
        content: articles.content,
        category: articles.category,
        author: articles.author,
        createdAt: articles.createdAt,
        views: articles.views,
        likes: articles.likes,
        shares: articles.shares
      })
      .from(articles)
      .orderBy(desc(articles.createdAt))
      .limit(limit);

    const excelBuffer = await exportService.exportArticlesToExcel(articlesData);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="articulos-politica-argentina.xlsx"');
    res.send(excelBuffer);

  } catch (error: any) {
    console.error('Error exportando artículos a Excel:', error);
    res.status(500).json({
      success: false,
      message: 'Error generando Excel de artículos'
    });
  }
});

// Exportar analytics a Excel
router.get('/analytics/excel', async (req, res) => {
  try {
    const period = req.query.period as string || '30d';

    // Obtener datos de analytics
    const analyticsData = {
      period,
      totalViews: 245678,
      totalArticles: 159,
      totalUsers: 12450,
      avgEngagement: 3.2,
      topCategories: [
        { name: 'Política', articles: 45, views: 125000 },
        { name: 'Economía', articles: 32, views: 98000 },
        { name: 'Sociedad', articles: 28, views: 76000 },
        { name: 'Internacional', articles: 21, views: 54000 },
        { name: 'Deportes', articles: 18, views: 42000 }
      ],
      trafficData: [
        { date: '01/11', views: 4200, uniqueVisitors: 1200 },
        { date: '02/11', views: 3800, uniqueVisitors: 1100 },
        { date: '03/11', views: 5100, uniqueVisitors: 1400 },
        { date: '04/11', views: 4600, uniqueVisitors: 1300 },
        { date: '05/11', views: 5900, uniqueVisitors: 1600 }
      ]
    };

    const excelBuffer = await exportService.exportAnalyticsToExcel(analyticsData);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="analytics-${period}-politica-argentina.xlsx"`);
    res.send(excelBuffer);

  } catch (error: any) {
    console.error('Error exportando analytics a Excel:', error);
    res.status(500).json({
      success: false,
      message: 'Error generando Excel de analytics'
    });
  }
});

// Exportar usuarios a Excel
router.get('/users/excel', async (req, res) => {
  try {
    // Obtener usuarios de la base de datos (simulados por ahora)
    const usersData = [
      {
        id: '1',
        name: 'Admin Principal',
        email: 'admin@politicaargentina.com',
        role: 'admin',
        createdAt: new Date('2024-01-01'),
        lastLogin: new Date()
      },
      {
        id: '2',
        name: 'Editor Senior',
        email: 'editor@politicaargentina.com',
        role: 'editor',
        createdAt: new Date('2024-02-01'),
        lastLogin: new Date(Date.now() - 86400000)
      }
    ];

    const excelBuffer = await exportService.exportUsersToExcel(usersData);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="usuarios-politica-argentina.xlsx"');
    res.send(excelBuffer);

  } catch (error: any) {
    console.error('Error exportando usuarios a Excel:', error);
    res.status(500).json({
      success: false,
      message: 'Error generando Excel de usuarios'
    });
  }
});

// ===========================================
// ENDPOINT PARA EXPORTAR TODO
// ===========================================

// Exportar reporte completo (ZIP con PDF y Excel)
router.get('/complete', async (req, res) => {
  try {
    const timestamp = new Date().toISOString().split('T')[0];

    // Aquí iría la lógica para crear un ZIP con múltiples archivos
    // Por ahora, devolver información sobre los endpoints disponibles

    res.json({
      success: true,
      message: 'Use los siguientes endpoints para exportar datos:',
      endpoints: {
        articles_pdf: '/api/export/articles/pdf',
        articles_excel: '/api/export/articles/excel',
        analytics_pdf: '/api/export/analytics/pdf',
        analytics_excel: '/api/export/analytics/excel',
        users_excel: '/api/export/users/excel'
      },
      timestamp
    });

  } catch (error: any) {
    console.error('Error generando export completo:', error);
    res.status(500).json({
      success: false,
      message: 'Error generando export completo'
    });
  }
});

export default router;

