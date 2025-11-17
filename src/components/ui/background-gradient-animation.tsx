"use client";
import { useEffect, useRef } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!interactive || !interactiveRef.current) return;

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    const move = () => {
      if (!interactiveRef.current) return;
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(move);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      tgX = event.clientX - rect.left - rect.width / 2;
      tgY = event.clientY - rect.top - rect.height / 2;
    };

    window.addEventListener("mousemove", handleMouseMove);
    move();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={`gradient-bg ${containerClassName || ""}`}
      style={
        {
          "--color-bg1": gradientBackgroundStart,
          "--color-bg2": gradientBackgroundEnd,
          "--color1": firstColor,
          "--color2": secondColor,
          "--color3": thirdColor,
          "--color4": fourthColor,
          "--color5": fifthColor,
          "--color-interactive": pointerColor,
          "--circle-size": size,
          "--blending": blendingValue,
        } as React.CSSProperties
      }
    >
      <svg xmlns="http://www.w3.org/2000/svg" style={{ position: "fixed", top: 0, left: 0, width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="gradients-container">
        <div className="g1" />
        <div className="g2" />
        <div className="g3" />
        <div className="g4" />
        <div className="g5" />
        {interactive && <div ref={interactiveRef} className="interactive" />}
      </div>

      {children}
    </div>
  );
}
