const COMBINING_MARKS = /[\u0300-\u036f]/g;
const SEGMENT_START = /(^|[&/,\-–—]\s*)(\p{L})/gu;

export function formatUppercaseNoAccents(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .toLocaleUpperCase("el-GR");
}

export function capitalizeSegments(value = "") {
  return String(value)
    .trim()
    .replace(SEGMENT_START, (_match, prefix, letter) => {
      return `${prefix}${letter.toLocaleUpperCase("el-GR")}`;
    });
}
