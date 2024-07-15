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
        <p className="text-gray-500">Enter your resume details here</p>
        <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-4">
          <DefaultResume />
        </div>
      </div>
    </div>
  );
}

export default Default;
