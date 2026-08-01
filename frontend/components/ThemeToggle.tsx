"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import Tooltip from "@/components/Tooltip";

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <Tooltip label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
      <button
        onClick={toggleDarkMode}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        className="flex items-center justify-center w-9 h-9 border border-border-subtle rounded-button text-text-secondary hover:bg-primary-bg hover:text-text-primary transition cursor-pointer"
      >
        {darkMode ? (
          <Sun className="w-4 h-4 text-highlight" />
        ) : (
          <Moon className="w-4 h-4 text-accent" />
        )}
      </button>
    </Tooltip>
  );
}