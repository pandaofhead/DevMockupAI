"use client";
import React, { useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, NotepadText, LayoutGrid } from "lucide-react";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import Project from "./forms/Project";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tooltip } from "antd";
function FormSection({ resumeId }) {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const router = useRouter();
  // : activeFormIndex == 5 ? (
  //   <Navigate to={"/my-resume/" + resumeId + "/view"} />
  // )
  return (
    <div>
      <div className="flex justify-between items-center mx-4">
        <div className="flex gap-5">
          <Link href={"/dashboard/resume"}>
            <Tooltip title="Resumes">
              <Button>
                <NotepadText />
              </Button>
            </Tooltip>
          </Link>
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
              {" "}
              <ArrowLeft />{" "}
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            {" "}
            Next
            <ArrowRight />{" "}
          </Button>
        </div>
      </div>
      {/* Personal Detail  */}
      {activeFormIndex == 1 ? (
        <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 2 ? (
        <Education enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 3 ? (
        <Skills />
      ) : activeFormIndex == 4 ? (
        <Experience />
      ) : activeFormIndex == 5 ? (
        <Project />
      ) : null}
    </div>
  );
}

export default FormSection;
