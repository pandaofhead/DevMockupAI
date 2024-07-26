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

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Insert data into the database
    const resp = await db
      .insert(Resume)
      .values({
        resumeId: uuidv4(),
        resumeTitle: resumeTitle,
        jobDesc: jobDesc,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      })
      .returning({ resumeId: Resume.resumeId });
    if (resp) {
      setOpenDialog(false);
      router.push("/dashboard/resume/" + resp[0]?.resumeId + "/edit");
    }

    setLoading(false);
  };
  return (
    <div>
      <div
        className="p-10 border rounded-md bg-secondary hover:scale-105 hover: shadow-md cursor-pointer transition-all flex items-center justify-center"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-white text-center">
          + Add New Resume
        </h2>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Create New Resume</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <p className="font-semibold mb-2">
                    Add a title for your new resume
                  </p>
                  <Input
                    className="border border-gray-300 rounded-lg p-2 w-full dark:bg-gray-800"
                    placeholder="Ex.Full Stack resume"
                    required
                    onChange={(e) => setResumeTitle(e.target.value)}
                  />
                  <div className="my-3">
                    <p className="font-semibold mb-2">
                      Add the job description for your target position or enter
                      a URL
                    </p>
                    <Textarea
                      className="border border-gray-300 rounded-lg p-2 w-full dark:bg-gray-800"
                      placeholder="Our company is looking for a Full Stack Developer..."
                      required
                      maxLength={150}
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-5">
                  <Button onClick={() => setOpenDialog(false)} variant="ghost">
                    Cancel
                  </Button>
                  <Button
                    disabled={!resumeTitle || !jobDesc || loading}
                    onClick={() => onCreate()}
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
