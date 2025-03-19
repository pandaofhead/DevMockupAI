"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import Breadcrumb from "@/components/Breadcrumb";
function InterviewPage({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Interview", href: "/dashboard/interview" },
    { label: "Start Interview" },
  ];

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    setInterviewData(result[0]);
  };
  return (
    <div className="m-10">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{ height: 400, width: 400 }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 my-5 rounded-lg w-full p-20 bg-gray-200 dark:bg-slate-800 border-2 border-black" />
              <Button
                className="w-full bg-white hover:bg-gray-100 text-black border-2 border-black"
                onClick={() => setWebCamEnabled(true)}
              >
                Please Enable Web Cam and Microphone
              </Button>
            </>
          )}
          <div className="flex justify-center mt-6">
            <Link href={`/dashboard/interview/${params.interviewId}/start`}>
              <Button className="text-lg p-6">Start Interview</Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col p-5 my-5 rounded-lg border gap-5 dark:border-white">
            <h2 className="text-lg">
              <strong>Job Position: </strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description: </strong>
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience: </strong>
              {interviewData?.jobExperience}
            </h2>
            <h2 className="text-lg">
              <strong>Type of Questions: </strong>
              {interviewData?.questionType}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-600">
              <Lightbulb />
              <span>Tip</span>
            </h2>
            <h2 className="mt-3 text-yellow-600">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewPage;
