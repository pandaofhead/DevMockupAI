/**
 * Detects the resume type based on content (Frontend, Backend, Full Stack)
 * @param {Object} resumeData - The resume data 
 * @returns {string} - The detected resume type
 */
export function detectResumeType(resumeData) {
    try {
      // Default to "general" if we can't determine
      let resumeType = "general";
      
      // Combine all text content for analysis
      const allContent = [
        resumeData.jobTitle || "",
        ...(resumeData.experience || []).map(exp => 
          `${exp.title} ${exp.companyName} ${exp.workSummary || ""}`
        ),
        ...(resumeData.projects || []).map(proj => 
          `${proj.title} ${proj.companyName} ${proj.workSummary || ""}`
        ),
        ...(resumeData.skills || []).flatMap(skill => 
          skill.list ? skill.list.split(',') : []
        )
      ].join(' ').toLowerCase();
      
      // Define keywords for each category
      const frontendKeywords = ['frontend', 'front-end', 'react', 'angular', 'vue', 'javascript', 'typescript', 'css', 'html', 'ui', 'ux'];
      const backendKeywords = ['backend', 'back-end', 'java', 'python', 'php', 'golang', 'ruby', 'node.js', 'express', 'database', 'sql', 'nosql', 'django'];
      
      // Count keyword matches
      const frontendCount = frontendKeywords.filter(kw => allContent.includes(kw)).length;
      const backendCount = backendKeywords.filter(kw => allContent.includes(kw)).length;
      
      // Determine type based on counts
      if (frontendCount > 0 && backendCount > 0) {
        resumeType = "fullstack";
      } else if (frontendCount > backendCount) {
        resumeType = "frontend";
      } else if (backendCount > frontendCount) {
        resumeType = "backend";
      }
      
      return resumeType;
    } catch (error) {
      console.error('Error detecting resume type:', error);
      return "general";
    }
  }
  
  /**
   * Extracts technologies mentioned in the resume
   * @param {Object} resumeData - The resume data
   * @returns {string[]} - Array of technology names
   */
  export function extractTechnologies(resumeData) {
    try {
      // Common technologies to look for
      const techList = [
        'javascript', 'typescript', 'react', 'next.js', 'vue', 'angular', 
        'node.js', 'express', 'python', 'django', 'flask', 'java', 'spring',
        'c#', '.net', 'php', 'laravel', 'ruby', 'rails', 'golang', 'rust',
        'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'sql', 'mongodb',
        'postgresql', 'mysql', 'redis', 'graphql', 'rest'
      ];
      
      // Combine all text content for analysis
      const allContent = [
        resumeData.jobTitle || "",
        ...(resumeData.experience || []).map(exp => 
          `${exp.title} ${exp.companyName} ${exp.workSummary || ""}`
        ),
        ...(resumeData.projects || []).map(proj => 
          `${proj.title} ${proj.companyName} ${proj.workSummary || ""}`
        ),
        ...(resumeData.skills || []).flatMap(skill => 
          skill.list ? skill.list.split(',').map(s => s.trim()) : []
        )
      ].join(' ').toLowerCase();
      
      // Find matches
      return techList.filter(tech => 
        allContent.includes(tech.toLowerCase())
      );
    } catch (error) {
      console.error('Error extracting technologies:', error);
      return [];
    }
  }
  
  /**
   * Records resume type for analytics
   * @param {string} resumeId - The resume ID
   * @param {string} resumeType - The type of resume
   * @returns {Promise<void>}
   */
  export async function recordResumeType(resumeId, resumeType) {
    try {
      // This is a stub that would normally call an API
      console.log(`Recording resume type: ${resumeType} for resume: ${resumeId}`);
      // In a real implementation, this would make an API call
    } catch (error) {
      console.error('Error recording resume type:', error);
    }
  }
  
  /**
   * Records technology usage for analytics
   * @param {string} technology - The technology name
   * @returns {Promise<void>}
   */
  export async function recordTechStack(technology) {
    try {
      // This is a stub that would normally call an API
      console.log(`Recording technology usage: ${technology}`);
      // In a real implementation, this would make an API call
    } catch (error) {
      console.error('Error recording technology usage:', error);
    }
  }

  /**
   * Records AI suggestion for analytics
   * @param {Object} params - Parameters for recording suggestion
   * @returns {Promise<void>}
   */
  export async function recordAiSuggestion(params) {
    try {
      // This is a stub that would normally call an API
      console.log(`Recording AI suggestion: ${JSON.stringify(params)}`);
      // In a real implementation, this would make an API call
    } catch (error) {
      console.error('Error recording AI suggestion:', error);
    }
  }

  // Credit-related functions have been removed