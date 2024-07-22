"use client";
import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import AddResume from "@/app/dashboard/_components/AddResume";
import { useUser } from "@clerk/nextjs";

// import ResumeCardItem from "./components/ResumeCardItem";

function Resume() {
  const { user } = useUser();
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Resumes" },
  ];
  return (
    <div className="p-10 w-full sm:w-auto">
      <Breadcrumb items={breadcrumbItems} />
      <div>
        <p className="text-gray-500 dark:text-white">
          Add and customize your resume here
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-4">
          <AddResume />
          {/* {resumeList.length > 0
            ? resumeList.map((resume, index) => (
                <ResumeCardItem
                  resume={resume}
                  key={index}
                  refreshData={GetResumesList}
                />
              ))
            : [1, 2, 3, 4].map((item, index) => (
                <div className="h-[280px] rounded-lg bg-slate-200 animate-pulse"></div>
              ))} */}
        </div>
      </div>
    </div>
  );
}

export default Resume;
