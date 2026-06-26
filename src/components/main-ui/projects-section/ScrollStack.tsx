"use client";
import React, { ReactNode, useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={`scroll-stack-card relative w-full rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
      transition: "transform 0.1s ease-out, filter 0.1s ease-out",
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const metricsRef = useRef({
    containerHeight: 0,
    endElementTop: 0,
    cardsTop: [] as number[],
  });

  const parsePercentage = useCallback(
    (value: string | number, containerHeight: number) => {
      if (typeof value === "string" && value.includes("%")) {
        return (parseFloat(value) / 100) * containerHeight;
      }
      return parseFloat(value as string);
    },
    []
  );

  const calculateMetrics = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller && !useWindowScroll) return;

    metricsRef.current.containerHeight = useWindowScroll
      ? window.innerHeight
      : scroller!.clientHeight;

    const getAbsoluteTop = (el: HTMLElement) => {
      let top = 0;
      let current: HTMLElement | null = el;
      while (current) {
        top += current.offsetTop;
        current = current.offsetParent as HTMLElement;
      }
      return top;
    };

    metricsRef.current.cardsTop = cardsRef.current.map((card) =>
      getAbsoluteTop(card)
    );

    const endElement = useWindowScroll
      ? (document.querySelector(".scroll-stack-end") as HTMLElement | null)
      : (scroller?.querySelector(".scroll-stack-end") as HTMLElement | null);

    if (endElement) {
      metricsRef.current.endElementTop = getAbsoluteTop(endElement);
    }
  }, [useWindowScroll]);

  const updateTransforms = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!cardsRef.current.length || (!useWindowScroll && !scroller)) return;

    const scrollTop = useWindowScroll ? window.scrollY : scroller!.scrollTop;
    const { containerHeight, cardsTop, endElementTop } = metricsRef.current;

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(
      scaleEndPosition,
      containerHeight
    );

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardsTop[i];
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinEnd = endElementTop - containerHeight / 2;

      let scaleProgress = 0;
      if (scrollTop >= triggerStart && scrollTop <= triggerEnd) {
        scaleProgress =
          (scrollTop - triggerStart) / (triggerEnd - triggerStart);
      } else if (scrollTop > triggerEnd) {
        scaleProgress = 1;
      }

      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        const topCardIndex = cardsTop.findIndex(
          (top, idx) =>
            top - stackPositionPx - itemStackDistance * idx > scrollTop
        );
        if (topCardIndex !== -1 && i < topCardIndex) {
          blur = Math.max(0, (topCardIndex - i) * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= triggerStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY =
          scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotation}deg)`;
      card.style.filter = blur > 0 ? `blur(${blur}px)` : "none";
    });

    if (cardsRef.current.length > 0 && onStackComplete) {
      const lastIndex = cardsRef.current.length - 1;
      const lastCardStart =
        cardsTop[lastIndex] - stackPositionPx - itemStackDistance * lastIndex;
      const isComplete = scrollTop >= lastCardStart;
      if (isComplete) onStackComplete();
    }
  }, [
    useWindowScroll,
    stackPosition,
    scaleEndPosition,
    itemStackDistance,
    itemScale,
    baseScale,
    rotationAmount,
    blurAmount,
    parsePercentage,
    onStackComplete,
  ]);

  useEffect(() => {
    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll(".scroll-stack-card")
        : scrollerRef.current?.querySelectorAll(".scroll-stack-card") ?? []
    ) as HTMLElement[];

    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
    });

    calculateMetrics();

    if (!useWindowScroll) {
      const scroller = scrollerRef.current;
      if (scroller) {
        const lenis = new Lenis({
          wrapper: scroller,
          content: scroller.querySelector(".scroll-stack-inner") as HTMLElement,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        lenisRef.current = lenis;

        const rafLoop = (time: number) => {
          lenis.raf(time);
          rafIdRef.current = requestAnimationFrame(rafLoop);
        };
        rafIdRef.current = requestAnimationFrame(rafLoop);
      }
    }

    const onScroll = () => {
      if (!rafIdRef.current || useWindowScroll) {
        rafIdRef.current = requestAnimationFrame(() => {
          updateTransforms();
          if (useWindowScroll) rafIdRef.current = null;
        });
      }
    };

    const targetElement = useWindowScroll ? window : scrollerRef.current;
    targetElement?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", calculateMetrics);

    updateTransforms();

    return () => {
      targetElement?.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", calculateMetrics);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (lenisRef.current) lenisRef.current.destroy();
    };
  }, [useWindowScroll, itemDistance, calculateMetrics, updateTransforms]);

  return (
    <div
      className={`relative w-full h-full ${
        useWindowScroll
          ? "overflow-visible"
          : "overflow-y-auto overflow-x-visible"
      } ${className}`.trim()}
      ref={scrollerRef}
      style={!useWindowScroll ? { WebkitOverflowScrolling: "touch" } : {}}
    >
      <div
        className={`scroll-stack-inner w-full ${
          useWindowScroll
            ? ""
            : "pt-[20vh] px-20 pb-60 md:pb-20 min-h-screen"
        }`}
      >
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
