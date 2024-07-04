"use client";
import React, { useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function Header() {
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-between p-6 bg-background shadow-sm">
      <Image src={"/favicon.svg"} width={70} height={70} alt="Logo" />

      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-500 hover:text-secondary focus:outline-none focus:text-secondary"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      <ul
        className={`md:flex gap-6 ${
          isMobileMenuOpen ? "block" : "hidden"
        } md:block absolute md:relative top-16 md:top-auto right-0 left-0 bg-background md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none`}
      >
        <li>
          <Link
            href="/"
            className={`block py-2 md:py-0 font-semibold hover:text-secondary hover:font-bold transition-all cursor-pointer hover:scale-105 
            ${path == "/" && "text-secondary font-bold"}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard"
            className={`block py-2 md:py-0 font-semibold hover:text-secondary hover:font-bold transition-all cursor-pointer hover:scale-105 
            ${path == "/dashboard" && "text-secondary font-bold"}`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/questions"
            className={`block py-2 md:py-0 font-semibold hover:text-secondary hover:font-bold transition-all cursor-pointer hover:scale-105
            ${path == "/questions" && "text-secondary font-bold"}`}
          >
            Questions
          </Link>
        </li>
        <li>
          <Link
            href="/upgrade"
            className={`block py-2 md:py-0 font-semibold hover:text-secondary hover:font-bold transition-all cursor-pointer hover:scale-105 
            ${path == "/upgrade" && "text-secondary font-bold"}`}
          >
            Upgrade
          </Link>
        </li>
        <li>
          <Link
            href="/howitworks"
            className={`block py-2 md:py-0 font-semibold hover:text-secondary hover:font-bold transition-all cursor-pointer hover:scale-105
            ${path == "/howitworks" && "text-secondary font-bold"}`}
          >
            How it works?
          </Link>
        </li>
      </ul>

      <div className="hidden md:block">
        <UserButton />
      </div>

      {/* {isMobileMenuOpen && (
        <div className="block md:hidden bg-background p-4 shadow-md w-full">
          <UserButton />
        </div>
      )} */}
    </div>
  );
}

export default Header;
