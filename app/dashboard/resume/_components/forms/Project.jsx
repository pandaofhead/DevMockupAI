"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

function Project({ params, errors = [] }) {
  const [projectList, setProjectList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    resumeInfo?.projects?.length > 0 && setProjectList(resumeInfo.projects);
  }, []);

  const handleChange = (index, event) => {
    const newEntries = projectList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setProjectList(newEntries);
  };

  const handleCheckbox = (index, checked) => {
    const newEntries = projectList.slice();
    newEntries[index].currentlyWorking = checked;
    if (checked) {
      newEntries[index].endDate = '';
    }
    setProjectList(newEntries);
  };

  const handleRichTextEditor = (value, index) => {
    const newEntries = projectList.slice();
    newEntries[index].workSummary = value;
    setProjectList(newEntries);
  };

  const AddNewProject = () => {
    setProjectList([
      ...projectList,
      {
        title: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        workSummary: "",
      },
    ]);
  };

  const RemoveProject = () => {
    setProjectList((list) => list.slice(0, -1));
  };

  useEffect(() => {
    setResumeInfo(prev => ({
      ...prev,
      projects: projectList,
    }));
  }, [projectList]);

  return (
    <div className="p-5 rounded-lg dark:border-2 dark:border-white">
      <h2 className="font-bold text-lg">Projects</h2>
      <div>
        {projectList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label className="text-xs">Project Title</label>
                <Input
                  name="title"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.title}
                  className={errors[index]?.title ? "border-red-500" : ""}
                />
                {errors[index]?.title && (
                  <p className="text-sm text-red-500 mt-1">{errors[index].title}</p>
                )}
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <Input
                  type="month"
                  name="startDate"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.startDate}
                  className={errors[index]?.startDate ? "border-red-500" : ""}
                />
                {errors[index]?.startDate && (
                  <p className="text-sm text-red-500 mt-1">{errors[index].startDate}</p>
                )}
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <div className="space-y-2">
                  <Input
                    type="month"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.endDate}
                    disabled={item.currentlyWorking}
                    className={errors[index]?.endDate ? "border-red-500" : ""}
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`currently-working-${index}`}
                      checked={item.currentlyWorking}
                      onCheckedChange={(checked) => handleCheckbox(index, checked)}
                    />
                    <label
                      htmlFor={`currently-working-${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Currently Working
                    </label>
                  </div>
                  {errors[index]?.endDate && (
                    <p className="text-sm text-red-500">{errors[index].endDate}</p>
                  )}
                </div>
              </div>
              <div className="col-span-2">
                <label className="text-xs mb-2 block">Project Description</label>
                <RichTextEditor
                  index={index}
                  defaultValue={item?.workSummary}
                  onRichTextEditorChange={(value) => handleRichTextEditor(value, index)}
                />
                {errors[index]?.workSummary && (
                  <p className="text-sm text-red-500 mt-1">{errors[index].workSummary}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewProject}
            className="text-primary"
          >
            + Add More Project
          </Button>
          <Button
            variant="outline"
            onClick={RemoveProject}
            className="text-primary"
            disabled={projectList.length <= 1}
          >
            - Remove
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Project;
