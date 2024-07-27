"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ThemeSwitch from "./Themeswitch";
import { UserButton } from "@clerk/nextjs";
import { Dropdown, Space, Tooltip } from "antd";
import { ChevronDown } from "lucide-react";
function Header() {
  const dashboradItems = [
    {
      key: "1",
      label: <a href="/dashboard/resume">Resume</a>,
    },
    {
      key: "2",
      label: <a href="/dashboard/interview">Interview</a>,
    },
    {
      key: "3",
      label: <a href="/dashboard/analytics">Analytics</a>,
    },
    {
      key: "4",
      label: <a href="/dashboard/notifications">Notifications</a>,
    },
  ];

  const faqsItems = [
    {
      key: "1",
      label: <a href="/faqs">General</a>,
    },
    {
      key: "2",
      label: <a href="/faqs">Technical</a>,
    },
    {
      key: "3",
      label: <a href="/faqs">Behavioral</a>,
    },
  ];
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 transition-all duration-100 z-[999] w-full flex items-center justify-between px-10 py-4 bg-white dark:bg-slate-800">
      <Link href="/">
        <h1>DevMockupAI</h1>
      </Link>

      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-500 hover:text-primary focus:outline-none focus:text-primary transition-all dark:bg-slate-800"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <div className="flex dark:text-white">
              <p className="mx-2">Menu</p>
              <Bars3Icon className="w-6 h-6" />
            </div>
          )}
        </button>
      </div>

      <ul
        className={`md:flex gap-6 ${
          isMobileMenuOpen ? "block" : "hidden"
        } md:block absolute md:relative top-16 md:top-auto right-0 left-0 p-4 md:p-0 shadow-md bg-white md:shadow-none dark:bg-slate-800 flex items-center justify-center`}
      >
        <li>
          <Link
            href="/"
            className={`py-2 md:py-0 font-semibold hover:text-primary hover:font-bold transition-all cursor-pointer hover:scale-105 
                ${
                  path === "/" || path.startsWith(Link)
                    ? "text-primary font-bold "
                    : ""
                }`}
          >
            Home
          </Link>
        </li>

        <li>
          <Dropdown
            menu={{
              items: dashboradItems,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Link
                href="/dashboard"
                className={`py-2 md:py-0 font-semibold hover:text-primary hover:font-bold transition-all cursor-pointer hover:scale-105 
                ${
                  path === "/dashboard" || path.startsWith("/dashboard")
                    ? "text-primary font-bold "
                    : ""
                }`}
              >
                <Space>
                  Dashboard
                  <ChevronDown />
                </Space>
              </Link>
            </a>
          </Dropdown>
        </li>

        <li>
          <Dropdown
            menu={{
              items: faqsItems,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Link
                href="/faqs"
                className={`py-2 md:py-0 font-semibold hover:text-primary hover:font-bold transition-all cursor-pointer hover:scale-105 
                ${
                  path === "/faqs" || path.startsWith("/faqs")
                    ? "text-primary font-bold "
                    : ""
                }`}
              >
                <Space>
                  FAQs
                  <ChevronDown />
                </Space>
              </Link>
            </a>
          </Dropdown>
        </li>

        <li>
          <Link
            href="/contact"
            className={`py-2 md:py-0 font-semibold hover:text-primary hover:font-bold transition-all cursor-pointer hover:scale-105 
                ${
                  path === "/contact" || path.startsWith("/contact")
                    ? "text-primary font-bold "
                    : ""
                }`}
          >
            Contact
          </Link>
        </li>

        <li>
          <Tooltip title="switch mode">
            <span>
              <ThemeSwitch />
            </span>
          </Tooltip>
        </li>
        <li>
          <UserButton />
        </li>
      </ul>
    </div>
  );
}

export default Header;
