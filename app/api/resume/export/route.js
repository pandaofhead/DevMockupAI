import { NextResponse } from "next/server";
import { processResumeData } from "./utils/dataProcessors";
import { generateHTMLAsPDF, generateDOC, generateSimpleDOC } from "./generators";

export async function POST(req) {
  try {
    const { resumeId, format, resumeData } = await req.json();

    if (!resumeData) {
      return NextResponse.json(
        { error: "No resume data provided" },
        { status: 400 }
      );
    }

    // Process and normalize the resume data
    const processedData = processResumeData(resumeData);

    // Generate file based on format
    if (format === "PDF") {
      return generateHTMLAsPDF(processedData);
    } else if (format === "DOC") {
      try {
        return await generateDOC(processedData);
      } catch (error) {
        console.error("Error with primary DOC generation method:", error);
        return generateSimpleDOC(processedData);
      }
    } else {
      return NextResponse.json(
        { error: "Invalid format specified" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(`Error in resume export route:`, error);
    return NextResponse.json(
      { error: `Failed to export resume: ${error.message}` },
      { status: 500 }
    );
  }
} 