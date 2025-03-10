"use client";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

function Skills({ params, errors = [] }) {
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      list: "",
    },
  ]);

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    resumeInfo?.skills?.length > 0 && setSkillsList(resumeInfo.skills);
  }, []);

  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  const AddNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        list: "",
      },
    ]);
  };

  const RemoveSkills = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  // Update context on change
  useEffect(() => {
    setResumeInfo(prev => ({
      ...prev,
      skills: skillsList,
    }));
  }, [skillsList]);

  return (
    <div className="p-5 rounded-lg dark:border-2 dark:border-white">
      <h2 className="font-bold text-lg">Skills</h2>
      <div className="border rounded-lg">
        {skillsList.map((item, index) => (
          <div key={index} className="mb-2 p-3">
            <Input
              className={`text-sm mb-2 ${errors[index]?.name ? "border-red-500" : ""}`}
              value={item.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              placeholder="Skill Category (e.g., Programming Languages, Tools)"
              required
            />
            {errors[index]?.name && (
              <p className="text-sm text-red-500 mt-1">{errors[index].name}</p>
            )}
            <Textarea
              className={`w-full ${errors[index]?.list ? "border-red-500" : ""}`}
              value={item.list}
              onChange={(e) => handleChange(index, "list", e.target.value)}
              placeholder="List your skills, separated by commas (e.g., Python, JavaScript, React)"
              required
            />
            {errors[index]?.list && (
              <p className="text-sm text-red-500 mt-1">{errors[index].list}</p>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewSkills}
            className="text-primary"
          >
            + Add More Skills
          </Button>
          <Button
            variant="outline"
            onClick={RemoveSkills}
            className="text-primary"
            disabled={skillsList.length <= 1}
          >
            - Remove
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Skills;
