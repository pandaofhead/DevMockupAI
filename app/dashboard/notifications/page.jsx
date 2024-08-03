"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import NotificationCard from "./_components/NotificationCard";

function Notifications({ parmas }) {
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [loading, setLoading] = useState(false);
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Notifications" },
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
        <NotificationCard />
      </div>
    </div>
  );
}

export default Notifications;
