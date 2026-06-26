"use client";
import { JSX, useEffect, useRef } from "react";
import { animate, scroll } from "motion";

const cards = [
  {
    num: "01",
    title: "ENGINEER",
    watermark: "ENG",
    subtitle: "Software Engineering",
    description:
      "أبني أنظمة قابلة للتوسع وحلولاً رقمية تركز على حل المشكلة قبل كتابة أول سطر برمجي.",
    bg: "#252422",
    text: "#FFFCF2",
    accent: "#EB5E28",
  },
  {
    num: "02",
    title: "AI",
    watermark: "AI",
    subtitle: "Artificial Intelligence",
    description:
      "أطور نماذج تعتمد على البيانات والذكاء الاصطناعي مع التركيز على الشفافية وقابلية التفسير.",
    bg: "#403D39",
    text: "#FFFCF2",
    accent: "#EB5E28",
  },
  {
    num: "03",
    title: "BUILDER",
    watermark: "BLD",
    subtitle: "Product Development",
    description:
      "أحول الأفكار إلى منتجات حقيقية من الفكرة الأولى وحتى الإطلاق والتجربة مع المستخدمين.",
    bg: "#EB5E28",
    text: "#FFFCF2",
    accent: "#FFFCF2",
  },
  {
    num: "04",
    title: "PROBLEM",
    watermark: "PRB",
    subtitle: "Real World Solutions",
    description:
      "أبحث عن التحديات التشغيلية وسلوك المستخدم ثم أبني حلولاً عملية تحقق أثراً قابلاً للقياس.",
    bg: "#1C1B18",
    text: "#FFFCF2",
    accent: "#EB5E28",
  },
  {
    num: "05",
    title: "VISION",
    watermark: "VIS",
    subtitle: "Saudi Arabia 2030",
    description:
      "أؤمن بأن التقنية وسيلة لصناعة أثر حقيقي والمساهمة في التحول الرقمي للمملكة.",
    bg: "#F5F0E8",
    text: "#252422",
    accent: "#EB5E28",
  },
];

const total = cards.length;

export default function HorizontalScroll(): JSX.Element {
  const ulRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = ulRef.current?.querySelectorAll("li");

    if (ulRef.current && items && items.length > 0 && containerRef.current) {
      const xKeyframes = ["0vw", "0vw"];
      for (let i = 1; i < items.length; i++) {
        xKeyframes.push(`${i * 100}vw`);
      }
      xKeyframes.push(`${(items.length - 1) * 100}vw`);

      const controls = animate(
        ulRef.current,
        { x: xKeyframes },
        { ease: "linear" }
      );

      scroll(controls, {
        target: containerRef.current,
        offset: ["start start", "end end"],
      });

      if (progressBarRef.current) {
        scroll(
          animate(
            progressBarRef.current,
            { scaleX: [0, 1] },
            { ease: "linear" }
          ),
          { target: containerRef.current, offset: ["start start", "end end"] }
        );
      }
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="h-[700vh] w-full mx-auto my-auto relative bg-[#1a1a1a]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          dir="rtl"
          className="absolute top-0 left-0 w-full h-1.5 bg-white/10 z-50"
        >
          <div
            ref={progressBarRef}
            className="h-full bg-[#EB5E28] origin-right"
          />
        </div>
        <div
          dir="rtl"
          className="absolute top-12 right-8 md:right-16 z-40 flex flex-col items-center gap-3 pointer-events-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
            <h2 className="text-[#FFFCF2]/80 text-xl md:text-3xl font-light tracking-widest uppercase">
              عنّي
            </h2>
          </div>
        </div>
        <ul
          ref={ulRef}
          className="flex justify-start items-center h-full w-max"
        >
          {cards.map((card) => (
            <li
              key={card.title}
              className="h-[85vh] md:h-[90vh] w-screen shrink-0 relative overflow-hidden px-4 md:px-12 flex items-center justify-center"
            >
              <div
                className="w-full h-full relative overflow-hidden rounded-3xl md:rounded-[3rem] shadow-2xl border border-white/10 transition-all duration-500"
                style={{ background: card.bg, color: card.text }}
              >
                <div
                  dir="rtl"
                  className="absolute inset-0 flex flex-col justify-between p-8 md:p-16 lg:p-24 z-10"
                >
                  <div className="flex items-center justify-between font-mono">
                    <span
                      className="text-sm md:text-base tracking-[0.2em] font-medium"
                      style={{ opacity: 0.6 }}
                    >
                      {String(total).padStart(2, "0")} /{" "}
                      <span className="font-bold opacity-100">{card.num}</span>
                    </span>
                    <span
                      className="uppercase tracking-[0.35em] text-xs md:text-sm font-semibold"
                      style={{ opacity: 0.6 }}
                    >
                      {card.subtitle}
                    </span>
                  </div>

                  <div className="mt-auto mb-auto md:mt-0 flex flex-col justify-center h-full">
                    <h2
                      className="font-black uppercase leading-[0.9] mb-6 md:mb-10 drop-shadow-lg"
                      style={{ fontSize: "clamp(3.5rem, 12vw, 12rem)" }}
                      dir="ltr"
                    >
                      {card.title}
                    </h2>

                    <div
                      className="mb-8 md:mb-10"
                      style={{
                        width: "3rem",
                        height: "4px",
                        borderRadius: "4px",
                        background: card.accent,
                      }}
                    />

                    <p
                      className="max-w-xs md:max-w-2xl text-base md:text-2xl lg:text-3xl leading-relaxed md:leading-normal font-medium"
                      style={{ opacity: 0.85 }}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>

                <div
                  className="absolute bottom-0 right-0 font-black leading-none select-none pointer-events-none z-0 mix-blend-overlay"
                  style={{
                    fontSize: "clamp(6rem, 25vw, 25rem)",
                    opacity: 0.08,
                    letterSpacing: "-0.04em",
                    transform: "translate(5%, 15%)",
                  }}
                  aria-hidden="true"
                >
                  {card.watermark}
                </div>

                <div
                  className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] opacity-20 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${card.accent} 0%, transparent 50%)`,
                    mixBlendMode: "soft-light",
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
