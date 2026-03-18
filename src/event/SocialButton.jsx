import { useState } from "react";

export function SocialButton({ name, urlLink, size }) {
  const [style, setStyle] = useState("green");
  const basePath = "../eventimages";
  const extension = "png";
  const lowerName = name.toLowerCase();
  const image = `${basePath}/${lowerName}/${lowerName}-${style}.${extension}`;

  return (
    <div className="inline-block">
      <a
        href={urlLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setStyle("yellow")}
        onMouseLeave={() => setStyle("green")}
      >
        <img
          src={image}
          alt={name}
          style={{ height: size, width: size }}
          className="object-contain transition-all duration-300"
        />
      </a>
    </div>
  );
}
