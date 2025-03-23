"use client";
import { db } from "@/utils/db";
import { Resume } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ResumeItemCard from "./ResumeItemCard";

const ResumeList = () => {
  console.log("##### ResumeList component rendering #####");
  
  const { user } = useUser();
  const [allResumes, setAllResumes] = useState([]);

  // Get the first resume as default and rest as normal resumes
  const defaultResume = allResumes.find((resume) => resume.isDefault);
  const otherResumes = allResumes.filter((resume) => !resume.isDefault);
  
  console.log("ResumeList initial state:", { 
    userEmail: user?.primaryEmailAddress?.emailAddress,
    resumeCount: allResumes.length,
    hasDefaultResume: !!defaultResume
  });

  useEffect(() => {
    console.log("ResumeList useEffect triggered for user change");
    if (user?.primaryEmailAddress?.emailAddress) {
      console.log("User exists, fetching resumes...");
      GetResumesList();
    }
  }, [user]);
  
  // Add a refresh interval to catch any updates
  useEffect(() => {
    console.log("Setting up refresh interval for resume list");
    
    // Refresh list on initial mount and every 5 seconds (for testing)
    GetResumesList();
    
    const intervalId = setInterval(() => {
      console.log("Auto-refreshing resume list");
      GetResumesList();
    }, 5000);
    
    return () => {
      console.log("Clearing resume list refresh interval");
      clearInterval(intervalId);
    };
  }, []);

  const GetResumesList = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.log("No user email, can't fetch resumes");
      return;
    }

    try {
      console.log("Fetching resumes for user:", user.primaryEmailAddress.emailAddress);
      
      // Get all resumes for this user
      const resumes = await db
        .select()
        .from(Resume)
        .where(eq(Resume.createdBy, user.primaryEmailAddress.emailAddress))
        .orderBy(desc(Resume.createdAt));

      console.log("Found", resumes.length, "resumes");
      
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

  console.log("ResumeList render state:", {
    resumeCount: allResumes.length,
    defaultResume: defaultResume ? "exists" : "none",
    otherResumes: otherResumes.length
  });

  // Don't show anything until we've tried to load resumes
  if (user?.primaryEmailAddress?.emailAddress && allResumes.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>No resumes found</p>
      </div>
    );
  }

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
