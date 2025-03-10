"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { db } from "@/utils/db";
import { toast } from "sonner";
import { ResumeEducation } from "@/utils/schema";
import moment from "moment";

function Education({ params, errors = [] }) {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  useEffect(() => {
    resumeInfo && setEducationalList(resumeInfo?.education);
  }, []);

  const handleChange = (event, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const RemoveEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };

  const onSave = async () => {
    setLoading(true);
    const data = educationalList.map((item) => ({
      resumeIdRef: params?.resumeId,
      universityName: item.universityName,
      degree: item.degree,
      major: item.major,
      startDate: item.startDate,
      endDate: item.endDate,
      description: item.description,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    }));

    try {
      await Promise.all(
        data.map(async (edu) => {
          await db.insert(ResumeEducation).values(edu);
        })
      );
      setResumeInfo((prevInfo) => ({
        ...prevInfo,
        education: educationalList,
      }));

      toast("Education details updated!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList,
    });
  }, [educationalList]);

  return (
    <div className="p-5 rounded-lg mt-2">
      <h2 className="font-bold text-lg">Education</h2>
      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label>University Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.universityName}
                  className={errors[index]?.universityName ? "border-red-500" : ""}
                />
                {errors[index]?.universityName && (
                  <p className="text-sm text-red-500 mt-1">{errors[index].universityName}</p>
                )}
              </div>
              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.degree}
                  className={errors[index]?.degree ? "border-red-500" : ""}
                />
                {errors[index]?.degree && (
                  <p className="text-sm text-red-500 mt-1">{errors[index].degree}</p>
                )}
              </div>
              <div>
                <label>Major</label>
                <Input
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.major}
                  className={errors[index]?.major ? "border-red-500" : ""}
                />
                {errors[index]?.major && (
                  <p className="text-sm text-red-500 mt-1">{errors[index].major}</p>
                )}
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  type="month"
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.startDate}
                  className={errors[index]?.startDate ? "border-red-500" : ""}
                />
                {errors[index]?.startDate && (
                  <p className="text-sm text-red-500 mt-1">{errors[index].startDate}</p>
                )}
              </div>
              <div>
                <label>End Date</label>
                <Input
                  type="month"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.endDate}
                />
              </div>
              <div className="col-span-2">
                <label>Description (Optional)</label>
                <Textarea
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.description}
                  placeholder="Add any relevant details about your education"
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
            onClick={AddNewEducation}
            className="text-primary"
          >
            + Add More Education
          </Button>
          <Button
            variant="outline"
            onClick={RemoveEducation}
            className="text-primary"
            disabled={educationalList.length <= 1}
          >
            - Remove
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Education;
