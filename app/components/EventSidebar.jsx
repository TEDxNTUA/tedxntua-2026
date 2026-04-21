"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const eventTabs = [
  { 
    label: "Program", 
    path: "/event/program", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    )
  },
  { 
    label: "Speakers", 
    path: "/event/speakers", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="23"></line>
        <line x1="8" y1="23" x2="16" y2="23"></line>
      </svg>
    )
  },
  { 
    label: "Performances", 
    path: "/event/performances", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    )
  },
  { 
    label: "Professional Workshops", 
    path: "/event/professionalWorkshops", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    )
  },
  { 
    label: "Experience Workshops", 
    path: "/event/experienceWorkshops", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    )
  },
  { 
    label: "Side Happenings", 
    path: "/event/sideHappenings", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
      </svg>
    )
  }
];

export default function EventSidebar({ visible }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!visible || !mounted) return null;

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-end pointer-events-none group/nav">
      <div className="flex flex-col gap-2 p-3 pointer-events-auto">
        {/* Dock Header Label */}
        <div className="mb-6 mr-2 lg:block hidden">
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-emerald-500/40 [writing-mode:vertical-rl] rotate-180">
            Navigation
          </span>
        </div>

        {eventTabs.map((tab) => {
          const isActive = pathname === tab.path;
          
          return (
            <div key={tab.path} className="flex items-center group/item justify-end">
              {/* Tooltip Label */}
              <span className={`
                opacity-0 group-hover/item:opacity-100 lg:block hidden 
                transition-all duration-500 translate-x-4 group-hover/item:translate-x-0 
                mr-4 px-4 py-2 bg-slate-950/90 backdrop-blur-2xl border border-white/10 
                text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.3em] 
                whitespace-nowrap shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-none
                ${isActive ? 'border-emerald-500/40 text-emerald-400' : ''}
              `}>
                {tab.label}
              </span>

              {/* Navigation Button */}
              <Link
                href={tab.path}
                className={`
                  relative flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center 
                  transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] 
                  rounded-2xl border
                  ${isActive
                    ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.3)] scale-110 translate-x-[-6px] z-10'
                    : 'bg-white/5 backdrop-blur-xl border-white/5 hover:border-emerald-500/40 hover:bg-white/10 hover:translate-x-[-3px] shadow-2xl'
                  }
                `}
              >
                {/* Visual Feedback on Hover */}
                {!isActive && (
                  <div className="absolute inset-0 opacity-0 group-hover/item:opacity-100 bg-emerald-500/5 transition-opacity duration-500 rounded-2xl" />
                )}

                {/* Vector Icon */}
                <div className={`
                  relative w-5 h-5 lg:w-6 lg:h-6 transition-all duration-500
                  ${isActive ? 'text-slate-950 scale-110' : 'text-emerald-50/60 group-hover/item:text-white group-hover/item:scale-110'}
                `}>
                  {tab.icon}
                </div>
                
                {/* Premium Glow for Active State */}
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_15px_rgba(255,255,255,0.4)] pointer-events-none" />
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
