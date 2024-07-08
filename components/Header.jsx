"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function Header() {
  const headerList = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "FAQs",
      link: "/faqs",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "Login",
      link: "/auth/sign-in",
    },
  ];
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-between p-6 bg-background shadow-sm">
      <Image src={"/favicon.svg"} width={70} height={70} alt="Logo" />

      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-500 hover:text-primary focus:outline-none focus:text-primary transition-all"
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
        {headerList.map((item, index) => (
          <li key={index}>
            <Link
              href={item.link}
              className={`block py-2 md:py-0 font-semibold hover:text-primary hover:font-bold transition-all cursor-pointer hover:scale-105 
                ${
                  (item.link === "/" && path === "/") ||
                  (item.link !== "/" && path.startsWith(item.link))
                    ? "text-primary font-bold flex items-center justify-center"
                    : "flex items-center justify-center"
                }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Header;
