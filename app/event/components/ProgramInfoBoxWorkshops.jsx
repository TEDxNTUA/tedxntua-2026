"use client";
import { useState } from 'react';

export default function ProgramInfoBoxWorkshops({ time, workshop, color }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      className="group relative border-b border-white/10 hover:bg-white/[0.02] transition-colors cursor-pointer"
    >
      <div className="flex flex-col md:flex-row py-6 md:py-8 items-start md:items-center">
        {/* Time Section - Minimal Typography */}
        <div className="flex items-baseline md:flex-col md:items-center justify-start md:justify-center mb-3 md:mb-0 md:w-48 shrink-0">
          <span className="font-mono text-lg md:text-xl font-black tracking-tighter text-white">
            {time?.split(' - ')[0]}
          </span>
          <span className="mx-2 md:my-0.5 font-mono text-[10px] md:text-xs font-bold text-white/20 uppercase tracking-widest">—</span>
          <span className="font-mono text-sm md:text-sm font-bold text-white/40">
            {time?.split(' - ')[1]}
          </span>
        </div>

        {/* Content Section */}
        <div className="flex-1 w-full">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] border border-yellow-500/30 from-yellow-400/20 to-yellow-500/10 bg-gradient-to-br text-yellow-300">
              Workshops
            </span>
            <span className="text-white/30 text-[10px] md:text-xs font-medium italic tracking-wide">
              {workshop.length} parallel sessions
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight mb-1 group-hover:text-yellow-400 transition-colors">
                Workshop Breakout
              </h4>
              <p className="text-xs md:text-sm font-medium text-white/50 uppercase tracking-[0.1em]">
                Select your preferred session
              </p>
            </div>
            
            <div className={`mt-1 md:mt-2 transition-all duration-300 text-white`}>
              {isExpanded ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all hover:bg-white/20 hover:text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
              ) : (
                <div className="text-white/20 group-hover:text-white/40">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Workshops List - Minimal slide down */}
      <div className={`
        grid transition-all duration-500 ease-in-out
        ${isExpanded ? 'grid-rows-[1fr] opacity-100 pb-8' : 'grid-rows-[0fr] opacity-0'}
      `}>
        <div className="overflow-hidden">
          <div className="md:ml-48">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {workshop.map((info, index) => (
                <div 
                  key={index} 
                  className="group/item relative p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">
                        {info.room}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-white text-base leading-tight group-hover/item:text-emerald-400 transition-colors">
                        {info.title}
                      </p>
                      {info.name && (
                        <p className="mt-1 text-xs text-white/40 font-medium">
                          {info.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
