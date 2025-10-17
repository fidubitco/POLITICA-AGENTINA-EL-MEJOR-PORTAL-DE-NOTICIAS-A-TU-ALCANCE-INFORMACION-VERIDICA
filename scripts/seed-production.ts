/**
 * Production Database Seeding Script
 *
 * Run this on Railway or your production database to populate content
 * Command: npx tsx scripts/seed-production.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting production database seeding...');

  // Check if we already have content
  const existingPosts = await prisma.post.count();
  if (existingPosts > 10) {
    console.log(`✅ Database already has ${existingPosts} posts. Skipping seed.`);
    return;
  }

  console.log('📝 Creating content...');

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@politica-argentina.com' },
    update: {},
    create: {
      email: 'admin@politica-argentina.com',
      name: 'Redacción',
      role: 'ADMIN',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    },
  });

  console.log('✅ Admin user created');

  // Create categories
  const categories = [
    { name: 'Política', slug: 'politica', description: 'Cobertura política nacional', color: '#dc2626' },
    { name: 'Economía', slug: 'economia', description: 'Análisis económico y financiero', color: '#2563eb' },
    { name: 'Sociedad', slug: 'sociedad', description: 'Temas sociales y culturales', color: '#16a34a' },
    { name: 'Internacional', slug: 'internacional', description: 'Noticias del mundo', color: '#ea580c' },
    { name: 'Tecnología', slug: 'tecnologia', description: 'Innovación y tecnología', color: '#7c3aed' },
  ];

  const createdCategories = await Promise.all(
    categories.map((cat) =>
      prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: cat,
      })
    )
  );

  console.log(`✅ Created ${createdCategories.length} categories`);

  // Create sample posts
  const samplePosts = [
    {
      title: 'Gobierno anuncia nuevo paquete de medidas económicas',
      slug: 'gobierno-anuncia-nuevo-paquete-medidas-economicas',
      excerpt: 'El Ministerio de Economía presentó un conjunto de políticas destinadas a estabilizar la inflación y promover el crecimiento.',
      content: '<h2>Nuevo Plan Económico</h2><p>El gobierno nacional anunció hoy un paquete integral de medidas económicas...</p>',
      categoryId: createdCategories[1].id,
      authorId: admin.id,
      status: 'PUBLISHED',
      featured: true,
      breaking: true,
      views: 15234,
      coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200',
    },
    {
      title: 'Congreso debate reforma electoral',
      slug: 'congreso-debate-reforma-electoral',
      excerpt: 'Diputados y senadores analizan modificaciones al sistema electoral argentino de cara a las próximas elecciones.',
      content: '<h2>Reforma Electoral</h2><p>El Congreso Nacional debate una serie de modificaciones al sistema electoral...</p>',
      categoryId: createdCategories[0].id,
      authorId: admin.id,
      status: 'PUBLISHED',
      featured: false,
      breaking: false,
      views: 8523,
      coverImage: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200',
    },
    {
      title: 'Dólar blue alcanza nuevo récord histórico',
      slug: 'dolar-blue-alcanza-nuevo-record-historico',
      excerpt: 'La divisa paralela superó los $1000 pesos en el mercado informal, generando preocupación en el sector empresarial.',
      content: '<h2>Mercado Cambiario</h2><p>El dólar blue alcanzó un nuevo máximo histórico...</p>',
      categoryId: createdCategories[1].id,
      authorId: admin.id,
      status: 'PUBLISHED',
      featured: true,
      breaking: true,
      views: 23456,
      coverImage: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=1200',
    },
    {
      title: 'Educación: nuevas medidas para modernizar el sistema',
      slug: 'educacion-nuevas-medidas-modernizar-sistema',
      excerpt: 'El Ministerio de Educación presenta un plan integral para incorporar tecnología en las aulas.',
      content: '<h2>Educación Digital</h2><p>Un ambicioso plan busca transformar la educación argentina...</p>',
      categoryId: createdCategories[2].id,
      authorId: admin.id,
      status: 'PUBLISHED',
      featured: false,
      breaking: false,
      views: 5432,
      coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200',
    },
    {
      title: 'Argentina y Brasil firman acuerdo comercial histórico',
      slug: 'argentina-brasil-acuerdo-comercial-historico',
      excerpt: 'Los presidentes de ambos países sellaron un tratado que facilitará el comercio bilateral y la integración regional.',
      content: '<h2>Integración Regional</h2><p>Un nuevo capítulo en las relaciones argentino-brasileñas...</p>',
      categoryId: createdCategories[3].id,
      authorId: admin.id,
      status: 'PUBLISHED',
      featured: false,
      breaking: false,
      views: 7234,
      coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
    },
  ];

  const createdPosts = await Promise.all(
    samplePosts.map((post) =>
      prisma.post.create({
        data: {
          ...post,
          publishedAt: new Date(),
        },
      })
    )
  );

  console.log(`✅ Created ${createdPosts.length} sample posts`);

  console.log('🎉 Production database seeded successfully!');
  console.log(`📊 Summary:`);
  console.log(`   - Users: 1`);
  console.log(`   - Categories: ${createdCategories.length}`);
  console.log(`   - Posts: ${createdPosts.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
