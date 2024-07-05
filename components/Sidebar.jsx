"use client";
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
} from "lucide-react";

export default function Sidebar() {
  const menuList = [
    {
      group: "Resumes",
      items: [
        {
          link: "/dashboard",
          name: "Default",
          icon: <NotepadText />,
        },
        {
          link: "/",
          name: "Custom",
          icon: <FileCode2 />,
        },
      ],
    },
    {
      group: "Interviews",
      items: [
        {
          link: "/",
          name: "Upcoming",
          icon: <Video />,
        },
        {
          link: "/",
          name: "Rating",
          icon: <MessageSquareQuote />,
        },
      ],
    },
    {
      group: "Settings",
      items: [
        {
          link: "/",
          name: "Profile",
          icon: <UserButton />,
        },
        {
          link: "/",
          name: "Notifications",
          icon: <BellRing />,
        },
        {
          link: "/",
          name: "Terms",
          icon: <Handshake />,
        },
      ],
    },
  ];
  return (
    <div className="flex flex-col w-[300px] min-h-screen p-9">
      <Command className="bg-transparent">
        <CommandList>
          {menuList.map((menu) => (
            <CommandGroup heading={menu.group}>
              {menu.items.map((item) => (
                <Link href={item.link}>
                  <CommandItem className="cursor-pointer flex flex-row justify-between">
                    {item.name}
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
