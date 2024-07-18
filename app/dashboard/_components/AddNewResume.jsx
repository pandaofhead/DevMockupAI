"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("jobPosition", jobPosition);
    console.log("jobDescription", jobDescription);
    console.log("jobExperience", jobExperience);
    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover: shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-white text-center">
          + Add New Resume
        </h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Enter the description of the job position
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div className="my-3">
                  <p className="font-semibold mb-2">
                    Job Description / Tech Stack
                  </p>
                  <Textarea
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    required
                    onChange={(e) => setJobDesc(e.target.value)}
                  />
                </div>

                <div className="flex gap-5 justify-end my-3">
                  <Button
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-all"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="hover:scale-105"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                      </>
                    ) : (
                      "Generate Resume"
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

export default AddNewResume;
