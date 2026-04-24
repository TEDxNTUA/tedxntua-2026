"use client";

import { useMemo } from "react";

export default function SponsorsHeroText({ text, progress, className }) {
  // We want the reveal to start at progress 0.05 and finish at 0.85
  const startReveal = 0.05;
  const endReveal = 0.85;

  const characters = useMemo(() => {
    return text.split("");
  }, [text]);

  const totalChars = characters.length;
  // The total scroll distance allocated to revealing all characters
  const totalRevealRange = endReveal - startReveal;
  
  // Each character has a tiny window to fade in to create that sharp letter-by-letter effect.
  // The start times are distributed evenly across the reveal range.
  const staggerStep = totalRevealRange / totalChars;

  return (
    <h1 className={className} style={{ perspective: "1000px" }}>
      {characters.map((char, index) => {
        // Space characters don't need animation logic, just return a space
        if (char === " ") {
          return <span key={index} className="inline-block whitespace-pre">&nbsp;</span>;
        }

        const charStart = startReveal + index * staggerStep;
        // The character fades in very quickly over a tiny scroll amount (e.g., 0.03)
        const charEnd = charStart + 0.04;

        let opacity = 0;
        let translateY = 15;
        let rotateX = 60;
        let blur = 10;

        if (progress >= charEnd) {
          opacity = 1;
          translateY = 0;
          rotateX = 0;
          blur = 0;
        } else if (progress > charStart) {
          // Normalize the local progress between 0 and 1
          const localProgress = (progress - charStart) / (charEnd - charStart);
          opacity = localProgress;
          translateY = 15 * (1 - localProgress);
          rotateX = 60 * (1 - localProgress);
          blur = 10 * (1 - localProgress);
        }

        // Halfway point changes color to green
        const isGreen = index >= Math.floor(totalChars / 2);
        const colorClass = isGreen ? "text-green-500 drop-shadow-[0_0_20px_rgba(34,197,94,0.6)]" : "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]";

        return (
          <span
            key={index}
            className={`inline-block ${colorClass}`}
            style={{
              opacity,
              transform: `translateY(${translateY}px) rotateX(${rotateX}deg)`,
              filter: `blur(${blur}px)`,
              willChange: "opacity, transform, filter",
            }}
          >
            {char}
          </span>
        );
      })}
    </h1>
  );
}
