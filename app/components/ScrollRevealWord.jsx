"use client";

import { useMemo, useEffect, useRef } from "react";

/**
 * Specialized Word-by-Word Reveal for Sponsors Page.
 * Isolated from the global ScrollRevealText to preserve site-wide branding.
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
          --ease: cubic-bezier(0.33, 1, 0.68, 1);
        }

        .reveal-word {
          /* Math: Each word gets its own 1/total slice of the progress */
          --start: calc(var(--word-index) / var(--total-words));
          --end: calc((var(--word-index) + 1) / var(--total-words));
          
          /* Calculate local visibility for this word */
          --factor: calc((var(--reveal-progress) - var(--start)) / (var(--end) - var(--start)));
          --vis: clamp(0, var(--factor), 1);
          --inv-vis: calc(1 - var(--vis));

          opacity: var(--vis);
          filter: blur(calc(var(--inv-vis) * 8px));
          transform: translateY(calc(var(--inv-vis) * 10px));
          
          transition: opacity 500ms var(--ease), filter 500ms var(--ease), transform 500ms var(--ease);
          will-change: opacity, filter, transform;
        }
      `}</style>
    </div>
  );
}
