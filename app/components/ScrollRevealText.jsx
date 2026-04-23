"use client";

import { useMemo, useEffect, useRef } from "react";

/**
 * High-Performance Character Reveal Component.
 * Optimized for "No-Lag" performance on all platforms.
 * 
 * Strategy:
 * 1. Renders character spans only ONCE when text changes.
 * 2. Uses CSS Variables and GPU-accelerated calc/clamp for scroll-linked reveals.
 * 3. Bypasses React re-renders for every scroll frame.
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

  // Update CSS variable on the container when progress changes.
  // This is extremely light compared to re-rendering the whole component tree.
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
          }

          return (
            <span
              key={`char-${index}`}
              className={`reveal-char inline-block ${baseColorClass} ${glowClass}`}
              style={{ 
                "--char-index": index,
                // If stagger is provided, we use it for a time-based transition (Hero)
                // Otherwise, the CSS uses the --reveal-progress variable directly
                transitionDelay: stagger > 0 ? `${(index % 30) * stagger}ms` : '0ms'
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
          /* No-Lag Reveal Engine */
          --ease: cubic-bezier(0.33, 1, 0.68, 1);
        }

        .reveal-char, .reveal-space {
          /* Calculate visibility state purely in CSS based on parent's --reveal-progress */
          /* factor becomes positive when char should be visible */
          --factor: calc(var(--reveal-progress) * var(--total-chars) * 1.15 - var(--char-index));
          --vis: clamp(0, var(--factor), 1);
          --inv-vis: calc(1 - var(--vis));

          opacity: var(--vis);
          filter: blur(calc(var(--inv-vis) * 10px));
          transform: 
            scale(calc(1 - var(--inv-vis) * 0.08))
            rotateX(calc(var(--inv-vis) * 30deg));
          
          /* Smoothness: Using transition only for the toggle ensures snappy but fluid motion */
          transition: opacity 300ms var(--ease), filter 300ms var(--ease), transform 300ms var(--ease);
          will-change: opacity, filter, transform;
        }

        /* If stagger is enabled (Hero), we let the transition delay do the heavy lifting */
        /* If not, the variables drive the state directly with no overhead */
      `}</style>
    </div>
  );
}
