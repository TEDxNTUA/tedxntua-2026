"use client";
import { useState } from 'react';

export default function ProgramInfoBoxSimgular({ 
  time, 
  name, 
  artName, 
  theme, 
  profession, 
  itemColor, 
  description, 
  itemCategory 
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine category color/label
  const categoryConfig = {
    speaker: {
      label: "Speaker",
      color: "from-emerald-400/20 to-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-300"
    },
    performance: {
      label: "Performance",
      color: "from-blue-400/20 to-blue-500/10",
      border: "border-blue-500/30",
      text: "text-blue-300"
    },
    default: {
      label: itemCategory || "Event",
      color: "from-gray-400/20 to-gray-500/10",
      border: "border-gray-500/30",
      text: "text-gray-300"
    }
  };

  const config = categoryConfig[itemCategory] || categoryConfig.default;

  return (
    <div className="group relative pl-6 md:pl-8 pb-6 md:pb-8 last:pb-0">
      {/* Timeline Line */}
      <div className="absolute left-[9px] md:left-[11px] top-2 h-full w-[1.5px] md:w-[2px] bg-gradient-to-b from-white/20 via-white/10 to-transparent group-last:h-0" />
      
      {/* Timeline Dot */}
      <div className="absolute left-0 top-2 h-5 w-5 md:h-6 md:w-6 rounded-full border-2 border-white/20 bg-black flex items-center justify-center">
        <div className={`h-1.5 w-1.5 md:h-2 md:w-2 rounded-full ${itemCategory === 'speaker' ? 'bg-emerald-400' : 'bg-blue-400'}`} />
      </div>

      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer
          ${isExpanded ? 'border-white/30 bg-white/10' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'}
          backdrop-blur-md shadow-2xl
        `}
      >
        {/* Glow Effect */}
        <div 
          className="absolute -right-20 -top-20 h-40 w-40 opacity-20 blur-[80px] transition-opacity duration-500 group-hover:opacity-30"
          style={{ backgroundColor: itemColor || '#4ade80' }}
        />

        <div className="flex flex-col md:flex-row md:items-center">
          {/* Time Section */}
          <div className="flex flex-row md:flex-col items-center justify-start md:justify-center p-6 md:w-36">
            <span className="font-mono text-lg md:text-xl font-black tracking-tighter text-white">
              {time?.split(' - ')[0]}
            </span>
            <span className="mx-2 md:my-1 font-mono text-[10px] md:text-xs font-bold text-white/20 uppercase tracking-widest">—</span>
            <span className="font-mono text-xs md:text-sm font-bold text-white/40">
              {time?.split(' - ')[1]}
            </span>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6 md:pl-2">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${config.border} ${config.color} ${config.text}`}>
                {config.label}
              </span>
              {theme && (
                <span className="text-white/40 text-xs font-medium italic">
                   "{theme}"
                </span>
              )}
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-xl md:text-2xl font-black text-white tracking-tight mb-1">
                  {name || artName}
                </h4>
                {profession && (
                  <p className="text-sm font-medium text-white/60 uppercase tracking-wider">
                    {profession}
                  </p>
                )}
              </div>
              
              <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-white' : 'text-white/30'}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </div>
            </div>

            {/* Expandable Bio */}
            <div className={`
              grid transition-all duration-500 ease-in-out
              ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'}
            `}>
              <div className="overflow-hidden">
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm md:text-base leading-relaxed text-white/70 font-medium">
                    {description}
                  </p>
                  
                  {/* Action or additional info could go here */}
                  <div className="mt-6 flex gap-4">
                     <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${config.color.replace('/20', '/60')}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
