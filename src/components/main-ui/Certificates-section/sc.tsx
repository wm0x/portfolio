"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CertificationsScroll() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const achievedRef = useRef<HTMLDivElement | null>(null); 
  const pursuingRef = useRef<HTMLDivElement | null>(null); 
  const itemsRefs = useRef<(HTMLDivElement | null)[]>([]);

  const achievedCerts = [
    { title: "شهادة AWS المعتمدة", desc: "شهادة الحوسبة السحابية للمستوى التأسيسي." },
    { title: "Google Data Analytics", desc: "شهادة مهنية في تحليل البيانات." },
  ];

  const pursuingCerts = [
    { title: "Certified Kubernetes Admin", desc: "جاري التحضير لاختبار الإدارة المتقدم." },
    { title: "Professional Cloud Architect", desc: "خطة للدراسة في الربع الثالث من 2026." },
  ];

  useEffect(() => {
    if (!imgRef.current) return;
    const isMobile = window.innerWidth < 768;

    gsap.to(imgRef.current, {
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top top",
        end: isMobile ? "+=300" : "+=500",
        scrub: true,
        pin: true,
        pinSpacing: false,
      },
      scale: isMobile ? 0.5 : 0.3,
      borderRadius: "24px",
      ease: "power2.inOut",
    });

    [achievedRef, pursuingRef].forEach((ref) => {
      if (ref.current) {
        gsap.from(ref.current, {
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
          opacity: 0,
          y: 50,
          duration: 1,
        });
      }
    });
  }, []);

  return (
    <div className="h-[180vh] flex flex-col items-center justify-start gap-20 overflow-hidden" dir="rtl">
      
      <div ref={imgRef} className="w-[90%] h-[60vh] flex items-center justify-center bg-teal-900 rounded-2xl z-[10]">
        <h1 className="text-white text-4xl md:text-6xl font-bold">الشهادات المهنية</h1>
      </div>

      <section className="w-full flex flex-col lg:flex-row justify-between px-10 gap-16 translate-y-20">
        
        <div ref={achievedRef} className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold text-teal-700 mb-6 border-b-2 border-teal-700 pb-2">الشهادات التي حققتها</h2>
          {achievedCerts.map((item, i) => (
            <div key={i} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div ref={pursuingRef} className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold text-amber-700 mb-6 border-b-2 border-amber-700 pb-2">شهادات قيد التحقيق</h2>
          {pursuingCerts.map((item, i) => (
            <div key={i} className="mb-6 p-4 border border-dashed border-gray-400 rounded-lg">
              <h3 className="font-bold text-lg text-gray-700">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}