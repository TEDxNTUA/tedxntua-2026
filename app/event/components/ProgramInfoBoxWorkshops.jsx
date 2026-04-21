"use client";
import { useState } from 'react';

export default function ProgramInfoBoxWorkshops({ time, workshop, color }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group relative pl-6 md:pl-8 pb-6 md:pb-8 last:pb-0">
      {/* Timeline Line */}
      <div className="absolute left-[9px] md:left-[11px] top-2 h-full w-[1.5px] md:w-[2px] bg-gradient-to-b from-white/20 via-white/10 to-transparent group-last:h-0" />
      
      {/* Timeline Dot */}
      <div className="absolute left-0 top-2 h-5 w-5 md:h-6 md:w-6 rounded-full border-2 border-white/20 bg-black flex items-center justify-center">
        <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-yellow-400" />
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
          style={{ backgroundColor: color || '#fbbf24' }}
        />

        <div className="flex flex-col md:flex-row md:items-stretch">
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
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-yellow-500/30 from-yellow-400/20 to-yellow-500/10 bg-gradient-to-br text-yellow-300">
                Workshops
              </span>
              <span className="text-white/40 text-xs font-medium italic">
                {workshop.length} parallel sessions
              </span>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-xl md:text-2xl font-black text-white tracking-tight mb-1">
                  Workshop Breakout
                </h4>
                <p className="text-sm font-medium text-white/60 uppercase tracking-wider">
                  Select your preferred session
                </p>
              </div>
              
              <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-white' : 'text-white/30'}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </div>
            </div>

            {/* Expandable Workshops List */}
            <div className={`
              grid transition-all duration-500 ease-in-out
              ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'}
            `}>
              <div className="overflow-hidden">
                <div className="pt-6 border-t border-white/10 space-y-4">
                  {workshop.map((info, index) => (
                    <div 
                      key={index} 
                      className="group/item relative overflow-hidden rounded-xl bg-white/5 border border-white/5 p-4 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <p className="font-bold text-white text-lg leading-tight mb-1">{info.title}</p>
                          {info.name && <p className="text-sm text-white/50">{info.name}</p>}
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded">
                            {info.room}
                          </span>
                        </div>
                      </div>
                      
                      {/* Detailed info on hover or secondary expand if needed, but keeping it simple for now */}
                      {info.description && isExpanded && (
                         <p className="mt-2 text-xs text-white/40 leading-relaxed italic line-clamp-2">
                           {info.description}
                         </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
