"use client";
import React, { useContext } from "react";
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
  BarChartBig,
  Play,
  CircleHelp,
  ChevronsLeft,
  ChevronsRight,
  CreditCard,
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
          name: "How to Start",
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
      group: "Features",
      items: [
        {
          link: "/dashboard/resume",
          name: "Resume",
          icon: <NotepadText />,
        },
        {
          link: "/dashboard/interview",
          name: "Interview",
          icon: <Video />,
        },
        {
          link: "/dashboard/analytics",
          name: "Analytics",
          icon: <BarChartBig />,
        },
      ],
    },
    {
      group: "General",
      items: [
        {
          link: "/dashboard/credits",
          name: "Credits",
          icon: <CreditCard />,
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
        className="flex w-full justify-end rounded-md hover:scale-105 transition-all "
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
                    className={`cursor-pointer flex flex-row justify-between items-center dark:hover:text-secondary
                    ${
                      (item.link === "/dashborad" && path === "/dashboard") ||
                      (item.link !== "/dashboard" && path.startsWith(item.link))
                        ? "font-bold text-secondary"
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
