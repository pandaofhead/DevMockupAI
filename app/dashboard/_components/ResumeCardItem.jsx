"use client";
import { Loader2Icon, MoreVertical, Trash2, Download } from "lucide-react";
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

function ResumeCardItem({ resume, refreshData }) {
  const router = useRouter();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    try {
      await db
        .delete()
        .from(Resume)
        .where(eq(Resume.resumeId, resume.resumeId));
      refreshData();
      setOpenAlert(false);
      toast.success("Resume deleted successfully", {
        duration: 3000,
      });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
    setLoading(false);
  };

  const formatName = (name) => {
    return name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <div className="border-2 rounded-md dark:border-gray-200 ">
      <Link href={"/dashboard/resume/" + resume?.resumeId + "/edit"}>
        <div className="bg-white dark:bg-slate-700 h-[150px] rounded-t-md">
          <div className="flex justify-center items-center h-full flex-col hover:scale-105">
            <h2 className="text-xl">
              {formatName(resume?.resumeTitle)}
            </h2>
          </div>
        </div>
      </Link>
      <div className="p-4 bg-secondary flex justify-between text-white rounded-b-md ">
        <p>Created At: {resume?.createdAt}</p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="flex justify-between"
              onClick={() =>
                router.push("/my-resume/" + resume?.resumeId + "/view")
              }
            >
              Download <Download />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex justify-between"
              onClick={() => setOpenAlert(true)}
            >
              Delete <Trash2 color="red" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent className="bg-white dark:bg-slate-800">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCardItem;
