"use client";
import React, { useEffect, useState } from "react";
import FormSection from "../../_components/FormSection";
import ResumePreview from "../../_components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import dummy from "@/data/dummy";

function EditResume({ params }) {
  const [resumeInfo, setResumeInfo] = useState(dummy);

  useEffect(() => {
    // Fetch data from database
  }, []);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 p-10 gap-10 w-full h-screen">
        {/* Preview Section */}
        <div className="h-full overflow-y-auto">
          <ResumePreview />
        </div>
        {/* Form Section */}
        <div className="h-full overflow-y-auto">
          <FormSection />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
