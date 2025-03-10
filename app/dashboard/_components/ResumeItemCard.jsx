"use client";
import { Loader2Icon, MoreVertical, Trash2, Download, Star } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { db } from "@/utils/db";
import { Resume } from "@/utils/schema";
import { eq } from "drizzle-orm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import FormatName from "./FormatName";

function ResumeItemCard({ resume, isDefault, onUpdate }) {
  const router = useRouter();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    if (isDefault) {
      toast.error("Cannot delete default resume");
      return;
    }

    setLoading(true);
    try {
      await db.delete(Resume).where(eq(Resume.resumeId, resume.resumeId));
      onUpdate?.();
      setOpenAlert(false);
      toast.success("Resume deleted successfully", {
        duration: 3000,
      });
      router.push("/dashboard/resume");
    } catch (e) {
      console.error("Error deleting resume:", e);
      toast.error("Failed to delete resume");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (e) => {
    // Don't navigate if clicking on dropdown or alert dialog
    if (e.target.closest('.dropdown-trigger') || e.target.closest('.alert-dialog')) {
      return;
    }
    router.push(`/dashboard/resume/${resume.resumeId}/edit`);
  };

  return (
    <div 
      className={`bg-card rounded-lg p-4 ${isDefault ? 'border-2 border-primary' : ''} cursor-pointer hover:shadow-md transition-all`}
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">{resume.resumeTitle}</h2>
            {isDefault && <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Created by: <FormatName email={resume.createdBy} />
          </p>
          {resume.jobDesc && (
            <p className="text-sm text-muted-foreground mt-1">
              Job Title: {resume.jobDesc}
            </p>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="dropdown-trigger">
            <MoreVertical className="h-5 w-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {!isDefault && (
              <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="text-destructive alert-dialog"
                    onSelect={(e) => {
                      e.preventDefault();
                      setOpenAlert(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your
                      resume.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={onDelete}
                    >
                      {loading ? (
                        <Loader2Icon className="h-4 w-4 animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default ResumeItemCard;
