export default function SmoothImage({
  src,
  alt,
  className = "",
  style,
  loading = "eager",
  decoding = "sync",
  ...props
}) {
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
