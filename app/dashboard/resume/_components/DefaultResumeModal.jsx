"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import DefaultResumeForm from "./DefaultResumeForm";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

export default function DefaultResumeModal({ onComplete }) {
  console.log("##### DefaultResumeModal component MOUNTED #####");

  // Always keep the modal open until explicitly closed by onComplete
  const [open, setOpen] = useState(true);
  const [startedForm, setStartedForm] = useState(false);
  const [resumeInfo, setResumeInfo] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
    education: [],
    experience: [],
    projects: [],
    skills: [],
  });

  console.log("DefaultResumeModal initial state:", { open, startedForm });

  // Force dialog to be open on mount and whenever it tries to close
  useEffect(() => {
    console.log("DefaultResumeModal useEffect - forcing open state");
    // Schedule this to run after any state updates that might close the modal
    const timerId = setTimeout(() => {
      if (!open) {
        console.log("Modal was closed, forcing it open again");
        setOpen(true);
      }
    }, 0);

    return () => clearTimeout(timerId);
  }, [open]);

  // Debug each render
  useEffect(() => {
    console.log("DefaultResumeModal rendered with state:", {
      open,
      startedForm,
    });
    return () => {
      console.log("DefaultResumeModal unmounting");
    };
  });

  // Completely block any attempt to close the dialog
  const handleOpenChange = (newOpen) => {
    console.log("Modal open change attempted:", newOpen);
    if (newOpen === false) {
      // Always prevent closing the modal
      console.log("Preventing modal from closing - MUST use form");
      return;
    }
    setOpen(true);
  };

  const closeModal = () => {
    console.log(
      "closeModal function called - this should only happen after form submission"
    );
    setOpen(false);
    // Call the parent's onComplete callback
    if (onComplete && typeof onComplete === "function") {
      console.log("Calling parent onComplete callback");
      onComplete();
    }
  };

  // Add an overlay style to prevent interaction with background
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker background for better visibility
    zIndex: 999, // Make sure it's below the modal but above everything else
  };

  // Custom styles for the dialog content to make it scrollable
  const modalStyles = {
    maxHeight: "90vh",
    overflow: "hidden",
  };

  // If user starts the form, show the form in the modal
  if (startedForm) {
    console.log("Rendering form view in modal");
    return (
      <>
        <div style={overlayStyle} />
        <Dialog open={true} onOpenChange={handleOpenChange}>
          <DialogContent
            className="max-w-4xl z-[1000]"
            style={modalStyles}
            onEscapeKeyDown={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Create Your Default Resume
              </DialogTitle>
            </DialogHeader>
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "calc(90vh - 120px)" }}
            >
              <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
                <DefaultResumeForm onComplete={closeModal} />
              </ResumeInfoContext.Provider>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  console.log("Rendering options view in modal");
  return (
    <>
      <div style={overlayStyle} />
      <Dialog open={true} onOpenChange={handleOpenChange}>
        <DialogContent
          className="max-w-3xl z-[1000]"
          style={modalStyles}
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <div className="py-4">
            <p className="text-muted-foreground mb-6">
              <strong>Before you can create custom resumes</strong>, you need to
              set up your default resume with your core information.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Manual Entry Option */}
              <div
                className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-4 hover:border-muted cursor-pointer transition-colors"
                onClick={() => {
                  console.log("Start from scratch clicked");
                  setStartedForm(true);
                }}
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <span className="text-2xl font-bold">+</span>
                </div>
                <h2 className="text-xl font-semibold">Start from Scratch</h2>
                <p className="text-center text-sm text-muted-foreground">
                  Create your resume by filling out each section manually
                </p>
                <Button className="mt-2">Get Started</Button>
              </div>

              {/* PDF Upload Option - Disabled for now */}
              <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-4 opacity-50 cursor-not-allowed">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <Upload className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-semibold">Upload Resume</h2>
                <p className="text-center text-sm text-muted-foreground">
                  Upload your existing resume and we'll help you format it
                  (Coming soon)
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
