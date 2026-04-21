"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./HomeVideoScrubber.module.css";
import { withBasePath } from "../lib/basePath";

const storyBeats = [
  "A quiet opening before the motion begins.",
  "Scroll down and the video answers step for step.",
  "The frame keeps pace with your movement.",
  "Each viewport advances the sequence a little further.",
  "By the end, the whole moment has played out.",
];

const PIXELS_PER_SECOND = 1600;
const MOBILE_PIXELS_PER_SECOND = 900;

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
<<<<<<< HEAD
  const [videoSrc, setVideoSrc] = useState(null);
=======
  const [videoSrc, setVideoSrc] = useState("");
>>>>>>> sponsors_update
  const layoutCache = useRef({ top: 0, height: 0, windowHeight: 0 });
  const currentVideoTimeRef = useRef(0);
  const targetVideoTimeRef = useRef(0);

  // Update video source based on width, allowing it to switch if the user resizes (useful for testing)
  useEffect(() => {
    const updateSrc = () => {
      const isMobileWidth = window.innerWidth < 768;
      const newSrc = isMobileWidth ? "/koutsouro_mobile.mp4" : "/output.mp4";
      setVideoSrc((prev) => (prev !== newSrc ? newSrc : prev));
    };

    updateSrc();
    window.addEventListener("resize", updateSrc);
    return () => window.removeEventListener("resize", updateSrc);
  }, []);

  useEffect(() => {
    const getSrc = () => {
      const isMobile = window.innerWidth < 720;
      return isMobile
        ? withBasePath("/animations/output_mobile.mp4")
        : withBasePath("/animations/output.mp4");
    };

    setVideoSrc(getSrc());

    const handleResize = () => {
      const nextSrc = getSrc();
      setVideoSrc((prev) => {
        if (prev !== nextSrc) return nextSrc;
        return prev;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateLayoutCache = useCallback(() => {
    if (!sectionRef.current) return;

    const sectionTop =
      sectionRef.current.getBoundingClientRect().top + window.scrollY;

    layoutCache.current = {
      top: sectionTop,
      height: sectionRef.current.offsetHeight,
      windowHeight: getViewportHeight(),
    };
  }, []);

  const updateLayout = useCallback(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video || !Number.isFinite(video.duration) || video.duration <= 0) {
      return;
    }

    const viewportHeight = getViewportHeight();
    const isMobile = window.innerWidth < 720;
    const pixelsPerSecond = (isCoarsePointer() || isMobile)
      ? MOBILE_PIXELS_PER_SECOND
      : PIXELS_PER_SECOND;
    
    const minHeight = viewportHeight * storyBeats.length;
    const desiredHeight = Math.max(
      minHeight,
      video.duration * pixelsPerSecond + viewportHeight,
    );

    setScrubHeight(`${Math.ceil(desiredHeight)}px`);
  }, []);

  const syncVideoToScroll = useCallback(() => {
    const video = videoRef.current;
    const { top, height, windowHeight } = layoutCache.current;

    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
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
    } else if (currentScroll >= top) {
      nextPinState = "pinned";
    }

    if (pinStateRef.current !== nextPinState) {
      pinStateRef.current = nextPinState;
      setPinState(nextPinState);
    }

    // Calculate target time based on scroll
    const progress = clamp(scrollDistance / total, 0, 1);
<<<<<<< HEAD
    targetVideoTimeRef.current = Math.min(
      progress * video.duration,
      video.duration - 0.001
    );
=======
    const nextTime = Math.min(
      progress * (video.duration - 0.05), // slightly less than duration to avoid end-of-video issues
      video.duration - 0.05,
    );
    
    // Only update if the difference is significant enough (e.g., more than half a frame at 30fps)
    if (Math.abs(video.currentTime - nextTime) > 0.016) {
      video.currentTime = nextTime;
    }
>>>>>>> sponsors_update

    // Smoothly interpolate current time towards target for "buttery" feel
    // Using a simple lerp: current = current + (target - current) * factor
    const lerpFactor = 0.15; 
    const timeDiff = targetVideoTimeRef.current - currentVideoTimeRef.current;
    
    if (Math.abs(timeDiff) > 0.001) {
      currentVideoTimeRef.current += timeDiff * lerpFactor;
      video.currentTime = currentVideoTimeRef.current;
      // Continue animation if we haven't reached target
      frameIdRef.current = requestAnimationFrame(syncVideoToScroll);
    } else {
      video.currentTime = targetVideoTimeRef.current;
      frameIdRef.current = 0;
    }
  }, []);

  const requestSync = useCallback(() => {
    if (!frameIdRef.current) {
      frameIdRef.current = requestAnimationFrame(syncVideoToScroll);
    }
  }, [syncVideoToScroll]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const handleScroll = () => {
      targetScrollRef.current = window.scrollY;
      requestSync();
    };

    const handleResize = () => {
      targetScrollRef.current = window.scrollY;
      updateLayout();
      requestAnimationFrame(() => {
        updateLayoutCache();
        requestSync();
      });
    };

    const handleLoadedData = () => {
      updateLayout();
      video.pause();
      targetScrollRef.current = window.scrollY;
      requestAnimationFrame(() => {
        updateLayoutCache();
        requestSync();
      });
    };

    const handleLoadedMetadata = () => {
      // Try to trigger layout on metadata load (more reliable on mobile)
      if (video.duration > 0) {
        handleLoadedData();
      }
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    if (video.readyState >= 2) {
      handleLoadedData();
    }

    // Trigger initial layout calculation after a short delay
    const timeoutId = setTimeout(() => {
      if (video.duration > 0) {
        handleLoadedData();
      }
    }, 500);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = 0;
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [requestSync, updateLayout, updateLayoutCache]);

  useEffect(() => {
    if (scrubHeight === "0px") {
      return;
    }

    updateLayoutCache();
    targetScrollRef.current = window.scrollY;
    requestSync();
  }, [scrubHeight, requestSync, updateLayoutCache]);

  return (
    <main className={styles.pageShell}>
      <section
        className={styles.introPanel}
        style={{ "--scrubber-gradient": `url(${withBasePath("/gradient.png")})` }}
      >
        <div className={styles.introPanelContent}>
          <h1 className={heroTitleClassName}>we were here before</h1>
          <p className={styles.introCopy}>
            Scroll-driven playback with a sticky viewport video.
          </p>
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
<<<<<<< HEAD
            src={videoSrc ? withBasePath(videoSrc) : undefined}
=======
            src={videoSrc}
>>>>>>> sponsors_update
            muted
            playsInline
            preload="auto"
            disableRemotePlayback
            disablePictureInPicture
            crossOrigin="anonymous"
          />
          <div className={styles.scrubberSectionVeil} />
          <div className={styles.scrubberSectionHud}>
            <p className={styles.eyebrow}>Scroll to scrub</p>
          </div>
        </div>

        <div className={styles.scrubberSectionStory}>
          {storyBeats.map((beat) => (
            <div key={beat} className={styles.scrubberSectionBeat}>
              <h2>{beat}</h2>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
