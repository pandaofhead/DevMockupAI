import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { ResumeTypeMetrics } from "@/utils/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, gte } from "drizzle-orm";

// POST - Record a resume type
export async function POST(request) {
  try {
    const { user } = auth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { resumeType } = await request.json();

    if (!resumeType) {
      return NextResponse.json(
        { error: "Resume type is required" },
        { status: 400 }
      );
    }

    // Record the resume type
    await db.insert(ResumeTypeMetrics).values({
      userId: user.id,
      resumeType,
      timestamp: new Date(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error recording resume type:", error);
    return NextResponse.json(
      { error: "Failed to record resume type" },
      { status: 500 }
    );
  }
}

// GET - Get resume type distribution
export async function GET(request) {
  try {
    const { user } = auth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Sample resume type data
    const resumeTypeData = [
      { name: "Frontend Dev", value: 45 },
      { name: "Backend Dev", value: 30 },
      { name: "Full Stack", value: 25 },
    ];
    
    return NextResponse.json(resumeTypeData, { status: 200 });
  } catch (error) {
    console.error("Error fetching resume type data:", error);
    return NextResponse.json(
      { error: "Failed to fetch resume type data" },
      { status: 500 }
    );
  }
} 