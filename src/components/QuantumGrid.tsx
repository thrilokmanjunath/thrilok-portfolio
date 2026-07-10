"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function QuantumGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const isDark = resolvedTheme === "dark";
    const dotColor = isDark ? "rgba(139, 92, 246, 0.15)" : "rgba(139, 92, 246, 0.08)";
    const activeColor = isDark ? "rgba(6, 182, 212, 0.6)" : "rgba(6, 182, 212, 0.4)";
    const lineColor = isDark ? "rgba(139, 92, 246, 0.05)" : "rgba(139, 92, 246, 0.02)";

    const dots: { x: number; y: number; originalX: number; originalY: number; size: number }[] = [];
    const spacing = 40;

    // Create grid dots
    for (let x = spacing / 2; x < width; x += spacing) {
      for (let y = spacing / 2; y < height; y += spacing) {
        dots.push({
          x,
          y,
          originalX: x,
          originalY: y,
          size: 1.5,
        });
      }
    }

    const mouse = { x: -1000, y: -1000, radius: 100 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      dots.length = 0;
      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          dots.push({
            x,
            y,
            originalX: x,
            originalY: y,
            size: 1.5,
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw grid lines
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;

      for (let x = spacing / 2; x < width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = spacing / 2; y < height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw active interactions
      dots.forEach((dot) => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          
          // push dots away from mouse slightly
          dot.x -= Math.cos(angle) * force * 4;
          dot.y -= Math.sin(angle) * force * 4;
          
          ctx.fillStyle = activeColor;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.size * 2, 0, Math.PI * 2);
          ctx.fill();

          // draw subtle connection line to mouse
          ctx.strokeStyle = `rgba(6, 182, 212, ${force * 0.15})`;
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        } else {
          // snap back slowly
          dot.x += (dot.originalX - dot.x) * 0.08;
          dot.y += (dot.originalY - dot.y) * 0.08;
          
          ctx.fillStyle = dotColor;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />;
}
