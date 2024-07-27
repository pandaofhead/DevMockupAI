"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const formField = {
  title: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};
function Project() {
  const [experinceList, setExperinceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resumeInfo?.experience.length > 0 &&
      setExperinceList(resumeInfo?.experience);
  }, []);

  const handleChange = (index, event) => {
    const newEntries = experinceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    console.log(newEntries);
    setExperinceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperinceList([
      ...experinceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        worksummary: "",
      },
    ]);
  };

  const RemoveExperience = () => {
    setExperinceList((experinceList) => experinceList.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experinceList.slice();
    newEntries[index][name] = e.target.value;

    setExperinceList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      Experience: experinceList,
    });
  }, [experinceList]);

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        Experience: experinceList.map(({ id, ...rest }) => rest),
      },
    };

    console.log(experinceList);

    // GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
    //   (res) => {
    //     console.log(res);
    //     setLoading(false);
    //     toast("Details updated !");
    //   },
    //   (error) => {
    //     setLoading(false);
    //   }
    // );
  };
  return (
    <div>
      <div className="p-5 rounded-lg dark:border-2 dark:border-white">
        <h2 className="font-bold text-lg">Project</h2>
        <div>
          {experinceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Project Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.title}
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
                  {/* Work summary  */}
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.worksummary}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "worksummary", index)
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

export default Project;
