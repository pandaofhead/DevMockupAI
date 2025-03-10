"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { ResumeExperience } from "@/utils/schema";
import moment from "moment";
import RichTextEditor from "../RichTextEditor";
import { toast } from "sonner";

function Experience({ params, errors = [] }) {
  const [experienceList, setExperienceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  // Fetch Experience
  useEffect(() => {
    resumeInfo?.experience.length > 0 &&
      setExperienceList(resumeInfo?.experience);
  }, []);

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const handleCheckbox = (index, checked) => {
    const newEntries = experienceList.slice();
    newEntries[index].currentlyWorking = checked;
    if (checked) {
      newEntries[index].endDate = "";
    }
    setExperienceList(newEntries);
  };

  const handleRichTextEditor = (value, index) => {
    console.log("Updating work summary:", { index, value });
    const newEntries = experienceList.slice();
    // Ensure we're storing a string value
    const sanitizedValue = typeof value === 'string' ? value : '';
    newEntries[index] = {
      ...newEntries[index],
      workSummary: sanitizedValue
    };
    setExperienceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        workSummary: "",
      },
    ]);
  };

  const RemoveExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  useEffect(() => {
    console.log("Experience list updated:", experienceList);
    setResumeInfo(prev => ({
      ...prev,
      experience: experienceList,
    }));
  }, [experienceList]);

  const onSave = async () => {
    setLoading(true);

    try {
      await db.insert(ResumeExperience).values(
        experienceList.map((exp) => ({
          resumeIdRef: params.resumeId,
          title: exp.title,
          companyName: exp.companyName,
          city: exp.city,
          state: exp.state,
          startDate: exp.startDate,
          endDate: exp.endDate,
          currentlyWorking: exp.currentlyWorking,
          workSummary: exp.workSummary,
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        }))
      );
      toast("Details updated!");
    } catch (error) {
      console.error("Failed to save resume experience data:", error);
      toast.error("Failed to save data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 rounded-lg dark:border-2 dark:border-white">
        <h2 className="font-bold text-lg">Experience</h2>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.title}
                    className={errors[index]?.title ? "border-red-500" : ""}
                  />
                  {errors[index]?.title && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors[index].title}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.companyName}
                    className={
                      errors[index]?.companyName ? "border-red-500" : ""
                    }
                  />
                  {errors[index]?.companyName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors[index].companyName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.city}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.state}
                  />
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
                    <p className="text-sm text-red-500 mt-1">
                      {errors[index].startDate}
                    </p>
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
                        onCheckedChange={(checked) =>
                          handleCheckbox(index, checked)
                        }
                      />
                      <label
                        htmlFor={`currently-working-${index}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Currently Working
                      </label>
                    </div>
                    {errors[index]?.endDate && (
                      <p className="text-sm text-red-500">
                        {errors[index].endDate}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="text-xs mb-2 block">Work Summary</label>
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.workSummary}
                    onRichTextEditorChange={(value) =>
                      handleRichTextEditor(value, index)
                    }
                  />
                  {errors[index]?.workSummary && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors[index].workSummary}
                    </p>
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
              onClick={AddNewExperience}
              className="text-primary"
            >
              + Add More Experience
            </Button>
            <Button
              variant="outline"
              onClick={RemoveExperience}
              className="text-primary"
              disabled={experienceList.length <= 1}
            >
              - Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;
