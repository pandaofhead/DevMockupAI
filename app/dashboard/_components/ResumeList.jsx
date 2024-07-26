"use client";
import { db } from "@/utils/db";
import { Resume } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ResumeCardItem from "./ResumeCardItem";

const ResumeList = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  useEffect(() => {
    user && GetResumesList();
  }, [user]);

  const GetResumesList = async () => {
    const result = await db
      .select()
      .from(Resume)
      .where(eq(Resume.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Resume.id));

    console.log("🚀 ~ GetResumesList ~ GetResumesList:", GetResumesList);
    setResumeList(result);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 my-3">
        {resumeList &&
          resumeList.map((resume, index) => (
            <ResumeCardItem resume={resume} key={index} />
          ))}
      </div>
    </div>
  );
};

export default ResumeList;
