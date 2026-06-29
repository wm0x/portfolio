"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const certs = [
  {
    side: "right" as const,
    tag: "2026 · STC",
    title: "أساسيات أمن المعلومات",
    desc: "يغطي أساسيات أمن المعلومات وأفضل ممارسات الحماية السيبرانية.",
    status: "done" as const,
    image: "/image/STCC.png",
  },
  {
    side: "left" as const,
    tag: "2026 · تطوير الويب",
    title: "تطوير تطبيقات الويب",
    desc: "تعرف على أساسيات تطوير تطبيقات الويب وتقنيات الويب الحديثة.",
    status: "done" as const,
    image: "/image/DEVC.png",
  },

  {
    side: "right" as const,
    tag: "قيد الإنجاز · Amazon",
    title: "AWS Certified Cloud Practitioner",
    desc: "الاستعداد للحصول على الشهادة التأسيسية في الحوسبة السحابية من AWS.",
    status: "wip" as const,
    progress: 70,
  },
  {
    side: "left" as const,
    tag: "قيد الإنجاز · Coursera",
    title: "Meta Front-End Developer Professional Certificate",
    desc: "برنامج احترافي يركز على تطوير واجهات الويب باستخدام أحدث التقنيات.",
    status: "wip" as const,
    progress: 45,
  },
  {
    side: "right" as const,
    tag: "قيد الإنجاز · Coursera",
    title: "Meta Back-End Developer Professional Certificate",
    desc: "برنامج احترافي يغطي تطوير الخوادم وقواعد البيانات وبناء واجهات API.",
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

  const [selectedCertImage, setSelectedCertImage] = useState<string | null>(
    null
  );
  const modalContentRef = useRef<HTMLDivElement>(null);
  const modalBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia(wrapRef);

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const conditions = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
        };
        const { isDesktop } = conditions;

        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: isDesktop ? 40 : 25, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: wrapRef.current,
              start: "top 85%",
            },
          }
        );

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

        certs.forEach((cert, i) => {
          const row = rowRefs.current[i];
          const node = nodeRefs.current[i];
          const block = blockRefs.current[i];
          if (!row || !node || !block) return;

          const xOffset = isDesktop ? (cert.side === "right" ? -50 : 50) : 30;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });

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
          ).fromTo(
            block,
            { opacity: 0, x: xOffset },
            { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
            "-=0.2"
          );

          if (cert.status === "wip" && progRefs.current[i]) {
            tl.fromTo(
              progRefs.current[i],
              { width: "0%" },
              { width: cert.progress + "%", duration: 1, ease: "power2.out" },
              "-=0.3"
            );
          }
        });
      }
    );

    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (selectedCertImage) {
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline();
      tl.fromTo(
        modalBgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      ).fromTo(
        modalContentRef.current,
        { opacity: 0, scale: 0.8, y: 30, rotationX: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotationX: 0,
          duration: 0.5,
          ease: "back.out(1.5)",
        },
        "-=0.1"
      );
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedCertImage]);

  const closeModal = () => {
    const tl = gsap.timeline({
      onComplete: () => setSelectedCertImage(null),
    });

    tl.to(modalContentRef.current, {
      opacity: 0,
      scale: 0.9,
      y: 20,
      duration: 0.2,
      ease: "power2.in",
    }).to(
      modalBgRef.current,
      {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      },
      "<"
    );
  };

  return (
    <>
      <section
        ref={wrapRef}
        dir="rtl"
        className="relative w-full py-20 md:py-32 px-4 md:px-6 bg-[#1a1a1a] overflow-hidden"
      >
        <div className="text-center mb-20 md:mb-32 relative z-10">
          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold text-[#fffcf2] tracking-tight opacity-0"
          >
            <span className="text-[#eb5e28]">الشهادات</span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-0 bottom-0 right-4 md:right-auto md:left-1/2 translate-x-1/2 md:-translate-x-1/2 w-[2px] flex justify-center z-0">
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

          {certs.map((cert, i) => {
            const isDone = cert.status === "done";

            return (
              <div
                key={i}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                className={`relative flex items-start md:items-center justify-between min-h-[140px] md:min-h-[160px] mb-8 md:mb-12 flex-row ${
                  cert.side === "left" ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="w-[45%] hidden md:block" />

                <div className="absolute right-4 md:right-auto md:left-1/2 top-10 md:top-1/2 translate-x-1/2 md:-translate-x-1/2 -translate-y-1/2 z-20 flex justify-center items-center">
                  <div
                    className={`w-6 h-6 rounded-full bg-[#1a1a1a] border border-[#403d39] flex items-center justify-center shadow-lg transition-transform duration-300 ${
                      isDone ? "group-hover:scale-125" : ""
                    }`}
                  >
                    <div
                      ref={(el) => {
                        nodeRefs.current[i] = el;
                      }}
                      className={`w-2.5 h-2.5 rounded-full ${
                        isDone ? "bg-[#eb5e28]" : "bg-[#ccc5b9]"
                      } opacity-0`}
                    />
                  </div>
                </div>

                <div
                  className={`w-full md:w-[45%] relative z-10 pr-14 md:pr-0 ${
                    cert.side === "right" ? "md:pr-10" : "md:pl-10"
                  }`}
                >
                  <div
                    ref={(el) => {
                      blockRefs.current[i] = el;
                    }}
                    onClick={() =>
                      isDone && cert.image && setSelectedCertImage(cert.image)
                    }
                    className={`group will-change-transform p-5 md:p-6 rounded-2xl border border-[#403d39]/50 bg-[#252422]/60 backdrop-blur-sm transition-all duration-300 opacity-0 
                      ${
                        cert.side === "right"
                          ? "text-right"
                          : "text-right md:text-left"
                      }
                      ${
                        isDone
                          ? "cursor-pointer hover:border-[#eb5e28]/50 hover:bg-[#252422] hover:-translate-y-1 hover:shadow-[0_10px_30px_-15px_rgba(235,94,40,0.3)]"
                          : "hover:border-[#403d39] hover:bg-[#252422]"
                      }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="inline-block font-mono text-[10px] md:text-[11px] tracking-widest text-[#ccc5b9] uppercase bg-[#403d39]/30 px-2 py-1 rounded-md">
                        {cert.tag}
                      </span>

                      {isDone && (
                        <span className="text-[#eb5e28] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M15 3h6v6" />
                            <path d="M10 14L21 3" />
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          </svg>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base md:text-lg font-semibold text-[#fffcf2] mb-2 leading-snug group-hover:text-[#eb5e28] transition-colors">
                      {cert.title}
                    </h3>
                    <p
                      className="text-xs md:text-sm text-[#ccc5b9] leading-relaxed mb-4 w-full text-right"
                      dir="rtl"
                    >
                      {cert.desc}
                    </p>
                    <StatusBadge
                      cert={cert}
                      progRef={(el) => {
                        progRefs.current[i] = el;
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* نافذة عرض الشهادة (Dialog) */}
      {selectedCertImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          dir="rtl"
        >
          {/* الخلفية المعتمة */}
          <div
            ref={modalBgRef}
            className="absolute inset-0 bg-black/80 backdrop-blur-md opacity-0"
            onClick={closeModal}
          />

          {/* محتوى النافذة */}
          <div
            ref={modalContentRef}
            className="relative w-full max-w-4xl bg-[#1a1a1a] border border-[#403d39] rounded-2xl shadow-2xl overflow-hidden opacity-0"
            style={{ perspective: "1000px" }}
          >
            {/* شريط علوي للنافذة */}
            <div className="flex items-center justify-between p-4 border-b border-[#403d39]/50 bg-[#252422]">
              <span className="text-[#fffcf2] font-semibold text-sm">
                عرض الشهادة
              </span>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#403d39]/50 text-[#ccc5b9] hover:bg-[#eb5e28] hover:text-white transition-colors hover:cursor-pointer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="p-4 md:p-6 bg-gradient-to-b from-[#252422] to-[#1a1a1a] flex justify-center">
              <img
                src={selectedCertImage}
                alt="Certificate"
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-lg border border-[#403d39]/30"
              />
            </div>
          </div>
        </div>
      )}
    </>
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
      <span className="inline-flex items-center gap-1.5 text-[11px] md:text-xs font-medium px-3 py-1.5 rounded-full border border-green-900/50 text-green-400 bg-green-900/10">
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
        <span className="inline-flex items-center gap-1.5 text-[11px] md:text-xs font-medium px-3 py-1 rounded-full border border-amber-900/50 text-amber-400 bg-amber-900/10">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="animate-spin-slow"
          >
            <path
              d="M5 1v2m0 4v2m-4-4h2m4 0h2m-7-3l1.5 1.5m3 3l1.5 1.5m-6 0l1.5-1.5m3-3l1.5-1.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          قيد الإنجاز
        </span>
        <span className="text-[11px] md:text-xs text-[#ccc5b9] font-mono">
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
