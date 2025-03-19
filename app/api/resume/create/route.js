import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { Resume } from '@/utils/schema';
import { recordResumeType, recordTechnology } from '@/utils/analytics-helpers';

// Function to detect resume type based on job description and resume content
function detectResumeType(jobDesc, resumeText) {
  const text = (jobDesc + ' ' + resumeText).toLowerCase();
  
  const frontendKeywords = ['frontend', 'front-end', 'react', 'vue', 'angular', 'javascript', 'css', 'html', 'ui'];
  const backendKeywords = ['backend', 'back-end', 'server', 'api', 'database', 'node', 'python', 'java', 'php'];
  const fullstackKeywords = ['fullstack', 'full-stack', 'full stack', 'frontend', 'backend'];
  
  // Count matches for each category
  const frontendScore = frontendKeywords.filter(kw => text.includes(kw)).length;
  const backendScore = backendKeywords.filter(kw => text.includes(kw)).length;
  const fullstackScore = fullstackKeywords.filter(kw => text.includes(kw)).length;
  
  // Determine type based on highest score (with bias toward fullstack if scores are close)
  if (fullstackScore >= 2 || (frontendScore > 0 && backendScore > 0)) {
    return 'Full Stack';
  }
  if (frontendScore > backendScore) {
    return 'Frontend';
  }
  if (backendScore > frontendScore) {
    return 'Backend';
  }
  
  // Default if we can't determine
  return 'General';
}

// Function to extract technologies from resume text
function extractTechnologies(resumeText) {
  // Common technologies to look for
  const technologies = [
    'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Next.js', 'Svelte',
    'Node.js', 'Express', 'Django', 'Flask', 'Spring', 'Laravel', 'Ruby on Rails',
    'Python', 'Java', 'C#', 'PHP', 'Go', 'Rust', 'Swift', 'Kotlin',
    'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Firebase',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform',
    'Git', 'GitHub', 'GitLab', 'CI/CD', 'Jenkins', 'GitHub Actions',
    'HTML', 'CSS', 'Sass', 'Tailwind', 'Bootstrap', 'Material UI'
  ];
  
  const text = resumeText.toLowerCase();
  const foundTechnologies = technologies.filter(tech => 
    text.includes(tech.toLowerCase())
  );
  
  return foundTechnologies;
}

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

    // Record analytics - done after the database operation to not block the response
    try {
      // Detect and record resume type
      const resumeType = detectResumeType(data.job_desc, data.resume_text);
      recordResumeType({ resumeType }).catch(err => console.error('Analytics error (resume type):', err));
      
      // Extract and record technologies
      const technologies = extractTechnologies(data.resume_text);
      technologies.forEach(tech => {
        recordTechnology({ technology: tech }).catch(err => console.error(`Analytics error (tech: ${tech}):`, err));
      });
    } catch (analyticsError) {
      // Log but don't fail the main operation
      console.error('Error recording analytics:', analyticsError);
    }

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