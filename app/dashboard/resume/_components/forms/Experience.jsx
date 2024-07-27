"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { ResumeExperience } from "@/utils/schema";
import moment from "moment";
import RichTextEditor from "../RichTextEditor";
import { toast } from "sonner";
function Experience({ params }) {
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
    console.log(newEntries);
    setExperienceList(newEntries);
  };

  const handleRichTextEditor = (value, index) => {
    const newEntries = experienceList.slice();
    newEntries[index].workSummary = value;
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
        workSummary: "",
      },
    ]);
  };

  const RemoveExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
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
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.companyName}
                  />
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
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="month"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.endDate}
                  />
                </div>
                <div className="col-span-2">
                  {/* Work Summary  */}
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.workSummary}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "workSummary", index)
                    }
                  />
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
              {" "}
              + Add More Experience
            </Button>
            <Button
              variant="outline"
              onClick={RemoveExperience}
              className="text-primary"
            >
              {" "}
              - Remove
            </Button>
          </div>
          <Button disabled={loading} onClick={() => onSave()}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
