import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Crear usuario admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@politicaargentina.com' },
    update: {},
    create: {
      email: 'admin@politicaargentina.com',
      name: 'Admin',
      password: adminPassword,
      role: 'ADMIN',
      bio: 'Administrador del sitio',
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Crear usuario editor
  const editorPassword = await bcrypt.hash('editor123', 10);
  const editor = await prisma.user.upsert({
    where: { email: 'editor@politicaargentina.com' },
    update: {},
    create: {
      email: 'editor@politicaargentina.com',
      name: 'Editor Principal',
      password: editorPassword,
      role: 'EDITOR',
      bio: 'Editor jefe de contenidos',
    },
  });

  console.log('✅ Editor user created:', editor.email);

  // Crear categorías
  const categories = [
    { slug: 'politica', name: 'Política', description: 'Noticias políticas de Argentina', color: '#4f46e5', order: 1 },
    { slug: 'economia', name: 'Economía', description: 'Economía y finanzas', color: '#10b981', order: 2 },
    { slug: 'sociedad', name: 'Sociedad', description: 'Temas sociales', color: '#f59e0b', order: 3 },
    { slug: 'internacional', name: 'Internacional', description: 'Noticias internacionales', color: '#3b82f6', order: 4 },
    { slug: 'cultura', name: 'Cultura', description: 'Cultura y espectáculos', color: '#ec4899', order: 5 },
    { slug: 'deportes', name: 'Deportes', description: 'Deportes', color: '#ef4444', order: 6 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log('✅ Categories created');

  // Crear algunos tags comunes
  const tags = [
    'congreso',
    'presidencia',
    'elecciones',
    'economía',
    'inflación',
    'dólar',
    'educación',
    'salud',
    'seguridad',
    'justicia',
  ];

  for (const tagName of tags) {
    await prisma.tag.upsert({
      where: { slug: tagName },
      update: {},
      create: {
        slug: tagName,
        name: tagName.charAt(0).toUpperCase() + tagName.slice(1),
      },
    });
  }

  console.log('✅ Tags created');

  // Crear post de ejemplo
  const politica = await prisma.category.findUnique({ where: { slug: 'politica' } });
  
  if (politica) {
    await prisma.post.upsert({
      where: { slug: 'bienvenida-politica-argentina' },
      update: {},
      create: {
        slug: 'bienvenida-politica-argentina',
        title: 'Bienvenidos a POLITICA ARGENTINA',
        excerpt: 'Un nuevo portal de noticias enfocado en política, economía y sociedad argentina.',
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Bienvenidos a POLITICA ARGENTINA, tu nuevo portal de noticias con última hora, análisis y cobertura de los principales acontecimientos políticos, económicos y sociales de Argentina.',
                },
              ],
            },
          ],
        },
        coverImage: 'https://images.unsplash.com/photo-1585345787552-2c1c2f2a49b1?w=1200&h=630',
        status: 'PUBLISHED',
        publishedAt: new Date(),
        categoryId: politica.id,
        authorId: admin.id,
        featured: true,
      },
    });

    console.log('✅ Example post created');
  }

  console.log('🎉 Seeding completed!');
  console.log('');
  console.log('📝 Login credentials:');
  console.log('  Admin: admin@politicaargentina.com / admin123');
  console.log('  Editor: editor@politicaargentina.com / editor123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

