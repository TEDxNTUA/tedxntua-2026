"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import localFont from "next/font/local";

import speakers from "../LineUpInfo/SpeakersIT.json";
import { SocialButton } from "../components/SocialButton";
import { withBasePath } from "../../lib/basePath";
import styles from "./page.module.css";

const copixelDisplay = localFont({
  src: "../../../Copixel-Futuristic-Font/Fonts/Copixel-Display.otf",
  display: "swap",
});

const speakerPhotos = {
  "Eleni Kavvada": "/eventimages/speakers/photo_KAVVADA.png",
  "Τhanos Ιoannidis - Chara Kontochristou": "/eventimages/speakers/photo_Thanos&Chara.png",
  "Yannis Daglis": "/eventimages/speakers/photo_Daglis.png",
  "Dimitris Barmpas": "/eventimages/speakers/photo_Mr Music.png",
  "Elena Papadimitriou": "/eventimages/speakers/photo_Papadimitriou.png",
  "Stergios Vakalis": "/eventimages/speakers/photo_VAKALIS.png",
  "Nora Drakou": "/eventimages/speakers/photo_Drakou.png",
  "Dimitris Samolis": "/eventimages/speakers/photo_Samolhs.png",
};

const speakerLookup = Object.fromEntries(
  speakers.map((speaker) => [speaker.NameEN, speaker]),
);

const selectedSpeakerNames = [
  "Eleni Kavvada",
  "Τhanos Ιoannidis - Chara Kontochristou",
  "Yannis Daglis",
  "Dimitris Barmpas",
  "Elena Papadimitriou",
  "Stergios Vakalis",
  "Nora Drakou",
  "Dimitris Samolis",
];

const SPEAKER_SOCIAL_HOVER_COLOR = "#088880";

const socialFields = [
  { field: "Instagram", platform: "instagram", label: "Instagram" },
  { field: "Instagram2", platform: "instagram", label: "Instagram" },
  { field: "Facebook", platform: "facebook", label: "Facebook" },
  { field: "LinkedIn", platform: "linkedin", label: "LinkedIn" },
  { field: "TikTok", platform: "tiktok", label: "TikTok" },
  { field: "Youtube", platform: "youtube", label: "YouTube" },
];

const jointSpeaker = speakerLookup["Τhanos Ιoannidis - Chara Kontochristou"];
const charaSpeaker = speakerLookup["Chara Kontochristou"];

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
          hoverColor={SPEAKER_SOCIAL_HOVER_COLOR}
          ariaLabel={`${link.label} for ${ownerName}`}
        />
      ))}
    </div>
  );
}

function buildSpeakerCard(name) {
  const speaker = speakerLookup[name];

  if (!speaker || !speakerPhotos[name]) {
    return null;
  }

  if (name === "Τhanos Ιoannidis - Chara Kontochristou") {
    return {
      id: "thanos-chara",
      name: "Thanos Ioannidis & Chara Kontochristou",
      profession: `${jointSpeaker.ProfessionEN} & ${charaSpeaker.ProfessionEN}`,
      photo: speakerPhotos[name],
      resume: `${jointSpeaker.BioEN}\n\n${charaSpeaker.BioEN}`,
      socialLinks: getSocialLinks(jointSpeaker, charaSpeaker),
    };
  }

  return {
    id: name,
    name: speaker.NameEN,
    profession: speaker.ProfessionEN || "Speaker",
    photo: speakerPhotos[name],
    resume: speaker.BioEN || speaker.BioGR || "",
    socialLinks: getSocialLinks(speaker),
  };
}

const speakerCards = selectedSpeakerNames.map(buildSpeakerCard).filter(Boolean);

function SpeakerModal({ speaker, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!speaker) {
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
  }, [speaker, onClose]);

  if (!speaker || !mounted) {
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
        aria-labelledby="speaker-modal-name"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={styles.modalStage}>
          <div className={styles.modalAura} aria-hidden="true" />
          <div className={styles.modalRings} aria-hidden="true" />
          <div className={styles.modalMedia}>
            <Image
              src={withBasePath("/circle.png")}
              alt=""
              fill
              priority
              className={styles.modalCircle}
              sizes="(min-width: 960px) 32rem, 80vw"
            />
            <div className={styles.modalPhotoMask}>
              <div className={styles.modalPhotoFrame}>
                <Image
                  src={withBasePath(speaker.photo)}
                  alt={speaker.name}
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
          <p className={styles.modalEyebrow}>Speaker</p>
          <h2 id="speaker-modal-name" className={`${copixelDisplay.className} ${styles.modalName}`}>
            {speaker.name}
          </h2>
          <p className={styles.modalValue}>{speaker.profession}</p>
          <SocialLinks
            links={speaker.socialLinks}
            ownerName={speaker.name}
            className={styles.modalSocials}
            size="28px"
          />
          <p className={styles.modalResume}>{speaker.resume}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function SpeakersPage() {
  const [activeSpeaker, setActiveSpeaker] = useState(null);

  useEffect(() => {
    document.body.classList.add("compact-site-footer");

    return () => {
      document.body.classList.remove("compact-site-footer");
    };
  }, []);

  return (
    <section
      className={styles.page}
      data-modal-open={activeSpeaker ? "true" : "false"}
    >
      <div className={styles.backdrop} aria-hidden="true">
        <Image
          src={withBasePath("/gradient.png")}
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
            Meet our Hostess & Speakers
          </h1>
        </div>

        <div className={styles.speakerRow}>
          {speakerCards.map((speaker) => (
            <article key={speaker.id} className={styles.card}>
              <button
                type="button"
                className={styles.cardButton}
                onClick={() => setActiveSpeaker(speaker)}
                aria-label={`Open details for ${speaker.name}`}
              >
                <div className={styles.stage}>
                  <div className={styles.stageGlow} />
                  <Image
                    src={withBasePath("/circle.png")}
                    alt=""
                    fill
                    priority
                    className={styles.circle}
                    sizes="(min-width: 1200px) 18vw, (min-width: 768px) 26vw, 72vw"
                  />
                  <div className={styles.photoMask}>
                    <div className={styles.photoFrame}>
                      <Image
                        src={withBasePath(speaker.photo)}
                        alt={speaker.name}
                        fill
                        priority
                        className={styles.photo}
                        sizes="(min-width: 1200px) 14vw, (min-width: 768px) 20vw, 54vw"
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.caption}>
                  <h2 className={`${copixelDisplay.className} ${styles.name}`}>{speaker.name}</h2>
                  <p className={styles.profession}>{speaker.profession}</p>
                </div>
              </button>
              <SocialLinks
                links={speaker.socialLinks}
                ownerName={speaker.name}
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

      <SpeakerModal speaker={activeSpeaker} onClose={() => setActiveSpeaker(null)} />
    </section>
  );
}
