"use client";
import React, { useContext, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Link from "next/link";
import {
  Handshake,
  BellRing,
  Video,
  NotepadText,
  FileCode2,
  MessageSquareQuote,
  Play,
  CircleHelp,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarContext } from "@/context/SidebarContext";

export default function Sidebar() {
  const path = usePathname();
  const { isCollapsed, toggleSidebar } = useContext(SidebarContext);
  const menuList = [
    {
      group: "Get Started",
      items: [
        {
          link: "/dashboard",
          name: "How to use",
          icon: <Play />,
        },
        {
          link: "/faqs",
          name: "FAQs",
          icon: <CircleHelp />,
        },
      ],
    },
    {
      group: "Resume",
      items: [
        {
          link: "/dashboard/resume/default",
          name: "Default",
          icon: <NotepadText />,
        },
        {
          link: "/dashboard/resume/custom",
          name: "Custom",
          icon: <FileCode2 />,
        },
      ],
    },
    {
      group: "Interview",
      items: [
        {
          link: "/dashboard/interview/interviews",
          name: "Interviews",
          icon: <Video />,
        },
        {
          link: "/dashboard/interview/feedback",
          name: "Feedback",
          icon: <MessageSquareQuote />,
        },
      ],
    },
    {
      group: "Settings",
      items: [
        {
          link: "/user-profile",
          name: "Profile",
          icon: <UserButton />,
        },
        {
          link: "/dashboard/notifications",
          name: "Notifications",
          icon: <BellRing />,
        },
        {
          link: "/terms",
          name: "Terms",
          icon: <Handshake />,
        },
      ],
    },
  ];

  return (
    <div
      className={`flex flex-col min-h-screen p-9 ${
        isCollapsed ? "w-25" : "w-[300px]"
      } transition-width duration-500`}
    >
      <button
        onClick={toggleSidebar}
        className="flex w-full justify-end bg-transparent rounded-md hover:scale-105 transition-all "
      >
        {isCollapsed ? <ChevronsRight /> : <ChevronsLeft />}
      </button>
      <Command className="bg-transparent">
        <CommandList>
          {menuList.map((menu, index) => (
            <CommandGroup heading={menu.group} key={index}>
              {menu.items.map((item, idx) => (
                <Link href={item.link} key={idx}>
                  <CommandItem
                    className={`cursor-pointer flex flex-row justify-between items-center ${
                      path === item.link
                        ? "bg-white font-bold text-secondary"
                        : ""
                    }`}
                  >
                    {!isCollapsed && <span className="ml-2">{item.name}</span>}
                    {item.icon}
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </div>
  );
}
