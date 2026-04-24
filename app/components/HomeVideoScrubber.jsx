"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./HomeVideoScrubber.module.css";
import { withBasePath } from "../lib/basePath";
import ScrollRevealText from "./ScrollRevealText";

const storyBeats = [
  "Reforn the circle.",
  "On 09.05.2026",
  "Athens conservatoire",
  "NINE speakers. FIVE performances. SEVEN workshops.",
  "ONE unforgettable night.",
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
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const layoutCache = useRef({ top: 0, height: 0, windowHeight: 0 });
  const currentVideoTimeRef = useRef(0);
  const [vh, setVh] = useState(0);
  const [heroReveal, setHeroReveal] = useState(0);
  const lastWidthRef = useRef(0);

  const getStableViewportHeight = useCallback(() => {
    if (vh > 0) return vh;
    if (typeof window === "undefined") return 800;
    return window.innerHeight;
  }, [vh]);

  const getSmoothing = () => {
    if (typeof window === "undefined") return 0.18;
    return window.innerWidth < 720 ? 0.15 : 0.18;
  };

  const updateLayout = useCallback((forcedHeight) => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 8.0;
    const viewportHeight = forcedHeight || getStableViewportHeight();
    const isMobile = window.innerWidth < 720;
    const pixelsPerSecond = (isCoarsePointer() || isMobile) ? MOBILE_PIXELS_PER_SECOND : PIXELS_PER_SECOND;
    
    const minHeight = viewportHeight * storyBeats.length;
    const desiredHeight = Math.max(minHeight, duration * pixelsPerSecond + viewportHeight * 0.5);
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
    if (!video || height === 0) { frameIdRef.current = 0; return; }

    const currentScroll = window.scrollY;
    const scrollDistance = currentScroll - top;
    const total = height - windowHeight;
    if (total <= 0) { frameIdRef.current = 0; return; }

    let nextPinState = "before";
    if (currentScroll >= top + total) nextPinState = "after";
    else if (currentScroll >= top - 10) nextPinState = "pinned";

    if (pinStateRef.current !== nextPinState) {
      pinStateRef.current = nextPinState;
      setPinState(nextPinState);
    }

    const currentProgress = clamp(scrollDistance / total, 0, 1);
    setProgress(currentProgress);
    
    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 8.0;
    const targetTime = currentProgress * (duration - 0.02);
    const smoothing = getSmoothing();
    const newTime = currentVideoTimeRef.current + (targetTime - currentVideoTimeRef.current) * smoothing;
    currentVideoTimeRef.current = newTime;

    if (Math.abs(video.currentTime - newTime) > 0.004) video.currentTime = newTime;
    if (Math.abs(targetTime - currentVideoTimeRef.current) > 0.0001) frameIdRef.current = requestAnimationFrame(syncVideoToScroll);
    else frameIdRef.current = 0;
  }, []);

  const requestSync = useCallback(() => {
    if (!frameIdRef.current) frameIdRef.current = requestAnimationFrame(syncVideoToScroll);
  }, [syncVideoToScroll]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const measureStableVh = () => {
      const div = document.createElement("div");
      div.style.height = "100vh";
      div.style.position = "fixed";
      div.style.top = "0";
      div.style.visibility = "hidden";
      document.body.appendChild(div);
      const h = div.offsetHeight;
      document.body.removeChild(div);
      setVh(h);
      return h;
    };

    const initialVh = measureStableVh();
    lastWidthRef.current = window.innerWidth;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    const handleResize = () => {
      const w = window.innerWidth;
      const isMobile = w < 720;
      const src = withBasePath(isMobile ? "/animations/output_mobile.mp4" : "/animations/output_desktop.mp4");
      setVideoSrc(prev => prev !== src ? src : prev);

      if (Math.abs(w - lastWidthRef.current) > 10) {
        lastWidthRef.current = w;
        const newVh = measureStableVh();
        updateLayout(newVh);
        setTimeout(() => { updateLayoutCache(newVh); requestSync(); }, 150);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(() => setHeroReveal(1), 500);
    return () => { window.removeEventListener("resize", handleResize); clearTimeout(timer); };
  }, [updateLayout, updateLayoutCache, requestSync]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleScroll = () => requestSync();
    const handleLoadedData = async () => {
      updateLayout();
      try {
        video.muted = true;
        await video.play();
        video.pause();
        setIsVideoReady(true);
      } catch (err) { video.pause(); setIsVideoReady(true); }
      requestAnimationFrame(() => { updateLayoutCache(); requestSync(); });
    };

    video.addEventListener("loadedmetadata", handleLoadedData);
    video.addEventListener("loadeddata", handleLoadedData);
    if (video.readyState >= 1) handleLoadedData();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener("scroll", handleScroll);
      video.removeEventListener("loadedmetadata", handleLoadedData);
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [requestSync, updateLayout, updateLayoutCache]);

  useEffect(() => { if (scrubHeight !== "0px") { updateLayoutCache(); requestSync(); } }, [scrubHeight, requestSync, updateLayoutCache]);

  return (
    <main className={styles.pageShell} style={{ "--vh": vh ? `${vh}px` : "100vh" }}>
      <section className={styles.introPanel} style={{ "--scrubber-gradient": `url(${withBasePath("/background_gradient-transparency@4x.png")})` }}>
        <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.15)_0%,_transparent_70%)]" />
        </div>

        <div className={`${styles.introPanelContent} relative z-10 w-full flex justify-center items-center ${heroTitleClassName}`}>
          <div className="flex flex-col items-center">
            <h1 className="text-6xl md:text-8xl lg:text-[13rem] font-black tracking-[0.1em] md:tracking-[0.15em] uppercase italic flex flex-wrap justify-center items-center gap-x-4 md:gap-x-10">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                <ScrollRevealText text="Cycle" progress={heroReveal} colorMode="white" stagger={12} />
              </span>
              <span className="text-green-500">
                <ScrollRevealText text="0" progress={heroReveal} colorMode="green" stagger={12} />
              </span>
            </h1>
            <div 
              className="h-[2px] md:h-[3px] bg-green-500 mt-6 md:mt-10 shadow-[0_0_15px_rgba(34,197,94,0.8)] transition-all duration-1000 ease-out"
              style={{ width: heroReveal ? (window.innerWidth < 720 ? '160px' : '320px') : '0px', opacity: heroReveal ? 1 : 0 }}
            />
          </div>
        </div>
      </section>

      <section ref={sectionRef} className={styles.scrubberSection} style={{ "--beats": storyBeats.length, "--scrub-height": scrubHeight }}>
        <div className={[styles.scrubberSectionSticky, pinState === "pinned" ? styles.scrubberSectionStickyPinned : "", pinState === "after" ? styles.scrubberSectionStickyAfter : ""].join(" ").trim()}>
          <video ref={videoRef} className={styles.scrubberSectionVideo} style={{ opacity: isVideoReady ? 1 : 0 }} src={videoSrc} muted playsInline preload="auto" crossOrigin="anonymous" />
          <div className={styles.scrubberSectionVeil} />
        </div>

        <div className={styles.scrubberSectionStory}>
          {storyBeats.map((beat, index) => {
            // Calculate progress for each beat
            // t is 0 when the beat zone starts, 0.5 at center, 1 at end
            const t = (progress * storyBeats.length) - index;

            // Plateau Math:
            // Reveal in first 12.5% of its zone (slope 8)
            // Stays fully visible for 75% of the zone (the pause)
            // Hides in last 12.5% of the zone (slope -8)
            const beatProgress = clamp(Math.min(t * 8, (1 - t) * 8), 0, 1);
            
            return (
              <div 
                key={beat} 
                className={styles.scrubberSectionBeat}
                style={{ 
                  zIndex: 10 + index,
                  opacity: beatProgress > 0.01 ? 1 : 0,
                  visibility: beatProgress > 0.01 ? 'visible' : 'hidden',
                  transition: 'opacity 0.2s ease, visibility 0.2s' 
                }}
              >

                <ScrollRevealText
                  text={beat}
                  progress={beatProgress}
                  reducedMotion={reducedMotion}
                  className={`${heroTitleClassName} ${styles.beatText}`}
                  colorMode="yellow-split"
                />
              </div>
            );
          })}

        </div>
      </section>
    </main>
  );
}
