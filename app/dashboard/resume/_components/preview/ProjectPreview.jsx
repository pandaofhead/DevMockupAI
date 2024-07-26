import React from "react";

function ProjectPreview({ resumeInfo }) {
  return (
    <div className="mt-1">
      <h2 className="text-center font-bold text-sm mb-1 flex justify-start">
        Project
      </h2>

      {resumeInfo?.project?.map((project, index) => (
        <div key={index} className="">
          <h2 className="text-xs flex justify-between">
            <h2 className="text-sm font-bold">{project?.title}</h2>
            <span className="font-normal">
              {project?.startDate} -{" "}
              {project?.currentlyWorking ? "Present" : project.endDate}{" "}
            </span>
          </h2>
          <div
            className="text-xs my-2"
            dangerouslySetInnerHTML={{ __html: project?.projectSummary }}
          />
        </div>
      ))}
    </div>
  );
}

export default ProjectPreview;
