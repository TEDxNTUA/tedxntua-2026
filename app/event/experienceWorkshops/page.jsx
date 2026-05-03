"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import localFont from "next/font/local";

import { allExpWorkshops } from "../infoDatabase";
import { SocialButton } from "../components/SocialButton";
import { capitalizeSegments, formatUppercaseNoAccents } from "../textFormatters";
import { withBasePath } from "../../lib/basePath";
import styles from "./page.module.css";

const copixelDisplay = localFont({
  src: "../../../Copixel-Futuristic-Font/Fonts/Copixel-Display.otf",
  display: "swap",
});

const EMPTY_BASE_PATH = withBasePath("");
const PERFORMER_SOCIAL_HOVER_COLOR = "#239d54";

const socialFields = [
  { field: "instagram", platform: "instagram", label: "Instagram" },
  { field: "instagram2", platform: "instagram", label: "Instagram" },
  { field: "facebook", platform: "facebook", label: "Facebook" },
  { field: "linkedin", platform: "linkedin", label: "LinkedIn" },
  { field: "tiktok", platform: "tiktok", label: "TikTok" },
  { field: "youtube", platform: "youtube", label: "YouTube" },
];

function getSocialLinks(...profiles) {
  const seenUrls = new Set();

  return profiles.flatMap((profile) =>
    socialFields.flatMap(({ field, platform, label }) => {
      const url = typeof profile?.[field] === "string" ? profile[field].trim() : "";

      if (!url || seenUrls.has(url)) {
        return [];
      }

      seenUrls.add(url);

      return {
        platform,
        label,
        url,
      };
    }),
  );
}

function SocialLinks({ links = [], ownerName, className = "", size = "24px" }) {
  if (!links.length) {
    return null;
  }

  return (
    <div className={`${styles.socials} ${className}`}>
      {links.map((link) => (
        <SocialButton
          key={`${link.platform}-${link.url}`}
          name={link.platform}
          urlLink={link.url}
          size={size}
          mode="blackgreen"
          hoverColor={PERFORMER_SOCIAL_HOVER_COLOR}
          ariaLabel={`${link.label} for ${ownerName}`}
        />
      ))}
    </div>
  );
}

function BioSections({ bios = [] }) {
  const visibleBios = bios.filter((bio) => bio.text && bio.text !== "-");

  if (!visibleBios.length) {
    return null;
  }

  return (
    <div className={styles.modalBios}>
      {visibleBios.map((bio, index) => (
        <section key={`${bio.name || "bio"}-${index}`} className={styles.modalBio}>
          <h3 className={styles.modalBioName}>Bio: {formatUppercaseNoAccents(bio.name)}</h3>
          <p className={styles.modalResume}>{bio.text}</p>
        </section>
      ))}
    </div>
  );
}

function DescriptionSection({ description }) {
  if (!description || description === "-") {
    return null;
  }

  return (
    <section className={styles.modalDescription}>
      <h3 className={styles.modalDescriptionName}>
        {formatUppercaseNoAccents("Περιγραφή workshop")}
      </h3>
      <p className={styles.modalResume}>{description}</p>
    </section>
  );
}

function resolvePhoto(posterImageUrl) {
  if (!posterImageUrl || posterImageUrl === EMPTY_BASE_PATH) {
    return null;
  }

  return posterImageUrl;
}

function buildPerformerCard(performer, index) {
  if (!performer?.name) {
    return null;
  }

  const artname = performer.artName || performer.title || performer.name;
  const title = performer.title || "";

  return {
    id: `${performer.name}-${index}`,
    name: performer.name,
    title,
    artname,
    profession: capitalizeSegments(performer.profession || "Workshop"),
    photo: resolvePhoto(performer.posterImageUrl),
    description: performer.description || "",
    bios: [
      {
        name: performer.name,
        text: performer.personalDescription || "",
      },
    ],
    socialLinks: getSocialLinks(performer.socials),
  };
}

const performerCards = allExpWorkshops.map(buildPerformerCard).filter(Boolean);

function PerformerModal({ performer, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!performer) {
      return undefined;
    }

    const scrollY = window.scrollY;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.classList.add("speaker-modal-open");

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      document.body.classList.remove("speaker-modal-open");
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [performer, onClose]);

  if (!performer || !mounted) {
    return null;
  }

  return createPortal(
    <div
      className={styles.modalOverlay}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="performer-modal-name"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={styles.modalStage}>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-[110] flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/70 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white sm:right-6 sm:top-6"
            aria-label="Close details"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className={styles.modalAura} aria-hidden="true" />
          <div className={styles.modalMedia}>
            <div className={styles.modalOrbitDisc} aria-hidden="true" />
            {performer.photo ? (
              <div className={styles.modalPhotoMask}>
                <div className={styles.modalPhotoFrame}>
                  <Image
                    src={withBasePath(performer.photo)}
                    alt={performer.name}
                    fill
                    priority
                    className={styles.modalPhoto}
                    sizes="(min-width: 960px) 34vw, 92vw"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className={styles.modalContent}>
          <p className={styles.modalEyebrow}>Experience Workshop</p>
          <h2 id="performer-modal-name" className={`${copixelDisplay.className} ${styles.modalName}`}>
            {formatUppercaseNoAccents(performer.artname)}
          </h2>
          {performer.title ? (
            <p className={styles.modalValue}>{formatUppercaseNoAccents(performer.title)}</p>
          ) : null}
          <p className={styles.modalValue}>{performer.profession}</p>
          <SocialLinks
            links={performer.socialLinks}
            ownerName={performer.name}
            className={styles.modalSocials}
            size="28px"
          />
          <DescriptionSection description={performer.description} />
          <BioSections bios={performer.bios} />
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function PerformancesPage() {
  const [activePerformer, setActivePerformer] = useState(null);

  useEffect(() => {
    document.body.classList.add("compact-site-footer");

    return () => {
      document.body.classList.remove("compact-site-footer");
    };
  }, []);

  return (
    <section className={styles.page} data-modal-open={activePerformer ? "true" : "false"}>
      <div className={styles.backdrop} aria-hidden="true">
        <Image
          src={withBasePath("/gradient_backgrounds/gradient_pink.svg")}
          alt=""
          fill
          priority
          className={styles.backdropImage}
          sizes="100vw"
        />
        <div className={styles.backdropMist} />
        <div className={styles.backdropFlare} />
      </div>

      <div className={styles.content}>
        <div className={styles.hero}>
          <h1 className={`${copixelDisplay.className} ${styles.title}`}>
            Explore our Experience Workshops
          </h1>
        </div>

        <div className={styles.performerRow}>
          {performerCards.map((performer) => (
            <article key={performer.id} className={styles.card}>
              <button
                type="button"
                className={styles.cardButton}
                onClick={() => setActivePerformer(performer)}
                aria-label={`Open details for ${performer.name}`}
              >
                <div className={styles.stage}>
                  <div className={styles.orbitDisc} aria-hidden="true" />
                  {performer.photo ? (
                    <div className={styles.photoMask}>
                      <div className={styles.photoFrame}>
                        <Image
                          src={withBasePath(performer.photo)}
                          alt={performer.name}
                          fill
                          priority
                          className={styles.photo}
                          sizes="(min-width: 1200px) 14vw, (min-width: 768px) 20vw, 54vw"
                        />
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className={styles.caption}>
                  <h2 className={`${copixelDisplay.className} ${styles.name}`}>
                    {formatUppercaseNoAccents(performer.artname)}
                  </h2>
                  <p className={styles.profession}>{performer.profession}</p>
                </div>
              </button>
              <SocialLinks
                links={performer.socialLinks}
                ownerName={performer.name}
                className={styles.cardSocials}
              />
            </article>
          ))}
        </div>
      </div>

      <div className={styles.pageFx} aria-hidden="true">
        <span className={`${styles.pageBlurBlob} ${styles.pageBlurBlobPrimary}`} />
        <span className={`${styles.pageBlurBlob} ${styles.pageBlurBlobSecondary}`} />
        <span className={`${styles.pageBlurBlob} ${styles.pageBlurBlobTertiary}`} />
        <span className={styles.pageBlurVeil} />
      </div>

      <PerformerModal performer={activePerformer} onClose={() => setActivePerformer(null)} />
    </section>
  );
}
