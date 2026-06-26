"use client";
import React, { JSX, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/src/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.01) {
        setVisible(true);
      } else {
        if (direction > 0) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
          y: -50,
          scale: 0.9,
          filter: "blur(10px)",
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0.9,
          filter: visible ? "blur(0px)" : "blur(10px)",
        }}
        exit={{
          opacity: 0,
          y: -50,
          scale: 0.9,
          filter: "blur(10px)",
        }}
        transition={{
          duration: 0.4,
          ease: [0.23, 1, 0.32, 1],
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto z-5000 items-center justify-center",
          className
        )}
      >
        <div className="group flex items-center justify-center gap-2 rounded-full border border-white/10 bg-[#403D39] px-3 py-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] backdrop-blur-xl dark:border-white/10">
          <div className=" flex justify-center items-center rounded-2xl">
            <img src="./image/newLogo.png" alt="" className=" h-12 w-12 -scale-x-100" />
          </div>
          <div className="h-5 w-px bg-neutral-300/50 dark:bg-white/10" />
          <div className="flex items-center gap-1">
            {navItems.map((navItem, idx: number) => (
              <motion.a
                key={`link-${idx}`}
                href={navItem.link}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-white/20 hover:text-black dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white"
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block">{navItem.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
