import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { AiSuggestionMetrics } from "@/utils/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, gte, desc } from "drizzle-orm";

// POST - Record an AI suggestion interaction
export async function POST(request) {
  try {
    const { user } = auth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { category, action, suggestionId } = await request.json();

    if (!category || !action) {
      return NextResponse.json(
        { error: "Category and action are required" },
        { status: 400 }
      );
    }

    // Record the interaction
    await db.insert(AiSuggestionMetrics).values({
      userId: user.id,
      category,
      action,
      suggestionId: suggestionId || `${Date.now()}`,
      timestamp: new Date(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error recording AI suggestion:", error);
    return NextResponse.json(
      { error: "Failed to record AI suggestion" },
      { status: 500 }
    );
  }
}

// GET - Get AI suggestion metrics
export async function GET(request) {
  try {
    const { user } = auth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Sample AI suggestion data
    const aiSuggestionData = [
      { name: "Resume Edits", accepted: 85, rejected: 15 },
      { name: "Interview Tips", accepted: 78, rejected: 22 },
      { name: "Project Suggestions", accepted: 65, rejected: 35 },
    ];
    
    return NextResponse.json(aiSuggestionData, { status: 200 });
  } catch (error) {
    console.error("Error fetching AI suggestions data:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI suggestion data" },
      { status: 500 }
    );
  }
} 