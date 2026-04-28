import { withBasePath } from "../lib/basePath";

const collectiveImages = [
"/MTT_final/Curators_ΤΕΛΙΚΕΣ✅/Άγγελος ✅/mtt-9.webp",
"/MTT_final/IT_ΤΕΛΙΚΕΣ ✅/Νίκος ✅/mtt-43.webp",
"/MTT_final/Design_ΤΕΛΙΚΕΣ/Αργυρώ/mtt-180.webp",
"/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Άρτεμις ✅/mtt-128.webp",
"/MTT_final/Speakers_ΤΕΛΙΚΕΣ ✅/Ελευθερία ✅/mtt-436.webp",
"/MTT_final/Venue_ΤΕΛΙΚΕΣ ✅/Φένια ✅/mtt-145.webp"].map(withBasePath);


export function pickCollectiveImage(seed = 0) {
  const key = String(seed);
  let hash = 0;

  for (let i = 0; i < key.length; i += 1) {
    hash = hash * 31 + key.charCodeAt(i) >>> 0;
  }

  return collectiveImages[hash % collectiveImages.length];
}

export default collectiveImages;
