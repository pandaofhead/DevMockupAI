import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { TechStackMetrics } from "@/utils/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, desc } from "drizzle-orm";

// POST - Record or update a technology count
export async function POST(request) {
  try {
    const { user } = auth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { technology } = await request.json();

    if (!technology) {
      return NextResponse.json(
        { error: "Technology name is required" },
        { status: 400 }
      );
    }

    // Check if this technology already exists for the user
    const existingTech = await db
      .select()
      .from(TechStackMetrics)
      .where(
        eq(TechStackMetrics.userId, user.id) && 
        eq(TechStackMetrics.technology, technology)
      )
      .limit(1);

    if (existingTech.length > 0) {
      // Update existing count
      await db
        .update(TechStackMetrics)
        .set({
          count: existingTech[0].count + 1,
          lastUpdated: new Date(),
        })
        .where(eq(TechStackMetrics.id, existingTech[0].id));
    } else {
      // Create new entry
      await db.insert(TechStackMetrics).values({
        userId: user.id,
        technology,
        count: 1,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error recording tech stack:", error);
    return NextResponse.json(
      { error: "Failed to record tech stack" },
      { status: 500 }
    );
  }
}

// GET - Get tech stack frequencies for a user
export async function GET(request) {
  try {
    const { user } = auth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const timeFrame = url.searchParams.get("timeFrame") || "all";
    const format = url.searchParams.get("format") || "list";
    
    // If format is categories, return categorical data
    if (format === 'categories') {
      // Sample categories data - replace with actual DB query when available
      const categoryData = [
        { category: "frontend", percentage: 65 },
        { category: "backend", percentage: 45 },
        { category: "database", percentage: 30 },
        { category: "devops", percentage: 25 },
      ];
      
      return NextResponse.json(categoryData, { status: 200 });
    }
    
    // Default format - return tech stack list
    const techStackData = [
      { name: "React", count: 38 },
      { name: "Node.js", count: 30 },
      { name: "TypeScript", count: 28 },
      { name: "Next.js", count: 25 },
      { name: "Python", count: 20 },
      { name: "AWS", count: 15 },
    ];
    
    return NextResponse.json(techStackData, { status: 200 });
  } catch (error) {
    console.error("Error fetching tech stack data:", error);
    return NextResponse.json(
      { error: "Failed to fetch tech stack data" },
      { status: 500 }
    );
  }
} 