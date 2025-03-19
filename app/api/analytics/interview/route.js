import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { InterviewMetrics } from "@/utils/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, gte } from "drizzle-orm";

// POST - Record interview performance
export async function POST(request) {
  try {
    const { user } = auth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { interviewId, jobType, technicalScore, behavioralScore, success } = await request.json();

    if (!interviewId || !jobType || technicalScore === undefined || behavioralScore === undefined || success === undefined) {
      return NextResponse.json(
        { error: "All interview metrics are required" },
        { status: 400 }
      );
    }

    // Record the interview performance
    await db.insert(InterviewMetrics).values({
      userId: user.id,
      interviewId,
      jobType,
      technicalScore,
      behavioralScore,
      success,
      timestamp: new Date(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error recording interview performance:", error);
    return NextResponse.json(
      { error: "Failed to record interview performance" },
      { status: 500 }
    );
  }
}

// GET - Get interview analytics based on dataType parameter
export async function GET(request) {
  try {
    const { user } = auth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const dataType = url.searchParams.get("dataType") || "performance";  // performance or jobTypeSuccess

    // Performance trends over time
    if (dataType === "performance") {
      const performanceData = [
        { month: "Jan", technical: 65, behavioral: 70 },
        { month: "Feb", technical: 68, behavioral: 72 },
        { month: "Mar", technical: 75, behavioral: 78 },
        { month: "Apr", technical: 80, behavioral: 76 },
        { month: "May", technical: 78, behavioral: 82 },
        { month: "Jun", technical: 85, behavioral: 85 },
      ];

      return NextResponse.json(performanceData, { status: 200 });
    } 
    // Success rate by job type
    else if (dataType === "jobTypeSuccess") {
      const jobTypeData = [
        { name: "Frontend", success: 75, failed: 25 },
        { name: "Backend", success: 65, failed: 35 },
        { name: "Full Stack", success: 70, failed: 30 },
        { name: "DevOps", success: 60, failed: 40 },
        { name: "ML Engineer", success: 55, failed: 45 },
      ];

      return NextResponse.json(jobTypeData, { status: 200 });
    }
    else {
      return NextResponse.json(
        { error: "Invalid dataType specified" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error fetching interview data:", error);
    return NextResponse.json(
      { error: "Failed to fetch interview data" },
      { status: 500 }
    );
  }
} 