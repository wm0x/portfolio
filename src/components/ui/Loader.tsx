"use client";

import { useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <div className="w-[320px]">
        <h1 className="text-center text-[#CCC5B9] text-4xl mb-10">
          Ali Alshehri
        </h1>

        <div className="h-[2px] w-full bg-white/10 overflow-hidden rounded-full">
          <div
            className="h-full bg-[#CCC5B9] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-center text-[#CCC5B9]/50 mt-4 text-sm">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}