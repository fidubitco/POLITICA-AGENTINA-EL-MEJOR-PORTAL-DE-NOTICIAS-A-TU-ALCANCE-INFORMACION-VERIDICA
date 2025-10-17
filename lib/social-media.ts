import { db } from '@/lib/db';

export async function postToSocial(postId: string) {
  try {
    const post = await db.post.findUnique({
      where: { id: postId },
      include: {
        category: true,
        author: true,
      },
    });

    if (!post) throw new Error('Post not found');

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://politica-argentina.vercel.app';
    const postUrl = `${siteUrl}/noticia/${post.slug}`;

    // Prepare social media text
    const socialText = `${post.title}\\n\\n${post.excerpt?.substring(0, 200)}...\\n\\n${postUrl}\\n\\n#PolíticaArgentina #Noticias`;

    // Record social post
    const socialPost = await db.socialPost.create({
      data: {
        postId: post.id,
        platform: 'TWITTER',
        content: socialText,
        scheduledFor: new Date(),
        status: 'PENDING',
      },
    });

    // In production, integrate with Twitter API, Facebook Graph API, etc.
    // For now, just log and mark as published
    console.log('Social post created:', {
      id: socialPost.id,
      platform: 'TWITTER',
      content: socialText.substring(0, 100) + '...',
    });

    // Simulate posting
    await db.socialPost.update({
      where: { id: socialPost.id },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
    });

    return { success: true, socialPost };
  } catch (error) {
    console.error('Error posting to social media:', error);
    return { success: false, error };
  }
}

export async function getSocialPosts(postId?: string) {
  try {
    const where = postId ? { postId } : {};

    const posts = await db.socialPost.findMany({
      where,
      include: {
        post: {
          select: {
            title: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });

    return posts;
  } catch (error) {
    console.error('Error fetching social posts:', error);
    return [];
  }
}

export async function getShareCount(postId: string) {
  try {
    // In production, fetch real share counts from social media APIs
    // For now, return simulated data
    return {
      facebook: Math.floor(Math.random() * 1000),
      twitter: Math.floor(Math.random() * 500),
      linkedin: Math.floor(Math.random() * 200),
      whatsapp: Math.floor(Math.random() * 2000),
      total: Math.floor(Math.random() * 3700),
    };
  } catch (error) {
    console.error('Error fetching share count:', error);
    return {
      facebook: 0,
      twitter: 0,
      linkedin: 0,
      whatsapp: 0,
      total: 0,
    };
  }
}
