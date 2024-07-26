"use client";
import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import AddResume from "@/app/dashboard/_components/AddResume";
import ResumeList from "../_components/ResumeList";

function Resume() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 my-5 gap-4">
          <AddResume />
        </div>
        <h2 className="text-2xl font-bold my-8">Your resumes</h2>
        <ResumeList />
      </div>
    </div>
  );
}

export default Resume;
