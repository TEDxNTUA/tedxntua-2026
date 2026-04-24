"use client";

import { useMemo, Fragment } from "react";

export default function SponsorsHeroText({ text, progress, className }) {
  // We want the reveal to start at progress 0.05 and finish at 0.85
  const startReveal = 0.05;
  const endReveal = 0.85;

  const words = useMemo(() => {
    let charCounter = 0;
    return text.split(" ").map((word, wordIndex, allWords) => {
      const chars = word.split("").map((char) => {
        return { char, index: charCounter++ };
      });
      const hasTrailingSpace = wordIndex < allWords.length - 1;
      const spaceIndex = hasTrailingSpace ? charCounter++ : null;
      return { word, chars, hasTrailingSpace, spaceIndex };
    });
  }, [text]);

  const totalChars = text.length;
  // The total scroll distance allocated to revealing all characters
  const totalRevealRange = endReveal - startReveal;
  
  // Each character has a tiny window to fade in to create that sharp letter-by-letter effect.
  // The start times are distributed evenly across the reveal range.
  const staggerStep = totalRevealRange / totalChars;

  return (
    <h1 className={className} style={{ perspective: "1000px" }}>
      {words.map((wordData, wIdx) => (
        <Fragment key={wIdx}>
          <span className="inline-block whitespace-nowrap">
            {wordData.chars.map(({ char, index }) => {
              const charStart = startReveal + index * staggerStep;
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
                const localProgress = (progress - charStart) / (charEnd - charStart);
                opacity = localProgress;
                translateY = 15 * (1 - localProgress);
                rotateX = 60 * (1 - localProgress);
                blur = 10 * (1 - localProgress);
              }

              const isDiamond = index >= Math.floor(totalChars / 2);
              const colorClass = isDiamond ? "text-[#22d3ee] drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]" : "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]";
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
          </span>
          {wordData.hasTrailingSpace && (
            <span className="inline-block whitespace-pre">&nbsp;</span>
          )}
        </Fragment>
      ))}
    </h1>
  );
}
