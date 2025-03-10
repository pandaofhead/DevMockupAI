import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { Resume } from '@/utils/schema';
import { eq } from 'drizzle-orm';

export async function GET(req, { params }) {
  try {
    const { resumeId } = params;

    const resume = await db.query.Resume.findFirst({
      where: eq(Resume.resumeId, resumeId),
    });

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      resume
    });
  } catch (error) {
    console.error('Error fetching resume:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resume' },
      { status: 500 }
    );
  }
} 