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
  const wrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineGlowRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. حركة العنوان
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 80%",
          },
        }
      );

      // 2. الخط العمودي المتوهج في المنتصف (يعمل مع السكرول بسلاسة)
      const lineTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      lineTl
        .to(lineRef.current, { height: "100%", ease: "none" })
        .to(lineGlowRef.current, { height: "100%", ease: "none" }, "<");

      // 3. حركة الشهادات (مستقرة ولا تنعكس عشوائياً)
      certs.forEach((cert, i) => {
        const row = rowRefs.current[i];
        const node = nodeRefs.current[i];
        const block = blockRefs.current[i];
        if (!row || !node || !block) return;

        const xOffset = cert.side === "right" ? -50 : 50;

        // بناء تايم لاين لكل صف لضمان الترتيب الصارم
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 85%", // يبدأ بمجرد ظهور 15% من أسفل الشاشة
            toggleActions: "play none none reverse", // التشغيل عند النزول، العكس عند الصعود
            // markers: true, // يمكنك تفعيلها مؤقتاً لترى خطوط التحفيز أثناء التطوير
          },
        });

        // النقطة المضيئة
        tl.fromTo(
          node,
          { scale: 0, opacity: 0, boxShadow: "0 0 0px transparent" },
          {
            scale: 1,
            opacity: 1,
            boxShadow:
              cert.status === "done"
                ? "0 0 15px rgba(235, 94, 40, 0.6)"
                : "0 0 10px rgba(170, 170, 170, 0.4)",
            duration: 0.4,
            ease: "back.out(2)",
          }
        )
        // بطاقة الشهادة
        .fromTo(
          block,
          { opacity: 0, x: xOffset },
          { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
          "-=0.2" // دمجها قليلاً مع حركة النقطة
        );

        // شريط التقدم (إن وجد)
        if (cert.status === "wip" && progRefs.current[i]) {
          tl.fromTo(
            progRefs.current[i],
            { width: "0%" },
            { width: cert.progress + "%", duration: 1, ease: "power2.out" },
            "-=0.3"
          );
        }
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapRef}
      dir="rtl"
      className="relative w-full py-32 px-4 bg-[#1a1a1a] overflow-hidden"
    >
      <div className="text-center mb-32 relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-[#fffcf2] tracking-tight opacity-0"
        >
          <span className="text-[#eb5e28]">الشهادات</span>
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] flex justify-center z-0">
          <div className="absolute w-[1px] h-full bg-[#403d39]/30" />
          <div
            ref={lineGlowRef}
            className="absolute top-0 w-[4px] h-0 bg-[#eb5e28] blur-[4px] opacity-60"
          />
          <div
            ref={lineRef}
            className="absolute top-0 w-[2px] h-0 bg-gradient-to-b from-[#eb5e28] via-[#eb5e28] to-transparent"
          />
        </div>

        {certs.map((cert, i) => (
          <div
            key={i}
            ref={(el) => { rowRefs.current[i] = el; }}
            className={`relative flex items-center justify-between min-h-[160px] mb-12 ${
              cert.side === "left" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div className="w-[45%] hidden md:block" />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex justify-center items-center">
              <div className="w-6 h-6 rounded-full bg-[#1a1a1a] border border-[#403d39] flex items-center justify-center shadow-lg">
                <div
                  ref={(el) => { nodeRefs.current[i] = el; }}
                  className={`w-2.5 h-2.5 rounded-full ${
                    cert.status === "done" ? "bg-[#eb5e28]" : "bg-[#ccc5b9]"
                  } opacity-0`}
                />
              </div>
            </div>

            <div
              className="w-full md:w-[45%] relative z-10"
              style={{
                paddingRight: cert.side === "right" ? "2.5rem" : "0",
                paddingLeft: cert.side === "left" ? "2.5rem" : "0",
              }}
            >
              <div
                ref={(el) => { blockRefs.current[i] = el; }}
                className={`will-change-transform p-6 rounded-2xl border border-[#403d39]/50 bg-[#252422]/60 backdrop-blur-sm transition-colors hover:border-[#eb5e28]/30 hover:bg-[#252422] opacity-0 ${
                  cert.side === "right" ? "text-right" : "text-right md:text-left"
                }`}
              >
                <span className="inline-block font-mono text-[11px] tracking-widest text-[#ccc5b9] mb-3 uppercase bg-[#403d39]/30 px-2 py-1 rounded-md">
                  {cert.tag}
                </span>
                <h3 className="text-lg font-semibold text-[#fffcf2] mb-2 leading-snug">
                  {cert.title}
                </h3>
                <p className="text-sm text-[#ccc5b9] leading-relaxed mb-4">
                  {cert.desc}
                </p>
                <StatusBadge
                  cert={cert}
                  progRef={(el) => { progRefs.current[i] = el; }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

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
      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-green-900/50 text-green-400 bg-green-900/10">
        <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
          <path
            d="M2 5l2 2 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        مكتمل
      </span>
    );
  }

  return (
    <div className="w-full max-w-[200px]">
      <div className="flex items-center justify-between mb-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border border-amber-900/50 text-amber-400 bg-amber-900/10">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="animate-spin-slow">
            <path
              d="M5 1v2m0 4v2m-4-4h2m4 0h2m-7-3l1.5 1.5m3 3l1.5 1.5m-6 0l1.5-1.5m3-3l1.5-1.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          قيد الإنجاز
        </span>
        <span className="text-xs text-[#ccc5b9] font-mono">
          {"progress" in cert ? `${cert.progress}%` : ""}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-[#403d39] overflow-hidden">
        <div
          ref={progRef}
          className="h-full rounded-full bg-gradient-to-l from-amber-500 to-amber-600 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}