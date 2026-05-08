"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./HomeVideoScrubber.module.css";
import { withBasePath } from "../lib/basePath";
import ScrollRevealText from "./ScrollRevealText";
import { isAndroid } from "../lib/isAndroid";
import HomeEventAppButton from "./HomeEventAppButton";
import GiveawaysButton from "./GiveawaysButton";

const storyBeats = [
  "Reforn the circle.",
  "On 09.05.2026",
  "Athens conservatoire",
  "NINE speakers. FIVE performances. SEVEN workshops.",
  "ONE unforgettable night.",
];
const TOTAL_STEPS = storyBeats.length + 1;
const PIXELS_PER_SECOND = 1000;
const MOBILE_PIXELS_PER_SECOND = 800;
const PHONE_BREAKPOINT = 720;
const FRAME_FOLDER = "/animations/final_1";
const FRAME_START = 1;
const FRAME_STEP = 1;
const FRAME_COUNT = 300;
const FRAME_SEQUENCE_DURATION = 8.0;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const getViewportHeight = () => window.visualViewport?.height ?? window.innerHeight;
const isCoarsePointer = () => window.matchMedia("(pointer: coarse)").matches;
const getFrameSrc = (index) => {
  const frameNumber = FRAME_START + index * FRAME_STEP;
  return withBasePath(`${FRAME_FOLDER}/koutsouro_semi${String(frameNumber).padStart(4, "0")}.webp`);
};

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
  const [isPhoneFrameMode, setIsPhoneFrameMode] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isFrameReady, setIsFrameReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const layoutCache = useRef({ top: 0, height: 0, windowHeight: 0 });
  const currentVideoTimeRef = useRef(0);
  const [vh, setVh] = useState(0);
  const [heroReveal, setHeroReveal] = useState(0);
  const lastWidthRef = useRef(0);
  const isNarrowViewport = typeof window !== "undefined" && window.innerWidth < 720;

  const getStableViewportHeight = useCallback(() => {
    if (vh > 0) return vh;
    if (typeof window === "undefined") return 800;
    return window.innerHeight;
  }, [vh]);

  const getSmoothing = useCallback(() => {
    if (typeof window === "undefined") return 0.18;
    // Android "No-Lag" approach: Disable interpolation (smoothing = 1) 
    // to avoid constant expensive frame updates.
    if (isAndroid()) return 1.0; 
    return window.innerWidth < 720 ? 0.15 : 0.18;
  }, []);

  const updateLayout = useCallback((forcedHeight) => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section) return;

    const useFrames = window.innerWidth < PHONE_BREAKPOINT;
    const duration = useFrames
      ? FRAME_SEQUENCE_DURATION
      : Number.isFinite(video?.duration) && video.duration > 0
        ? video.duration
        : FRAME_SEQUENCE_DURATION;
    const viewportHeight = forcedHeight || getStableViewportHeight();
    const isMobile = window.innerWidth < PHONE_BREAKPOINT;
    const pixelsPerSecond = (isCoarsePointer() || isMobile) ? MOBILE_PIXELS_PER_SECOND : PIXELS_PER_SECOND;
    
    // FIX 1: Change this line to use TOTAL_STEPS (no extra multiplication)
    const minHeight = viewportHeight * TOTAL_STEPS; 
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
    if (height === 0) { frameIdRef.current = 0; return; }

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

    const useFrames = window.innerWidth < PHONE_BREAKPOINT;
    if (useFrames) {
      setFrameIndex(Math.round(currentProgress * (FRAME_COUNT - 1)));
      frameIdRef.current = 0;
      return;
    }

    if (!video) { frameIdRef.current = 0; return; }
    
    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : FRAME_SEQUENCE_DURATION;
    const targetTime = currentProgress * (duration - 0.02);
    const smoothing = getSmoothing();
    
    const newTime = currentVideoTimeRef.current + (targetTime - currentVideoTimeRef.current) * smoothing;
    currentVideoTimeRef.current = newTime;

    // Android "No-Lag" approach: Use a much larger threshold (0.02s) 
    // to only seek when there's a significant change.
    const threshold = isAndroid() ? 0.02 : 0.004;

    if (Math.abs(video.currentTime - newTime) > threshold) {
      video.currentTime = newTime;
    }

    if (Math.abs(targetTime - currentVideoTimeRef.current) > 0.0001) {
      frameIdRef.current = requestAnimationFrame(syncVideoToScroll);
    } else {
      frameIdRef.current = 0;
    }
  }, [getSmoothing]);

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
      const isPhone = w < PHONE_BREAKPOINT;
      setIsPhoneFrameMode(isPhone);
      setIsFrameReady(prev => isPhone ? prev : false);
      
      if (isPhone) {
        setVideoSrc(null);
        setIsVideoReady(false);
      } else {
        let srcPath = "/animations/output_desktop.mp4";
        if (isAndroid()) {
          srcPath = "/animations/output_android.mp4";
        }

        const src = withBasePath(srcPath);
        setVideoSrc(prev => prev !== src ? src : prev);
      }

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
    const handleScroll = () => requestSync();
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (!video || isPhoneFrameMode) {
      updateLayout();
      requestAnimationFrame(() => { updateLayoutCache(); requestSync(); });
      return () => {
        if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
        window.removeEventListener("scroll", handleScroll);
      };
    }

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

    return () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener("scroll", handleScroll);
      video.removeEventListener("loadedmetadata", handleLoadedData);
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [isPhoneFrameMode, requestSync, updateLayout, updateLayoutCache]);

  useEffect(() => {
    if (!isPhoneFrameMode || typeof window === "undefined") return;

    const preloadIndexes = [0, 1, 2, Math.floor(FRAME_COUNT * 0.25), Math.floor(FRAME_COUNT * 0.5), Math.floor(FRAME_COUNT * 0.75), FRAME_COUNT - 1];
    preloadIndexes.forEach((index) => {
      const img = new Image();
      img.src = getFrameSrc(index);
    });
  }, [isPhoneFrameMode]);

  useEffect(() => { if (scrubHeight !== "0px") { updateLayoutCache(); requestSync(); } }, [scrubHeight, requestSync, updateLayoutCache]);

  return (
    <main className={styles.pageShell} style={{ "--vh": vh ? `${vh}px` : "100vh" }}>
      <section className={styles.introPanel} style={{ "--scrubber-gradient": `url(${withBasePath("/gradient_backgrounds/mainPage_gradient.png")})` }}>
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
              style={{ width: heroReveal ? (isNarrowViewport ? '160px' : '320px') : '0px', opacity: heroReveal ? 1 : 0 }}
            />
            <div className="flex flex-col items-center gap-4 mt-8 md:mt-10">
              <HomeEventAppButton />
              <GiveawaysButton />
            </div>
          </div>
        </div>
      </section>

      {/* FIX 2: Pass TOTAL_STEPS to the CSS variable --beats */}
      <section ref={sectionRef} className={styles.scrubberSection} style={{ "--beats": TOTAL_STEPS, "--scrub-height": scrubHeight }}>
        <div className={[styles.scrubberSectionSticky, pinState === "pinned" ? styles.scrubberSectionStickyPinned : "", pinState === "after" ? styles.scrubberSectionStickyAfter : ""].join(" ").trim()}>
          {isPhoneFrameMode ? (
            <img
              className={styles.scrubberSectionFrame}
              style={{ opacity: isFrameReady ? 1 : 0 }}
              src={getFrameSrc(frameIndex)}
              alt=""
              aria-hidden="true"
              decoding="async"
              onLoad={() => setIsFrameReady(true)}
            />
          ) : (
            <video ref={videoRef} className={styles.scrubberSectionVideo} style={{ opacity: isVideoReady ? 1 : 0 }} src={videoSrc} muted playsInline preload="auto" crossOrigin="anonymous" />
          )}
          <div className={styles.scrubberSectionVeil} />
        </div>

        <div className={styles.scrubberSectionStory}>
          {storyBeats.map((beat, index) => {
            // FIX 3: Multiply progress by TOTAL_STEPS so text matches the new scroll length
            const t = (progress * TOTAL_STEPS) - index;
            const beatProgress = clamp(Math.min(t * 8, (1 - t) * 8), 0, 1);
            
            return (
              <div 
                key={beat} 
                className={styles.scrubberSectionBeat}
                style={{ 
                  zIndex: 10 + index,
                  opacity: beatProgress > 0.01 ? 1 : 0,
                  visibility: beatProgress > 0.01 ? 'visible' : 'hidden',
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

          {/* --- FINAL SPLIT REVEAL (IMAGE + MAP) --- */}
{(() => {
  const imageIndex = storyBeats.length;
  const t = (progress * TOTAL_STEPS) - imageIndex;
  const imageProgress = clamp(t * 8, 0, 1); 

  // Replace with your actual embed URL
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3173.829585195268!2d23.74057301141338!3d37.97332700058085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bd41a90a05e7%3A0x243e905afaf27568!2zzqnOtM61zq_OvyDOkc64zrfOvc-Ozr0!5e1!3m2!1sel!2sgr!4v1777305408083!5m2!1sel!2sgr";

  return (
    <div 
  className={styles.finalRevealContainer}
  style={{ 
    zIndex: 50,
    opacity: imageProgress,
    visibility: imageProgress > 0.01 ? 'visible' : 'hidden',
    pointerEvents: imageProgress > 0.5 ? 'auto' : 'none' 
  }}
>
  {/* NOW ON THE LEFT: The Map Portal */}
  <div className={styles.finalRevealLeft}>
    <div className={styles.mapWrapper}>
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        title="Location Map"
        className={styles.mapPortal}
      />
    </div>
  </div>

  {/* NOW ON THE RIGHT: Venue info + image */}
  <div className={styles.finalRevealRight}>
    <div className={styles.finalRevealVenueText}>
      <p>Athens Conservatoire</p>
      <p>Rigillis &amp; Vassileos Georgiou II 17-19</p>
      <p>Metro: Line 3 ("Evangelismos" Station)</p>
      
    </div>
    <div className={styles.finalRevealVenueImageWrap}>
      <img
        src={withBasePath("/PhotoWdeioText.webp")}
        alt="Athens Conservatoire"
        className={styles.splitPhoto}
      />
    </div>
  </div>
</div>
  );
})()}
        </div>
      </section>
    </main>
  );
}
