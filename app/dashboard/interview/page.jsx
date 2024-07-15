import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import AddNewInterview from "../_components/AddNewInterview";
import InterviewList from "../_components/InterviewList";
function Interview() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Interview" },
  ];

  return (
    <div className="p-10">
      <Breadcrumb items={breadcrumbItems} />
      <div>
        <p className="text-gray-500">Generate your Interview here</p>
        <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-4">
          <AddNewInterview />
        </div>
        <h2 className="text-2xl font-bold text-gray-500 mt-10">Previous Interviews</h2>
        <InterviewList />
      </div>
    </div>
  );
}

export default Interview;
