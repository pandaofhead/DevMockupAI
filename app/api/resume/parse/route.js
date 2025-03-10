import { NextResponse } from 'next/server';
import { parsePDF } from '@/utils/pdf-parser';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!file.type.includes('pdf')) {
      return NextResponse.json(
        { error: 'File must be a PDF' },
        { status: 400 }
      );
    }

    const parsedData = await parsePDF(file);

    return NextResponse.json({
      success: true,
      data: parsedData
    });
  } catch (error) {
    console.error('Error in PDF parse route:', error);
    return NextResponse.json(
      { error: 'Failed to parse PDF' },
      { status: 500 }
    );
  }
} 