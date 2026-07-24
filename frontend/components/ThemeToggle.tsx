"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="text-sm px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}