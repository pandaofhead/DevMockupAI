"use client";
import React, { createContext, useState, useEffect } from "react";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const storedState = localStorage.getItem("sidebar-collapsed");
    if (storedState !== null) {
      setIsCollapsed(JSON.parse(storedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const collapseSidebar = () => {
    setIsCollapsed(true);
  };

  const expandSidebar = () => {
    setIsCollapsed(false);
  };

  const toggleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !isCollapsed) {
        collapseSidebar();
      } else if (window.innerWidth >= 768 && isCollapsed) {
        expandSidebar();
        toggleSidebar();
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isCollapsed]);

  return (
    <SidebarContext.Provider
      value={{ isCollapsed, toggleSidebar, expandSidebar, collapseSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
