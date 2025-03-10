export async function parsePDF(file) {
  try {
    // Convert file to text using text decoder
    const arrayBuffer = await file.arrayBuffer();
    const decoder = new TextDecoder('utf-8');
    const text = decoder.decode(arrayBuffer);
    
    // Initialize sections
    const sections = {
      contact: '',
      summary: '',
      experience: '',
      education: '',
      skills: '',
      projects: '',
      other: ''
    };

    // Simple section detection based on common headers
    const lines = text.split(/[\r\n]+/).filter(line => line.trim());
    let currentSection = 'other';
    let sectionStartKeywords = {
      contact: ['contact', 'email', 'phone', 'address'],
      summary: ['summary', 'objective', 'profile'],
      experience: ['experience', 'work history', 'employment'],
      education: ['education', 'academic', 'qualification'],
      skills: ['skills', 'technologies', 'technical skills'],
      projects: ['projects', 'portfolio']
    };

    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      
      // Check each section's keywords
      for (const [section, keywords] of Object.entries(sectionStartKeywords)) {
        if (keywords.some(keyword => lowerLine.includes(keyword))) {
          currentSection = section;
          break;
        }
      }

      // Add line to current section
      sections[currentSection] += line + '\n';
    }

    // Clean up sections and remove empty ones
    Object.keys(sections).forEach(key => {
      sections[key] = sections[key].trim();
      if (!sections[key]) {
        delete sections[key];
      }
    });

    // If no sections were detected, put everything in 'other'
    if (Object.values(sections).every(section => !section)) {
      sections.other = text.trim();
    }

    return {
      rawText: text,
      sections,
      metadata: {
        size: arrayBuffer.byteLength,
        type: file.type
      }
    };
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF file');
  }
} 