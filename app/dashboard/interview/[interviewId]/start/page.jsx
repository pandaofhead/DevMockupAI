"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
const StartInterview = ({ params }) => {
  const [interViewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

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
    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log(
      "🚀 ~ file: page.jsx:18 ~ GetInterviewDetails ~ jsonMockResp:",
      jsonMockResp
    );
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };
  return (
    <div className="m-10">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interViewData}
          />
          <div className="flex justify-center gap-6">
            {activeQuestionIndex > 0 && (
              <Button
                onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
              >
                Previous Question
              </Button>
            )}
            {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
              <Button
                onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
              >
                Next Question
              </Button>
            )}
            {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
              <Link
                href={
                  "/dashboard/interview/" + interViewData?.mockId + "/feedback"
                }
              >
                <Button>End Interview</Button>
              </Link>
            )}
          </div>
        </div>

        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
      </div>
    </div>
  );
};

export default StartInterview;
