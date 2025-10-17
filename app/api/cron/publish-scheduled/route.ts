import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

/**
 * Cron Job: Publish Scheduled Posts
 *
 * This endpoint should be called periodically (e.g., every 5 minutes) by a cron service
 * like Vercel Cron, to automatically publish posts that are scheduled.
 *
 * Usage with Vercel Cron:
 * Add to vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/publish-scheduled",
 *     "schedule": "every 5 minutes"
 *   }]
 * }
 */

export async function GET(request: Request) {
  try {
    // Verify authorization (optional but recommended)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const now = new Date();

    // Find all scheduled posts where scheduledFor <= now
    const scheduledPosts = await db.post.findMany({
      where: {
        status: 'SCHEDULED',
        scheduledFor: {
          lte: now,
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        scheduledFor: true,
      },
    });

    if (scheduledPosts.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No posts to publish',
        published: 0,
      });
    }

    // Update all scheduled posts to PUBLISHED
    const updateResults = await Promise.all(
      scheduledPosts.map((post) =>
        db.post.update({
          where: { id: post.id },
          data: {
            status: 'PUBLISHED',
            publishedAt: now,
          },
        })
      )
    );

    // Log the job
    await db.job.create({
      data: {
        type: 'publish_scheduled',
        payload: {
          publishedCount: scheduledPosts.length,
          posts: scheduledPosts.map((p) => ({ id: p.id, title: p.title, slug: p.slug })),
        },
        status: 'completed',
      },
    });

    return NextResponse.json({
      success: true,
      message: `Published ${scheduledPosts.length} post(s)`,
      published: scheduledPosts.length,
      posts: scheduledPosts.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        scheduledFor: p.scheduledFor,
      })),
    });

  } catch (error) {
    console.error('Error in publish-scheduled cron:', error);

    // Log failed job
    try {
      await db.job.create({
        data: {
          type: 'publish_scheduled',
          payload: {},
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }

    return NextResponse.json(
      {
        error: 'Failed to publish scheduled posts',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
