// Art Nouveau SVG ornaments
export const CornerOrnament = ({ size = 60, color = "#C8A84B", flip = false }: { size?: number; color?: string; flip?: boolean }) => (
  <svg
    width={size} height={size}
    viewBox="0 0 60 60"
    style={{ transform: flip ? 'rotate(180deg)' : undefined }}
  >
    <g stroke={color} strokeWidth="0.8" fill="none" opacity="0.8">
      {/* Main corner flourish */}
      <path d="M5 5 Q5 30 30 55" strokeWidth="1" />
      <path d="M5 5 Q30 5 55 30" strokeWidth="1" />
      {/* Vine curls */}
      <path d="M5 15 Q10 15 12 10 Q14 5 18 7 Q22 9 20 14" />
      <path d="M15 5 Q15 10 10 12 Q5 14 7 18 Q9 22 14 20" />
      {/* Star dot */}
      <circle cx="5" cy="5" r="2" fill={color} />
      <circle cx="20" cy="10" r="1" fill={color} opacity="0.6" />
      <circle cx="10" cy="20" r="1" fill={color} opacity="0.6" />
      {/* Leaf shapes */}
      <ellipse cx="25" cy="18" rx="4" ry="2" transform="rotate(-45 25 18)" />
      <ellipse cx="18" cy="25" rx="4" ry="2" transform="rotate(45 18 25)" />
    </g>
  </svg>
);

export const FleurDivider = ({ width = 300, color = "#C8A84B" }: { width?: number; color?: string }) => (
  <svg width={width} height="30" viewBox={`0 0 ${width} 30`}>
    <g stroke={color} strokeWidth="0.8" fill="none">
      <line x1="0" y1="15" x2={width * 0.35} y2="15" />
      <line x1={width * 0.65} y1="15" x2={width} y2="15" />
      {/* Central ornament */}
      <path d={`M${width/2 - 20} 15 Q${width/2 - 10} 8 ${width/2} 15 Q${width/2 + 10} 22 ${width/2 + 20} 15`} />
      <circle cx={width/2} cy="15" r="3" fill={color} opacity="0.8" />
      <circle cx={width/2 - 30} cy="15" r="1.5" fill={color} opacity="0.5" />
      <circle cx={width/2 + 30} cy="15" r="1.5" fill={color} opacity="0.5" />
      {/* Small flourishes */}
      <path d={`M${width/2 - 45} 15 Q${width/2 - 40} 10 ${width/2 - 35} 15 Q${width/2 - 30} 20 ${width/2 - 25} 15`} />
      <path d={`M${width/2 + 25} 15 Q${width/2 + 30} 10 ${width/2 + 35} 15 Q${width/2 + 40} 20 ${width/2 + 45} 15`} />
    </g>
  </svg>
);

export const CelestialFrame = ({ width = 300, height = 400, color = "#C8A84B" }: { width?: number; height?: number; color?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox={`0 0 ${width} ${height}`}
    preserveAspectRatio="none"
    style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
  >
    <g stroke={color} strokeWidth="0.6" fill="none" opacity="0.6">
      {/* Outer frame */}
      <rect x="8" y="8" width={width - 16} height={height - 16} />
      <rect x="12" y="12" width={width - 24} height={height - 24} />
      {/* Corner details */}
      {[
        [8, 8, 1, 1], [width - 8, 8, -1, 1],
        [8, height - 8, 1, -1], [width - 8, height - 8, -1, -1]
      ].map(([cx, cy, sx, sy], i) => (
        <g key={i}>
          <line x1={cx} y1={cy + 20 * (sy as number)} x2={cx} y2={cy} />
          <line x1={cx + 20 * (sx as number)} y1={cy} x2={cx} y2={cy} />
          <circle cx={cx} cy={cy} r="2.5" fill={color} />
        </g>
      ))}
      {/* Top center star */}
      <circle cx={width / 2} cy="8" r="3" fill={color} />
      <line x1={width / 2 - 15} y1="8" x2={width / 2 - 5} y2="8" />
      <line x1={width / 2 + 5} y1="8" x2={width / 2 + 15} y2="8" />
    </g>
  </svg>
);

export const PyroluxLogo = ({ size = 80, light = false }: { size?: number; light?: boolean }) => {
  const stroke = light ? "#A07820" : "#C8A84B";
  const fill = light ? "#A07820" : "#C8A84B";
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {/* Outer celestial ring */}
      <circle cx="60" cy="60" r="54" stroke={stroke} strokeWidth="0.8" fill="none" opacity="0.4" />
      <circle cx="60" cy="60" r="50" stroke={stroke} strokeWidth="0.4" fill="none" opacity="0.3" />
      {/* Constellation dots */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <circle
          key={i}
          cx={60 + 50 * Math.cos((angle * Math.PI) / 180)}
          cy={60 + 50 * Math.sin((angle * Math.PI) / 180)}
          r="1.5"
          fill={fill}
          opacity={i % 2 === 0 ? "0.8" : "0.4"}
        />
      ))}
      {/* Inner Art Nouveau ornament circle */}
      <circle cx="60" cy="60" r="38" stroke={stroke} strokeWidth="0.6" fill="none" opacity="0.3" />
      {/* The calligraphic P mark - stylized */}
      <g transform="translate(60,60)">
        {/* P bowl */}
        <path
          d="M-8 20 L-8 -20 Q-8 -28 0 -28 Q16 -28 16 -10 Q16 8 0 8 L-8 8"
          stroke={stroke} strokeWidth="2.5" fill="none" strokeLinecap="round"
        />
        {/* Flowing tail */}
        <path
          d="M-8 8 Q-14 16 -12 24 Q-10 30 -4 28"
          stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round"
        />
        {/* Ornamental swash */}
        <path
          d="M0 -28 Q20 -35 22 -22 Q24 -10 14 -6"
          stroke={stroke} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7"
        />
      </g>
      {/* Star marks at key points */}
      <g fill={fill}>
        <polygon points="60,8 61.5,11.5 65,11.5 62.5,14 63.5,17.5 60,15.5 56.5,17.5 57.5,14 55,11.5 58.5,11.5" opacity="0.8" transform="scale(0.7) translate(25.7,-2)" />
      </g>
    </svg>
  );
};

export const MoonPhase = ({ phase = 0, size = 30, color = "#C8A84B" }: { phase?: number; size?: number; color?: string }) => {
  const phases = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
  return (
    <span style={{ fontSize: size * 0.6, opacity: 0.8 }} aria-label={`Moon phase ${phase}`}>
      {phases[phase % 8]}
    </span>
  );
};
