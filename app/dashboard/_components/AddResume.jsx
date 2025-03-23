"use client";
import React, { useState } from "react";
import { PlusSquare, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Resume } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!user?.primaryEmailAddress?.emailAddress) {
      toast.error('User email not found. Please ensure you are logged in.');
      return;
    }

    if (!resumeTitle || !jobDesc) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    try {
      // First, get the default resume data
      const defaultResume = await db
        .select()
        .from(Resume)
        .where(eq(Resume.isDefault, true))
        .where(eq(Resume.createdBy, user.primaryEmailAddress.emailAddress))
        .then((res) => res[0]);

      if (!defaultResume) {
        toast.error("No default resume found. Please create a default resume first.");
        setOpenDialog(false);
        return;
      }

      const defaultSections = JSON.parse(defaultResume.resumeSections);
      const resumeId = uuidv4();

      // Create new resume with default data but keep the new title
      const resumeData = {
        resumeId: resumeId,
        resumeTitle: resumeTitle.trim(),
        jobDesc: jobDesc.trim(),
        resumeText: "",
        resumeSections: JSON.stringify({
          ...defaultSections,
          resumeTitle: resumeTitle.trim() // Add the title to sections as well
        }),
        createdBy: user.primaryEmailAddress.emailAddress,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        isDefault: false,
      };

      await db.insert(Resume).values(resumeData);
      setOpenDialog(false);
      router.push(`/dashboard/resume/${resumeId}/edit?title=${encodeURIComponent(resumeTitle.trim())}`);
      toast.success("Resume created successfully!");
    } catch (error) {
      console.error('Error creating resume:', error);
      toast.error(error.message || 'Failed to create resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-md bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all flex items-center justify-center"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-white text-center">
          + Add New Resume
        </h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Create New Resume</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">
                      Add a title for your new resume
                    </p>
                    <Input
                      className="border border-gray-300 rounded-lg p-2 w-full dark:bg-gray-800"
                      placeholder="Ex. Full Stack Resume"
                      required
                      value={resumeTitle}
                      onChange={(e) => setResumeTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <p className="font-semibold mb-2">
                      Add the job description
                    </p>
                    <Textarea
                      className="border border-gray-300 rounded-lg p-2 w-full dark:bg-gray-800"
                      placeholder="Paste the job description here..."
                      required
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-5 mt-6">
                  <Button 
                    type="button" 
                    onClick={() => setOpenDialog(false)} 
                    variant="ghost"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading || !resumeTitle || !jobDesc}
                  >
                    {loading ? <Loader2 className="animate-spin" /> : "Create"}
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

export default AddResume;
