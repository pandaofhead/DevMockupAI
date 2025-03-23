"use client";
import { useState, useEffect } from "react";
import ResumeList from "../_components/ResumeList";
import DefaultResumeModal from "./_components/DefaultResumeModal";
import { useUser } from "@clerk/nextjs";
import { hasDefaultResume } from "@/lib/actions/resume";
import Breadcrumb from "@/components/Breadcrumb";
import { LoaderCircle } from "lucide-react";
import AddResume from "../_components/AddResume";
const breadcrumbItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Resume" },
];
export default function ResumePage() {
  // State for modal and user status
  const [showModal, setShowModal] = useState(false);
  const [checkingForDefaultResume, setCheckingForDefaultResume] =
    useState(true);
  const [foundDefaultResume, setFoundDefaultResume] = useState(null);
  const { isLoaded: userLoaded, user } = useUser();

  // Debug info function
  const logDebugInfo = () => {
    console.log("Debug Info:", {
      userLoaded,
      userId: user?.id,
      checkingForDefaultResume,
      foundDefaultResume,
      showModal,
    });
  };

  // Check if we recently created a default resume (to avoid showing modal again)
  const recentlyCreatedDefault =
    typeof window !== "undefined" &&
    localStorage.getItem("defaultResumeCreated") === "true";

  useEffect(() => {
    // Log initial state
    logDebugInfo();

    // Wait for user to load
    if (!userLoaded) return;

    // Skip check if we recently created a default resume
    if (recentlyCreatedDefault) {
      console.log("Recently created default resume, skipping check");
      setCheckingForDefaultResume(false);
      setFoundDefaultResume(true);
      return;
    }

    // Check if user has a default resume
    async function checkDefaultResume() {
      try {
        console.log("Checking if user has default resume...");
        const hasDefault = await hasDefaultResume(user.id);
        console.log("Default resume check result:", hasDefault);

        setFoundDefaultResume(hasDefault);

        // If no default resume, show modal
        if (!hasDefault) {
          console.log("No default resume found, showing modal");
          setShowModal(true);
        }
      } catch (error) {
        console.error("Error checking for default resume:", error);
      } finally {
        setCheckingForDefaultResume(false);
      }
    }

    checkDefaultResume();
  }, [userLoaded, user]);

  // Handle modal completion
  const handleModalComplete = () => {
    console.log("Modal completed - setting localStorage flag");
    localStorage.setItem("defaultResumeCreated", "true");
    setShowModal(false);
    setFoundDefaultResume(true);

    // Force page reload to refresh data
    window.location.reload();
  };

  // Show loading state
  if (!userLoaded || checkingForDefaultResume) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <LoaderCircle className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">
          Loading your resume information...
        </p>
      </div>
    );
  }

  return (
    <div className="container py-6">
      {/* Show modal if needed */}
      {showModal && <DefaultResumeModal onComplete={handleModalComplete} />}

      {/* Main content */}
      <header className="mb-8">
        <Breadcrumb items={breadcrumbItems} />
        <div>
          <p className="text-gray-500 dark:text-white">
            Generate your Resume here
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-4">
            <AddResume />
          </div>
          <h2 className="text-2xl font-bold my-8">Your Resumes</h2>
        </div>
      </header>

      <ResumeList />
    </div>
  );
}
