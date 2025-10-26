import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';
import { db } from '../api/database';
import { Readable } from 'stream';

/**
 * Generar PDF de un artículo
 */
export async function generateArticlePDF(articleId: number): Promise<Buffer> {
  // Obtener artículo
  const articles = await db.query(
    `SELECT a.*, c.name as category_name, u.username as author_name
     FROM articles a
     LEFT JOIN categories c ON a.category_id = c.id
     LEFT JOIN users u ON a.author_id = u.id
     WHERE a.id = ?`,
    [articleId]
  );
  
  if (articles.length === 0) {
    throw new Error('Artículo no encontrado');
  }
  
  const article = articles[0];
  
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
      });
      
      const chunks: Buffer[] = [];
      
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);
      
      // Header
      doc
        .fontSize(24)
        .font('Helvetica-Bold')
        .text('Política Argentina', { align: 'center' });
      
      doc.moveDown();
      
      // Categoría
      doc
        .fontSize(12)
        .font('Helvetica')
        .fillColor('#666')
        .text(article.category_name.toUpperCase(), { align: 'center' });
      
      doc.moveDown();
      
      // Título
      doc
        .fontSize(20)
        .font('Helvetica-Bold')
        .fillColor('#000')
        .text(article.title, { align: 'left' });
      
      doc.moveDown();
      
      // Metadata
      doc
        .fontSize(10)
        .font('Helvetica')
        .fillColor('#666')
        .text(
          `Por ${article.author_name} | ${new Date(article.published_at).toLocaleDateString('es-AR')}`,
          { align: 'left' }
        );
      
      doc.moveDown();
      doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown();
      
      // Excerpt
      if (article.excerpt) {
        doc
          .fontSize(12)
          .font('Helvetica-Bold')
          .fillColor('#000')
          .text(article.excerpt, { align: 'justify' });
        
        doc.moveDown();
      }
      
      // Contenido
      doc
        .fontSize(11)
        .font('Helvetica')
        .fillColor('#333')
        .text(article.content, { align: 'justify' });
      
      doc.moveDown(2);
      
      // Footer
      doc
        .fontSize(9)
        .fillColor('#999')
        .text('Generado desde politicaargentina.com', { align: 'center' });
      
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Generar Excel con lista de artículos
 */
export async function generateArticlesExcel(filters?: {
  category?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
}): Promise<Buffer> {
  // Construir query
  let query = `
    SELECT 
      a.id,
      a.title,
      a.slug,
      a.excerpt,
      c.name as category,
      u.username as author,
      a.status,
      a.views,
      a.shares,
      a.likes,
      a.published_at,
      a.created_at
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    LEFT JOIN users u ON a.author_id = u.id
    WHERE 1=1
  `;
  
  const params: any[] = [];
  
  if (filters?.category) {
    query += ' AND c.name = ?';
    params.push(filters.category);
  }
  
  if (filters?.status) {
    query += ' AND a.status = ?';
    params.push(filters.status);
  }
  
  if (filters?.dateFrom) {
    query += ' AND a.published_at >= ?';
    params.push(filters.dateFrom);
  }
  
  if (filters?.dateTo) {
    query += ' AND a.published_at <= ?';
    params.push(filters.dateTo);
  }
  
  query += ' ORDER BY a.published_at DESC';
  
  const articles = await db.query(query, params);
  
  // Crear workbook
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Artículos');
  
  // Configurar columnas
  worksheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Título', key: 'title', width: 50 },
    { header: 'Categoría', key: 'category', width: 15 },
    { header: 'Autor', key: 'author', width: 20 },
    { header: 'Estado', key: 'status', width: 12 },
    { header: 'Vistas', key: 'views', width: 10 },
    { header: 'Compartidos', key: 'shares', width: 12 },
    { header: 'Likes', key: 'likes', width: 10 },
    { header: 'Publicado', key: 'published_at', width: 15 },
    { header: 'Creado', key: 'created_at', width: 15 },
  ];
  
  // Estilo del header
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF1a1a2e' },
  };
  worksheet.getRow(1).font = { color: { argb: 'FFFFFFFF' }, bold: true };
  
  // Agregar datos
  for (const article of articles) {
    worksheet.addRow({
      id: article.id,
      title: article.title,
      category: article.category,
      author: article.author,
      status: article.status,
      views: article.views,
      shares: article.shares,
      likes: article.likes,
      published_at: article.published_at
        ? new Date(article.published_at).toLocaleDateString('es-AR')
        : '',
      created_at: new Date(article.created_at).toLocaleDateString('es-AR'),
    });
  }
  
  // Auto-filtro
  worksheet.autoFilter = {
    from: 'A1',
    to: 'J1',
  };
  
  // Generar buffer
  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}

/**
 * Generar Excel con analytics
 */
export async function generateAnalyticsExcel(dateFrom: Date, dateTo: Date): Promise<Buffer> {
  // Obtener datos de analytics
  const analytics = await db.query(
    `SELECT 
      DATE(created_at) as date,
      SUM(views) as total_views,
      SUM(unique_visitors) as total_visitors,
      SUM(shares) as total_shares,
      SUM(likes) as total_likes,
      AVG(time_on_page) as avg_time
    FROM analytics
    WHERE created_at BETWEEN ? AND ?
    GROUP BY DATE(created_at)
    ORDER BY date DESC`,
    [dateFrom, dateTo]
  );
  
  // Top artículos
  const topArticles = await db.query(
    `SELECT 
      a.title,
      a.views,
      a.shares,
      a.likes,
      c.name as category
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    WHERE a.published_at BETWEEN ? AND ?
    ORDER BY a.views DESC
    LIMIT 20`,
    [dateFrom, dateTo]
  );
  
  // Crear workbook
  const workbook = new ExcelJS.Workbook();
  
  // Sheet 1: Analytics diarios
  const analyticsSheet = workbook.addWorksheet('Analytics Diarios');
  
  analyticsSheet.columns = [
    { header: 'Fecha', key: 'date', width: 15 },
    { header: 'Vistas', key: 'views', width: 12 },
    { header: 'Visitantes', key: 'visitors', width: 12 },
    { header: 'Compartidos', key: 'shares', width: 12 },
    { header: 'Likes', key: 'likes', width: 12 },
    { header: 'Tiempo Promedio (s)', key: 'avg_time', width: 18 },
  ];
  
  analyticsSheet.getRow(1).font = { bold: true };
  analyticsSheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF1a1a2e' },
  };
  analyticsSheet.getRow(1).font = { color: { argb: 'FFFFFFFF' }, bold: true };
  
  for (const row of analytics) {
    analyticsSheet.addRow({
      date: new Date(row.date).toLocaleDateString('es-AR'),
      views: row.total_views,
      visitors: row.total_visitors,
      shares: row.total_shares,
      likes: row.total_likes,
      avg_time: Math.round(row.avg_time),
    });
  }
  
  // Sheet 2: Top artículos
  const topSheet = workbook.addWorksheet('Top Artículos');
  
  topSheet.columns = [
    { header: 'Título', key: 'title', width: 50 },
    { header: 'Categoría', key: 'category', width: 15 },
    { header: 'Vistas', key: 'views', width: 12 },
    { header: 'Compartidos', key: 'shares', width: 12 },
    { header: 'Likes', key: 'likes', width: 12 },
  ];
  
  topSheet.getRow(1).font = { bold: true };
  topSheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF1a1a2e' },
  };
  topSheet.getRow(1).font = { color: { argb: 'FFFFFFFF' }, bold: true };
  
  for (const article of topArticles) {
    topSheet.addRow({
      title: article.title,
      category: article.category,
      views: article.views,
      shares: article.shares,
      likes: article.likes,
    });
  }
  
  // Generar buffer
  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}

/**
 * Generar Excel con usuarios
 */
export async function generateUsersExcel(): Promise<Buffer> {
  const users = await db.query(
    `SELECT 
      id,
      username,
      email,
      role,
      created_at,
      last_login
    FROM users
    ORDER BY created_at DESC`
  );
  
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Usuarios');
  
  worksheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Usuario', key: 'username', width: 20 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Rol', key: 'role', width: 12 },
    { header: 'Registrado', key: 'created_at', width: 15 },
    { header: 'Último Login', key: 'last_login', width: 15 },
  ];
  
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF1a1a2e' },
  };
  worksheet.getRow(1).font = { color: { argb: 'FFFFFFFF' }, bold: true };
  
  for (const user of users) {
    worksheet.addRow({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      created_at: new Date(user.created_at).toLocaleDateString('es-AR'),
      last_login: user.last_login
        ? new Date(user.last_login).toLocaleDateString('es-AR')
        : 'Nunca',
    });
  }
  
  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}

