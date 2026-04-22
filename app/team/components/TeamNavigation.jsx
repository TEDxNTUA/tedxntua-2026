'use client';

import { useState, useRef, useEffect } from 'react';

const teamEmotes = {
  curator: '👔',
  it: '💻',
  design: '✏️',
  fundraising: '💰',
  speakers: '🎤',
  experience: '🎯',
  'social-media': '📷',
  venue: '🏛️',
};

export default function TeamNavigation({ teams }) {
  const [activeTeam, setActiveTeam] = useState(teams[0]?.slug || 'curator');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const mobileContainerRef = useRef(null);

  const handleNavigateToTeam = (teamSlug) => {
    setActiveTeam(teamSlug);
    // Use requestAnimationFrame to ensure DOM is ready before scrolling
    requestAnimationFrame(() => {
      const element = document.getElementById(`team-${teamSlug}`);
      if (element) {
        // More robust scroll with offset to account for any sticky elements
        const yOffset = -window.innerHeight / 4; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  };

  // Touch handlers for mobile swipe/drag
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !mobileContainerRef.current) return;
    
    const currentY = e.touches[0].clientY;
    const diff = dragStart - currentY;
    
    // Find the active team button and animate it
    const activeButton = mobileContainerRef.current.querySelector('[data-active="true"]');
    if (activeButton) {
      // Create dragging effect on active button
      activeButton.style.transform = `translateY(${-diff * 0.5}px) scale(${1 + Math.abs(diff) * 0.0005})`;
      activeButton.style.opacity = `${1 - Math.abs(diff) * 0.002}`;
    }
  };

  const handleTouchEnd = (e, teamSlug) => {
    setIsDragging(false);
    
    const currentY = e.changedTouches[0].clientY;
    const diff = dragStart - currentY;
    
    // Reset active button animation
    const activeButton = mobileContainerRef.current?.querySelector('[data-active="true"]');
    if (activeButton) {
      activeButton.style.transform = '';
      activeButton.style.opacity = '';
      activeButton.style.transition = 'all 300ms cubic-bezier(0.23, 1, 0.32, 1)';
      setTimeout(() => {
        activeButton.style.transition = '';
      }, 300);
    }

    // Navigate if swipe distance is significant, otherwise just select the tapped team
    const threshold = 30;
    const currentIndex = teams.findIndex(t => t.slug === activeTeam);
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex < teams.length - 1) {
        // Swiped up - go to next team
        handleNavigateToTeam(teams[currentIndex + 1].slug);
      } else if (diff < 0 && currentIndex > 0) {
        // Swiped down - go to previous team
        handleNavigateToTeam(teams[currentIndex - 1].slug);
      }
    } else {
      // Just a tap - select this team
      handleNavigateToTeam(teamSlug);
    }
  };

  // Auto-detect which team is in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const teamSlug = entry.target.id.replace('team-', '');
          setActiveTeam(teamSlug);
        }
      });
    }, observerOptions);

    teams.forEach((team) => {
      const element = document.getElementById(`team-${team.slug}`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      teams.forEach((team) => {
        const element = document.getElementById(`team-${team.slug}`);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [teams]);

  return (
    <div 
      ref={mobileContainerRef}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-end pointer-events-none"
    >
      <div className="flex flex-col gap-1.5 p-2 pointer-events-auto">
        {teams.map((team) => (
          <div key={team.slug} className="flex items-center justify-end">
            <div className="flex items-center group/btn">
              <span className="opacity-0 group-hover/btn:opacity-100 lg:block hidden transition-all duration-300 translate-x-2 group-hover/btn:translate-x-0 mr-3 px-3 py-1.5 bg-slate-950/80 backdrop-blur-xl border border-emerald-500/30 text-emerald-400 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap shadow-2xl pointer-events-none">
                {team.title}
              </span>
              <button
                data-active={activeTeam === team.slug}
                onClick={() => handleNavigateToTeam(team.slug)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={(e) => handleTouchEnd(e, team.slug)}
                className={`relative flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-l-xl border-y border-l ${
                  activeTeam === team.slug
                    ? 'bg-emerald-500 border-emerald-400 shadow-[-5px_0_25px_rgba(16,185,129,0.45)] scale-110 translate-x-[-4px] z-10'
                    : 'bg-slate-950/40 backdrop-blur-md border-emerald-500/10 hover:border-emerald-400/40 hover:bg-slate-900/80 hover:translate-x-[-2px] shadow-lg'
                }`}
                title={team.title}
              >
                <div className={`absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 ${activeTeam === team.slug ? 'opacity-0' : ''}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_70%)]" />
                </div>
                <span className={`relative text-lg lg:text-xl block transition-all duration-300 ${activeTeam === team.slug ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]' : 'opacity-80 group-hover/btn:opacity-100 group-hover/btn:scale-110'}`}>
                  {teamEmotes[team.slug]}
                </span>
                
                {activeTeam === team.slug && (
                  <div className="absolute inset-0 border-l-2 border-emerald-200/50 rounded-l-xl" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
