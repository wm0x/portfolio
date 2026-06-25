"use client";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FloatingNavDemo from "../components/ui/floating-navbar-demo";
import Hero from "../components/main-ui/hero-section/Hero";
import AboutMe from '../components/main-ui/aboutMe-section/AboutMe';
import Project from '../components/main-ui/projects-section/Project';
import Certificates from "../components/main-ui/Certificates-section/Certificates";

function GsapLenisSync() {
  const lenis = useLenis((scroll) => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    if (!lenis) return;
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0); 

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, [lenis]);

  return null;
}

export default function Home() {
  return (
    <ReactLenis root>
      <GsapLenisSync />

      <div dir="rtl" className="relative min-h-screen  bg-[#252422] w-full text-white">
        
        <div className="absolute top-[-10%] right-[-10%] w-[200px] h-[500px] bg-[#FFFCF2] rounded-full mix-blend-screen filter blur-[150px] opacity-40 pointer-events-none"></div>

        <div className="z-40 relative">
          <FloatingNavDemo />
        </div>

        <div className="relative z-10">
          <Hero />
        </div>
        
        <div className="w-full border-t border-white/10 bg-[#252422]">
          <AboutMe />
        </div>

        <div className="w-full ">
          <Project/>
        </div>

        <div>
        <Certificates/>
        </div>

      </div>
    </ReactLenis>
  );
}