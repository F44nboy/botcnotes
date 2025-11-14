// src/components/ui/players/PlayerAvatar.tsx
import type { Player } from "@/database/types/player";

export type PlayerAvatarProps = {
  player: Player;
  size?: number;
};

// src/components/ui/players/PlayerAvatar.tsx
export function PlayerAvatar({ player, size }: PlayerAvatarProps) {

  const style: React.CSSProperties = {
    width: size ?? "var(--icon, 48px)",
    height: size ?? "var(--icon, 48px)",
    backgroundImage: "url('/token-background.webp')",
    backgroundSize: "113%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "9999px",
  };
   
  return (
    <div
      style={style}
      className="relative rounded-full overflow-hidden hover:scale-110 transition-transform cursor-pointer"
    >
      {/* Token-Bild */}
      <span className="absolute inset-0 z-10 bg-[url(/Icon_imp.png)] bg-center bg-cover scale-95" />

      {/* Halbkreis-Text unten, horizontal mittig */}
      <svg
        className="absolute inset-0 z-20 pointer-events-none"
        viewBox="0 0 140 140"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          {/* Unterer Halbkreis: Mittelpunkt (70,70), Radius 60 → Pfad: links unten → rechts unten */}
          <path id="circle-path-bottom" d="M 10,70 A 60 60 0 0 0 130,70" />
        </defs>

        <text
          textAnchor="middle"
          fontFamily="Dumbledor, serif"
          fontSize= "120%"
          style={{
            textTransform: "uppercase",
            paintOrder: "stroke",
            letterSpacing: "2px",   // leicht größere Abstände
          }}
        >
          {/* startOffset="50%" → Text mittig; spacing/method → gleichmäßige Buchstabenverteilung */}
          <textPath
            href="#circle-path-bottom"
            startOffset="50%"
            spacing="auto"
            method="align"
          >
            Fortune Teller
          </textPath>
        </text>
      </svg>
    </div>
  );
}
