import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import AddInterview from "../_components/AddInterview";
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
        <p className="text-gray-500 dark:text-white">
          Generate your Interview here
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 my-5 gap-4">
          <AddInterview />
        </div>
        <h2 className="text-2xl font-bold my-8">Your Interviews</h2>
        <InterviewList />
      </div>
    </div>
  );
}

export default Interview;
