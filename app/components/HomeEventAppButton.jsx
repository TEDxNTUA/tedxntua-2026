"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeEventAppButton() {
  const router = useRouter();
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installStatus, setInstallStatus] = useState("");

  useEffect(() => {
    const handleBeforeInstall = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
      setInstallStatus("");
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
        openApp();
        return;
      }
      setInstallStatus("Install was not completed. You can try again from the browser menu.");
      return;
    }

    setInstallStatus(
      /iphone|ipad|ipod/i.test(navigator.userAgent)
        ? "iPhone/iPad does not allow a website button to create the shortcut. Use Share, then Add to Home Screen."
        : "Install prompt is not available yet. Open the browser menu and choose Add to Home screen.",
    );
  };

  return (
    <>
      <button className="event-app-launcher" type="button" onClick={() => setShowPrompt(true)}>
        <span>Event Web-App</span>
        <small>Event finished</small>
      </button>

      {showPrompt && (
        <div className="event-app-prompt" role="dialog" aria-modal="true" aria-labelledby="event-app-prompt-title">
          <div className="event-app-prompt-panel">
            <h2 id="event-app-prompt-title">The event has finished</h2>
            <p>
              TEDxNTUA 2026: Cycle 0 has come to an end. You can still view the program and speakers in the app.
            </p>
            {!installPrompt && !isInstalled && (
              <p className="event-app-ios-note">
                If your browser does not show the install prompt, use Share or the browser menu, then Add to Home Screen.
              </p>
            )}
            {installStatus && <p className="event-app-status">{installStatus}</p>}
            <div className="event-app-prompt-actions">
              <button type="button" onClick={openApp} style={{ gridColumn: 'span 2' }}>Enter App</button>
              <button type="button" onClick={() => setShowPrompt(false)} style={{ gridColumn: 'span 2', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
