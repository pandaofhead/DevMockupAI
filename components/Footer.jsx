"use client";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-accent text-secondary py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">DevMockupAI</h3>
          <div className="flex flex-col">
            <Link
              href="/"
              className="text-secondary my-3 hover:text-white hover:font-bold hover:scale-105 
              transition-all"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-secondary my-3 hover:text-white hover:font-bold hover:scale-105  transition-all"
            >
              Dashboard
            </Link>
            <Link
              href="/"
              className="text-secondary my-3 hover:text-white hover:font-bold hover:scale-105  transition-all"
            >
              Pricing
            </Link>
            <Link
              href="/"
              className="text-secondary my-3 hover:text-white hover:font-bold hover:scale-105 transition-all"
            >
              How it works
            </Link>
            <Link
              href="/"
              className="text-secondary my-3 hover:text-white hover:font-bold hover:scale-105 transition-all"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="my-3">Email: hhquan1257@gmail.com</p>
          <p className="my-3">Phone: 914-804-6120</p>
          <p className="my-3">Address: New York, NY, USA</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-secondary hover:text-white hover:scale-105 "
            >
              <InstagramIcon size={30} />
            </a>
            <a
              href="#"
              className="text-secondary hover:text-white hover:scale-105 "
            >
              <LinkedinIcon size={30} />
            </a>
            <a
              href="#"
              className="text-secondary hover:text-white hover:scale-105 "
            >
              <GithubIcon size={30} />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>&copy; 2024 DevMockupAI. All rights reserved.</p>
      </div>
    </footer>
  );
}
