// src/components/ui/players/PlayerAvatar.tsx
import type { Player } from "@/database/player";
import "./ring.css";
import { useState } from "react";
import { PlayerCard } from "./PlayerCard";

type PlayerAvatarProps = {
  player: Player;
  size?: number;
  nameClass?: string; // NEU: z.B. "label-top", "label-right", ...
};

export function PlayerAvatar({ player, size, nameClass = "label-bottom" }: PlayerAvatarProps) {
  const [isPlayerCardVisible, setIsPlayerCardVisible] = useState(false);
  const style: React.CSSProperties = {
    width: size ?? "var(--icon, 48px)",
    height: size ?? "var(--icon, 48px)",
    backgroundImage: "url('/token-background.webp')",
    backgroundSize: "113%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "9999px",
  };

  function onPlayerIconHandleClick() {
    setIsPlayerCardVisible(!isPlayerCardVisible);
  }

  return (
    <div onClick={onPlayerIconHandleClick} className="relative flex items-center justify-center">
      {/* Avatar-Kreis */}
      {isPlayerCardVisible && <PlayerCard player={player} />}
      <div
        style={style}
        className="relative rounded-full overflow-hidden hover:scale-120 transition-transform cursor-pointer"
      >
        <span className="absolute inset-0 z-10 bg-[url(/Icon_imp.png)] bg-center bg-cover scale-95" />

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
            fontSize="120%"
            style={{
              textTransform: "uppercase",
              paintOrder: "stroke",
              letterSpacing: "2px",
            }}
          >
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

      {/* Name außen, je nach Richtungsklasse */}
      <div className={`name-label ${nameClass}`}>{player.name}</div>
    </div>
  );
}