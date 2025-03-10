import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req) {
  try {
    const { html } = await req.json();

    if (!html) {
      return NextResponse.json(
        { error: 'No HTML content provided' },
        { status: 400 }
      );
    }

    // Launch puppeteer
    const browser = await puppeteer.launch({
      headless: 'new'
    });
    const page = await browser.newPage();

    // Set content and wait for network idle
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generate PDF
    const buffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      printBackground: true
    });

    // Close browser
    await browser.close();

    // Create response with PDF buffer
    const response = new NextResponse(buffer);
    response.headers.set('Content-Type', 'application/pdf');
    response.headers.set('Content-Disposition', 'attachment; filename=resume.pdf');

    return response;
  } catch (error) {
    console.error('Error in PDF export route:', error);
    return NextResponse.json(
      { error: 'Failed to export PDF' },
      { status: 500 }
    );
  }
} 