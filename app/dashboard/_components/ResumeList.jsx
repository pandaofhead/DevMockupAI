"use client";
import { db } from "@/utils/db";
import { Resume } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ResumeItemCard from "./ResumeItemCard";

const ResumeList = () => {
  const { user } = useUser();
  const [allResumes, setAllResumes] = useState([]);

  useEffect(() => {
    user && GetResumesList();
  }, [user]);

  const GetResumesList = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      // Get all resumes for this user
      const resumes = await db
        .select()
        .from(Resume)
        .where(eq(Resume.createdBy, user.primaryEmailAddress.emailAddress))
        .orderBy(desc(Resume.createdAt));

      // Sort resumes: default first, then by creation date
      const sortedResumes = resumes.sort((a, b) => {
        if (a.isDefault) return -1;
        if (b.isDefault) return 1;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setAllResumes(sortedResumes);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  // Get the first resume as default and rest as normal resumes
  const defaultResume = allResumes.find((resume) => resume.isDefault);
  const otherResumes = allResumes.filter((resume) => !resume.isDefault);

  return (
    <div>
      {defaultResume && (
        <div className="mb-8">
          <ResumeItemCard
            resume={defaultResume}
            isDefault={true}
            onUpdate={GetResumesList}
          />
        </div>
      )}

      {otherResumes.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 my-3">
            {otherResumes.map((resume) => (
              <ResumeItemCard
                resume={resume}
                key={resume.resumeId}
                isDefault={false}
                onUpdate={GetResumesList}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ResumeList;
