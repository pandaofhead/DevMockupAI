"use client";
import React, { useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { db } from "@/utils/db";
import { Resume } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Breadcrumb from "@/components/Breadcrumb";
import DefaultResumeForm from "../../_components/DefaultResumeForm";
import { LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

function EditResume({ params }) {
  const searchParams = useSearchParams();
  const [resumeInfo, setResumeInfo] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
    education: [],
    experience: [],
    projects: [],
    skills: [],
  });
  const [loading, setLoading] = useState(true);
  const [resumeTitle, setResumeTitle] = useState("");

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Resume", href: "/dashboard/resume" },
    { label: "Edit" },
  ];

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const resume = await db
          .select()
          .from(Resume)
          .where(eq(Resume.resumeId, params.resumeId))
          .then((res) => res[0]);

        if (resume) {
          // Parse the JSON stored in resumeSections
          const sections = JSON.parse(resume.resumeSections);
          setResumeInfo(sections);
          // Use the title from URL params if available, otherwise use the one from database
          const titleFromUrl = searchParams.get("title");
          setResumeTitle(titleFromUrl || resume.resumeTitle);
        }
      } catch (error) {
        console.error("Error fetching resume:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.resumeId) {
      fetchResumeData();
    }
  }, [params.resumeId, searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
        <DefaultResumeForm 
          isEditing={true} 
          existingResumeId={params.resumeId} 
          resumeTitle={resumeTitle}
        />
      </ResumeInfoContext.Provider>
    </div>
  );
}

export default EditResume;
