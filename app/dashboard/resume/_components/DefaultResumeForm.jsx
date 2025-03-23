"use client";
import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle, FileDown } from "lucide-react";
import PersonalDetail from "./forms/PersonalDetail";
import Education from "./forms/Education";
import Experience from "./forms/Experience";
import Project from "./forms/Project";
import Skills from "./forms/Skills";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import {
  validatePersonalDetails,
  validateEducation,
  validateExperience,
  validateSkills,
} from "@/utils/validations";
import { toast } from "sonner";
import { db } from "@/utils/db";
import { Resume } from "@/utils/schema";
import moment from "moment";
import { eq } from "drizzle-orm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  detectResumeType,
  extractTechnologies,
  recordResumeType,
  recordTechStack,
} from "@/utils/analytics-helpers";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createDefaultResume } from "@/lib/actions/resume";

export default function DefaultResumeForm({
  isEditing = false,
  existingResumeId = null,
  resumeTitle = null,
  onComplete = null,
}) {
  console.log("DefaultResumeForm rendered");
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const resumeId = existingResumeId || uuidv4();
  const { user } = useUser();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [originalTitle, setOriginalTitle] = useState("");

  console.log("DefaultResumeForm user state:", { 
    isLoaded: !!user, 
    email: user?.primaryEmailAddress?.emailAddress 
  });

  useEffect(() => {
    const fetchResumeData = async () => {
      if (!existingResumeId) return;

      try {
        setLoading(true);
        const resume = await db
          .select()
          .from(Resume)
          .where(eq(Resume.resumeId, existingResumeId))
          .then((res) => res[0]);

        if (resume) {
          const sections = JSON.parse(resume.resumeSections);
          setResumeInfo(sections);
          setOriginalTitle(resume.resumeTitle); // Store the original title
        }
      } catch (error) {
        console.error("Error fetching resume:", error);
        toast.error("Failed to load resume data");
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [existingResumeId, setResumeInfo]);

  const validateForm = () => {
    console.log("Validating form...");
    
    const personalValidation = validatePersonalDetails(resumeInfo);
    const educationValidation = validateEducation(resumeInfo.education);
    const experienceValidation = validateExperience(resumeInfo.experience);
    const skillsValidation = validateSkills(resumeInfo.skills);

    const newErrors = {
      personal: personalValidation.errors,
      education: educationValidation.errors,
      experience: experienceValidation.errors,
      skills: skillsValidation.errors,
    };

    setErrors(newErrors);
    
    const isValid = (
      personalValidation.isValid &&
      educationValidation.isValid &&
      experienceValidation.isValid &&
      skillsValidation.isValid
    );
    
    console.log("Form validation result:", isValid ? "Valid" : "Invalid", newErrors);
    
    return isValid;
  };

  const handleSave = async () => {
    console.log("##### Starting save process #####");

    if (!validateForm()) {
      console.log("Form validation failed, aborting save");
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      if (!user?.primaryEmailAddress?.emailAddress) {
        console.error("No user email found");
        throw new Error("User email not found. Please ensure you are logged in.");
      }

      console.log("Creating resume with user email:", user.primaryEmailAddress.emailAddress);

      // Prepare the data for storage by sanitizing
      const sanitizedResumeInfo = {
        ...resumeInfo,
        experience: resumeInfo.experience.map((exp) => ({
          ...exp,
          workSummary:
            typeof exp.workSummary === "string" ? exp.workSummary : "",
        })),
      };

      const isDefaultResume = !isEditing;
      console.log("Setting isDefault to:", isDefaultResume);
      
      const resumeData = {
        resumeId: resumeId,
        resumeTitle: isDefaultResume
          ? "Default Resume"
          : resumeTitle ||
            `${sanitizedResumeInfo.firstName} ${sanitizedResumeInfo.lastName}'s Resume`,
        jobDesc: sanitizedResumeInfo.jobTitle || "",
        resumeText: "",
        resumeSections: JSON.stringify(sanitizedResumeInfo),
        createdBy: user.primaryEmailAddress.emailAddress,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        isDefault: isDefaultResume,
      };

      console.log("Saving resume with data:", {
        resumeId: resumeData.resumeId,
        resumeTitle: resumeData.resumeTitle,
        isDefault: resumeData.isDefault,
        email: resumeData.createdBy,
        jobDesc: resumeData.jobDesc?.substring(0, 20) + "...",
      });

      if (isEditing) {
        // Update existing resume
        console.log(`Updating existing resume (ID: ${existingResumeId})`);
        await db
          .update(Resume)
          .set(resumeData)
          .where(eq(Resume.resumeId, existingResumeId));
          
        console.log("Resume updated successfully");
      } else {
        // Create new resume
        console.log("Inserting new resume to database");
        const result = await db.insert(Resume).values(resumeData);
        console.log("Resume created successfully with isDefault =", isDefaultResume, "DB result:", result);
      }

      // Collect analytics data
      try {
        // Detect resume type based on content
        const resumeType = detectResumeType(sanitizedResumeInfo);
        await recordResumeType(resumeId, resumeType);

        // Extract and record technologies used
        const technologies = extractTechnologies(sanitizedResumeInfo);
        for (const tech of technologies) {
          await recordTechStack(tech);
        }

        console.log("Analytics data collected:", { resumeType, technologies });
      } catch (analyticsError) {
        // Don't block the main flow if analytics fails
        console.error("Error collecting analytics data:", analyticsError);
      }

      toast.success(`Resume ${isEditing ? "updated" : "saved"} successfully!`);
      
      // Call onComplete callback if provided
      if (onComplete && typeof onComplete === 'function') {
        console.log("Calling onComplete callback");
        onComplete();
        
        // Reload the page to refresh the UI state
        if (isDefaultResume) {
          console.log("Scheduling page reload");
          
          // Set a flag in localStorage to indicate we should skip the modal on next load
          try {
            localStorage.setItem('defaultResumeCreated', 'true');
            localStorage.setItem('defaultResumeCreatedTime', Date.now().toString());
          } catch (e) {
            console.error("Could not access localStorage:", e);
          }
          
          setTimeout(() => {
            console.log("Reloading page");
            window.location.href = '/dashboard/resume'; // Use full URL to ensure clean reload
          }, 1000); // Wait for the dialog to close
        }
      } else {
        console.log("Redirecting to resume listing page");
        router.push("/dashboard/resume");
      }
    } catch (error) {
      console.error(
        `Failed to ${isEditing ? "update" : "save"} resume:`,
        error
      );
      toast.error(
        error.message || `Failed to ${isEditing ? "update" : "save"} resume`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format) => {
    try {
      setLoading(true);

      // Validate form before export
      if (!validateForm()) {
        toast.error("Please fill in all required fields before exporting");
        setLoading(false);
        return;
      }

      // Prepare the data for export
      const exportData = {
        resumeId,
        format,
        resumeData: resumeInfo,
      };

      // Debug log to see what data is being sent
      console.log(
        "Exporting resume data:",
        JSON.stringify(exportData.resumeData, null, 2)
      );

      if (format === "PDF") {
        // For PDF, open in a new window/tab for printing
        const response = await fetch("/api/resume/export", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(exportData),
        });

        if (!response.ok) {
          throw new Error("Failed to export resume");
        }

        // Get the HTML content
        const htmlContent = await response.text();

        // Open in a new window
        const printWindow = window.open("", "_blank");
        if (printWindow) {
          printWindow.document.write(htmlContent);
          printWindow.document.close();
          // Print will be triggered by the script in the HTML
        } else {
          toast.error("Please allow pop-ups to export as PDF");
        }

        toast.success(`Resume ready for printing as PDF`);
      } else {
        // For DOC, download as file
        const response = await fetch("/api/resume/export", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(exportData),
        });

        if (!response.ok) {
          throw new Error("Failed to export resume");
        }

        const blob = await response.blob();
        const fileName = `${resumeInfo.firstName || "Resume"}_${
          resumeInfo.lastName || ""
        }.${format.toLowerCase()}`;

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        toast.success(`Resume exported as ${format} successfully!`);
      }
    } catch (error) {
      console.error(`Failed to export resume as ${format}:`, error);
      toast.error(error.message || `Failed to export resume as ${format}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoaderCircle className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {isEditing ? "Edit Resume" : "Create Your Default Resume"}
        </h1>
      </div>

      <div className="space-y-6">
        <div className="bg-card rounded-lg shadow-sm p-4">
          <PersonalDetail params={{ resumeId }} errors={errors.personal} />
        </div>
        <div className="bg-card rounded-lg shadow-sm p-4">
          <Education params={{ resumeId }} errors={errors.education} />
        </div>
        <div className="bg-card rounded-lg shadow-sm p-4">
          <Experience params={{ resumeId }} errors={errors.experience} />
        </div>

        <div className="bg-card rounded-lg shadow-sm p-4">
          <Project params={{ resumeId }} />
        </div>

        <div className="bg-card rounded-lg shadow-sm p-4">
          <Skills params={{ resumeId }} errors={errors.skills} />
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" disabled={loading}>
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExport("PDF")}>
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("DOC")}>
              Export as DOC
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={handleSave} disabled={loading} size="lg">
          {loading ? <LoaderCircle className="animate-spin mr-2" /> : null}
          {isEditing ? "Save Changes" : "Save as Default Resume"}
        </Button>
      </div>
    </div>
  );
}
