"use client";

import { useState } from "react";

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
              <div className="status-dot"></div>
              <span>Status: Incoming</span>
            </div>
            <h2 id="giveaways-prompt-title">Giveaways Gate</h2>
            <div className="giveaways-content">
              <p className="coming-soon-text">
                The gates are currently preparing for deployment. 
                Exclusive rewards and community perks will be accessible here soon.
              </p>
              <div className="placeholder-grid">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="placeholder-item">
                    <div className="placeholder-line long"></div>
                    <div className="placeholder-line short"></div>
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
