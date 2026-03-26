"use client";

/* SVG mountain/rock silhouette at bottom of sections — inspired by mockup landscape */
export default function MountainSilhouette({
  variant = "default",
  color = "rgba(8, 6, 20, 0.95)",
}: {
  variant?: "default" | "crystal" | "rocks";
  color?: string;
}) {
  if (variant === "crystal") {
    return (
      <svg
        className="mountain-silhouette"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        style={{ height: 160 }}
      >
        <defs>
          <linearGradient id="crystal-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor={color} />
          </linearGradient>
        </defs>
        <path
          d="M0,200 L0,140 L80,90 L120,120 L200,60 L260,100 L320,40 L380,80 L440,30 L500,70 L560,50 L620,90 L680,35 L740,75 L800,45 L860,85 L920,25 L980,65 L1040,55 L1100,80 L1160,40 L1220,70 L1280,50 L1340,90 L1440,60 L1440,200 Z"
          fill={color}
        />
        {/* Crystal spires */}
        <path
          d="M200,200 L200,70 L220,30 L240,70 L240,200 Z"
          fill="rgba(60,40,120,0.4)"
        />
        <path
          d="M600,200 L600,80 L615,20 L630,80 L630,200 Z"
          fill="rgba(40,30,100,0.3)"
        />
        <path
          d="M1000,200 L1000,90 L1020,35 L1040,90 L1040,200 Z"
          fill="rgba(50,35,110,0.35)"
        />
      </svg>
    );
  }

  if (variant === "rocks") {
    return (
      <svg
        className="mountain-silhouette"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        style={{ height: 140 }}
      >
        <path
          d="M0,180 L0,130 L60,110 L140,130 L200,90 L280,120 L360,80 L420,105 L500,70 L580,100 L660,60 L740,95 L820,50 L880,85 L960,65 L1040,100 L1120,55 L1200,90 L1280,70 L1360,100 L1440,80 L1440,180 Z"
          fill={color}
        />
        <path
          d="M0,180 L0,150 L100,135 L250,145 L400,125 L550,140 L700,120 L850,138 L1000,128 L1150,142 L1300,130 L1440,140 L1440,180 Z"
          fill="rgba(5,4,15,0.8)"
        />
      </svg>
    );
  }

  // Default: gentle rolling mountains
  return (
    <svg
      className="mountain-silhouette"
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      style={{ height: 150 }}
    >
      <defs>
        <linearGradient id="mtn-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(15,10,42,0.6)" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      {/* Back range */}
      <path
        d="M0,200 L0,120 L100,80 L200,110 L320,55 L440,90 L560,45 L680,80 L780,50 L900,75 L1000,40 L1100,70 L1200,50 L1320,85 L1440,60 L1440,200 Z"
        fill="url(#mtn-grad)"
      />
      {/* Front range */}
      <path
        d="M0,200 L0,155 L120,130 L280,150 L400,120 L540,145 L680,115 L820,140 L960,125 L1100,148 L1240,130 L1440,145 L1440,200 Z"
        fill={color}
      />
    </svg>
  );
}
