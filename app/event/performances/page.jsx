"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import localFont from "next/font/local";

import performances from "../LineUpInfo/PerformancesIT.json";
import { withBasePath } from "../../lib/basePath";
import styles from "./page.module.css";

const copixelDisplay = localFont({
  src: "../../../Copixel-Futuristic-Font/Fonts/Copixel-Display.otf",
  display: "swap",
});

const performerPhotos = {
  "Marios Psarianos": "/eventimages/performancers/photo_Psarianos.png",
  "Stratos Fygetakis": "/eventimages/performancers/photo_Fygetakis.png",
  "Konstantina Koutra": "/eventimages/performancers/photo_Konikou.png",
};

const performerLookup = Object.fromEntries(
  performances.map((performer) => [performer.NameEN, performer]),
);

const performerNames = [
  "Marios Psarianos",
  "Stratos Fygetakis",
  "Konstantina Koutra",
];

const performerDisplayNames = {
  "Marios Psarianos": "Marios Psarianos",
  "Stratos Fygetakis": "Stratos Fygetakis",
  "Konstantina Koutra": "KONIKOU",
};

function buildPerformerCard(name) {
  const performer = performerLookup[name];

  if (!performer || !performerPhotos[name]) {
    return null;
  }

  return {
    id: name,
    name: performerDisplayNames[name] || performer.NameEN,
    profession: performer.ProfessionEN || "Performer",
    photo: performerPhotos[name],
    resume: performer.BioEN || performer.BioGR || "",
  };
}

const performerCards = performerNames.map(buildPerformerCard).filter(Boolean);

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
          <div className={styles.modalAura} aria-hidden="true" />
          <div className={styles.modalMedia}>
            <div className={styles.modalOrbitDisc} aria-hidden="true" />
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
          </div>
        </div>

        <div className={styles.modalContent}>
          <p className={styles.modalEyebrow}>Performance</p>
          <h2 id="performer-modal-name" className={`${copixelDisplay.className} ${styles.modalName}`}>
            {performer.name}
          </h2>
          <p className={styles.modalValue}>{performer.profession}</p>
          <p className={styles.modalResume}>{performer.resume}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function PerformancesPage() {
  const [activePerformer, setActivePerformer] = useState(null);

  return (
    <section
      className={styles.page}
      data-modal-open={activePerformer ? "true" : "false"}
    >
      <div className={styles.backdrop} aria-hidden="true">
        <Image
          src={withBasePath("/gradient_green.png")}
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
            Meet our Performers
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
                </div>

                <div className={styles.caption}>
                  <h2 className={`${copixelDisplay.className} ${styles.name}`}>{performer.name}</h2>
                  <p className={styles.profession}>{performer.profession}</p>
                </div>
              </button>
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
