import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import AddNewResume from "../_components/AddNewResume";

function Custom() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Custom Resumes" },
  ];
  return (
    <div className="p-10">
      <Breadcrumb items={breadcrumbItems} />
      <div>
        <p className="text-gray-500">Customaize your resumes here</p>
        <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-4">
          <AddNewResume />
        </div>
      </div>
    </div>
  );
}

export default Custom;
