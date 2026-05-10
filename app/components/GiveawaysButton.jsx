"use client";

import { useState, useEffect } from "react";

const officialGiveaways = [
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
        <span>Giveaways Closed</span>
        <small>Event finished</small>
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
              <div className="status-dot"></div>
              <span>Status: Closed</span>
            </div>
            <h2 id="giveaways-prompt-title">Giveaways Gate</h2>
            <div className="giveaways-content">
              <p className="coming-soon-text">
                The Giveaways are over. Here is the archive of our 2026 perks:
              </p>
              <div className="giveaways-links-grid" style={{ opacity: 0.6 }}>
                {officialGiveaways.map((gw, i) => (
                  <div 
                    key={i} 
                    className="giveaway-link-item"
                    style={{ cursor: 'default', borderStyle: 'dashed' }}
                  >
                    <div className="giveaway-link-content">
                      <span className="giveaway-link-name">{gw.name}</span>
                      <span className="giveaway-link-prize">{gw.prize}</span>
                    </div>
                    <span className="giveaway-link-arrow" style={{ opacity: 0.3 }}>✕</span>
                  </div>
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
