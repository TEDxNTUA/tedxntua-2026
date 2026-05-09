"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeEventAppButton() {
  const router = useRouter();
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
      setShowPrompt(false);
    };

    setIsInstalled(
      window.matchMedia?.("(display-mode: standalone)").matches ||
      window.navigator.standalone === true,
    );

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const openApp = () => {
    setShowPrompt(false);
    router.push("/event/event-app");
  };

  const installAndOpen = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      setInstallPrompt(null);
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
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
              {isInstalled
                ? "The event app shortcut is already installed on this device."
                : "This phone-only event app works best as a quick shortcut during TEDxNTUA 2026."}
            </p>
            {!installPrompt && !isInstalled && (
              <p className="event-app-ios-note">
                If your browser does not show the install prompt, use Share or the browser menu, then Add to Home Screen.
              </p>
            )}
            <div className="event-app-prompt-actions">
              <button type="button" onClick={installAndOpen}>{installPrompt ? "Install and open" : "Open app"}</button>
              <button type="button" onClick={openApp}>Just open</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
