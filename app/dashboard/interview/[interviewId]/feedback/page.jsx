"use client";
import Breadcrumb from "@/components/Breadcrumb";
import { db } from "@/utils/db";
import { UserAnswer, MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { recordInterviewPerformance } from "@/utils/analytics-helpers";
import { toast } from "sonner";

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [interviewData, setInterviewData] = useState(null);
  const [analyticsRecorded, setAnalyticsRecorded] = useState(false);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Interview", href: "/dashboard/interview" },
    { label: "Feedback" },
  ];

  useEffect(() => {
    fetchInterviewData();
    GetFeedback();
  }, []);

  const fetchInterviewData = async () => {
    try {
      const interview = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId))
        .then(res => res[0]);
      
      setInterviewData(interview);
    } catch (error) {
      console.error("Error fetching interview data:", error);
    }
  };

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);
    console.log("🚀 ~ GetFeedback ~ result:", result);
    setFeedbackList(result);
  };

  // Calculate average rating and determine success/failure
  const calculatePerformance = () => {
    if (!feedbackList || feedbackList.length === 0) return { technical: 0, behavioral: 0, result: 'failed' };
    
    const totalRating = feedbackList.reduce((sum, item) => {
      // Convert rating to number if it's a string (e.g., "8/10" -> 8)
      const rating = typeof item.rating === 'string' 
        ? parseInt(item.rating.split('/')[0]) 
        : (typeof item.rating === 'number' ? item.rating : 0);
      
      return sum + rating;
    }, 0);
    
    const averageRating = Math.round(totalRating / feedbackList.length);
    // Scale to 0-100 if ratings are on a different scale
    const technicalScore = averageRating * 10; // Assuming ratings are out of 10
    const behavioralScore = technicalScore; // Use same score for both in this simple implementation
    
    // Consider it a success if average score is 70% or higher
    const result = technicalScore >= 70 ? 'success' : 'failed';
    
    return { technical: technicalScore, behavioral: behavioralScore, result };
  };

  // Record analytics data for this interview
  const recordAnalytics = async () => {
    if (analyticsRecorded || !interviewData || !user) return;
    
    setAnalyticsLoading(true);
    try {
      const { technical, behavioral, result } = calculatePerformance();
      
      // Determine job type from interview data
      const jobType = interviewData.jobPosition.toLowerCase().includes('frontend') 
        ? 'Frontend'
        : interviewData.jobPosition.toLowerCase().includes('backend')
          ? 'Backend'
          : interviewData.jobPosition.toLowerCase().includes('full') 
            ? 'Full Stack'
            : 'Other';
      
      await recordInterviewPerformance({
        interviewId: params.interviewId,
        jobType,
        technicalScore: technical,
        behavioralScore: behavioral,
        success: result === 'success'
      });
      
      setAnalyticsRecorded(true);
      toast.success("Interview performance recorded for analytics");
    } catch (error) {
      console.error("Error recording analytics:", error);
      toast.error("Failed to record analytics data");
    } finally {
      setAnalyticsLoading(false);
    }
  };

  return (
    <div className="p-10">
      <Breadcrumb items={breadcrumbItems} />
      <h2 className="font-bold text-2xl ">Interview feedback</h2>
      {feedbackList?.length == 0 ? (
        <h2 className="font-bold text-lg my-10 text-gray-400">
          No Feedback Available
        </h2>
      ) : (
        <>
          <h2 className="text-sm text-gray-500">
            Find below interview questions with correct answers, your answer and
            feedback for improvements for your next interview
          </h2>
          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-4 flex justify-between bg-secondary rounded-lg my-2 text-left gap-7 w-full">
                  {item.question} <ChevronsUpDown className="h-4" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>Rating:</strong>
                      {item.rating}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer: </strong>
                      {item.userAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                      <strong>Correct Answer Looks Like: </strong>
                      {item.correctAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                      <strong>Feedback: </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}

          {/* Record Analytics Button */}
          <div className="mt-5 flex gap-4">
            <Button
              onClick={recordAnalytics}
              disabled={analyticsRecorded || analyticsLoading || !feedbackList.length}
              variant={analyticsRecorded ? "outline" : "secondary"}
            >
              {analyticsLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {analyticsRecorded 
                ? "Performance Recorded ✓" 
                : "Record Performance for Analytics"}
            </Button>
          </div>
        </>
      )}
      <Button
        className="mt-5"
        onClick={() => router.replace("/dashboard/interview")}
      >
        Back to Interview
      </Button>
    </div>
  );
};

export default Feedback;
