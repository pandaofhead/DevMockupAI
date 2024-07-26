import React from "react";

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className="mt-1">
      <h2 className="text-center font-bold text-sm mb-1 flex justify-start">
        Experience
      </h2>

      {resumeInfo?.experience?.map((experience, index) => (
        <div key={index} className="">
          <h2 className="text-sm font-bold flex justify-between">
            {experience?.title}
            <span className="font-normal">
              {experience?.startDate} -{" "}
              {experience?.currentlyWorking ? "Present" : experience.endDate}{" "}
            </span>
          </h2>
          <h2 className="text-xs">
            {experience?.companyName},{experience?.city},{experience?.state}
          </h2>
         
          <div
            className="text-xs my-2"
            dangerouslySetInnerHTML={{ __html: experience?.workSummary }}
          />
        </div>
      ))}
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />
    </div>
  );
}

export default ExperiencePreview;
