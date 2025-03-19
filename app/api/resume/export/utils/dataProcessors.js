/**
 * Data processing utilities for resume export
 * Handles normalization of various resume data structures
 */

// Process and normalize resume data
export function processResumeData(resumeData) {
  console.log("Processing resume data:", JSON.stringify(resumeData, null, 2));
  
  // Process skills
  const { skills, skillCategories } = processSkills(resumeData.skills);
  
  // Process other sections
  const projects = processProjects(resumeData.projects);
  const education = processEducation(resumeData.education);
  const experience = processExperience(resumeData.experience);
  
  // Return normalized data structure
  return {
    ...resumeData,
    skills,
    skillCategories,
    projects,
    education,
    experience
  };
}

// Process skills data
export function processSkills(skillsData) {
  let skills = [];
  let skillCategories = [];
  
  if (skillsData) {
    if (Array.isArray(skillsData)) {
      // Extract skill categories and their lists
      skillCategories = skillsData
        .map((skill) => {
          if (typeof skill === "object" && skill !== null) {
            return {
              name: skill.name || "",
              list: skill.list
                ? skill.list
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                : [],
            };
          }
          return null;
        })
        .filter(Boolean);
      
      // Also create a flat list of all skills for backward compatibility
      skills = skillsData.flatMap((skill) => {
        if (typeof skill === "object" && skill !== null) {
          if (skill.list) {
            return skill.list
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
          } else if (skill.name) {
            return [skill.name];
          } else {
            return [skill.value || JSON.stringify(skill)].filter(Boolean);
          }
        }
        return [String(skill)].filter(Boolean);
      });
    } else if (
      typeof skillsData === "object" &&
      skillsData !== null
    ) {
      if (skillsData.list) {
        skills = skillsData.list
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        skillCategories = [
          {
            name: skillsData.name || "",
            list: skills,
          },
        ];
      } else {
        skills = Object.values(skillsData).map(String).filter(Boolean);
      }
    } else {
      skills = [String(skillsData)];
    }
  }
  
  // Remove duplicates and empty values
  skills = [...new Set(skills)].filter(Boolean);
  
  return { skills, skillCategories };
}

// Process projects data
export function processProjects(projectsData) {
  let projects = [];
  
  if (projectsData) {
    if (Array.isArray(projectsData)) {
      projects = projectsData.map((project) => {
        if (typeof project === "object" && project !== null) {
          return {
            projectName:
              project.projectName || project.name || project.title || "",
            projectUrl: project.projectUrl || project.url || "",
            description: project.description || project.workSummary || "",
            startDate: project.startDate || "",
            endDate: project.endDate || "",
            currentlyWorking: project.currentlyWorking || false,
          };
        }
        return { projectName: String(project), description: "" };
      });
    } else if (
      typeof projectsData === "object" &&
      projectsData !== null
    ) {
      projects = [
        {
          projectName:
            projectsData.projectName ||
            projectsData.name ||
            projectsData.title ||
            "",
          projectUrl:
            projectsData.projectUrl || projectsData.url || "",
          description:
            projectsData.description ||
            projectsData.workSummary ||
            "",
          startDate: projectsData.startDate || "",
          endDate: projectsData.endDate || "",
          currentlyWorking: projectsData.currentlyWorking || false,
        },
      ];
    }
  }
  
  return projects;
}

// Process education data
export function processEducation(educationData) {
  let education = [];
  
  if (educationData) {
    if (Array.isArray(educationData)) {
      education = educationData.map((edu) => {
        if (typeof edu === "object" && edu !== null) {
          return {
            schoolName:
              edu.schoolName || edu.school || edu.universityName || "",
            degree: edu.degree || "",
            fieldOfStudy: edu.fieldOfStudy || edu.field || edu.major || "",
            startDate: edu.startDate || "",
            endDate: edu.endDate || "",
            location: edu.location || "",
            gpa: edu.gpa || "",
            description: edu.description || "",
          };
        }
        return { schoolName: String(edu), degree: "", fieldOfStudy: "" };
      });
    } else if (
      typeof educationData === "object" &&
      educationData !== null
    ) {
      education = [
        {
          schoolName:
            educationData.schoolName ||
            educationData.school ||
            educationData.universityName ||
            "",
          degree: educationData.degree || "",
          fieldOfStudy:
            educationData.fieldOfStudy ||
            educationData.field ||
            educationData.major ||
            "",
          startDate: educationData.startDate || "",
          endDate: educationData.endDate || "",
          location: educationData.location || "",
          gpa: educationData.gpa || "",
          description: educationData.description || "",
        },
      ];
    }
  }
  
  return education;
}

// Process experience data
export function processExperience(experienceData) {
  let experience = [];
  
  if (experienceData) {
    if (Array.isArray(experienceData)) {
      experience = experienceData.map((exp) => {
        if (typeof exp === "object" && exp !== null) {
          // Combine city and state for location if they exist
          let location = "";
          if (exp.location) {
            location = exp.location;
          } else if (exp.city || exp.state) {
            location = [exp.city, exp.state].filter(Boolean).join(", ");
          }

          return {
            companyName: exp.companyName || exp.company || "",
            jobTitle: exp.jobTitle || exp.title || exp.position || "",
            startDate: exp.startDate || "",
            endDate: exp.endDate || "",
            isCurrentlyWorking:
              exp.isCurrentlyWorking || exp.currentlyWorking || false,
            location: location,
            workSummary:
              exp.workSummary || exp.summary || exp.description || "",
          };
        }
        return { companyName: String(exp), jobTitle: "", workSummary: "" };
      });
    } else if (
      typeof experienceData === "object" &&
      experienceData !== null
    ) {
      // Combine city and state for location if they exist
      let location = "";
      if (experienceData.location) {
        location = experienceData.location;
      } else if (experienceData.city || experienceData.state) {
        location = [experienceData.city, experienceData.state]
          .filter(Boolean)
          .join(", ");
      }

      experience = [
        {
          companyName:
            experienceData.companyName ||
            experienceData.company ||
            "",
          jobTitle:
            experienceData.jobTitle ||
            experienceData.title ||
            experienceData.position ||
            "",
          startDate: experienceData.startDate || "",
          endDate: experienceData.endDate || "",
          isCurrentlyWorking:
            experienceData.isCurrentlyWorking ||
            experienceData.currentlyWorking ||
            false,
          location: location,
          workSummary:
            experienceData.workSummary ||
            experienceData.summary ||
            experienceData.description ||
            "",
        },
      ];
    }
  }
  
  return experience;
} 