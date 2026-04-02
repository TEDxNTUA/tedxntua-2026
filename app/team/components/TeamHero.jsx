"use client";
import { useEffect, useState } from "react";
import SmoothImage from "./SmoothImage";
import collectiveImages from "../collectiveImages";






export default function TeamHero({ images, alt = "team photo" }) {
  const [idx, setIdx] = useState(0);
  const carouselImages = images.length > 0 ? images : collectiveImages;
  const activeIndex = idx % carouselImages.length;
  const activeSrc = carouselImages[activeIndex];
  const backdropSrc = collectiveImages[activeIndex % collectiveImages.length];

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(id);
  }, [carouselImages.length]);

  return (
    <div className="w-full rounded-md overflow-hidden shadow-sm">
      <div className="w-full h-56 sm:h-72 md:h-80 relative bg-black/10">
        <SmoothImage
          key={`backdrop-${backdropSrc}`}
          src={backdropSrc}
          alt="collective backdrop"
          loading="eager"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-35" />
        
        <div className="absolute inset-0 bg-black/20" />
        <SmoothImage
          key={activeSrc}
          src={activeSrc}
          alt={`${alt} ${activeIndex + 1}`}
          loading="eager"
          className="relative z-10 w-full h-full object-cover" />
        
        <div className="absolute left-4 bottom-4 bg-black/45 text-white px-3 py-1 rounded z-20">
          <span className="text-sm">{activeIndex + 1} / {carouselImages.length}</span>
        </div>
      </div>
      <div className="flex gap-2 mt-2 px-1 overflow-auto">
        {carouselImages.map((src, i) =>
        <button
          key={src + i}
          onClick={() => setIdx(i)}
          className={`w-20 h-12 rounded overflow-hidden border ${i === activeIndex ? "border-blue-500" : "border-transparent"}`}>
          
            <SmoothImage src={src} alt={`${alt} thumb ${i + 1}`} loading="eager" className="w-full h-full object-cover" />
          </button>
        )}
      </div>
    </div>);

}
