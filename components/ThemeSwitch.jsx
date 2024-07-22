"use client";

import { useTheme } from "../context/ThemeContext";
import React from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="bg-transparent backdrop-blur-[0.5rem] hover:scale-[1.15] active:scale-105 transition-all dark:hover:scale-[1.15] dark:active:scale-105"
      onClick={toggleTheme}
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
}
