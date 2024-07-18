import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import DefaultResume from "../_components/DefaultResume";

function Default() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Default Resumes" },
  ];
  return (
    <div className="p-10">
      <Breadcrumb items={breadcrumbItems} />
      <div>
        <p className="text-gray-500 dark:text-white">
          Upload your default resume here, only PDF and DOCX files are allowed.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-4">
          <DefaultResume />
        </div>
        <h2 className="text-2xl font-bold mt-10">Previous Interviews</h2>
      </div>
    </div>
  );
}

export default Default;
