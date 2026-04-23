"use client";

import { useMemo, useEffect, useRef } from "react";

/**
 * Professional Word-by-Word Reveal for Sponsors Page.
 * Features a "Digital Materialization" effect with individual word timing.
 */
export default function ScrollRevealWord({ 
  text, 
  progress, 
  className = "",
  colorMode = "split"
}) {
  const containerRef = useRef(null);
  const words = useMemo(() => text.split(/(\s+)/), [text]);
  const visibleWords = useMemo(() => words.filter(p => !/\s+/.test(p)), [words]);
  const totalWords = visibleWords.length;

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--reveal-progress', progress);
    }
  }, [progress]);

  const wordElements = useMemo(() => {
    let wordCursor = 0;
    const result = [];
    const totalChars = text.length;
    const halfPoint = Math.floor(totalChars / 2);
    let charCursor = 0;

    words.forEach((part, index) => {
      if (/\s+/.test(part)) {
        result.push(<span key={`space-${index}`} className="inline-block">&nbsp;</span>);
        charCursor += part.length;
      } else {
        const currentWordIndex = wordCursor;
        const wordStartIndex = charCursor;
        wordCursor += 1;

        const charElements = part.split("").map((char, charIdx) => {
          const globalCharIndex = charCursor + charIdx;
          let colorClass = "text-white";
          
          if (colorMode === "split") {
             colorClass = globalCharIndex >= halfPoint ? "text-red-600" : "text-white";
          } else if (colorMode === "green-split") {
             colorClass = globalCharIndex >= halfPoint ? "text-green-500" : "text-white";
          }

          return (
            <span 
              key={`${currentWordIndex}-${charIdx}`}
              className={colorClass}
            >
              {char}
            </span>
          );
        });

        result.push(
          <span 
            key={`word-${currentWordIndex}`}
            className="reveal-word inline-block whitespace-nowrap"
            style={{ "--word-index": currentWordIndex }}
          >
            {charElements}
          </span>
        );
        charCursor += part.length;
      }
    });
    return result;
  }, [words, text, colorMode]);

  return (
    <div 
      ref={containerRef}
      className={`reveal-container-word select-none ${className}`}
      style={{ 
        "--total-words": totalWords,
        "--reveal-progress": progress 
      }}
    >
      {wordElements}
      <style jsx>{`
        .reveal-container-word {
          --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
          perspective: 1200px;
        }

        .reveal-word {
          /* Professional Timing: 
             The reveal starts at 0.1 progress and finishes at 0.9.
             Each word is strictly tied to its index. */
          --start: calc(0.1 + (var(--word-index) / var(--total-words)) * 0.8);
          --end: calc(0.1 + ((var(--word-index) + 0.5) / var(--total-words)) * 0.8);
          
          /* Calculate local visibility */
          --factor: calc((var(--reveal-progress) - var(--start)) / (var(--end) - var(--start)));
          --vis: clamp(0, var(--factor), 1);
          --inv-vis: calc(1 - var(--vis));

          opacity: var(--vis);
          filter: blur(calc(var(--inv-vis) * 12px));
          transform: 
            translateY(calc(var(--inv-vis) * 15px))
            rotateX(calc(var(--inv-vis) * 45deg))
            scale(calc(1 - var(--inv-vis) * 0.05));
          
          transition: 
            opacity 700ms var(--ease-out-expo), 
            filter 900ms var(--ease-out-expo), 
            transform 1100ms var(--ease-out-expo);
          will-change: opacity, filter, transform;
        }

        @media (max-width: 768px) {
          .reveal-word {
            filter: blur(calc(var(--inv-vis) * 6px));
            transition-duration: 500ms;
          }
        }
      `}</style>
    </div>
  );
}
