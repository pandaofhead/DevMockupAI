"use client";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/db";
import { ResumeSkills } from "@/utils/schema";
import { eq } from "drizzle-orm";

function Skills({ params }) {
  const { toast } = useToast();
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      list: "",
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
        list: "",
      },
    ]);
  };

  const RemoveSkills = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = skillsList.map((item) => ({
      resumeId: params.resumeId,
      name: item.name,
      list: item.list,
    }));

    try {
      await Promise.all(
        data.map(async (skill) => {
          await db
            .update(ResumeSkills)
            .set(skill)
            .where(eq(ResumeSkills.resumeId, skill.resumeId));
        })
      );
      setResumeInfo((prevInfo) => ({
        ...prevInfo,
        skills: skillsList,
      }));
      toast("Details updated!");
    } catch (error) {
      toast("Failed to update details");
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = skillsList.some((item) => !item.name || !item.list);

  // Update context on change
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);

  return (
    <div className="p-5 rounded-lg dark:border-2 dark:border-white">
      <h2 className="font-bold text-lg">Skills</h2>
      <div className="border rounded-lg">
        {skillsList.map((item, index) => (
          <div key={index} className="mb-2 p-3">
            <Input
              className="text-sm mb-2"
              value={item.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              placeholder="Skill Name"
              required
            />
            <Textarea
              className="w-full"
              value={item.list}
              onChange={(e) => handleChange(index, "list", e.target.value)}
              placeholder="Skill List"
              required
            />
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
            + Add More Skill
          </Button>
          <Button
            variant="outline"
            onClick={RemoveSkills}
            className="text-primary"
          >
            - Remove
          </Button>
        </div>
        <Button disabled={loading || isSubmitDisabled} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Skills;
