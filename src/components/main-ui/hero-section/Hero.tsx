import React, {
  Suspense,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, Float, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scroll = { progress: 0, velocity: 0, last: 0 };

function Loader({ loaded }: { loaded: boolean }) {
  return (
    <div
      className={`
          fixed inset-0 z-9999
          bg-black
          flex items-center justify-center
          transition-all duration-1000
          ${loaded ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
    >
      <div className="text-center">
        <h1 className="text-[#CCC5B9] text-5xl font-light mb-8">
          Ali Alshehri
        </h1>

        <div className="w-72 h-0.5 bg-white/10 overflow-hidden rounded-full">
          <div className="h-full w-full bg-[#CCC5B9] animate-pulse" />
        </div>

        <p className="mt-4 text-[#CCC5B9]/50 text-sm tracking-[0.3em] uppercase">
          Loading Experience
        </p>
      </div>
    </div>
  );
}

function CameraDrift() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, dt) => {
    mouse.current.x = THREE.MathUtils.lerp(
      mouse.current.x,
      mouse.current.targetX,
      dt * 3
    );
    mouse.current.y = THREE.MathUtils.lerp(
      mouse.current.y,
      mouse.current.targetY,
      dt * 3
    );

    const targetX = mouse.current.x * 0.35;
    const targetY = -mouse.current.y * 0.2;
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      targetX,
      dt * 1.5
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      targetY + 0.3,
      dt * 1.5
    );
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function CinematicModel({
  url,
  isMobile,
  onLoaded,
}: {
  url: string;
  isMobile: boolean;
  onLoaded: () => void;
}) {
  const { scene } = useGLTF(url);
  useEffect(() => {
    onLoaded();
  }, [scene, onLoaded]);
  const modelRef = useRef<THREE.Group>(null);
  const t = useRef(0);

  const targetScale = useRef(isMobile ? 0.9 : 1.25);

  useFrame((_, dt) => {
    if (!modelRef.current) return;
    t.current += dt;
    const p = scroll.progress;

    const targetRotY = p * Math.PI * 3;
    const targetZ = (isMobile ? -1 : 0) + p * 2.5;
    const targetY = Math.sin(t.current * 0.7) * 0.08 + p * -0.8;
    const targetTilt = Math.sin(p * Math.PI * 2) * 0.15;

    const cDt = Math.min(dt, 0.05);

    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      targetRotY,
      cDt * 2
    );
    modelRef.current.position.z = THREE.MathUtils.lerp(
      modelRef.current.position.z,
      targetZ,
      cDt * 1.5
    );
    modelRef.current.position.y = THREE.MathUtils.lerp(
      modelRef.current.position.y,
      targetY,
      cDt * 2
    );
    modelRef.current.rotation.z = THREE.MathUtils.lerp(
      modelRef.current.rotation.z,
      targetTilt,
      cDt * 1.8
    );

    const baseScale = isMobile ? 0.9 : 1.25;
    const scaleBoost = 1 + scroll.velocity * 0.4;
    targetScale.current = baseScale * scaleBoost;
    const s = THREE.MathUtils.lerp(
      modelRef.current.scale.x,
      targetScale.current,
      cDt * 4
    );
    modelRef.current.scale.setScalar(s);
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={modelRef}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

interface SectionProps {
  align: "left" | "right";
  tag: string;
  headline: string[];
  body: string;
}

function Section({ align, tag, headline, body }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const lines = el.querySelectorAll(".reveal-line");
    gsap.set(lines, { y: "110%" });
    gsap.set(el.querySelector(".body-text"), { opacity: 0, y: 20 });
    gsap.set(el.querySelector(".stat-bar-fill"), {
      scaleX: 0,
      transformOrigin: "left",
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 65%",
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;

        gsap.to(lines, {
          y: "0%",
          stagger: 0.08,
          duration: 0.9,
          ease: "power4.out",
          delay: 0.1,
        });
        gsap.to(el.querySelector(".body-text"), {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
        });
        gsap.to(el.querySelector(".stat-bar-fill"), {
          scaleX: 1,
          duration: 1.2,
          delay: 0.6,
          ease: "power3.inOut",
        });
      },
    });

    return () => trigger.kill();
  }, []);

  const isLeft = align === "left";

  return (
    <div
      ref={ref}
      className={`h-screen flex flex-col justify-center px-8 md:px-16 xl:px-28
        ${isLeft ? "items-start" : "items-end text-right"} relative`}
    >
      <div className="overflow-hidden mb-4">
        <div className="reveal-line">
          <span className="font-mono text-xs tracking-[0.45em] uppercase text-[#CCC5B9]/40 block">
            {tag}
          </span>
        </div>
      </div>

      <div
        className={`flex flex-wrap gap-x-4 gap-y-1 ${
          isLeft ? "" : "justify-end"
        } mb-6 max-w-lg`}
      >
        {headline.map((word, i) => (
          <div key={i} className="overflow-hidden">
            <div className="reveal-line">
              <span
                className="block leading-none py-6"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  color: "#CCC5B9",
                  fontVariantLigatures: "none",
                }}
              >
                {word}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="body-text text-base md:text-lg text-[#CCC5B9]/60 max-w-xs md:max-w-sm leading-relaxed mb-8">
        {body}
      </p>

      <div
        className={`flex flex-col gap-2 w-full max-w-xs ${
          isLeft ? "" : "items-end"
        }`}
      >
        <div className="w-full h-px bg-[#CCC5B9]/10 relative overflow-hidden rounded-full">
          <div className="stat-bar-fill absolute inset-0 bg-linear-to-r from-[#CCC5B9]/60 to-[#CCC5B9]/20 rounded-full" />
        </div>
      </div>

      <div
        className={`absolute top-1/2 ${
          isLeft ? "left-0" : "right-0"
        } w-px h-32 -translate-y-1/2`}
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(204,197,185,0.3), transparent)",
        }}
      />
    </div>
  );
}

function LandingScreen() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".land-line",
        { y: "100%" },
        {
          y: "0%",
          stagger: 0.12,
          duration: 1.1,
          ease: "power4.out",
          delay: 0.3,
        }
      );
      gsap.fromTo(
        ".land-sub",
        { opacity: 0 },
        { opacity: 1, duration: 1.2, delay: 0.9 }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="h-screen flex flex-col items-center justify-start pb-32 relative z-10 select-none"
    >
      <div className="text-center px-6 relative">
        <div className="overflow-hidden mb-1">
          <div className="land-line">
            <span className="block font-mono text-[11px] tracking-[0.5em] uppercase text-[#CCC5B9]/35 -z-10">
              Ali Alshehri
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const SECTIONS: SectionProps[] = [
  {
    align: "left",
    tag: "Software Engineering",
    headline: ["أبني", "أنظمة", "قبل", "أن", "أبني", "واجهات"],
    body: "أهتم بفهم المشكلة وتصميم الحل قبل كتابة أول سطر برمجي.",
  },
  {
    align: "right",
    tag: "Artificial Intelligence",
    headline: ["الذكاء", "الاصطناعي", "عندما", "يخدم", "الإنسان"],
    body: "أطور حلولًا تعتمد على البيانات والذكاء الاصطناعي لحل تحديات حقيقية يمكن قياس أثرها.",
  },
  {
    align: "left",
    tag: "Product Building",
    headline: ["أفكار", "تتحول", "إلى", "منتجات"],
    body: "أحب بناء المنتجات الرقمية من الفكرة الأولى وحتى الإطلاق، مع التركيز على احتياجات المستخدم والسوق.",
  },
];

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const modelPath = "/3D/myChar.glb";
  const [isMobile, setIsMobile] = useState(false);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  const [canvasVisible, setCanvasVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!mainRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCanvasVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(mainRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mainRef.current) return;

    let ticking = false;

    const updateScroll = () => {
      if (!mainRef.current) return;
      const rect = mainRef.current.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      let p = maxScroll > 0 ? -rect.top / maxScroll : 0;
      p = Math.max(0, Math.min(1, p));

      scroll.velocity = Math.abs(p - scroll.last) * 18;
      scroll.last = scroll.progress;
      scroll.progress = p;

      if (canvasWrapRef.current) {
        const opacity = p > 0.85 ? 1 - (p - 0.85) / 0.15 : 1;
        const clamped = Math.max(0, opacity);
        canvasWrapRef.current.style.opacity = clamped.toString();
        canvasWrapRef.current.style.visibility =
          clamped <= 0 ? "hidden" : "visible";
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const totalSections = SECTIONS.length + 1;
  const totalHeight = `${totalSections * 100}vh`;

  return (
    <main
      ref={mainRef}
      className="relative w-full bg-black"
      style={{ minHeight: totalHeight }}
    >
      <Loader loaded={loaded} />
      <div
        ref={canvasWrapRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ willChange: "opacity" }}
      >
        {canvasVisible && (
          <Canvas
            camera={{ position: [0, 0.3, 5], fov: 45 }}
            dpr={[1, isMobile ? 1.5 : 2]}
            gl={{
              antialias: !isMobile,
              powerPreference: "high-performance",
            }}
          >
            <ambientLight intensity={0.15} />
            <directionalLight
              position={[8, 10, 5]}
              intensity={2.2}
              color="#ffffff"
            />
            <spotLight
              position={[-8, -6, -8]}
              intensity={6}
              color="#CCC5B9"
              angle={0.4}
            />
            <pointLight position={[0, 4, 2]} intensity={1.2} color="#a09890" />
            <Environment preset="night" />

            <Stars
              radius={120}
              depth={60}
              count={isMobile ? 1000 : 2500}
              factor={2}
              saturation={0}
              fade
              speed={0.4}
            />

            <CameraDrift />

            <Suspense fallback={null}>
              <CinematicModel
                url={modelPath}
                isMobile={isMobile}
                onLoaded={() => setLoaded(true)}
              />
            </Suspense>

            <EffectComposer
              enableNormalPass={false}
              multisampling={isMobile ? 0 : 4}
            >
              <Bloom
                luminanceThreshold={0.35}
                mipmapBlur
                intensity={isMobile ? 0.5 : 0.9}
                levels={isMobile ? 3 : 5}
              />
            </EffectComposer>
          </Canvas>
        )}
      </div>

      <div
        className="fixed inset-0 z-10 pointer-events-none opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative z-20">
        <LandingScreen />
        {SECTIONS.map((s, i) => (
          <Section key={i} {...s} />
        ))}
      </div>
    </main>
  );
}

useGLTF.preload("/3D/myChar.glb");
