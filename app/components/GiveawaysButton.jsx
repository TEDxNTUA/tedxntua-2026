"use client";

import { useState, useEffect } from "react";

const officialGiveaways = [
  { 
    name: "Coca-Cola Giveaway", 
    prize: "Double Tickets", 
    url: "https://docs.google.com/forms/d/e/1FAIpQLSfwD9HJ9EFwYZJRBPJ-p2fjRu1LCkovf3bjTqK1LYQ_2IAluA/viewform",
    isActive: true
  },
  { 
    name: "Occhio Papavassiliou", 
    prize: "Δύο γυαλιά ηλίου", 
    url: "https://docs.google.com/forms/d/e/1FAIpQLScK992cla6A7UlB6AJZxi_5naSQNM1JFTJT2bB-ucLJ6n0KQg/viewform" 
  },
  { 
    name: "Pistachio Tales and Trails", 
    prize: "Walking Food Tour (2 νικητές)", 
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdVUvXUMpdwsEMhYNAx05IyIuEljqhPSUQTf6SzCrRwNSR-8w/viewform" 
  },
  { 
    name: "Εκδόσεις Κλειδάριθμος", 
    prize: "Βιβλία αυτοβελτίωσης (3 νικητές)", 
    url: "https://docs.google.com/forms/d/e/1FAIpQLSc-OANLBAGwU4PZ5UOIpZ2pdN504qM5xwlrkPve2xbkbmQ5ZA/viewform" 
  },
  { 
    name: "TTCLEAN", 
    prize: "Μία ηλεκτρική σκούπα", 
    url: "https://docs.google.com/forms/d/e/1FAIpQLSct3lMtvysy9Zd4JzKygzIo1qFJGZwWayzEvsDaq1KiRMUvTQ/viewform" 
  },
];

export default function GiveawaysButton() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (showPrompt) {
      document.documentElement.classList.add("giveaways-open");
    } else {
      document.documentElement.classList.remove("giveaways-open");
    }
    return () => {
      document.documentElement.classList.remove("giveaways-open");
    };
  }, [showPrompt]);

  return (
    <>
      <button className="giveaways-launcher" type="button" onClick={() => setShowPrompt(true)}>
        <span>Giveaways Live</span>
        <small>Sudden Perk</small>
      </button>

      {showPrompt && (
        <div className="giveaways-prompt" role="dialog" aria-modal="true" aria-labelledby="giveaways-prompt-title" onClick={() => setShowPrompt(false)}>
          <div className="giveaways-prompt-panel" onClick={(e) => e.stopPropagation()}>
            <button 
              className="giveaways-close-btn" 
              onClick={() => setShowPrompt(false)}
              aria-label="Close dialog"
            >
              ×
            </button>
            <div className="giveaways-status-indicator">
              <div className="status-dot animate-pulse" style={{ backgroundColor: '#22c55e' }}></div>
              <span className="text-green-500 font-bold">Status: LIVE</span>
            </div>
            <h2 id="giveaways-prompt-title">Giveaways Gate</h2>
            <div className="giveaways-content">
              <p className="coming-soon-text">
                A sudden giveaway has risen! Enter now to win our special prize:
              </p>
              <div className="giveaways-links-grid">
                {officialGiveaways.map((gw, i) => (
                  gw.isActive ? (
                    <a 
                      key={i} 
                      href={gw.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="giveaway-link-item active-giveaway"
                      style={{ 
                        borderColor: '#22c55e', 
                        background: 'rgba(34, 197, 94, 0.1)',
                        cursor: 'pointer' 
                      }}
                    >
                      <div className="giveaway-link-content">
                        <span className="giveaway-link-name text-green-400">{gw.name}</span>
                        <span className="giveaway-link-prize">{gw.prize}</span>
                      </div>
                      <span className="giveaway-link-arrow">→</span>
                    </a>
                  ) : (
                    <div 
                      key={i} 
                      className="giveaway-link-item archived-giveaway"
                      style={{ cursor: 'default', borderStyle: 'dashed', opacity: 0.5 }}
                    >
                      <div className="giveaway-link-content">
                        <span className="giveaway-link-name">{gw.name}</span>
                        <span className="giveaway-link-prize">{gw.prize}</span>
                      </div>
                      <span className="giveaway-link-arrow" style={{ opacity: 0.3 }}>✕</span>
                    </div>
                  )
                ))}
              </div>
            </div>
            <div className="giveaways-prompt-actions">
              <button type="button" onClick={() => setShowPrompt(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
