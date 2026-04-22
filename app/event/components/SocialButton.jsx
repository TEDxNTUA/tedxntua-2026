'use client';
import { useState } from 'react';
import { withBasePath } from '../../lib/basePath';

const MODES = {
  greenyellow: { defaultStyle: "green", hoverStyle: "yellow" },
  blackred: { defaultStyle: "black", hoverStyle: "red" },
  blackgreen: {
    defaultStyle: "green",
    hoverStyle: "green",
    defaultColor: "#000000",
    hoverColor: "#22c55e",
    useMask: true,
  },
  whitegreen: {
    defaultStyle: "green",
    hoverStyle: "green",
    defaultColor: "#ffffff",
    hoverColor: "#22c55e",
    useMask: true,
  },
};

export function SocialButton({
  name,
  urlLink,
  size,
  mode = "greenyellow",
  ariaLabel,
  defaultColor,
  hoverColor,
}) {
  const activeMode = MODES[mode] ?? MODES.greenyellow;
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const href = typeof urlLink === "string" ? urlLink.trim() : urlLink;
  const isInteractive = isHovered || isFocused || isPressed;
  const style = isInteractive ? activeMode.hoverStyle : activeMode.defaultStyle;
  const filter = isInteractive ? activeMode.hoverFilter : activeMode.defaultFilter;
  const iconColor = isInteractive
    ? hoverColor || activeMode.hoverColor
    : defaultColor || activeMode.defaultColor;

  const basePath = withBasePath("/eventimages");
  const extension = "png";
  const lowerName = name.toLowerCase().replace(/\d+$/, "");

  const image = `${basePath}/${lowerName}/${lowerName}-${style}.${extension}`;

  if (!href) {
    return null;
  }

  return (
    <div className="inline-block">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel || name}
        className="grid min-h-11 min-w-11 place-items-center rounded-full"
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onPointerDown={() => setIsPressed(true)}
        onPointerUp={() => setIsPressed(false)}
        onPointerCancel={() => setIsPressed(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          setIsPressed(false);
        }}
      >
        {activeMode.useMask ? (
          <span
            aria-hidden="true"
            className="block transition-all duration-300"
            style={{
              height: size,
              width: size,
              backgroundColor: iconColor,
              WebkitMaskImage: `url(${image})`,
              maskImage: `url(${image})`,
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />
        ) : (
          <img
            src={image}
            alt=""
            aria-hidden="true"
            style={{ height: size, width: size, filter }}
            className="object-contain transition-all duration-300"
            onError={() => console.error("Failed to load image at:", image)}
          />
        )}
      </a>
    </div>
  );
}
