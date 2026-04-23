"use client";

import { useMemo, useEffect, useRef } from "react";

/**
 * High-Performance "Materialization" Reveal Component.
 * Optimized for Cycle 0 Aesthetic.
 */
export default function ScrollRevealText({ 
  text, 
  progress, 
  reducedMotion = false, 
  className = "", 
  colorMode = "split",
  stagger = 0 
}) {
  const containerRef = useRef(null);
  const totalLength = text.length;
  const halfPoint = Math.floor(totalLength / 2);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--reveal-progress', progress);
    }
  }, [progress]);

  const charParts = useMemo(() => {
    let cursor = 0;
    const partsArray = text.split(/(\s+)/);
    const result = [];
    
    partsArray.forEach((part, partIdx) => {
      if (/\s+/.test(part)) {
        part.split("").forEach((char) => {
          const index = cursor;
          cursor += 1;
          result.push(
            <span 
              key={`space-${index}`} 
              className="reveal-space inline-block"
              style={{ "--char-index": index }}
            >
              {"\u00A0"}
            </span>
          );
        });
      } else {
        const wordStartIndex = cursor;
        const charElements = part.split("").map((char) => {
          const index = cursor;
          cursor += 1;
          
          let baseColorClass = "text-white";
          let glowClass = "drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]";

          if (colorMode === "split") {
            const isRed = index >= halfPoint;
            baseColorClass = isRed ? "text-red-600" : "text-white";
            glowClass = isRed 
              ? "drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]" 
              : "drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]";
          } else if (colorMode === "yellow-split") {
            const isYellow = index >= halfPoint;
            baseColorClass = isYellow ? "text-yellow-200" : "text-white";
            glowClass = isYellow 
              ? "drop-shadow-[0_0_20px_rgba(254,240,138,0.5)]" 
              : "drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]";
          } else if (colorMode === "green-split") {
            const isGreen = index >= halfPoint;
            baseColorClass = isGreen ? "text-green-500" : "text-white";
            glowClass = isGreen 
              ? "drop-shadow-[0_0_20px_rgba(34,197,94,0.6)]" 
              : "drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]";
          } else if (colorMode === "green") {
            baseColorClass = "text-green-500";
            glowClass = "drop-shadow-[0_0_20px_rgba(34,197,94,0.6)]";
          } else if (colorMode === "white") {
            baseColorClass = "text-white";
            glowClass = "drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]";
          } else if (colorMode === "inherit") {
            baseColorClass = "";
            glowClass = "";
          }

          return (
            <span
              key={`char-${index}`}
              className={`reveal-char inline-block ${baseColorClass} ${glowClass}`}
              style={{ 
                "--char-index": index,
                transitionDelay: stagger > 0 ? `${(index % 60) * stagger}ms` : '0ms'
              }}
            >
              {char}
            </span>
          );
        });

        result.push(
          <span key={`word-${wordStartIndex}`} className="inline-block whitespace-nowrap">
            {charElements}
          </span>
        );
      }
    });
    return result;
  }, [text, colorMode, halfPoint, stagger]);

  return (
    <div 
      ref={containerRef}
      className={`reveal-container select-none ${className}`}
      style={{ 
        "--total-chars": totalLength,
        "--reveal-progress": reducedMotion ? 1 : progress 
      }}
    >
      {charParts}
      <style jsx>{`
        .reveal-container {
          --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
          perspective: 1200px;
        }

        .reveal-char, .reveal-space {
          /* Letter-by-letter timing linked to progress */
          /* Starts at 0.1, ends at 0.9 */
          --start-offset: 0.1;
          --end-offset: 0.9;
          --char-percent: calc(var(--char-index) / var(--total-chars));
          --start: calc(var(--start-offset) + var(--char-percent) * (var(--end-offset) - var(--start-offset)));
          --end: calc(var(--start) + 0.1);
          
          --factor: calc((var(--reveal-progress) - var(--start)) / (var(--end) - var(--start)));
          --vis: clamp(0, var(--factor), 1);
          --inv-vis: calc(1 - var(--vis));

          opacity: var(--vis);
          filter: blur(calc(var(--inv-vis) * 15px));
          transform: 
            translateY(calc(var(--inv-vis) * 20px))
            translateZ(calc(var(--inv-vis) * -100px))
            rotateX(calc(var(--inv-vis) * 60deg))
            scale(calc(1 + var(--inv-vis) * 0.2));
          
          transition: 
            opacity 800ms var(--ease-out-expo), 
            filter 1000ms var(--ease-out-expo), 
            transform 1200ms var(--ease-out-expo);
          will-change: opacity, filter, transform;
        }

        @media (max-width: 768px) {
          .reveal-char, .reveal-space {
            filter: blur(calc(var(--inv-vis) * 8px));
            transition-duration: 600ms;
          }
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }

        .reveal-char {
          animation: flicker calc(2.5s + var(--char-index) * 0.1s) infinite;
        }
      `}</style>
    </div>
  );
}
