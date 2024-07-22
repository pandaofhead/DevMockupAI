"use client";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillsPreview from "./preview/SkillsPreview";
import ProjectPreview from "./preview/ProjectPreview";
function ResumePreview() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  return (
    <div className="h-full p-6 ">
      {/* Personal Detail  */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      {/* Educational  */}
      {resumeInfo?.education?.length > 0 && (
        <EducationalPreview resumeInfo={resumeInfo} />
      )}
      {/* Skilss  */}
      {resumeInfo?.skills?.length > 0 && (
        <SkillsPreview resumeInfo={resumeInfo} />
      )}
      {/* Experience  */}
      {resumeInfo?.experience?.length > 0 && (
        <ExperiencePreview resumeInfo={resumeInfo} />
      )}
      {/* Project  */}
      {resumeInfo?.experience?.length > 0 && (
        <ProjectPreview resumeInfo={resumeInfo} />
      )}
    </div>
  );
}

export default ResumePreview;
