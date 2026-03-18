import { useState } from "react";
import "./styles.css";

const separatorLine = "border-r border-black";

export default function ProgramInfoBoxSingular({ time, name, title, itemColor, description }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const heightClass = isExpanded ? "min-h-[170px]" : "min-h-[40px]";

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={`custom-card ${heightClass} border-2 flex w-full transition-all duration-300 ease-in-out cursor-pointer overflow-hidden border border-black rounded-[20px] mb-4`}
      style={{
        backgroundColor: itemColor,
        borderColor: !isExpanded ? itemColor : "white",
        transition: "all 0.3s ease",
      }}
    >
      <div className={`flex-[0.3] flex items-center justify-center text-center ${separatorLine} p-2`}>
        {time}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center p-2">
        <p className="font-bold">{name}</p>
        {isExpanded && <p className="text-sm mt-3 animate-fadeIn">"{title}"</p>}
        {isExpanded && <p className="text-sm mt-2 animate-fadeIn">{description}</p>}
      </div>
    </div>
  );
}
