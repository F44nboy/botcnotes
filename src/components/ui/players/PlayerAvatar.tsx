// src/components/ui/players/PlayerAvatar.tsx
import "./ring.css";
import { usePlayers } from "@/features/state/players-context";
import type { Player } from "@/database/types/player";

type PlayerAvatarProps = {
  seatNumber: number;
  size?: number;
  nameClass?: string; // NEU: z.B. "label-top", "label-right", ...
  setPlayerCardSeatNumber: (visible: number | null) => void;
};

export function PlayerAvatar({ seatNumber, size, nameClass = "label-bottom", setPlayerCardSeatNumber }: PlayerAvatarProps) {
  const { players } = usePlayers();
  const player: Player | undefined = players.find(p => p.seat === seatNumber);

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
    setPlayerCardSeatNumber(seatNumber);

  }

  if (!player) return null;
  return (
    <div onClick={onPlayerIconHandleClick} className="relative flex items-center justify-center">
      <div style={style} className="relative rounded-full overflow-hidden hover:scale-120 transition-transform cursor-pointer">
        <span className="absolute inset-0 z-10 bg-[url(/icons/Townsfolk/Icon_fortuneteller.png)] bg-center bg-cover scale-95" />
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