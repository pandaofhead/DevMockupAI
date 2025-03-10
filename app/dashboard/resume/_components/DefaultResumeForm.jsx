"use client";
import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
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
import {
  Resume,
  ResumePersonal,
  ResumeEducation,
  ResumeExperience,
  ResumeSkills,
} from "@/utils/schema";
import moment from "moment";
import { eq } from "drizzle-orm";

export default function DefaultResumeForm({ isEditing = false, existingResumeId = null, resumeTitle = null }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const resumeId = existingResumeId || uuidv4();
  const { user } = useUser();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [originalTitle, setOriginalTitle] = useState("");

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

    return (
      personalValidation.isValid &&
      educationValidation.isValid &&
      experienceValidation.isValid &&
      skillsValidation.isValid
    );
  };

  const handleSave = async () => {
    console.log("Starting save process...");
    
    if (!validateForm()) {
      console.log("Form validation failed");
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      // Prepare the data for storage by sanitizing
      const sanitizedResumeInfo = {
        ...resumeInfo,
        experience: resumeInfo.experience.map(exp => ({
          ...exp,
          workSummary: typeof exp.workSummary === 'string' ? exp.workSummary : ''
        }))
      };

      const isDefaultResume = !isEditing;
      const resumeData = {
        resumeId: resumeId,
        resumeTitle: isDefaultResume ? "Default Resume" : (resumeTitle || `${sanitizedResumeInfo.firstName} ${sanitizedResumeInfo.lastName}'s Resume`),
        jobDesc: sanitizedResumeInfo.jobTitle || "",
        resumeText: "",
        resumeSections: JSON.stringify(sanitizedResumeInfo),
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        isDefault: isDefaultResume,
      };

      if (isEditing) {
        // Update existing resume
        await db
          .update(Resume)
          .set(resumeData)
          .where(eq(Resume.resumeId, existingResumeId));
      } else {
        // Create new resume
        await db.insert(Resume).values(resumeData);
      }

      toast.success(`Resume ${isEditing ? 'updated' : 'saved'} successfully!`);
      router.push("/dashboard/resume");
    } catch (error) {
      console.error(`Failed to ${isEditing ? 'update' : 'save'} resume:`, error);
      toast.error(error.message || `Failed to ${isEditing ? 'update' : 'save'} resume`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-8">
      <LoaderCircle className="w-8 h-8 animate-spin" />
    </div>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {isEditing ? 'Edit Resume' : 'Create Your Default Resume'}
        </h1>
      </div>

      <div className="space-y-6">
        <div className="bg-card rounded-lg shadow-sm">
          <PersonalDetail params={{ resumeId }} errors={errors.personal} />
        </div>

        <div className="bg-card rounded-lg shadow-sm">
          <Education params={{ resumeId }} errors={errors.education} />
        </div>

        <div className="bg-card rounded-lg shadow-sm">
          <Experience params={{ resumeId }} errors={errors.experience} />
        </div>

        <div className="bg-card rounded-lg shadow-sm">
          <Project params={{ resumeId }} />
        </div>

        <div className="bg-card rounded-lg shadow-sm">
          <Skills params={{ resumeId }} errors={errors.skills} />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleSave} disabled={loading} size="lg">
          {loading ? <LoaderCircle className="animate-spin mr-2" /> : null}
          {isEditing ? 'Save Changes' : 'Save as Default Resume'}
        </Button>
      </div>
    </div>
  );
}
