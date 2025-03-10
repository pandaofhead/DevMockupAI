import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { Resume } from '@/utils/schema';

export async function POST(req) {
  try {
    const data = await req.json();
    console.log('Received data:', data);  // Debug log
    
    // Validate required fields
    const requiredFields = ['resume_id', 'resume_title', 'job_desc', 'resume_text', 'resume_sections', 'created_by'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields);  // Debug log
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Clean and encode the resume text to handle PDF content
    let cleanResumeText = data.resume_text;
    if (cleanResumeText.startsWith('%PDF')) {
      // If it's PDF content, we should only store the extracted text
      console.log('PDF content detected, using parsed text only');
      cleanResumeText = 'PDF content removed - use parsed text from resume_sections';
    }

    // Ensure all values are strings and properly encoded
    const sanitizedData = {
      resumeId: String(data.resume_id),
      resumeTitle: String(data.resume_title),
      jobDesc: String(data.job_desc),
      resumeText: cleanResumeText,
      resumeSections: typeof data.resume_sections === 'string' 
        ? data.resume_sections 
        : JSON.stringify(data.resume_sections),
      createdBy: String(data.created_by),
      createdAt: new Date()
    };

    console.log('Sanitized data:', sanitizedData);  // Debug log

    // Insert into database
    const result = await db
      .insert(Resume)
      .values(sanitizedData)
      .returning();

    console.log('Database result:', result);  // Debug log

    return NextResponse.json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Detailed error creating resume:', {
      message: error.message,
      code: error.code,
      detail: error.detail,
      data: error.data
    });
    
    return NextResponse.json(
      { error: error.message || 'Failed to create resume' },
      { status: 500 }
    );
  }
} 