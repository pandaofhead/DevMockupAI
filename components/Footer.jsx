"use client";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import { Tooltip } from "antd";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-white text-secondary py-14 dark:bg-slate-800">
      <div className="max-w-6xl grid grid-cols-2 md:grid-cols-3 gap-8 mx-8 md:mx-auto ">
        <div>
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            DevMockupAI
          </h3>
          <div className="flex flex-col">
            <Link
              href="/"
              className="text-secondary dark:text-white my-2 hover:font-bold hover:scale-105 
              transition-all"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-secondary dark:text-white my-2 hover:font-bold hover:scale-105  transition-all"
            >
              Dashboard
            </Link>
            <Link
              href="/pricing"
              className="text-secondary dark:text-white my-2 hover:font-bold hover:scale-105 transition-all"
            >
              Pricing
            </Link>

            <Link
              href="/terms"
              className="text-secondary dark:text-white my-2 hover:font-bold hover:scale-105 transition-all"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            Contact Us
          </h3>
          <Link
            href="/contact"
            className="text-secondary dark:text-white my-2 hover:font-bold hover:scale-105 transition-all"
          >
            Contact
          </Link>
          <Link
            href="/faqs"
            className="text-secondary dark:text-white my-2 hover:font-bold hover:scale-105 transition-all"
          >
            FAQs
          </Link>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <Tooltip title="Let's connect!">
              <Link
                href="https://www.linkedin.com/in/hongjin-quan-564737271/"
                className="text-secondary dark:text-white hover:scale-105 "
              >
                <LinkedinIcon size={30} />
              </Link>
            </Tooltip>

            <Tooltip title="Star if you like it!">
              <Link
                href="https://github.com/pandaofhead/DevMockupAI"
                className="text-secondary dark:text-white hover:scale-105 "
              >
                <GithubIcon size={30} />
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="dark:text-white">&copy; 2025 DevMockupAI</p>
        <p className="dark:text-white">All rights reserved</p>
      </div>
    </footer>
  );
}
