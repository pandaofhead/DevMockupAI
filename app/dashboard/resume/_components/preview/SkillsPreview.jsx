import React from "react";

function SkillsPreview({ resumeInfo }) {
  return (
    <div className="mt-1">
      <h2 className="text-center font-bold text-sm mb-1 flex justify-start">
        Skills
      </h2>

      <div className="">
        {resumeInfo?.skills.map((skill, index) => (
          <div key={index} className="flex items-center">
            <h3 className="text-xs font-semibold mr-2">{skill.name}:</h3>
            <p className="inline">
              {skill.list.map((item, index) => (
                <span key={index} className="text-xs inline">
                  {item}
                  {index !== skill.list.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />
    </div>
  );
}

export default SkillsPreview;
