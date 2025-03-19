"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AddInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [questionType, setQuestionType] = useState("domain");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    // disable refresh screen
    e.preventDefault();
    setLoading(true);

    // Updated prompt to include question type
    const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. 
    
    Please generate 3 interview questions with answers focused on ${questionType} questions.
    
    ${questionType === "leetcode" ? 
      "For Leetcode questions, include one algorithm problems relevant to the job position with detailed solution approaches." : 
      questionType === "behavioral" ? 
      "For Behavioral questions, focus on past experiences, teamwork, conflict resolution, and leadership relevant to the position." :
      "For Domain Knowledge questions, focus on technical concepts, tools, and methodologies specific to the job position and description."}
    
    Each question and answer should be in the format:
    {
      "question": "Your question here",
      "answer": "Your answer here"
    }`;

    const result = await chatSession.sendMessage(inputPrompt);
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(MockJsonResp);
    setJsonResponse(MockJsonResp);

    if (MockJsonResp) {
      // Insert the interview into the database
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          questionType: questionType, // Add new field to store question type
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        })
        .returning({ mockId: MockInterview.mockId });
      if (resp) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + resp[0]?.mockId); // Fixed typo in route
      }
    } else {
      console.log("Error in generating interview questions");
    }
    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-md bg-secondary hover:scale-105 hover: shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-white text-center">
          + Add New Interview
        </h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us about the Interview you want to conduct
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <p className="font-semibold mb-2">Job Title</p>
                  <Input
                    type="text"
                    className="border border-gray-300 rounded-lg p-2 w-full dark:bg-gray-800"
                    required
                    onChange={(e) => setJobPosition(e.target.value)}
                  />

                  <div className="my-3">
                    <p className="font-semibold mb-2">
                      Job Description/Tech Stack
                    </p>
                    <Textarea
                      className="border border-gray-300 rounded-lg p-2 w-full"
                      required
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>

                  <div className="my-3">
                    <p className="font-semibold mb-2">Years of Experience</p>
                    <Input
                      type="number"
                      max="40"
                      min="0"
                      className="border border-gray-300 rounded-lg p-2 w-full dark:bg-gray-800"
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="my-3">
                  <div className="my-3">
                    <p className="font-semibold mb-2">Type of questions</p>
                    <Select 
                      defaultValue="domain" 
                      onValueChange={setQuestionType}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select question type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="leetcode">Leetcode (Algorithms & Data Structures)</SelectItem>
                        <SelectItem value="behavioral">Behavioral</SelectItem>
                        <SelectItem value="domain">Domain Knowledge</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-5 justify-end my-3">
                  <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      !jobPosition ||
                      !jobDesc ||
                      !jobExperience ||
                      !questionType ||
                      loading
                    }
                    className="hover:scale-105"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddInterview;
