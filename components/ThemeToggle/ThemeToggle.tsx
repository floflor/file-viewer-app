"use client";

import { useTheme } from "@/lib/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg dark:bg-[#F9F9FB] bg-[#2C2D33]`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-black" />
      ) : (
        <Moon className="h-5 w-5 text-white" />
      )}
    </button>
  );
}
