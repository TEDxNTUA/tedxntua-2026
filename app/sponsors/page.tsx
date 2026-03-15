"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { sponsorTiers, sponsors, SponsorTierId, tierOrder } from "./sponsorsData";

type RevealProps = {
  children: ReactNode;
  delayMs?: number;
};

function Reveal({ children, delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    onChange();

    if (mq.addEventListener) {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }

    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.14 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: reducedMotion ? "0ms" : `${delayMs}ms` }}
      className={`sponsors-reveal ${visible ? "sponsors-reveal--visible" : ""}`}
    >
      {children}
    </div>
  );
}

function SponsorCard({
  sponsor,
  index,
}: {
  sponsor: (typeof sponsors)[number];
  index: number;
}) {
  const [logoHidden, setLogoHidden] = useState(false);

  return (
    <Reveal delayMs={index * 70}>
      <article className="sponsor-card">
        <div className="sponsor-card__meta">
          <div className="sponsor-logo-wrap" aria-hidden={logoHidden}>
            {!logoHidden && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={sponsor.logoPath}
                alt={`${sponsor.name} logo`}
                className="sponsor-logo"
                loading="lazy"
                onError={() => setLogoHidden(true)}
              />
            )}
            {logoHidden && (
              <div className="sponsor-logo-fallback">
                {sponsor.name
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((part) => part[0]?.toUpperCase())
                  .join("")}
              </div>
            )}
          </div>

          <div>
            <h3 className="sponsor-name">{sponsor.name}</h3>
            <p className="sponsor-description">{sponsor.description}</p>
          </div>
        </div>

        <div className="sponsor-card__footer">
          {sponsor.website ? (
            <a
              className="sponsor-link"
              href={sponsor.website}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visit website
            </a>
          ) : (
            <span className="sponsor-link sponsor-link--disabled">Website coming soon</span>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export default function SponsorsPage() {
  const diamondRef = useRef<HTMLElement | null>(null);
  const sponsorsByTier = useMemo(() => {
    return tierOrder.reduce<Record<SponsorTierId, (typeof sponsors)[number][]>>(
      (acc, tier) => {
        acc[tier] = sponsors.filter((item) => item.tier === tier);
        return acc;
      },
      {
        diamond: [],
        platinum: [],
        grand: [],
        partners: [],
        supporters: [],
      }
    );
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const targetY = 0;

    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const start = performance.now();
    // Auto-scroll timing (ms): tweak these to change pace, slow start, and bottom pause.
    const totalDuration = 7000;
    const slowStartDuration = 1000;
    const bottomHold = 300;
    const mainDuration = Math.max(0, totalDuration - slowStartDuration - bottomHold);
    const phaseDuration = mainDuration / 2;

    const easeInCubic = (t: number) => t * t * t;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const elapsed = now - start;
      if (elapsed >= totalDuration) {
        window.scrollTo({ top: Math.max(0, targetY), behavior: "auto" });
        return;
      }

      if (elapsed <= slowStartDuration) {
        const slowProgress = easeInCubic(elapsed / slowStartDuration);
        window.scrollTo({ top: maxScroll * 0.12 * slowProgress, behavior: "auto" });
        requestAnimationFrame(step);
        return;
      }

      const activeElapsed = elapsed - slowStartDuration;

      if (activeElapsed <= phaseDuration) {
        const progress = easeOutCubic(activeElapsed / phaseDuration);
        const offset = maxScroll * 0.12;
        window.scrollTo({ top: offset + (maxScroll - offset) * progress, behavior: "auto" });
      } else if (activeElapsed <= phaseDuration + bottomHold) {
        window.scrollTo({ top: maxScroll, behavior: "auto" });
      } else {
        const upElapsed = activeElapsed - phaseDuration - bottomHold;
        const progress = easeInCubic(upElapsed / phaseDuration);
        const current = maxScroll * (1 - progress) + targetY * progress;
        window.scrollTo({ top: Math.max(0, current), behavior: "auto" });
      }

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, []);

  return (
    <section className="sponsors-page">
      <div className="sponsors-ambient" aria-hidden="true" />

      <header className="sponsors-hero">
        <Reveal>
          <p className="sponsors-kicker">TEDxNTUA 2026</p>
          <h1 className="sponsors-title">
            Powering ideas with the people who make this stage possible.
          </h1>
          <p className="sponsors-subtitle">
            Every partner below helps transform a one-day event into a lasting impact platform.
          </p>
        </Reveal>
      </header>

      <Reveal delayMs={80}>
        <div className="sponsor-tier-strip" role="list" aria-label="Sponsor category order">
          {tierOrder.map((tier) => (
            <div
              role="listitem"
              className="tier-pill"
              key={tier}
              style={{ "--tier-accent": sponsorTiers[tier].accent } as CSSProperties}
            >
              <span className="tier-pill__dot" />
              {sponsorTiers[tier].title}
            </div>
          ))}
        </div>
      </Reveal>

      <div className="sponsors-sections">
        {tierOrder.map((tier, tierIndex) => {
          const tierInfo = sponsorTiers[tier];
          const tierSponsors = sponsorsByTier[tier];

          return (
            <section
              key={tier}
              className="sponsor-tier-section"
              style={{ "--tier-accent": tierInfo.accent } as CSSProperties}
              ref={tier === "diamond" ? diamondRef : undefined}
            >
              <Reveal delayMs={tierIndex * 90}>
                <div className="tier-heading">
                  <h2>{tierInfo.title}</h2>
                  <p>{tierInfo.subtitle}</p>
                </div>
              </Reveal>

              <div className="sponsor-companies">
                <div className="sponsor-companies__inner">
                  {tierSponsors.map((sponsor, index) => (
                    <SponsorCard sponsor={sponsor} index={index} key={sponsor.id} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
