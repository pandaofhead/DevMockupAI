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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { Notification } from "@/utils/schema";
function NotificationCard() {
  const [openDialog, setOpenDialog] = useState(false);
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
                    setOpenDialog(true);
                  }}
                />
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-xl">
                        Are you sure you want to delete it?
                      </DialogTitle>
                      <DialogDescription>
                        <div className="flex justify-between mt-10 ">
                          <Button
                            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-all"
                            onClick={() => setOpenDialog(false)}
                          >
                            Cancel
                          </Button>
                          <Button className="hover:scale-105">Delete</Button>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
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

export default NotificationCard;
