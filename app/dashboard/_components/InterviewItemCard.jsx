"use client";
import {
  Loader2Icon,
  MoreVertical,
  Trash2,
  MessageSquareMore,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import Link from "next/link";
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
import FormatName from "./FormatName";
import { toast } from "sonner";
const InterviewItemCard = ({ interview }) => {
  const router = useRouter();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFeedbackPress = () => {
    router.push("interview/" + interview.mockId + "/feedback");
  };

  const onDelete = async () => {
    try {
      await db
        .delete()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interview.mockId));
      toast.success("Interview deleted successfully", {
        duration: 3000,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="border-2 rounded-md dark:border-gray-200">
      <Link href={"/dashboard/interview/" + interview?.mockId}>
        <div className="bg-white dark:bg-slate-700 h-[150px] rounded-t-md">
          <div className="flex justify-center items-center h-full flex-col hover:scale-105">
            <h2 className="text-xl">
              {interview?.jobPosition && FormatName(interview?.jobPosition)}
            </h2>
          </div>
        </div>
      </Link>
      <div className="p-4 bg-secondary flex justify-between text-white rounded-b-md ">
        <p>Created At : {interview?.createdAt}</p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer hover:scale-125" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={onFeedbackPress}
              className="flex justify-between"
            >
              Feedback <MessageSquareMore />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setOpenAlert(true)}
              className="flex justify-between"
            >
              Delete
              <Trash2 color="red" />
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
};

export default InterviewItemCard;
