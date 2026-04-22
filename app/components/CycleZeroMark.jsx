export default function CycleZeroMark({ className = "", style = {} }) {
  return (
    <svg
      viewBox="0 0 540 140"
      role="img"
      aria-label="Cycle 0"
      className={className}
      style={style}
      suppressHydrationWarning
    >
      <g opacity="0.55" fill="none" stroke="#ffffff" strokeWidth="2.2" suppressHydrationWarning>
        <circle cx="150" cy="68" r="24" />
        <circle cx="150" cy="68" r="40" />
        <circle cx="150" cy="68" r="56" />
        <circle cx="150" cy="68" r="72" />
        <circle cx="320" cy="68" r="24" />
        <circle cx="320" cy="68" r="40" />
        <circle cx="320" cy="68" r="56" />
        <circle cx="320" cy="68" r="72" />
      </g>

      <g suppressHydrationWarning>
        <g suppressHydrationWarning>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 150 68"
            to="360 150 68"
            dur="7s"
            repeatCount="indefinite"
          />
          <circle cx="150" cy="12" r="5.5" fill="#22c55e" />
          <circle cx="150" cy="12" r="10" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" suppressHydrationWarning />
        </g>
        <g suppressHydrationWarning>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 320 68"
            to="0 320 68"
            dur="9s"
            repeatCount="indefinite"
          />
          <circle cx="320" cy="124" r="5.5" fill="#ffffff" />
          <circle cx="320" cy="124" r="10" fill="none" stroke="rgba(34,197,94,0.5)" strokeWidth="1.2" suppressHydrationWarning />
        </g>
      </g>

      <text
        x="18"
        y="96"
        fill="#050505"
        stroke="#ffffff"
        strokeWidth="7"
        paintOrder="stroke fill"
        fontFamily="'Arial Black', 'Franklin Gothic Heavy', sans-serif"
        fontSize="86"
        fontWeight="900"
        letterSpacing="2"
        suppressHydrationWarning
      >
        CYCLE
      </text>

      <text
        x="400"
        y="96"
        fill="#22c55e"
        stroke="#ffffff"
        strokeWidth="7"
        paintOrder="stroke fill"
        fontFamily="'Arial Black', 'Franklin Gothic Heavy', sans-serif"
        fontSize="86"
        fontWeight="900"
        suppressHydrationWarning
      >
        0
      </text>
    </svg>
  );
}
