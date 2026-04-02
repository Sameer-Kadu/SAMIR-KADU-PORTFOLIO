'use client';

import React, { useEffect, useRef } from "react";

interface FuzzyTextProps {
  children: React.ReactNode;
  fontSize?: number | string;
  fontWeight?: number | string;
  fontFamily?: string;
  color?: string;
  enableHover?: boolean;
  baseIntensity?: number;
  hoverIntensity?: number;
}

const isTouchDevice = () =>
  typeof window !== "undefined" && navigator.maxTouchPoints > 0;

const FuzzyText: React.FC<FuzzyTextProps> = ({
  children,
  fontSize = "clamp(1.5rem, 8vw, 8rem)",
  fontWeight = 900,
  fontFamily = "inherit",
  color = "#fff",
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // On touch devices render a plain span — no canvas overhead needed
  if (isTouchDevice()) {
    return (
      <span
        style={{
          fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize,
          fontWeight,
          fontFamily: fontFamily === "inherit" ? undefined : fontFamily,
          color,
          display: "inline-block",
        }}
      >
        {children}
      </span>
    );
  }

  return <FuzzyCanvas
    canvasRef={canvasRef}
    fontSize={fontSize}
    fontWeight={fontWeight}
    fontFamily={fontFamily}
    color={color}
    enableHover={enableHover}
    baseIntensity={baseIntensity}
    hoverIntensity={hoverIntensity}
  >
    {children}
  </FuzzyCanvas>;
};

// Separate inner component so the hook rules are always satisfied
const FuzzyCanvas: React.FC<FuzzyTextProps & { canvasRef: React.RefObject<HTMLCanvasElement> }> = ({
  children,
  fontSize = "clamp(1.5rem, 8vw, 8rem)",
  fontWeight = 900,
  fontFamily = "inherit",
  color = "#fff",
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
  canvasRef,
}) => {
  useEffect(() => {
    let animationFrameId: number;
    let isCancelled = false;
    let isVisible = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Pause animation when element is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const init = async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      if (isCancelled) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const computedFontFamily =
        fontFamily === "inherit"
          ? window.getComputedStyle(canvas).fontFamily || "sans-serif"
          : fontFamily;

      const fontSizeStr =
        typeof fontSize === "number" ? `${fontSize}px` : fontSize;
      let numericFontSize: number;
      if (typeof fontSize === "number") {
        numericFontSize = fontSize;
      } else {
        const temp = document.createElement("span");
        temp.style.fontSize = fontSize;
        document.body.appendChild(temp);
        numericFontSize = parseFloat(window.getComputedStyle(temp).fontSize);
        document.body.removeChild(temp);
      }

      const text = React.Children.toArray(children).join("");

      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = "alphabetic";
      const metrics = offCtx.measureText(text);

      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
      const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
      const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

      const textBoundingWidth = Math.ceil(actualLeft + actualRight);
      const tightHeight = Math.ceil(actualAscent + actualDescent);

      const extraWidthBuffer = 10;
      const offscreenWidth = textBoundingWidth + extraWidthBuffer;
      offscreen.width = offscreenWidth;
      offscreen.height = tightHeight;

      const xOffset = extraWidthBuffer / 2;
      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = "alphabetic";
      offCtx.fillStyle = color;
      offCtx.fillText(text, xOffset - actualLeft, actualAscent);

      const horizontalMargin = 50;
      canvas.width = offscreenWidth + horizontalMargin * 2;
      canvas.height = tightHeight;
      ctx.translate(horizontalMargin, 0);

      const interactiveLeft = horizontalMargin + xOffset;
      const interactiveTop = 0;
      const interactiveRight = interactiveLeft + textBoundingWidth;
      const interactiveBottom = tightHeight;

      let isHovering = false;
      const fuzzRange = 30;

      const run = () => {
        if (isCancelled) return;
        if (!isVisible) {
          animationFrameId = window.requestAnimationFrame(run);
          return;
        }
        ctx.clearRect(-fuzzRange, -fuzzRange, offscreenWidth + 2 * fuzzRange, tightHeight + 2 * fuzzRange);
        const intensity = isHovering ? hoverIntensity : baseIntensity;
        for (let j = 0; j < tightHeight; j++) {
          const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
          ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
        }
        animationFrameId = window.requestAnimationFrame(run);
      };

      run();

      const isInsideTextArea = (x: number, y: number) =>
        x >= interactiveLeft && x <= interactiveRight &&
        y >= interactiveTop && y <= interactiveBottom;

      const handleMouseMove = (e: MouseEvent) => {
        if (!enableHover) return;
        const rect = canvas.getBoundingClientRect();
        isHovering = isInsideTextArea(e.clientX - rect.left, e.clientY - rect.top);
      };

      const handleMouseLeave = () => { isHovering = false; };

      if (enableHover) {
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);
      }

      (canvas as any)._fuzzyCleanup = () => {
        window.cancelAnimationFrame(animationFrameId);
        if (enableHover) {
          canvas.removeEventListener("mousemove", handleMouseMove);
          canvas.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    };

    init();

    return () => {
      isCancelled = true;
      observer.disconnect();
      window.cancelAnimationFrame(animationFrameId);
      if (canvas && (canvas as any)._fuzzyCleanup) {
        (canvas as any)._fuzzyCleanup();
      }
    };
  }, [children, fontSize, fontWeight, fontFamily, color, enableHover, baseIntensity, hoverIntensity]);

  return <canvas ref={canvasRef} />;
};

export default FuzzyText;
