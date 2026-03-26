"use client";

/* Reusable CSS planet with atmosphere glow */
export default function Planet({
  size = 350,
  className = "",
  style = {},
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size, ...style }}>
      {/* Outer atmosphere */}
      <div
        className="planet-atmosphere"
        style={{
          width: size * 1.3,
          height: size * 1.3,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="planet-atmosphere"
        style={{
          width: size * 1.15,
          height: size * 1.15,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderColor: "rgba(79, 195, 247, 0.12)",
        }}
      />
      {/* Planet body */}
      <div className="planet-earth w-full h-full" />
      {/* Top-left highlight */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 0.35,
          height: size * 0.2,
          top: "12%",
          left: "15%",
          background: "radial-gradient(ellipse, rgba(255,255,255,0.06) 0%, transparent 70%)",
          transform: "rotate(-20deg)",
        }}
      />
    </div>
  );
}
