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
        <h2 className="font-bold text-lg text-white text-center">
          + Add New Interview
        </h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us about the Interview you want to conduct
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <div className="my-3">
                    <p className="font-semibold text-black mb-2">Job Title</p>
                    <Input
                      type="text"
                      placeholder="For example: Frontend Developer"
                      className="border border-gray-300 rounded-lg p-2 w-full"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>

                  <div className="my-3">
                    <p className="font-semibold text-black mb-2">
                      Job Description/Tech Stack
                    </p>
                    <Textarea
                      placeholder="For example: React, Node, Express, MongoDB"
                      className="border border-gray-300 rounded-lg p-2 w-full"
                      required
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>

                  <div className="my-3">
                    <p className="font-semibold text-black mb-2">
                      Years of Experience
                    </p>
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
                  <Button
                    type="submit"
                    disabled={loading}
                    className="hover:scale-105"
                  >
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
