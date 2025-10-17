import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

/**
 * Newsletter Subscription API
 * POST /api/newsletter/subscribe
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, frequency, categories } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // For now, return success (Subscriber model needs to be added to schema)
    const subscriber = {
      id: `sub-${Date.now()}`,
      email,
      name: name || null,
      status: "ACTIVE",
      frequency: frequency || "WEEKLY",
      categories: categories || [],
      subscribedAt: new Date(),
    };

    // TODO: Send confirmation email
    // await sendConfirmationEmail(email, name);

    return NextResponse.json({
      success: true,
      subscriber,
      message: "Successfully subscribed to newsletter!",
    });

  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return NextResponse.json(
      { error: "Subscription failed" },
      { status: 500 }
    );
  }
}

/**
 * Unsubscribe from newsletter
 * DELETE /api/newsletter/subscribe
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (!email || !token) {
      return NextResponse.json(
        { error: "Email and token are required" },
        { status: 400 }
      );
    }

    // Verify unsubscribe token (implement proper token verification)
    // For now, just return success

    return NextResponse.json({
      success: true,
      message: "Successfully unsubscribed from newsletter",
    });

  } catch (error) {
    console.error("Error unsubscribing:", error);
    return NextResponse.json(
      { error: "Unsubscribe failed" },
      { status: 500 }
    );
  }
}
