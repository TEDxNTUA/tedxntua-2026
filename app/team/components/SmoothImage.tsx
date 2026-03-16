"use client";

import React from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement>;

export default function SmoothImage({ src, alt, className = "", style, loading = "eager", decoding = "sync", ...props }: Props) {
  return (
    <img
      {...props}
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      style={{ objectPosition: "50% 18%", ...style }}
      className={className}
    />
  );
}