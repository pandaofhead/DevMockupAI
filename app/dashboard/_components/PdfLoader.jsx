import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

// Function to extract "work experience" and "projects" from PDF content
const extractSections = (pdfText) => {
  const sections = {
    workExperience: [],
    projects: [],
  };

  // Regular expressions to match sections
  const workExpRegex =
    /work experience|employment history|professional experience/i;
  const projectsRegex = /projects|project experience/i;

  // Split the content by lines
  const lines = pdfText.split("\n");

  let currentSection = null;

  lines.forEach((line) => {
    if (workExpRegex.test(line)) {
      currentSection = "workExperience";
    } else if (projectsRegex.test(line)) {
      currentSection = "projects";
    }

    if (currentSection && line.trim()) {
      sections[currentSection].push(line.trim());
    }
  });

  return sections;
};

// Function to load PDF and extract the relevant sections
const pdfLoader = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loader = new PDFLoader(arrayBuffer);
    const pdfs = await loader.load();
    const pdfText = pdfs[0].text; // Assuming single PDF loaded

    const extractedSections = extractSections(pdfText);
    return extractedSections;
  } catch (error) {
    console.error("Error loading or parsing PDF:", error);
    throw error;
  }
};

// Export the function
export { pdfLoader };
