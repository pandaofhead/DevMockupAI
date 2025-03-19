/**
 * HTML template generator for resume exports
 * Provides a configurable HTML template for both PDF and DOC formats
 */

// Shared HTML generation function for both PDF and DOC
export function generateResumeHTML(resumeData, options) {
  const {
    pageSize,
    margins,
    fontFamily,
    fontSize,
    lineHeight,
    headerStyle,
    sectionStyle,
    itemStyle,
    wordDocument = false,
    includeScript = false,
  } = options;

  // Word document specific XML
  const wordXml = wordDocument
    ? `
    <!--[if gte mso 9]>
    <xml>
      <w:WordDocument>
        <w:View>Print</w:View>
        <w:Zoom>100</w:Zoom>
        <w:DoNotOptimizeForBrowser/>
      </w:WordDocument>
    </xml>
    <![endif]-->
    `
    : "";

  // Word document specific xmlns attributes
  const wordXmlns = wordDocument
    ? `xmlns:o="urn:schemas-microsoft-com:office:office" 
       xmlns:w="urn:schemas-microsoft-com:office:word" 
       xmlns="http://www.w3.org/TR/REC-html40"`
    : 'lang="en"';

  // Generate HTML
  return `
    <!DOCTYPE html>
    <html ${wordXmlns}>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${resumeData.firstName || ""} ${resumeData.lastName || ""} - Resume</title>
      ${wordXml}
      <style>
        @page {
          size: ${pageSize};
          margin: ${margins};
        }
        body {
          font-family: ${fontFamily};
          line-height: ${lineHeight};
          font-size: ${fontSize};
          color: #333;
          margin: 10px;
          padding: 0;
          background-color: white;
        }
        .resume-container {
          max-width: 210mm;
          margin: 0 auto;
          padding: 20px;
          background: white;
        }
        .header {
          ${headerStyle}
        }
        .header h1 {
          font-size: 24px;
          margin-bottom: 5px;
        }
        .header p {
          margin: 5px 0;
        }
        .section {
          ${sectionStyle}
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          border-bottom: 2px solid #ddd;
          padding-bottom: 5px;
          margin-bottom: 10px;
        }
        .item {
          ${itemStyle}
        }
        .item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        .item-title {
          font-weight: bold;
        }
        .item-subtitle {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        .item-location {
          color: #666;
          margin-bottom: 5px;
        }
        .item-date {
          color: #666;
        }
        .item-description {
          white-space: pre-line;
        }
        h1 {
          font-size: 24px;
          ${wordDocument ? "text-align: center; margin-bottom: 0.25in;" : ""}
        }
        h2 {
          font-size: 18px;
          ${wordDocument ? "border-bottom: 1pt solid #999999; margin-top: 0.5in; margin-bottom: 0.25in;" : ""}
        }
        h3 {
          font-size: 14px;
          ${wordDocument ? "margin-bottom: 0.1in;" : ""}
        }
        p {
          ${wordDocument ? "margin-bottom: 0.1in;" : ""}
        }
        .contact-info {
          ${wordDocument ? "text-align: center; margin-bottom: 0.25in;" : ""}
        }
        .location {
          ${wordDocument ? "color: #666666; margin-bottom: 0.1in;" : ""}
        }
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      <div class="resume-container">
        ${generateHeader(resumeData, wordDocument)}
        ${generateSummarySection(resumeData)}
        ${generateEducationSection(resumeData)}
        ${generateExperienceSection(resumeData)}
        ${generateProjectsSection(resumeData)}
        ${generateSkillsSection(resumeData)}
      </div>
      ${
        includeScript
          ? `
      <script>
        // Auto-print when loaded
        window.onload = function() {
          window.print();
        };
      </script>
      `
          : ""
      }
    </body>
    </html>
  `;
}

// Generate header section
function generateHeader(resumeData, wordDocument) {
  return `
    <!-- Header -->
    <div class="header">
      <h1>${resumeData.firstName || ""} ${resumeData.lastName || ""}</h1>
      ${wordDocument ? 
        `<div class="contact-info">
          ${resumeData.email || ""}
          ${resumeData.phone ? ` • ${resumeData.phone}` : ""}
          ${resumeData.location ? ` • ${resumeData.location}` : ""}
          ${resumeData.linkedin ? ` • ${resumeData.linkedin}` : ""}
        </div>
        ${resumeData.jobTitle ? `<p>${resumeData.jobTitle}</p>` : ""}` 
      : 
        `<p>
          ${resumeData.email ? `${resumeData.email}` : ""}
          ${resumeData.phone ? ` | ${resumeData.phone}` : ""}
          ${resumeData.location ? ` | ${resumeData.location}` : ""}
          ${resumeData.linkedin ? ` | ${resumeData.linkedin}` : ""}
        </p>`
      }
    </div>
  `;
}

// Generate summary section
function generateSummarySection(resumeData) {
  if (!resumeData.summary) return '';
  
  return `
    <!-- Summary -->
    <div class="section">
      <div class="section-title">SUMMARY</div>
      <p>${resumeData.summary}</p>
    </div>
  `;
}

// Generate education section
function generateEducationSection(resumeData) {
  if (!resumeData.education || resumeData.education.length === 0) return '';
  
  return `
    <!-- Education -->
    <div class="section">
      <div class="section-title">EDUCATION</div>
      ${resumeData.education
        .map(
          (edu) => `
        <div class="item">
          <div class="item-header">
            <span class="item-title">${edu.schoolName || ""}</span>
            <span class="item-date">${edu.startDate || ""} - ${
            edu.endDate || ""
          }</span>
          </div>
          <div class="item-subtitle">${edu.degree || ""}${
            edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""
          }</div>
          ${
            edu.location
              ? `<div class="item-location">${edu.location}</div>`
              : ""
          }
          ${edu.gpa ? `<div>GPA: ${edu.gpa}</div>` : ""}
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

// Generate experience section
function generateExperienceSection(resumeData) {
  if (!resumeData.experience || resumeData.experience.length === 0) return '';
  
  return `
    <!-- Experience -->
    <div class="section">
      <div class="section-title">EXPERIENCE</div>
      ${resumeData.experience
        .map(
          (exp) => `
        <div class="item">
          <div class="item-header">
            <span class="item-title">${exp.companyName || ""}</span>
            <span class="item-date">${exp.startDate || ""} - ${
            exp.isCurrentlyWorking ? "Present" : exp.endDate || ""
          }</span>
          </div>
          <div class="item-subtitle">
            <span class="item-title">${exp.jobTitle || ""}</span>
            <span class="item-location">${
              exp.location ? ` ${exp.location}` : ""
            }</span>
          </div>
          <div class="item-description">${exp.workSummary || ""}</div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

// Generate projects section
function generateProjectsSection(resumeData) {
  if (!resumeData.projects || resumeData.projects.length === 0) return '';
  
  return `
    <!-- Projects -->
    <div class="section">
      <div class="section-title">PROJECTS</div>
      ${resumeData.projects
        .map(
          (project) => `
        <div class="item">
          <div class="item-header">
            <span class="item-title">${project.projectName || ""}</span>
            <span class="item-date">${project.startDate || ""} - ${
            project.currentlyWorking ? "Present" : project.endDate || ""
          }</span>
          </div>
          ${
            project.projectUrl
              ? `<div class="item-subtitle"><a href="${project.projectUrl}">${project.projectUrl}</a></div>`
              : ""
          }
          <div class="item-description">${project.description || ""}</div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

// Generate skills section
function generateSkillsSection(resumeData) {
  // If no skills data, return empty string
  if ((!resumeData.skillCategories || resumeData.skillCategories.length === 0) && 
      (!resumeData.skills || resumeData.skills.length === 0)) {
    return '';
  }
  
  // If we have skill categories
  if (resumeData.skillCategories && resumeData.skillCategories.length > 0) {
    return `
      <!-- Skills with Categories -->
      <div class="section">
        <div class="section-title">SKILLS</div>
        ${resumeData.skillCategories
          .map(
            (category) => `
          ${
            category.name && category.list && category.list.length > 0
              ? `<p><strong>${category.name}:</strong> ${category.list.join(
                  ", "
                )}</p>`
              : ""
          }
        `
          )
          .join("")}
      </div>
    `;
  }
  
  // Fallback to flat skills list
  return `
    <!-- Skills -->
    <div class="section">
      <div class="section-title">SKILLS</div>
      <p>${resumeData.skills.join(", ")}</p>
    </div>
  `;
} 