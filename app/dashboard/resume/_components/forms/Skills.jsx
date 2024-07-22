"use client";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { toast } from "sonner";
import { list } from "postcss";
function Skills({ params }) {
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      list: [],
    },
  ]);

  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    resumeInfo && setSkillsList(resumeInfo?.skills);
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
        list: [],
      },
    ]);
  };
  const RemoveSkills = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest),
      },
    };

    // GlobalApi.UpdateResumeDetail(resumeId, data).then(
    //   (resp) => {
    //     console.log(resp);
    //     setLoading(false);
    //     toast("Details updated !");
    //   },
    //   (error) => {
    //     setLoading(false);
    //     toast("Server Error, Try again!");
    //   }
    // );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);
  return (
    <div className="p-5 rounded-lg dark:border-2 dark:border-white">
      <h2 className="font-bold text-lg">Skills</h2>
      <div>
        {skillsList.map((item, index) => (
          <div className="mb-2 border rounded-lg p-3 ">
            <label className="text-xs">{item.name}</label>
            <Textarea
              className="w-full"
              defaultValue={item.list}
              onChange={(e) => handleChange(index, "list", e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewSkills}
            className="text-primary"
          >
            {" "}
            + Add More Skill
          </Button>
          <Button
            variant="outline"
            onClick={RemoveSkills}
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
  );
}

export default Skills;
