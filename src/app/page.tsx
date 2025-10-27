"use client";
import { RetroGrid } from "../components/ui/retro-grid";
import { useState, useEffect } from "react";

export default function Home() {
  const [dots, setDots] = useState("");
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
        setFade(false);
      }, 200);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <div className="pointer-events-none z-10 text-center space-y-6">
        <h1 className="bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-7xl leading-none font-bold tracking-tighter text-transparent mb-4">
        🛠️
        </h1>

        <p className="text-2xl text-black font-semibold mb-2">
          شغال عليه والله
        </p>

        <div className="flex flex-col items-center justify-center space-x-1 text-xl text-[#ff2975] font-medium" dir="rtl">
        <div className="flex space-x-1">
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className={`transition-all duration-300 text-black ${
                  index < dots.length
                    ? "opacity-100 scale-110"
                    : "opacity-30 scale-90"
                } ${fade && index === dots.length ? "animate-pulse" : ""}`}
                style={{
                  animationDelay: index * 0.1 + "s",
                }}
              >
                .
              </span>
            ))}
          </div>

        </div>
      </div>

      <RetroGrid />
    </div>
  );
}
