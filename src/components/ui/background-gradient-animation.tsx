"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type BackgroundGradientAnimationProps = {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
};

export default function BackgroundGradientAnimation({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: BackgroundGradientAnimationProps) {
  const interactiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = 0;
    let y = 0;
    let xSet = x;
    let ySet = y;
    const animationDuration = 15000;
    const lastTime = 0;

    const animate = (currentTime: number) => {
      if (!interactiveRef.current) return;
      if (currentTime - lastTime < 10) {
        requestAnimationFrame(animate);
        return;
      }
      xSet += (x - xSet) / 10;
      ySet += (y - ySet) / 10;

      const xPercent = (xSet / window.innerWidth) * 100;
      const yPercent = (ySet / window.innerHeight) * 100;

      interactiveRef.current.style.setProperty("--x", `${xPercent}%`);
      interactiveRef.current.style.setProperty("--y", `${yPercent}%`);

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = interactiveRef.current?.getBoundingClientRect();
      if (rect) {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }
    };

    if (interactive && interactiveRef.current) {
      interactiveRef.current.addEventListener("mousemove", handleMouseMove);
      animate(0);
    }

    return () => {
      if (interactive && interactiveRef.current) {
        interactiveRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [interactive]);

  return (
    <div
      ref={interactiveRef}
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${containerClassName || ""}`}
      style={
        {
          "--gradient-background-start": gradientBackgroundStart,
          "--gradient-background-end": gradientBackgroundEnd,
          "--first-color": firstColor,
          "--second-color": secondColor,
          "--third-color": thirdColor,
          "--fourth-color": fourthColor,
          "--fifth-color": fifthColor,
          "--pointer-color": pointerColor,
          "--size": size,
          "--blending-value": blendingValue,
        } as React.CSSProperties
      }
    >
      <svg className="absolute inset-0 h-full w-full">
        <rect
          width="100%"
          height="100%"
          fill={`url(#gradient)`}
        />
      </svg>

      <div className="absolute inset-0 z-10">
        <svg className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(90)">
              <stop offset="0%" stopColor={gradientBackgroundStart} />
              <stop offset="100%" stopColor={gradientBackgroundEnd} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <motion.div
        className="absolute inset-0 z-10"
        style={{
          background: `radial-gradient(2px 2px at ${interactive ? "var(--x)" : "50%"} ${interactive ? "var(--y)" : "50%"}, rgb(${pointerColor}), transparent 50%)`,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 50 }}
      />

      <div
        className="absolute inset-0 z-10"
        style={{
          background: `radial-gradient(${size} ${size} at ${interactive ? "var(--x)" : "50%"} ${interactive ? "var(--y)" : "50%"}, rgba(${firstColor}, 0.3), transparent 50%)`,
          mixBlendMode: blendingValue as any,
          animation: "moveVertical 30s ease infinite",
        }}
      />

      <div
        className="absolute inset-0 z-10"
        style={{
          background: `radial-gradient(${size} ${size} at ${interactive ? "var(--x)" : "50%"} ${interactive ? "var(--y)" : "50%"}, rgba(${secondColor}, 0.3), transparent 50%)`,
          mixBlendMode: blendingValue as any,
          animation: "moveInCircle 20s reverse infinite",
        }}
      />

      <div
        className="absolute inset-0 z-10"
        style={{
          background: `radial-gradient(${size} ${size} at ${interactive ? "var(--x)" : "50%"} ${interactive ? "var(--y)" : "50%"}, rgba(${thirdColor}, 0.3), transparent 50%)`,
          mixBlendMode: blendingValue as any,
          animation: "moveInCircle 40s linear infinite",
        }}
      />

      <div
        className="absolute inset-0 z-10"
        style={{
          background: `radial-gradient(${size} ${size} at ${interactive ? "var(--x)" : "50%"} ${interactive ? "var(--y)" : "50%"}, rgba(${fourthColor}, 0.2), transparent 50%)`,
          mixBlendMode: blendingValue as any,
          animation: "moveHorizontal 40s ease infinite",
        }}
      />

      <div
        className="absolute inset-0 z-10"
        style={{
          background: `radial-gradient(${size} ${size} at ${interactive ? "var(--x)" : "50%"} ${interactive ? "var(--y)" : "50%"}, rgba(${fifthColor}, 0.2), transparent 50%)`,
          mixBlendMode: blendingValue as any,
          animation: "moveInCircle 20s ease infinite",
        }}
      />

      {children}
    </div>
  );
}

// Named export for convenience (matches Aceternity pattern)
export { BackgroundGradientAnimation };

