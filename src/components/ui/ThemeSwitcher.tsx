"use client";

import { cn } from "@/src/lib/utils";
import React from "react";

export const ThemeSwitcherButton = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  const toggleTheme = (e: React.MouseEvent) => {
    // 1. يمنع انتشار الضغطة للـ Navbar أو أي عنصر أب
    e.stopPropagation(); 
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      className={cn(
        "group relative flex items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5 px-2 py-1 backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95",
        "focus:outline-none focus:ring-0 focus-visible:outline-none" 
      )}
      onClick={toggleTheme}
      type="button"
    >
      <span
        className={cn(
          "relative size-6 scale-75 rounded-full",
        )}
      >
        <span
          className={cn(
            "absolute top-0 left-0 z-10 h-full w-full transform-gpu rounded-full bg-gradient-to-tr from-indigo-400 to-sky-200 transition-transform duration-500",
            theme === "dark" ? "scale-100" : "scale-0",
          )}
        />
        <span
          className={cn(
            "absolute top-0 left-0 z-10 h-full w-full transform-gpu rounded-full bg-gradient-to-tr from-rose-400 to-amber-300 transition-opacity duration-500 dark:from-rose-600 dark:to-amber-600",
            theme === "light" ? "opacity-100" : "opacity-0",
          )}
        />
        {/* دائرة الكسوف (Moon Mask) */}
        <span
          className={cn(
            "absolute top-0 right-0 z-20 size-4 origin-top-right transform-gpu rounded-full bg-[#1C0770] transition-transform duration-500", 
            // جعلت لونها نفس لون خلفية مشروعك (Navy Blue) لتبدو طبيعية
            theme === "dark" ? "scale-100" : "scale-0",
          )}
        />
      </span>
    </button>
  );
};

export default ThemeSwitcherButton;