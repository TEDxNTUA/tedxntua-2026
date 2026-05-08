"use client";

import { useState } from "react";

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

  return (
    <>
      <button className="giveaways-launcher" type="button" onClick={() => setShowPrompt(true)}>
        <span>Giveaways gate</span>
        <small>Exclusive perks</small>
      </button>

      {showPrompt && (
        <div className="giveaways-prompt" role="dialog" aria-modal="true" aria-labelledby="giveaways-prompt-title" onClick={() => setShowPrompt(false)}>
          <div className="giveaways-prompt-panel" onClick={(e) => e.stopPropagation()}>
            <div className="giveaways-status-indicator">
              <div className="status-dot active"></div>
              <span>Status: Online</span>
            </div>
            <h2 id="giveaways-prompt-title">Giveaways Gate</h2>
            <div className="giveaways-content">
              <p className="coming-soon-text">
                The Gates are open. Select a giveaway below to participate.
              </p>
              <div className="giveaways-links-grid">
                {officialGiveaways.map((gw, i) => (
                  <a 
                    key={i} 
                    href={gw.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="giveaway-link-item"
                  >
                    <div className="giveaway-link-content">
                      <span className="giveaway-link-name">{gw.name}</span>
                      <span className="giveaway-link-prize">{gw.prize}</span>
                    </div>
                    <span className="giveaway-link-arrow">→</span>
                  </a>
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
