"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { db } from "@/utils/db";
import { Notification } from "@/utils/schema";
function Notifications() {
  const [openAlert, setOpenAlert] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [loading, setLoading] = useState(false);
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Notifications" },
  ];
  const onDelete = async () => {
    setLoading(true);
    try {
      await db
        .delete()
        .from(Notification)
        .where(eq(Notification.notificationId, notifications.notificationId));
      refreshData();
      setOpenAlert(false);
      toast.success("Notification deleted successfully", {
        duration: 3000,
      });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
    setLoading(false);
  };

  const notifications = [
    {
      id: 1,
      title: "Your call has been confirmed.",
      message:
        "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
      time: "1 hour ago",
    },
    {
      id: 2,
      title: "You have a new message!",
      message:
        "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
      time: "1 hour ago",
    },
    {
      id: 3,
      title: "Your subscription is expiring soon!",
      message:
        "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
      time: "2 hours ago",
    },
  ];
  return (
    <div className="p-10">
      <Breadcrumb items={breadcrumbItems} />
      <div className="">
        <p className="text-gray-600 my-2 dark:text-slate-300">
          {unreadMessages === 0
            ? "You have no unread messages."
            : `You have ${unreadMessages} unread messages.`}
        </p>
        {notifications.map((notification) => (
          <Sheet key={notification.id}>
            <div className="flex justify-between items-center p-4 my-4 border-black border-2 rounded-lg md:w-[100vh] sm:w-full w-full hover:bg-gray-200 dark:hover:bg-slate-800">
              <SheetTrigger>
                <p className="flex justify-start">{notification.title}</p>
                <p className="text-gray-500 text-sm flex justify-start dark:text-slate-300">
                  {notification.time}
                </p>
              </SheetTrigger>
              <div>
                <Trash2
                  className="hover:text-red-500 hover:scale-125 transition-all"
                  onClick={() => {
                    setOpenAlert(true);
                  }}
                />
                <AlertDialog open={openAlert}>
                  <AlertDialogContent className="bg-white dark:bg-slate-800">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={onDelete} disabled={loading}>
                        {loading ? (
                          <Loader2Icon className="animate-spin" />
                        ) : (
                          "Delete"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{notification.title}</SheetTitle>
                <SheetDescription>{notification.message}</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
