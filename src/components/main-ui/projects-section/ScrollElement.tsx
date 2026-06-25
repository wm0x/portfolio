"use client";
import { TextFade } from "./AnimatedContent";
import React from "react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import { FiArrowUpLeft } from "react-icons/fi"; 

function ScrollElement() {
  const fikr = "مشاريعي";

  const projects = [
    {
      name: "NeuroCast",
      arabicName: "نيوروكاست",
      category: "ذكاء اصطناعي • رعاية صحية",
      year: "2026",
      description:
        "نظام ذكاء اصطناعي قابل للتفسير (Explainable AI) للتنبؤ بتطور مرض الزهايمر بالاعتماد على تحليل بيانات متعددة الوسائط.",
      highlight: "٩٦ مريضاً",
      technologies: ["PyTorch", "SHAP", "LIME", "React"],
      link: "https://neurocast.alshehri.work",
      color: "#EB5E28", 
    },
    {
      name: "Mueen",
      arabicName: "مُعين",
      category: "منصة تعليمية",
      year: "2025",
      description:
        "منصة رقمية متكاملة للتعليم المباشر (Peer-to-peer) تربط الطلاب بالمعلمين المؤهلين لتقديم دروس تقوية أكاديمية.",
      highlight: "تطوير شامل",
      technologies: ["Next.js", "PostgreSQL", "Prisma", "TypeScript"],
      link: "https://mueen.alshehri.work",
      color: "#3b82f6", 
    },
    {
      name: "Mahsoob",
      arabicName: "محسوب",
      category: "مفهوم تقنية مالية (FinTech)",
      year: "2026",
      description:
        "منصة إدارة مالية شخصية موجهة للسوق السعودي، مصممة لاستغلال إمكانيات المصرفية المفتوحة (Open Banking).",
      highlight: "رؤية منتج",
      technologies: ["Product Design", "Open Banking", "Research"],
      link: "https://mahsoob.alshehri.work",
      color: "#10b981",  
    },
    {
      name: "MAS",
      arabicName: "نظام ماس",
      category: "حلول مؤسسية",
      year: "2026",
      description:
        "نظام دخول ذكي للموظفين بدون بطاقات، تم اقتراحه لتسهيل وتطوير عمليات تهيئة الموظفين الجدد (Onboarding) في موبايلي.",
      highlight: "تصميم النظام",
      technologies: ["Architecture", "REST APIs", "Authentication"],
      color: "#8b5cf6", 
    },
  ];

  return (
    <div className="bg-[#1a1a1a] relative w-full overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.02] to-transparent pointer-events-none" />

      <section className="max-w-5xl mx-auto px-4 pt-32 pb-20 relative z-10" dir="rtl">
        
        <div className="mb-20 flex flex-col items-start px-4 md:px-8">
          <TextFade direction="down">
            <div className="flex items-center gap-6">
              <div className="w-12 h-[1px] bg-gradient-to-l from-[#EB5E28] to-transparent" />
              <h2 className="text-[#FFFCF2] text-2xl md:text-4xl font-extralight tracking-widest">
                {fikr}
              </h2>
            </div>
          </TextFade>
        </div>

        <div className="flex flex-col gap-10">
          <ScrollStack useWindowScroll>
            {projects.map((project) => (
              <ScrollStackItem key={project.name} itemClassName="border-none">
                
                <div className="min-h-[60vh] rounded-[2.5rem] p-8 md:p-14 flex flex-col relative overflow-hidden bg-[#252422] border border-white/5 shadow-2xl group transition-all duration-700 hover:border-white/15">
                  
                  <div 
                    className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full blur-[120px] opacity-10 transition-opacity duration-700 group-hover:opacity-30 pointer-events-none"
                    style={{ background: project.color }}
                  />

                  <div className="flex justify-between items-start z-10">
                    <span className="text-[#CCC5B9]/70 text-sm md:text-base font-light tracking-wide px-4 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm">
                      {project.category}
                    </span>
                    <span className="text-[#CCC5B9]/50 font-mono text-sm md:text-base bg-black/20 px-3 py-1 rounded-lg">
                      {project.year}
                    </span>
                  </div>

                  <div className="mt-16 md:mt-20 z-10">
                    <h3 className="font-bold mb-6 text-white text-5xl md:text-7xl tracking-tight flex items-center gap-4">
                      {project.arabicName}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer" className="text-white/20 hover:text-white transition-colors duration-300">
                          <FiArrowUpLeft className="w-8 h-8 md:w-12 md:h-12" />
                        </a>
                      )}
                    </h3>
                    <p className="max-w-2xl text-lg md:text-2xl leading-relaxed text-[#CCC5B9]/80 font-light">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-16 flex flex-col md:flex-row md:items-end justify-between gap-8 z-10">
                    
                    <div>
                      <span className="block text-sm text-[#CCC5B9]/50 mb-2 font-light">أبرز ما يميزه</span>
                      <span className="font-bold text-2xl md:text-3xl" style={{ color: project.color }}>
                        {project.highlight}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 max-w-md justify-end">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 rounded-xl text-sm md:text-base font-mono bg-black/40 text-[#CCC5B9] border border-white/5 transition-colors group-hover:border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                  </div>

                  <div
                    className="absolute left-[-5%] bottom-[-10%] font-black pointer-events-none transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-4"
                    style={{
                      color: "rgba(255,255,255,0.02)",
                      fontSize: "clamp(8rem, 20vw, 25rem)",
                      lineHeight: 0.8,
                      WebkitTextStroke: "1px rgba(255,255,255,0.01)" 
                    }}
                  >
                    {project.name}
                  </div>

                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </section>
    </div>
  );
}

export default ScrollElement;