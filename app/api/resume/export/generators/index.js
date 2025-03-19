/**
 * Resume export generators
 * Provides functions to generate resumes in different formats
 */
import { NextResponse } from "next/server";
import * as docx from "docx";
import { generateResumeHTML } from "../utils/htmlGenerator";

// Generate HTML for PDF export
export function generateHTMLAsPDF(resumeData) {
  try {
    const html = generateResumeHTML(resumeData, {
      pageSize: "A4",
      margins: "0",
      fontFamily: "'Arial', sans-serif",
      fontSize: "1.0",
      lineHeight: "1.0",
      headerStyle: "text-align: center; margin-bottom: 20px;",
      sectionStyle: "margin-bottom: 20px;",
      itemStyle: "margin-bottom: 15px;",
      includeScript: true,
    });

    // Create response with HTML content
    const response = new NextResponse(html);
    response.headers.set("Content-Type", "text/html");
    response.headers.set("Content-Disposition", "inline; filename=resume.html");

    return response;
  } catch (error) {
    console.error("Error generating HTML as PDF:", error);
    throw error;
  }
}

// Generate DOC file using docx library
export async function generateDOC(resumeData) {
  try {
    const {
      Document,
      Paragraph,
      TextRun,
      HeadingLevel,
      AlignmentType,
      ThematicBreak,
      Packer,
    } = docx;

    // Create document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Header with name and contact info
            new Paragraph({
              text: `${resumeData.firstName || ""} ${
                resumeData.lastName || ""
              }`,
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun(`${resumeData.email || ""}`),
                resumeData.phone
                  ? new TextRun(` | ${resumeData.phone}`)
                  : new TextRun(""),
                resumeData.location
                  ? new TextRun(` | ${resumeData.location}`)
                  : new TextRun(""),
                resumeData.linkedin
                  ? new TextRun(` | ${resumeData.linkedin}`)
                  : new TextRun(""),
              ],
            }),

            // Summary section
            ...(resumeData.summary
              ? [
                  new Paragraph({
                    text: "SUMMARY",
                    heading: HeadingLevel.HEADING_2,
                  }),
                  new Paragraph(resumeData.summary),
                  new Paragraph(""),
                  new ThematicBreak(),
                ]
              : []),

            // Education section
            ...(resumeData.education.length > 0
              ? [
                  new Paragraph({
                    text: "EDUCATION",
                    heading: HeadingLevel.HEADING_2,
                  }),
                  ...generateEducationSection(resumeData.education),
                  new Paragraph(""),
                  new ThematicBreak(),
                ]
              : []),

            // Experience section
            ...(resumeData.experience.length > 0
              ? [
                  new Paragraph({
                    text: "EXPERIENCE",
                    heading: HeadingLevel.HEADING_2,
                  }),
                  ...generateExperienceSection(resumeData.experience),
                  new Paragraph(""),
                  new ThematicBreak(),
                ]
              : []),

            // Projects section
            ...(resumeData.projects.length > 0
              ? [
                  new Paragraph({
                    text: "PROJECTS",
                    heading: HeadingLevel.HEADING_2,
                  }),
                  ...generateProjectsSection(resumeData.projects),
                  new Paragraph(""),
                  new ThematicBreak(),
                ]
              : []),

            // Skills section
            ...(resumeData.skills.length > 0 || resumeData.skillCategories.length > 0
              ? [
                  new Paragraph({
                    text: "SKILLS",
                    heading: HeadingLevel.HEADING_2,
                  }),
                  ...generateSkillsSection(resumeData.skills, resumeData.skillCategories),
                ]
              : []),
          ],
        },
      ],
    });

    // Generate buffer
    const buffer = await Packer.toBuffer(doc);

    // Create response with DOC file
    const response = new NextResponse(buffer);
    response.headers.set(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    response.headers.set(
      "Content-Disposition",
      "attachment; filename=resume.docx"
    );

    return response;
  } catch (error) {
    console.error("Error in DOC generation:", error);
    // Fall back to simpler DOC generation
    return generateSimpleDOC(resumeData);
  }
}

// Simpler DOC generation method as fallback (HTML with DOC mime type)
export function generateSimpleDOC(resumeData) {
  try {
    const html = generateResumeHTML(resumeData, {
      pageSize: "8.5in 11in",
      margins: "1in",
      fontFamily: "'Calibri', sans-serif",
      fontSize: "11pt",
      lineHeight: "1.5",
      headerStyle: "text-align: center; margin-bottom: 0.5in;",
      sectionStyle: "margin-bottom: 0.5in;",
      itemStyle: "margin-bottom: 0.25in;",
      wordDocument: true,
      includeScript: false,
    });

    // Create response with HTML as DOC
    const response = new NextResponse(html);
    response.headers.set("Content-Type", "application/msword");
    response.headers.set(
      "Content-Disposition",
      "attachment; filename=resume.doc"
    );

    return response;
  } catch (error) {
    console.error("Error in fallback DOC generation:", error);
    throw error;
  }
}

// Helper function to generate education section
function generateEducationSection(education) {
  const paragraphs = [];

  education.forEach((edu) => {
    paragraphs.push(
      new Paragraph({
        text: edu.schoolName || "",
        heading: HeadingLevel.HEADING_3,
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `${edu.degree || ""}${
              edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""
            }`,
            italics: true,
          }),
          new TextRun(` | ${edu.startDate || ""} - ${edu.endDate || ""}`),
        ],
      })
    );

    if (edu.location) {
      paragraphs.push(
        new Paragraph({
          text: edu.location,
          style: "location",
        })
      );
    }

    if (edu.gpa) {
      paragraphs.push(new Paragraph(`GPA: ${edu.gpa}`));
    }

    paragraphs.push(new Paragraph(""));
  });

  return paragraphs;
}

// Helper function to generate experience section
function generateExperienceSection(experience) {
  const paragraphs = [];

  experience.forEach((exp) => {
    paragraphs.push(
      new Paragraph({
        text: exp.companyName || "",
        heading: HeadingLevel.HEADING_3,
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `${exp.jobTitle || ""}${
              exp.location ? ` • ${exp.location}` : ""
            }`,
            italics: true,
          }),
          new TextRun(
            ` | ${exp.startDate || ""} - ${
              exp.isCurrentlyWorking ? "Present" : exp.endDate || ""
            }`
          ),
        ],
      })
    );

    if (exp.workSummary) {
      paragraphs.push(new Paragraph(exp.workSummary));
    }

    paragraphs.push(new Paragraph(""));
  });

  return paragraphs;
}

// Helper function to generate projects section
function generateProjectsSection(projects) {
  const paragraphs = [];

  projects.forEach((project) => {
    paragraphs.push(
      new Paragraph({
        text: project.projectName || "",
        heading: HeadingLevel.HEADING_3,
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `${project.startDate || ""} - ${
              project.currentlyWorking ? "Present" : project.endDate || ""
            }`,
            italics: true,
          }),
        ],
      })
    );

    if (project.projectUrl) {
      paragraphs.push(new Paragraph(project.projectUrl));
    }

    if (project.description) {
      paragraphs.push(new Paragraph(project.description));
    }

    paragraphs.push(new Paragraph(""));
  });

  return paragraphs;
}

// Helper function to generate skills section
function generateSkillsSection(skills, categories = []) {
  const paragraphs = [];

  if (categories && categories.length > 0) {
    categories.forEach((category) => {
      if (category.name && category.list && category.list.length > 0) {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${category.name}: `,
                bold: true,
              }),
              new TextRun(category.list.join(", ")),
            ],
          })
        );
      }
    });
  } else if (skills && skills.length > 0) {
    paragraphs.push(new Paragraph(skills.join(", ")));
  }

  return paragraphs;
} 