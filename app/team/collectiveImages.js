import { withBasePath } from "../lib/basePath";

const collectiveImages = [
"/MTT/collective/collective-01.jpg",
"/MTT/collective/collective-02.jpg",
"/MTT/collective/collective-03.jpg",
"/MTT/collective/collective-04.jpg",
"/MTT/collective/collective-05.jpg",
"/MTT/collective/collective-06.jpg"].map(withBasePath);


export function pickCollectiveImage(seed = 0) {
  const key = String(seed);
  let hash = 0;

  for (let i = 0; i < key.length; i += 1) {
    hash = hash * 31 + key.charCodeAt(i) >>> 0;
  }

  return collectiveImages[hash % collectiveImages.length];
}

export default collectiveImages;
