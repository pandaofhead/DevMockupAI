"use client";
import React, { useEffect, useState } from "react";
import FormSection from "../../_components/FormSection";
import ResumePreview from "../../_components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import dummy from "@/data/dummy";
import { ChevronsLeftRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Tooltip } from "antd";
import Breadcrumb from "@/components/Breadcrumb";
function EditResume({ params, resume }) {
  const [resumeInfo, setResumeInfo] = useState(dummy);
  const [isFormCollapsed, setIsFormCollapsed] = useState(false);
  const [isPreviewCollapsed, setIsPreviewCollapsed] = useState(false);
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Resume", href: "/dashboard/resume" },
    { label: "Edit" },
  ];
  useEffect(() => {
    // Fetch data from database
  }, []);

  return (
    <div className="p-8">
      <Breadcrumb items={breadcrumbItems} />
      <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
        <div className="flex w-full h-screen">
          {/* Preview Section */}
          <div
            className={`flex flex-col h-full overflow-y-auto transition-all duration-300 border-2 border-black dark:border-gray-400 rounded-l-xl ${
              isPreviewCollapsed ? "w-12" : isFormCollapsed ? "w-full" : "w-1/2"
            }`}
          >
            <button
              onClick={() => setIsPreviewCollapsed(!isPreviewCollapsed)}
              className="flex w-full justify-start p-2 rounded-md "
            >
              <Tooltip title="collapse">
                {isPreviewCollapsed ? <ChevronsLeftRight /> : <ChevronsLeft />}
              </Tooltip>
            </button>

            {!isPreviewCollapsed && <ResumePreview />}
          </div>
          {/* Form Section */}
          <div
            className={`flex flex-col h-full overflow-y-auto transition-all duration-300 border-y-2 border-r-2 border-black rounded-r-xl dark:border-gray-400 ${
              isFormCollapsed ? "w-12" : isPreviewCollapsed ? "w-full" : "w-1/2"
            }`}
          >
            <button
              onClick={() => setIsFormCollapsed(!isFormCollapsed)}
              className="flex w-full justify-end p-2 rounded-md"
            >
              <Tooltip title="collapse">
                {isFormCollapsed ? <ChevronsLeftRight /> : <ChevronsRight />}
              </Tooltip>
            </button>
            {!isFormCollapsed && <FormSection />}
          </div>
        </div>
      </ResumeInfoContext.Provider>
    </div>
  );
}

export default EditResume;
