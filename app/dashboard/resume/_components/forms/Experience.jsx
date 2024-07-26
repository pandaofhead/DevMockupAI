"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { toast } from "sonner";
import { Bot, LoaderCircle } from "lucide-react";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { Resume } from "@/utils/schema";
import { ResumeExperience } from "@/utils/schema";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

const PROMPT =
  "Given experience: {workSummary}, title: {positionTitle} and Job Description: {jobDesc}, revise resume workSummary in 3-4 bullet points to better fit the Job Description (Please do not include word Summary and No JSON array) , give me result in HTML tags";
function Experience({ resume }) {
  const [value, setValue] = useState("");
  const [experienceList, setExperienceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  // // Fetch resume job description from the database
  // const jobDesc = db.get(Resume, resume.resumeId).jobDesc;

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

  const handleRichTextEditorChange = (value, index) => {
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

  const GenerateSummaryFromAI = async (index) => {
    if (!resumeInfo?.experience[index]?.title) {
      console.log("Please Add Position Title");
      toast("Please Add Position Title", "error");
      return;
    }
    setLoading(true);
    const prompt = PROMPT.replace("{workSummary}", value)
      .replace("{positionTitle}", resumeInfo.experience[index].title)
      .replace("{jobDesc}", jobDesc);

    const result = await chatSession.sendMessage(prompt);
    const resp = result.response.text();

    setValue(resp.replace("[", "").replace("]", ""));
    setLoading(false);
  };

  const onSave = async () => {
    setLoading(true);

    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };

    console.log(experienceList);
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
                  <div className="flex justify-between my-2">
                    <label className="text-xs">Summery</label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={GenerateSummaryFromAI}
                      disabled={loading || !item?.workSummary}
                      className="flex gap-2 border-primary text-primary"
                    >
                      {loading ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        <>
                          <Bot className="h-4 w-4" /> Generate from AI
                        </>
                      )}
                    </Button>
                  </div>
                  <EditorProvider>
                    <Editor
                      value={item?.workSummary || ""}
                      onChange={(e) => {
                        handleChange(e.target.value, index);
                      }}
                    >
                      <Toolbar>
                        <BtnBold />

                        <BtnItalic />
                        <BtnUnderline />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                      </Toolbar>
                    </Editor>
                  </EditorProvider>
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
