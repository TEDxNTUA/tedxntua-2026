import Image from "next/image";
import localFont from "next/font/local";
import speakers from "../LineUpInfo/SpeakersIT.json";
import { withBasePath } from "../../lib/basePath";
import styles from "./page.module.css";

const copixelDisplay = localFont({
  src: "../../../Copixel-Futuristic-Font/Fonts/Copixel-Display.otf",
  display: "swap",
});

const speakerPhotos = {
  "Eleni Kavvada": "/eventimages/speakers/photo_KAVVADA.png",
  "Chara Kontochristou": "/eventimages/speakers/photo_Thanos&Chara.png",
  "Τhanos Ιoannidis - Chara Kontochristou": "/eventimages/speakers/photo_Thanos&Chara.png",
  "Yannis Daglis": "/eventimages/speakers/photo_Daglis.png",
  "Dimitris Barmpas": "/eventimages/speakers/photo_Mr Music.png",
  "Elena Papadimitriou": "/eventimages/speakers/photo_Papadimitriou.png",
  "Stergios Vakalis": "/eventimages/speakers/photo_VAKALIS.png",
  "Nora Drakou": "/eventimages/speakers/photo_Drakou.png",
  "Dimitris Samolis": "/eventimages/speakers/photo_Samolhs.png",
};

const speakerDisplayNames = {
  "Τhanos Ιoannidis - Chara Kontochristou": "Thanos Ioannidis - Chara Kontochristou",
};

const speakerCards = speakers.map((speaker, index) => ({
  id: `${speaker.NameEN}-${index}`,
  name: speakerDisplayNames[speaker.NameEN] || speaker.NameEN,
  profession: speaker.ProfessionEN || "Speaker",
  photo: speakerPhotos[speaker.NameEN] || null,
})).filter((speaker) => speaker.photo);

export default function SpeakersPage() {
  return (
    <section className={styles.page}>
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
        <div className={styles.speakerRow}>
          {speakerCards.map((speaker) => (
            <article key={speaker.id} className={styles.card}>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
