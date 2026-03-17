import { useEffect, useState } from "react";

export default function TeamHero({ images, alt = "team photo" }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded-md">
        <span className="text-gray-500">No photos yet</span>
      </div>
    );
  }

  return (
    <div className="w-full rounded-md overflow-hidden shadow-sm">
      <div className="w-full h-48 sm:h-72 md:h-80 relative bg-black/5">
        <img
          src={images[idx]}
          alt={`${alt} ${idx + 1}`}
          className="w-full h-full object-cover transition-opacity duration-700"
        />
        <div className="absolute left-3 bottom-3 bg-black/40 text-white px-2 py-1 rounded sm:left-4 sm:bottom-4 sm:px-3">
          <span className="text-sm">{idx + 1} / {images.length}</span>
        </div>
      </div>
      <div className="flex gap-2 mt-2 px-1 overflow-x-auto pb-1">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setIdx(i)}
            className={`w-16 h-10 shrink-0 rounded overflow-hidden border sm:w-20 sm:h-12 ${i === idx ? "border-blue-500" : "border-transparent"}`}
          >
            <img src={src} alt={`${alt} thumb ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
