"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);

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
        <h2 className="font-bold text-lg">+ Add New Interview</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us about the job
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <div className="mt-7 my-3">
                    <label className="my-3">Job Title</label>
                    <Input
                      type="text"
                      placeholder="Frontend Developer"
                      className="border border-gray-300 rounded-lg p-2 w-full"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>

                  <div className="my-3">
                    <label className="my-3">Job Description/Tech Stack</label>
                    <Textarea
                      placeholder="React, Node, Express, MongoDB"
                      className="border border-gray-300 rounded-lg p-2 w-full"
                      required
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>

                  <div className="my-3">
                    <label className="my-3">Years of Experience</label>
                    <Input
                      type="number"
                      max="40"
                      placeholder="2"
                      className="border border-gray-300 rounded-lg p-2 w-full"
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-5 justify-end my-3">
                  <Button
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-all"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating
                        from AI
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

export default AddNewInterview;
