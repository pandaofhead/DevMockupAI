"use client";
import React, { useState } from "react";
import { Loader2Icon, MoreVertical, Trash2, Check } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { Notification } from "@/utils/schema";
import moment from "moment";
import { m } from "framer-motion";
function NotificationCard() {
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [read, setRead] = useState(false);
  // const [notifications, setNotifications] = useState([]);

  // const refreshData = async () => {
  //   const data = await db
  //     .select("*")
  //     .from(Notification)
  //     .orderBy(Notification.createdAt, "desc");
  //   setNotifications(data);
  // };

  // useEffect(() => {
  //   refreshData();
  // }, []);

  // mark as read
  // const markAsRead = async (notification) => {
  //   await db
  //     .update(Notification)
  //     .set({ isRead: true })
  //     .where(eq(Notification.notificationId, notification.notificationId));
  //   refreshData();
  // };

  const notifications = [
    {
      id: 1,
      title: "Your call has been confirmed.",
      message:
        "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
      time: "2024-01-01 12:00:00",
    },
    {
      id: 2,
      title: "You have a new message!",
      message:
        "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
      time: "2024-01-01 12:00:00",
    },
    {
      id: 3,
      title: "Your subscription is expiring soon!",
      message:
        "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
      time: "2024-01-01 12:00:00",
    },
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
  return (
    <div>
      {notifications.map((notification) => (
        <Sheet key={notification.id}>
          <div className="flex justify-between items-center p-4 my-4 border-black border-2 rounded-lg md:w-[100vh] sm:w-full w-full hover:bg-gray-200 dark:hover:bg-slate-800">
            <SheetTrigger>
              <p className="flex justify-start mb-2">{notification.title}</p>
              <p className="text-gray-500 text-sm flex justify-start dark:text-slate-300">
                {notification.time}
              </p>
            </SheetTrigger>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical
                    size={24}
                    className="cursor-pointer hover:scale-125"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="flex justify-between gap-4"
                    // onClick={() => markAsRead(notification)}
                  >
                    Mark as read
                    <Check />
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
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
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
  );
}

export default NotificationCard;
