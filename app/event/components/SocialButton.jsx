'use client';
import { useEffect, useState } from 'react';
import { withBasePath } from '../../lib/basePath';

const MODES = {
  greenyellow: { defaultStyle: "green", hoverStyle: "yellow" },
  blackred: { defaultStyle: "black", hoverStyle: "red" },
};

export function SocialButton({ name, urlLink, size, mode = "greenyellow" }) {
  const activeMode = MODES[mode] ?? MODES.greenyellow;
  const [style, setStyle] = useState(activeMode.defaultStyle);

  useEffect(() => {
    setStyle(activeMode.defaultStyle);
  }, [activeMode.defaultStyle]);

  const basePath = withBasePath("/eventimages");
  const extension = "png";
  const lowerName = name.toLowerCase();

  const image = `${basePath}/${lowerName}/${lowerName}-${style}.${extension}`;

  return (
    <div className="inline-block">
            <a
        href={urlLink}
        target="_blank"
        rel="noopener noreferrer"
        // 4. Trigger the style change on hover
        onMouseEnter={() => setStyle(activeMode.hoverStyle)}
        onMouseLeave={() => setStyle(activeMode.defaultStyle)}>
        
                <img
          src={image}
          alt={name}
          style={{ height: size , width: size }}
          className="object-contain transition-all duration-300"
          onError={() => console.error("Failed to load image at:", image)} />
        
            </a>
        </div>);

}
