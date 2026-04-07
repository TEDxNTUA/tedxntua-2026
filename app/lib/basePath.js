export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const withBasePath = (path) => {
  if (!path) {
    return basePath || "";
  }

  if (path.startsWith("/")) {
    return `${basePath}${path}`;
  }

  return `${basePath}/${path}`;
};
