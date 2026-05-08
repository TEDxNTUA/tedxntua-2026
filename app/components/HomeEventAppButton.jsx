"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeEventAppButton() {
  const router = useRouter();
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  const openApp = () => {
    setShowPrompt(false);
    router.push("/event/aggelos-app");
  };

  const installAndOpen = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      await installPrompt.userChoice;
      setInstallPrompt(null);
    }
    openApp();
  };

  return (
    <>
      <button className="event-app-launcher" type="button" onClick={() => setShowPrompt(true)}>
        <span>Open Event App</span>
        <small>Phone shortcut</small>
      </button>

      {showPrompt && (
        <div className="event-app-prompt" role="dialog" aria-modal="true" aria-labelledby="event-app-prompt-title">
          <div className="event-app-prompt-panel">
            <h2 id="event-app-prompt-title">Create a home screen shortcut?</h2>
            <p>
              This phone-only event app works best as a quick shortcut during TEDxNTUA 2026.
            </p>
            {!installPrompt && (
              <p className="event-app-ios-note">
                If your browser does not show the install prompt, use Share or the browser menu, then Add to Home Screen.
              </p>
            )}
            <div className="event-app-prompt-actions">
              <button type="button" onClick={installAndOpen}>Yes, continue</button>
              <button type="button" onClick={openApp}>Just open</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
