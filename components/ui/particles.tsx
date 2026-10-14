"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const hexInt = Number.parseInt(hex, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}

function remapValue(
  value: number,
  start1: number,
  end1: number,
  start2: number,
  end2: number
): number {
  const remapped =
    ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
  return remapped > 0 ? remapped : 0;
}

const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Everything lives inside one effect so each run owns exactly one animation
  // loop and one set of listeners, and cleans them up (theme switches and
  // navigation used to stack extra loops that never stopped).
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvasContainerRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !container || !context) return;

    const dpr = window.devicePixelRatio || 1;
    const rgb = hexToRgb(color).join(", ");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0, y: 0 };
    const canvasSize = { w: 0, h: 0 };
    let circles: Circle[] = [];
    let frame = 0;

    const circleParams = (): Circle => ({
      x: Math.floor(Math.random() * canvasSize.w),
      y: Math.floor(Math.random() * canvasSize.h),
      translateX: 0,
      translateY: 0,
      size: Math.floor(Math.random() * 2) + size,
      alpha: 0,
      targetAlpha: Number.parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      magnetism: 0.1 + Math.random() * 4,
    });

    const drawCircle = (circle: Circle) => {
      const { x, y, translateX, translateY, alpha } = circle;
      context.translate(translateX, translateY);
      context.beginPath();
      context.arc(x, y, circle.size, 0, 2 * Math.PI);
      context.fillStyle = `rgba(${rgb}, ${alpha})`;
      context.fill();
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initCanvas = () => {
      canvasSize.w = container.offsetWidth;
      canvasSize.h = container.offsetHeight;
      canvas.width = canvasSize.w * dpr;
      canvas.height = canvasSize.h * dpr;
      canvas.style.width = `${canvasSize.w}px`;
      canvas.style.height = `${canvasSize.h}px`;
      context.scale(dpr, dpr);
      circles = Array.from({ length: quantity }, circleParams);

      // Without motion, draw a single still frame at full opacity.
      if (reduceMotion) {
        context.clearRect(0, 0, canvasSize.w, canvasSize.h);
        circles.forEach((circle) => {
          circle.alpha = circle.targetAlpha;
          drawCircle(circle);
        });
      }
    };

    const animate = () => {
      context.clearRect(0, 0, canvasSize.w, canvasSize.h);
      circles.forEach((circle, i) => {
        // Fade particles out as they approach the canvas edges
        const edge = [
          circle.x + circle.translateX - circle.size, // distance from left edge
          canvasSize.w - circle.x - circle.translateX - circle.size, // distance from right edge
          circle.y + circle.translateY - circle.size, // distance from top edge
          canvasSize.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
        ];
        const closestEdge = edge.reduce((a, b) => Math.min(a, b));
        const remapClosestEdge = Number.parseFloat(
          remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
        );
        if (remapClosestEdge > 1) {
          circle.alpha = Math.min(circle.alpha + 0.02, circle.targetAlpha);
        } else {
          circle.alpha = circle.targetAlpha * remapClosestEdge;
        }
        circle.x += circle.dx + vx;
        circle.y += circle.dy + vy;
        circle.translateX +=
          (mouse.x / (staticity / circle.magnetism) - circle.translateX) / ease;
        circle.translateY +=
          (mouse.y / (staticity / circle.magnetism) - circle.translateY) / ease;

        drawCircle(circle);

        // Replace particles that drift out of the canvas
        if (
          circle.x < -circle.size ||
          circle.x > canvasSize.w + circle.size ||
          circle.y < -circle.size ||
          circle.y > canvasSize.h + circle.size
        ) {
          circles[i] = circleParams();
        }
      });
      frame = window.requestAnimationFrame(animate);
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left - canvasSize.w / 2;
      const y = event.clientY - rect.top - canvasSize.h / 2;
      if (Math.abs(x) < canvasSize.w / 2 && Math.abs(y) < canvasSize.h / 2) {
        mouse.x = x;
        mouse.y = y;
      }
    };

    initCanvas();
    window.addEventListener("resize", initCanvas);

    if (!reduceMotion) {
      window.addEventListener("mousemove", onMouseMove);
      animate();
    }

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", initCanvas);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [color, quantity, staticity, ease, size, vx, vy, refresh]);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
      ref={canvasContainerRef}
    >
      <canvas className="size-full" ref={canvasRef} />
    </div>
  );
};

export default Particles;
