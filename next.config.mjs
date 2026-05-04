/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const hasConfiguredBasePath = Object.prototype.hasOwnProperty.call(
  process.env,
  "NEXT_PUBLIC_BASE_PATH",
);
const rawConfiguredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const configuredBasePath =
  rawConfiguredBasePath === "/" ? "" : rawConfiguredBasePath.replace(/\/$/, "");
const basePath = hasConfiguredBasePath
  ? configuredBasePath
  : configuredBasePath || (isGithubActions && repositoryName ? `/${repositoryName}` : "");

const nextConfig = {
  output: "export",
  turbopack: {
    root: process.cwd(),
  },
  allowedDevOrigins: ["172.20.10.12", "localhost:3000" , "192.168.2.12" , "192.168.2.3"],
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
