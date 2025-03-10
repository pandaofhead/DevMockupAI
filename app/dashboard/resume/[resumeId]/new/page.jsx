"use client";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import DefaultResumeForm from "../../_components/DefaultResumeForm";
import { useState } from "react";

export default function NewResumePage() {
  const [startedForm, setStartedForm] = useState(false);

  if (startedForm) {
    return <DefaultResumeForm />;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Create Your Default Resume</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Manual Entry Option */}
        <div 
          className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-4 hover:border-primary cursor-pointer transition-colors"
          onClick={() => setStartedForm(true)}
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">+</span>
          </div>
          <h2 className="text-xl font-semibold">Start from Scratch</h2>
          <p className="text-center text-sm text-muted-foreground">
            Create your resume by filling out each section manually
          </p>
          <Button>Get Started</Button>
        </div>

        {/* PDF Upload Option - Disabled for now */}
        <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-4 opacity-50 cursor-not-allowed">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Upload Resume</h2>
          <p className="text-center text-sm text-muted-foreground">
            Upload your existing resume and we'll help you format it
            (Coming soon)
          </p>
        </div>

      </div>
    </div>
  );
} 