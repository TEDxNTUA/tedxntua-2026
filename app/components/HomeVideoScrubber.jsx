"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./HomeVideoScrubber.module.css";
import { withBasePath } from "../lib/basePath";

const storyBeats = [
  "Identity is the code of our genesis.",
  "Mastery emerges from the rhythm of repetition.",
  "We are bound by the cosmic loops of nature.",
  "Progress is an iterative pulse of evolution.",
  "Every revolution returns to the essence.",
];

const PIXELS_PER_SECOND = 1000;
const MOBILE_PIXELS_PER_SECOND = 800;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const getViewportHeight = () => window.visualViewport?.height ?? window.innerHeight;
const isCoarsePointer = () => window.matchMedia("(pointer: coarse)").matches;

export default function HomeVideoScrubber({ heroTitleClassName = "" }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const frameIdRef = useRef(0);
  const targetScrollRef = useRef(0);
  const pinStateRef = useRef("before");
  const [scrubHeight, setScrubHeight] = useState("0px");
  const [pinState, setPinState] = useState("before");
  const [videoSrc, setVideoSrc] = useState(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const layoutCache = useRef({ top: 0, height: 0, windowHeight: 0 });
  const currentVideoTimeRef = useRef(0);
  const [vh, setVh] = useState(0);
  const lastWidthRef = useRef(0);

  // Use a more stable viewport height for layout calculations
  const getStableViewportHeight = useCallback(() => {
    if (vh > 0) return vh;
    if (typeof window === "undefined") return 800;
    return window.innerHeight;
  }, [vh]);

  // Smoothing factor: lower is smoother/slower, higher is more responsive
  const getSmoothing = () => {
    if (typeof window === "undefined") return 0.10;
    return window.innerWidth < 720 ? 0.08 : 0.10;
  };

  const updateLayout = useCallback((forcedHeight) => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video || !Number.isFinite(video.duration) || video.duration <= 0) {
      return;
    }

    const viewportHeight = forcedHeight || getStableViewportHeight();
    const isMobile = window.innerWidth < 720;
    
    const pixelsPerSecond = (isCoarsePointer() || isMobile)
      ? MOBILE_PIXELS_PER_SECOND
      : PIXELS_PER_SECOND;
    
    // Use 100vh equivalent for beats to match CSS
    const minHeight = viewportHeight * storyBeats.length;
    const desiredHeight = Math.max(
      minHeight,
      video.duration * pixelsPerSecond + viewportHeight * 0.4,
    );

    setScrubHeight(`${Math.ceil(desiredHeight)}px`);
  }, [getStableViewportHeight]);

  const updateLayoutCache = useCallback((forcedHeight) => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;

    layoutCache.current = {
      top: sectionTop,
      height: rect.height,
      windowHeight: forcedHeight || getStableViewportHeight(),
    };
  }, [getStableViewportHeight]);

  const syncVideoToScroll = useCallback(() => {
    const video = videoRef.current;
    const { top, height, windowHeight } = layoutCache.current;

    if (!video || !Number.isFinite(video.duration) || video.duration <= 0 || video.readyState < 2) {
      frameIdRef.current = 0;
      return;
    }

    const currentScroll = window.scrollY;
    targetScrollRef.current = currentScroll;

    const scrollDistance = currentScroll - top;
    const total = height - windowHeight;
    
    if (total <= 0) {
      frameIdRef.current = 0;
      return;
    }

    // Update pin state
    let nextPinState = "before";
    if (currentScroll >= top + total) {
      nextPinState = "after";
    } else if (currentScroll >= top - 2) { // Small buffer to prevent flickering
      nextPinState = "pinned";
    }

    if (pinStateRef.current !== nextPinState) {
      pinStateRef.current = nextPinState;
      setPinState(nextPinState);
    }

    // Calculate target time based on scroll
    const progress = clamp(scrollDistance / total, 0, 1);
    const targetTime = progress * (video.duration - 0.05);
    
    const smoothing = getSmoothing();
    const newTime = currentVideoTimeRef.current + (targetTime - currentVideoTimeRef.current) * smoothing;
    currentVideoTimeRef.current = newTime;

    if (Math.abs(video.currentTime - newTime) > 0.008) {
      video.currentTime = newTime;
    }

    if (Math.abs(targetTime - currentVideoTimeRef.current) > 0.001) {
      frameIdRef.current = requestAnimationFrame(syncVideoToScroll);
    } else {
      frameIdRef.current = 0;
    }
  }, []);

  const requestSync = useCallback(() => {
    if (!frameIdRef.current) {
      frameIdRef.current = requestAnimationFrame(syncVideoToScroll);
    }
  }, [syncVideoToScroll]);

  // Combined effect for VH locking and general resize handling
  useEffect(() => {
    if (typeof window === "undefined") return;

    const measureStableVh = () => {
      // Create a temporary element to measure 100vh which is stable in most mobile browsers
      // (it usually represents the large viewport height)
      const div = document.createElement("div");
      div.style.height = "100vh";
      div.style.position = "fixed";
      div.style.top = "0";
      div.style.visibility = "hidden";
      div.style.pointerEvents = "none";
      document.body.appendChild(div);
      const stableHeight = div.offsetHeight;
      document.body.removeChild(div);
      
      setVh(stableHeight);
      return stableHeight;
    };

    // Initial lock
    const initialVh = measureStableVh();
    lastWidthRef.current = window.innerWidth;

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      
      // Handle source changes
      const isMobile = currentWidth < 720;
      const nextSrc = withBasePath(
        isMobile ? "/animations/output_mobile.mp4" : "/animations/output_desktop.mp4"
      );
      setVideoSrc((prev) => (prev !== nextSrc ? nextSrc : prev));

      // Only update layout on significant resize (width change)
      if (Math.abs(currentWidth - lastWidthRef.current) > 5) {
        lastWidthRef.current = currentWidth;
        const newVh = measureStableVh();
        
        updateLayout(newVh);
        setTimeout(() => {
          updateLayoutCache(newVh);
          requestSync();
        }, 150);
      }
    };

    // Initialize source and layout immediately
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateLayout, updateLayoutCache, requestSync]);

  // Separate effect for scroll handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleScroll = () => {
      targetScrollRef.current = window.scrollY;
      requestSync();
    };

    const handleLoadedData = async () => {
      if (!video) return;
      
      // Update layout as soon as we have duration
      if (Number.isFinite(video.duration) && video.duration > 0) {
        updateLayout();
      }

      try {
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          await playPromise;
          video.pause();
        }
        setIsVideoReady(true);
      } catch (err) {
        console.warn("Video priming failed:", err);
        video.pause();
        setIsVideoReady(true);
      }

      requestAnimationFrame(() => {
        updateLayoutCache();
        requestSync();
      });
    };

    // Safety timeout
    const safetyTimeout = setTimeout(() => {
      if (!isVideoReady) {
        setIsVideoReady(true);
        updateLayout();
      }
    }, 2000);

    video.addEventListener("loadedmetadata", handleLoadedData);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleLoadedData);
    video.addEventListener("error", () => {
      setIsVideoReady(true);
      updateLayout();
    });

    if (video.readyState >= 1) {
      handleLoadedData();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(safetyTimeout);
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener("scroll", handleScroll);
      video.removeEventListener("loadedmetadata", handleLoadedData);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleLoadedData);
      video.removeEventListener("error", () => {});
    };
  }, [requestSync, updateLayout, updateLayoutCache, isVideoReady]);

  useEffect(() => {
    if (scrubHeight === "0px") return;
    updateLayoutCache();
    requestSync();
  }, [scrubHeight, requestSync, updateLayoutCache]);

  return (
    <main className={styles.pageShell} style={{ "--vh": vh ? `${vh}px` : "100vh" }}>
      <section
        className={styles.introPanel}
        style={{ "--scrubber-gradient": `url(${withBasePath("/gradient.png")})` }}
      >
        {/* Match AssetLoader's radial gradient effect */}
        <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.15)_0%,_transparent_70%)]" />
        </div>

        <div className={`${styles.introPanelContent} relative z-10 w-full flex justify-center items-center ${heroTitleClassName}`}>
          <div className="flex flex-col items-center animate-pulse">
            <h1 className="text-6xl md:text-8xl lg:text-[13rem] font-black tracking-[0.15em] md:tracking-[0.25em] uppercase italic flex items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                Cycle
              </span>
              <span className="ml-4 md:ml-10 text-green-500 drop-shadow-[0_0_30px_rgba(34,197,94,0.8)]">
                0
              </span>
            </h1>
            <div className="h-[2px] md:h-[3px] w-20 md:w-40 bg-green-500 mt-6 md:mt-10 shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
          </div>
        </div>
      </section>

      <section
        ref={sectionRef}
        className={styles.scrubberSection}
        style={{
          "--beats": storyBeats.length,
          "--scrub-height": scrubHeight,
        }}
      >
        <div
          className={[
            styles.scrubberSectionSticky,
            pinState === "pinned" ? styles.scrubberSectionStickyPinned : "",
            pinState === "after" ? styles.scrubberSectionStickyAfter : "",
          ].join(" ").trim()}
        >
          <video
            ref={videoRef}
            className={styles.scrubberSectionVideo}
            style={{ opacity: isVideoReady ? 1 : 0 }}
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            poster={withBasePath("/gradient.png")}
            disableRemotePlayback
            disablePictureInPicture
            crossOrigin="anonymous"
          />
          <div className={styles.scrubberSectionVeil} />
          <div className={styles.scrubberSectionHud}>
          </div>
        </div>

        <div className={styles.scrubberSectionStory}>
          {storyBeats.map((beat) => (
            <div key={beat} className={styles.scrubberSectionBeat}>
              <h2 className={heroTitleClassName}>{beat}</h2>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
