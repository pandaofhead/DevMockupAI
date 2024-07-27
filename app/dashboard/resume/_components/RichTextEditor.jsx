"use client";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Bot, LoaderCircle } from "lucide-react";
import React, { useContext, useState, useEffect } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { Resume } from "@/utils/schema";
import { eq, single } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const PROMPT =
  "Given experience: {workSummary}, title: {positionTitle} and Job Description: {jobDesc}, revise resume workSummary in 3-4 bullet points to better fit the Job Description (Do not include word Summary and No JSON array) , give results in HTML tags";
function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [jobDescInfo, setJobDescInfo] = useState("?");
  const [resumeId, setResumeId] = useState(null);

  // Fetch Job Description
  useEffect(() => {
    const path = window.location.pathname.split("/");
    const resumeId = path[path.length - 2]; // Extract resumeId from the URL
    if (resumeId) {
      setResumeId(resumeId);
      fetchJobDescInfo();
    }
  }, [router]);

  const fetchJobDescInfo = async (resumeId) => {
    try {
      const resume = await db
        .select()
        .from(Resume)
        .where(eq(Resume.resumeId, resumeId))
        .then((res) => res[0]);
      if (resume) {
        setJobDescInfo(resume.jobDesc);
        console.log("Job Description:", jobDescInfo);
      } else {
        console.error("Resume not found");
        toast("Resume not found", "error");
      }
    } catch (error) {
      console.error("Failed to fetch resume data:", error);
    }
  };

  const GenerateSummaryFromAI = async (jobDescInfo) => {
    if (!resumeId) {
      console.log("Resume ID is missing");
      toast("Resume ID is missing", "error");
      return;
    }
    await fetchJobDescInfo(resumeId);
    if (!resumeInfo?.experience[index]?.title || !jobDescInfo) {
      toast("Please Add Position Title");
      console.log("Please Add Position Title");
      return;
    }
    setLoading(true);
    const prompt = PROMPT.replace("{workSummary}", value)
      .replace("{positionTitle}", resumeInfo.experience[index].title)
      .replace("{jobDesc}", jobDescInfo);

    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    const resp = result.response.text();
    setValue(resp.replace("[", "").replace("]", ""));
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummaryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Bot className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
