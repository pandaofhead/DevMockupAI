/**
 * Records AI suggestion acceptance or rejection
 * @param {Object} params
 * @param {string} params.category - The category of the suggestion (resume, interview, etc.)
 * @param {string} params.action - The action taken (accepted, rejected)
 * @param {string} params.suggestionId - Optional unique identifier for the suggestion
 * @returns {Promise<Object>} - Response from the API
 */
export async function recordAiSuggestion({ category, action, suggestionId }) {
  try {
    const response = await fetch("/api/analytics/ai-suggestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
        action,
        suggestionId,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error recording AI suggestion:", error);
    // Silently fail in analytics to not disrupt user experience
    return { success: false, error: error.message };
  }
}

/**
 * Records a resume type for analytics
 * @param {Object} params
 * @param {string} params.resumeType - The type of resume (Frontend, Backend, Full Stack, etc.)
 * @returns {Promise<Object>} - Response from the API
 */
export async function recordResumeType({ resumeType }) {
  try {
    const response = await fetch("/api/analytics/resume-type", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resumeType,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error recording resume type:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Records a technology used in a resume
 * @param {Object} params
 * @param {string} params.technology - The technology name
 * @returns {Promise<Object>} - Response from the API
 */
export async function recordTechnology({ technology }) {
  try {
    const response = await fetch("/api/analytics/tech-stack", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        technology,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error recording technology:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Records interview performance metrics
 * @param {Object} params
 * @param {string} params.interviewId - The ID of the interview
 * @param {string} params.jobType - The type of job (Frontend, Backend, etc.)
 * @param {number} params.technicalScore - Technical score (0-100)
 * @param {number} params.behavioralScore - Behavioral score (0-100)
 * @param {boolean} params.success - Whether the interview was successful
 * @returns {Promise<Object>} - Response from the API
 */
export async function recordInterviewPerformance({ 
  interviewId, 
  jobType, 
  technicalScore, 
  behavioralScore, 
  success 
}) {
  try {
    const response = await fetch("/api/analytics/interview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interviewId,
        jobType,
        technicalScore,
        behavioralScore,
        success,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error recording interview performance:", error);
    return { success: false, error: error.message };
  }
} 