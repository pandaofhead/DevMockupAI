import React from "react";

function EducationalPreview({ resumeInfo }) {
  return (
    <div className="">
      <h3 className="text-center font-semibold text-sm mb-1 flex justify-start">
        Education
      </h3>
      {resumeInfo?.education.map((education, index) => (
        <div key={index} className="">
          <h3 className="text-xs font-bold flex justify-between">
            {education.universityName}
            <span className="font-normal">
              {education?.startDate} - {education?.endDate}
            </span>
          </h3>
          <h3 className="text-xs">
            {education?.degree} in {education?.major}
          </h3>
          <p className="text-xs my-1">{education?.description}</p>
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

export default EducationalPreview;
