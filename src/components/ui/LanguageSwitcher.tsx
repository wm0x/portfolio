"use client";

import { cn } from "@/src/lib/utils";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LanguageMorphButton = () => {
  const [lang, setLang] = useState<"عربي" | "EN">("عربي");

  const toggleLanguage = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setLang((prev) => (prev === "عربي" ? "EN" : "عربي"));
  };

  return (
    <div className="flex items-center justify-center p-1">
      <button
        onClick={toggleLanguage}
        className="group relative flex items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95"
        style={{ width: '65px', height: '35px' }} 
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            initial={{ 
              y: 10,
              filter: "blur(4px)",
              opacity: 0
            }}
            animate={{ 
              y: 0,
              filter: "blur(0px)",
              opacity: 1
            }}
            exit={{ 
              y: -10,
              filter: "blur(4px)",
              opacity: 0
            }}
            transition={{
              duration: 0.3,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="flex items-center justify-center"
          >
            <span
              className={cn(
                "text-sm font-bold tracking-widest bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent select-none",
                lang === "عربي" ? "font-sans" : "font-sans" 
              )}
            >
              {lang}
            </span>
          </motion.div>
        </AnimatePresence>

        <motion.div 
          className="absolute bottom-0 h-[1px] bg-white/40"
          animate={{ width: lang === "عربي" ? "40%" : "20%" }}
        />
      </button>
    </div>
  );
};

export default LanguageMorphButton;