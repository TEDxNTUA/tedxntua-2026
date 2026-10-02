const siteUrl = "https://2026.tedxntua.com";
const siteName = "TEDxNTUA 2026";
const image = {
  url: `${siteUrl}/LOGO_ASSET.png`,
  width: 2015,
  height: 1164,
  alt: "TEDxNTUA 2026 Event Logo",
};

export function pageMetadata({ title, description, path }) {
  const url = new URL(path, siteUrl).toString();
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      images: [image],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}
