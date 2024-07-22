import React from "react";

function ProjectPreview({ resumeInfo }) {
  return (
    <div className="mt-1">
      <h2 className="text-center font-bold text-sm mb-1 flex justify-start">
        Project
      </h2>

      {resumeInfo?.experience?.map((experience, index) => (
        <div key={index} className="">
          <h2 className="text-sm font-bold">{experience?.title}</h2>
          <h2 className="text-xs flex justify-between">
            {experience?.companyName},{experience?.city},{experience?.state}
            <span>
              {experience?.startDate} To{" "}
              {experience?.currentlyWorking ? "Present" : experience.endDate}{" "}
            </span>
          </h2>
          <div
            className="text-xs my-2"
            dangerouslySetInnerHTML={{ __html: experience?.workSummery }}
          />
        </div>
      ))}
    </div>
  );
}

export default ProjectPreview;
