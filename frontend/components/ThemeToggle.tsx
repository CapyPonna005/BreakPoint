"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      className="flex items-center gap-2 text-sm px-3 py-1.5 border border-border-subtle rounded-button text-text-secondary hover:bg-primary-bg hover:text-text-primary transition cursor-pointer"
    >
      {darkMode ? (
        <Sun className="w-4 h-4 text-highlight" />
      ) : (
        <Moon className="w-4 h-4 text-accent" />
      )}
      {darkMode ? "Light" : "Dark"}
    </button>
  );
}