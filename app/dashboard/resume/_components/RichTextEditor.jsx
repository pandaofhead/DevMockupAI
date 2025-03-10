"use client";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Bot, LoaderCircle, Check, X } from "lucide-react";
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
import { eq } from "drizzle-orm";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PROMPT =
  "Based on this job description:\n{jobDesc}\n\nRewrite this experience to better align with the job requirements:\n{workSummary}\n\nProvide exactly 3-4 bullet points that highlight relevant achievements and skills. Format in HTML with <ul> and <li> tags. Focus only on the most relevant experience. Be concise and specific.";

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [jobDescInfo, setJobDescInfo] = useState("");
  const [resumeId, setResumeId] = useState(null);
  const [isDefaultResume, setIsDefaultResume] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");

  // Fetch Job Description
  useEffect(() => {
    if (pathname.includes("new")) {
      setIsDefaultResume(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (!isDefaultResume) {
      const path = window.location.pathname.split("/");
      const resumeId = path[path.length - 2];
      if (resumeId) {
        setResumeId(resumeId);
        fetchJobDescInfo(resumeId);
      }
    }
  }, [router, isDefaultResume]);

  const fetchJobDescInfo = async (resumeId) => {
    try {
      const resume = await db
        .select()
        .from(Resume)
        .where(eq(Resume.resumeId, resumeId))
        .then((res) => res[0]);
      if (resume) {
        setJobDescInfo(resume.jobDesc);
      }
    } catch (error) {
      console.error("Failed to fetch resume data:", error);
    }
  };

  const GenerateSummaryFromAI = async () => {
    if (!resumeId) {
      toast.error("Resume ID is missing");
      return;
    }
    if (!resumeInfo?.experience[index]?.title || !jobDescInfo) {
      toast.error("Please add Position Title and ensure there is a job description");
      return;
    }
    setLoading(true);
    
    try {
      const prompt = PROMPT
        .replace("{workSummary}", value)
        .replace("{jobDesc}", jobDescInfo);

      const result = await chatSession.sendMessage(prompt);
      let resp = result.response.text();
      
      // Clean up the response to only get the HTML content
      if (resp.includes("<ul>")) {
        resp = resp.substring(resp.indexOf("<ul>"), resp.indexOf("</ul>") + 5);
      }
      
      setAiSuggestion(resp);
      setShowAIModal(true);
    } catch (error) {
      console.error("AI generation failed:", error);
      toast.error("Failed to generate content");
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptSuggestion = () => {
    setValue(aiSuggestion);
    onRichTextEditorChange(aiSuggestion);
    setShowAIModal(false);
    toast.success("AI suggestion applied!");
  };

  return (
    <div>
      {!isDefaultResume && (
        <div className="flex justify-between my-2">
          <Button
            variant="outline"
            size="sm"
            onClick={GenerateSummaryFromAI}
            disabled={loading || !jobDescInfo}
            className="flex gap-2 border-primary text-primary"
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <>
                <Bot className="h-4 w-4" /> Generate with AI
              </>
            )}
          </Button>
        </div>
      )}

      <Dialog open={showAIModal} onOpenChange={setShowAIModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>AI Suggestion</DialogTitle>
            <DialogDescription>
              Select these bullet points to replace your current experience:
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 bg-muted rounded-lg prose prose-sm max-w-none">
            <div dangerouslySetInnerHTML={{ __html: aiSuggestion }} />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowAIModal(false)}
              className="flex gap-2"
            >
              <X className="h-4 w-4" /> Reject
            </Button>
            <Button
              onClick={handleAcceptSuggestion}
              className="flex gap-2"
            >
              <Check className="h-4 w-4" /> Accept
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e.target.value);
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
