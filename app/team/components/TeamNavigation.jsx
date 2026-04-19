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
  const containerRef = useRef(null);

  const handleNavigateToTeam = (teamSlug) => {
    setActiveTeam(teamSlug);
    // Use requestAnimationFrame to ensure DOM is ready before scrolling
    requestAnimationFrame(() => {
      const element = document.getElementById(`team-${teamSlug}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  };

  // Touch handlers for mobile swipe/drag
  const handleTouchStart = (e, teamSlug) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    
    const currentY = e.touches[0].clientY;
    const diff = dragStart - currentY;
    
    // Find the active team button and animate it
    const activeButton = containerRef.current.querySelector('[data-active="true"]');
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
    const activeButton = containerRef.current?.querySelector('[data-active="true"]');
    if (activeButton) {
      activeButton.style.transform = 'translateY(0) scale(1)';
      activeButton.style.opacity = '1';
      activeButton.style.transition = 'all 300ms ease-out';
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
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Extract team slug from id (format: team-{slug})
          const teamSlug = entry.target.id.replace('team-', '');
          setActiveTeam(teamSlug);
        }
      });
    }, observerOptions);

    // Observe all team sections
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
      ref={containerRef}
      className="fixed sm:top-1/3 sm:left-auto sm:right-4 sm:bottom-auto sm:max-h-none top-1/2 right-2 z-50 max-h-[70vh] bg-transparent overflow-y-auto sm:-translate-y-0 -translate-y-1/2 flex flex-col items-stretch py-2 sm:py-2 px-1 sm:px-1 transition-transform duration-100"
    >
      <div className="flex flex-col gap-0.5 justify-start items-stretch">
        {teams.map((team) => (
          <button
            key={team.slug}
            data-active={activeTeam === team.slug}
            onClick={() => handleNavigateToTeam(team.slug)}
            onTouchStart={(e) => handleTouchStart(e, team.slug)}
            onTouchMove={handleTouchMove}
            onTouchEnd={(e) => handleTouchEnd(e, team.slug)}
            className={`relative flex-shrink-0 py-1 px-1.5 transition-all duration-300 ease-out group overflow-hidden text-center rounded-l-lg ${
              activeTeam === team.slug
                ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-105'
                : 'bg-slate-900/40 border-l border-emerald-400/20 hover:bg-slate-800/60 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)] hover:border-emerald-400/40 active:bg-slate-800/60 active:shadow-[0_0_12px_rgba(16,185,129,0.2)]'
            }`}
            title={team.title}
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 ${activeTeam === team.slug ? 'opacity-0' : ''}`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_70%)]" />
            </div>
            {/* Mobile: Show emote */}
            <span className={`relative text-base block transition-transform duration-200 ${isDragging && activeTeam === team.slug ? 'scale-150' : ''}`}>
              {teamEmotes[team.slug]}
            </span>
            {/* Desktop: Show text vertically */}
            <span 
              className={`relative text-[5px] font-bold uppercase tracking-[0.03em] leading-tight block mt-0 text-center ${
                activeTeam === team.slug ? 'text-slate-950' : 'text-emerald-100'
              }`}
            >
              {team.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
