"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const certs = [
  {
    side: "right" as const,
    tag: "2024 · AWS",
    title: "AWS Cloud Practitioner",
    desc: "شهادة الحوسبة السحابية للمستوى التأسيسي من أمازون.",
    status: "done" as const,
  },
  {
    side: "left" as const,
    tag: "2024 · Google",
    title: "Google Data Analytics",
    desc: "شهادة مهنية معتمدة في تحليل البيانات.",
    status: "done" as const,
  },
  {
    side: "right" as const,
    tag: "جارٍ · CNCF",
    title: "Certified Kubernetes Admin",
    desc: "إدارة clusters في بيئات الإنتاج واختبار CKA.",
    status: "wip" as const,
    progress: 55,
  },
  {
    side: "left" as const,
    tag: "Q3 2026 · Google",
    title: "Professional Cloud Architect",
    desc: "تصميم حلول Google Cloud على مستوى المؤسسات.",
    status: "wip" as const,
    progress: 20,
  },
];

export default function CertificationsScroll() {
  const wrapRef      = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const seedDotRef   = useRef<HTMLDivElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const rowRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const blockRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const progRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── 1. ظهور العنوان عند التحميل ──────────────────────────────────────
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 22,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      // ── 2. ظهور النقطة العلوية ───────────────────────────────
      gsap.from(seedDotRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: "back.out(3)",
        delay: 0.9,
      });

      // ── 3. جعل الخط ينمو تدريجياً بدقة مع السكرول ────────────
      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top center" });

      ScrollTrigger.create({
        trigger: wrapRef.current,
        // يبدأ الأنميشن عندما يصل منتصف الشاشة إلى أعلى القسم، وينتهي عندما يصل منتصف الشاشة إلى أسفله
        start: "top center",
        end: "bottom center",
        scrub: true, // تم تعديله إلى true لربط مباشر وحيوي بحركة الماوس دون تأخير (lag)
        animation: gsap.to(lineRef.current, {
          scaleY: 1,
          ease: "none",
        }),
      });

      // ── 4. ظهور الكروت بدقة شديدة عند ملامسة الخط لها ─────────────────
      certs.forEach((cert, i) => {
        const row   = rowRefs.current[i];
        const node  = nodeRefs.current[i];
        const block = blockRefs.current[i];
        if (!row || !node || !block) return;

        const xFrom = cert.side === "right" ? 30 : -30;

        // إعدادات البداية المخفية
        gsap.set(block, { opacity: 0, x: xFrom });
        gsap.set(node,  { scale: 0, opacity: 0 });

        ScrollTrigger.create({
          trigger: row,
          // يبدأ الأنميشن أول ما يقترب الكرت من منتصف الشاشة (حيث يتواجد رأس الخط النامي)
          start: "top center+=100", 
          toggleActions: "play reverse play reverse", // يضمن الاختفاء والظهور المالي عند الصعود والنزول
          onEnter: () => {
            gsap.to(node, {
              scale: 1, 
              opacity: 1,
              duration: 0.3, 
              ease: "back.out(2)",
            });
            gsap.to(block, {
              opacity: 1, 
              x: 0,
              duration: 0.5, 
              ease: "power2.out",
            });
            if (cert.status === "wip" && progRefs.current[i]) {
              gsap.to(progRefs.current[i], {
                width: cert.progress + "%",
                duration: 0.8, 
                ease: "power2.out",
              });
            }
          },
          onLeaveBack: () => {
            gsap.to(node,  { scale: 0, opacity: 0, duration: 0.2 });
            gsap.to(block, { opacity: 0, x: xFrom, duration: 0.25 });
            if (cert.status === "wip" && progRefs.current[i]) {
              gsap.to(progRefs.current[i], { width: "0%", duration: 0.2 });
            }
          },
        });
      });

    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapRef}
      dir="rtl"
      className="relative w-full pt-32 pb-40 px-4 bg-[#1a1a1a]"
    >
      {/* ── Title ── */}
      <div className="text-center mb-24">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-medium text-gray-100 tracking-tight"
        >
          شهاداتي
        </h2>
      </div>

      {/* ── Timeline container ── */}
      <div className="relative max-w-3xl mx-auto">

        {/* Seed dot — origin of the line */}
        <div
          ref={seedDotRef}
          className="absolute left-1/2 -translate-x-1/2 -top-3 z-30
                     w-2.5 h-2.5 rounded-full bg-[#FFFCF2]"
        />

        {/* The growing line */}
        <div
          ref={lineRef}
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 z-10
                     w-[2px] bg-[#FFFCF2]"
        />

        {/* Cards */}
        {certs.map((cert, i) => (
          <div
            key={i}
            ref={(el) => { rowRefs.current[i] = el; }}
            className="relative flex items-start min-h-[160px]" // أضفنا min-h لضمان تباعد ثابت يمنع التداخل المبكر
          >
            {/* Right slot */}
            <div className="w-1/2 pr-10 pb-20 text-right">
              {cert.side === "right" && (
                <div ref={(el) => { blockRefs.current[i] = el; }} className="will-change-transform">
                  <span className="block font-mono text-[10px] tracking-widest text-gray-500 mb-2 uppercase">
                    {cert.tag}
                  </span>
                  <h3 className="text-base font-medium text-gray-100 mb-1.5 leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-3">
                    {cert.desc}
                  </p>
                  <StatusBadge cert={cert} progRef={(el) => { progRefs.current[i] = el; }} />
                </div>
              )}
            </div>

            {/* Node on the line */}
            <div className="relative flex-shrink-0 w-0 flex justify-center" style={{ zIndex: 20 }}>
              <div
                ref={(el) => { nodeRefs.current[i] = el; }}
                className="w-3 h-3 rounded-full border-2 ml-1 border-gray-500 bg-[#252422]"
                style={{ transform: "translateX(-50%)" }}
              />
            </div>

            {/* Left slot */}
            <div className="w-1/2 pl-10 pb-20 text-left">
              {cert.side === "left" && (
                <div ref={(el) => { blockRefs.current[i] = el; }} className="will-change-transform">
                  <span className="block font-mono text-[10px] tracking-widest text-gray-500 mb-2 uppercase">
                    {cert.tag}
                  </span>
                  <h3 className="text-base font-medium text-gray-100 mb-1.5 leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-3">
                    {cert.desc}
                  </p>
                  <StatusBadge cert={cert} progRef={(el) => { progRefs.current[i] = el; }} />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* End dot */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30
                        w-2 h-2 rounded-full bg-[#FFFCF2]" />
      </div>
    </section>
  );
}

// ── Sub-component for status badge + progress ────────────────────────────────
type Cert = (typeof certs)[number];

function StatusBadge({
  cert,
  progRef,
}: {
  cert: Cert;
  progRef: React.RefCallback<HTMLDivElement>;
}) {
  if (cert.status === "done") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1
                       rounded-full border border-green-900 text-green-400 bg-green-950/50">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        محقق
      </span>
    );
  }

  return (
    <div className="max-w-[150px]">
      <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1
                       rounded-full border border-amber-900 text-amber-400 bg-amber-950/50 mb-2">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.2" />
          <path d="M5 3v2l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        {"progress" in cert ? `${cert.progress}% اكتمال` : ""}
      </span>
      <div className="h-1 rounded-full bg-gray-800 overflow-hidden">
        <div
          ref={progRef}
          className="h-full rounded-full bg-amber-500"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}