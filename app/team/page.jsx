import Image from "next/image";
import localFont from "next/font/local";

import { SocialButton } from "../event/components/SocialButton";
import { withBasePath } from "../lib/basePath";
import teams, { removeAccents } from "./teamsData";
import styles from "./page.module.css";

const copixelDisplay = localFont({
  src: "../../Copixel-Futuristic-Font/Fonts/Copixel-Display.otf",
  display: "swap",
});

const socialFields = [
  { field: "instagram", platform: "instagram", label: "Instagram" },
  { field: "facebook", platform: "facebook", label: "Facebook" },
  { field: "linkedin", platform: "linkedin", label: "LinkedIn" },
  { field: "youtube", platform: "youtube", label: "YouTube" },
  { field: "tiktok", platform: "tiktok", label: "TikTok" },
  { field: "webpage", platform: "webpage", label: "Website" },
];

const memberPhotoOverrides = {
  aggelos: "/mtt_photos/angelos.webp",
  naria: "/mtt_photos/naria.webp",
  nikos: "/mtt_photos/nikos.webp",
  misa: "/mtt_photos/mykhailo.webp",
  aristotelis: "/mtt_photos/aristotelis.webp",
  artemis: "/mtt_photos/artemis.webp",
  giorgos: "/mtt_photos/rousis.webp",
  eirini: "/mtt_photos/eirinh.webp",
  martina: "/mtt_photos/martina.webp",
  "elena-k": "/mtt_photos/elena_speakers.webp",
  eleftheria: "/mtt_photos/eleftheria.webp",
  konstantinos: "/mtt_photos/kostas_speakers.webp",
  areti: "/mtt_photos/areti.webp",
  elpida: "/mtt_photos/elpida.webp",
  nancy: "/mtt_photos/nancy.webp",
  "elena-x": "/mtt_photos/elena_media.webp",
  malvina: "/mtt_photos/malvina.webp",
  myrto: "/mtt_photos/myrtw.webp",
  "konstantinos-x": "/mtt_photos/kostas_media.webp",
  thodoris: "/mtt_photos/thodoris.webp",
  fenia: "/mtt_photos/fenia.webp",
};

function formatName(name) {
  return removeAccents(name).toUpperCase();
}

function getSocialLinks(social = {}) {
  return socialFields.flatMap(({ field, platform, label }) => {
    const url = typeof social[field] === "string" ? social[field].trim() : "";

    if (!url) {
      return [];
    }

    return { platform, label, url };
  });
}

function TeamMemberCard({ member, teamTitle }) {
  const photoOverride = memberPhotoOverrides[member.id];
  const photo = photoOverride ? withBasePath(photoOverride) : "";
  const socialLinks = getSocialLinks(member.social);

  return (
    <article className={styles.card}>
      <div className={styles.stage}>
        <div className={styles.stageGlow} />
        <Image
          src={withBasePath("/eventimages/circle.png")}
          alt=""
          fill
          priority
          className={styles.circle}
          sizes="(min-width: 1200px) 18vw, (min-width: 768px) 26vw, 72vw"
        />
        {photo ? (
          <div className={styles.photoMask}>
            <div className={styles.photoFrame}>
              <Image
                src={photo}
                alt={member.name}
                fill
                className={styles.photo}
                sizes="(min-width: 1200px) 14vw, (min-width: 768px) 20vw, 54vw"
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className={styles.caption}>
        <p className={styles.teamLabel}>{teamTitle}</p>
        <h2 className={`${copixelDisplay.className} ${styles.name}`}>
          {formatName(member.name)}
        </h2>
      </div>

      {socialLinks.length ? (
        <div className={styles.socials}>
          {socialLinks.map((link) => (
            <SocialButton
              key={`${member.id}-${link.platform}-${link.url}`}
              name={link.platform}
              urlLink={link.url}
              size="24px"
              mode="blackgreen"
              hoverColor="#088880"
              ariaLabel={`${link.label} for ${member.name}`}
            />
          ))}
        </div>
      ) : null}
    </article>
  );
}

export default function TeamPage() {
  return (
    <section className={styles.page}>
      <div className={styles.backdrop} aria-hidden="true">
        <Image
          src={withBasePath("/gradient_backgrounds/gradient_blue.svg")}
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
            Meet the Team
          </h1>
        </div>

        <div className={styles.teamSections}>
          {teams.map((team) => (
            <section key={team.slug} className={styles.teamSection}>
              <h2 className={`${copixelDisplay.className} ${styles.sectionTitle}`}>
                {team.title}
              </h2>
              <div className={styles.memberGrid}>
                {team.members.map((member) => (
                  <TeamMemberCard key={member.id} member={member} teamTitle={team.title} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
