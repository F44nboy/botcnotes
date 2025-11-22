// src/components/ui/players/PlayerList.tsx
import {useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { usePlayers } from "@/features/state/players-context";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { PlayerAvatar } from "@/components/ui/players/PlayerAvatar";
import { positionalClass } from "@/components/ui/players/seat-presets";
import { usePanel, computeCircle, polarStyle } from "@/components/ui/players/useRing";
import "./ring.css";
import { PlayerCard } from "./PlayerCard";

// Typisierte CSS-Custom-Properties
type RingCSSVars = CSSProperties & {
  "--ring"?: string;
  "--unit"?: string;
  "--icon"?: string;
  "--r-center"?: string;
};

// Basis: zurück auf die vorherige Ring-Größe
const ringContainerStyle: RingCSSVars = {
  "--ring": "clamp(300px, 82vmin, 640px)",
  "--unit": "clamp(10px, 16vmin, 28px)",
  position: "relative",
  width: "var(--ring)",
  height: "var(--ring)",
};

export function PlayerList() {
  const { players } = usePlayers();

  const [playerCardSeatNumber, setPlayerCardSeatNumber] = useState<number|null>(null);

  const playerCardRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (playerCardSeatNumber === null) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Wenn Card oder Dropdown den Klick enthalten → NICHT schließen
      if (playerCardRef.current?.contains(target)) return;
      if (dropdownRef.current?.contains(target)) return;

      // Alles andere → Card schließen
      setPlayerCardSeatNumber(null);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setPlayerCardSeatNumber, playerCardSeatNumber]);




  const USE_PRESETS = false; // Polar-Fallback als Standard

  const containerRef = useRef<HTMLDivElement>(null);
  const panel = usePanel(containerRef);
  const N = players.length;

  // Kreisberechnung (Cap zur CSS-Obergrenze passend)
  const { circleSize, Rcircle } = useMemo(
    () => computeCircle(panel, { OUTER_PAD: 12, CIRCLE_MAX_PX: 960, angleOffsetDeg: -90 }),
    [panel]
  );

  const breakpoint = useBreakpoint();

  // --- Responsive Icon Sizing ---

  // 1. Set a base icon size based on the viewport's Tailwind breakpoint.
  let baseIconSize;
  switch (breakpoint) {
    case 'lg':
    case 'xl':
    case '2xl':
      baseIconSize = 100; // Cap at 100px for large screens
      break;
    case 'md':
      baseIconSize = 100; // Grow to 100px on medium screens
      break;
    case 'sm':
    case 'xs':
    default:
      baseIconSize = 72; // Smaller size for small screens
      break;
  }

  // 2. Calculate the max icon size to prevent overlap, including a minimum gap.
  const GAP_PX = 8;
  const maxIconForOverlap = N > 0 ? (Math.PI * circleSize - N * GAP_PX) / (N + Math.PI) : Infinity;

  // 3. The final icon size is the smaller of the breakpoint-based size or the overlap-safe size.
  const icon = Math.min(baseIconSize, maxIconForOverlap);

  // Finaler Zentrenradius und CSS-Variablen
  const Rcenter = Math.max(0, Rcircle - icon / 2);
  const rCenterPercent = circleSize > 0 ? `${(Rcenter / circleSize) * 100}%` : "47%";

  const ulStyle: RingCSSVars = {
    ...ringContainerStyle,
    width: circleSize,
    height: circleSize,
    "--icon": `${Math.round(icon)}px`,
    "--r-center": rCenterPercent,
  };

  // Hilfsunktionen zur Winkelberechnung
  // Winkel mit gleichem Offset wie bei polarStyle
  const seatAngleDeg = (i: number, N: number, offsetDeg = -90) =>
    offsetDeg + (360 / Math.max(N, 1)) * i;

  // 8-Wege-Sektor (0..7) aus Winkel ableiten
  function sector8(i: number, N: number, offsetDeg = -90): number {
    const a = seatAngleDeg(i, N, offsetDeg);
    const norm = ((a % 360) + 360) % 360;           // 0..359.999
    return Math.round(norm / 45) % 8;               // 0..7
  }

  function labelClassFor(i: number, N: number, offsetDeg = -90): string {
    // Mapping 0..7 → Klassenname, Start bei 0°=rechts; wir wollen -90°=oben,
    // deshalb stimmt das mit polarStyle-Offset zusammen (siehe Mapping):
    const s = sector8(i, N, offsetDeg);
    switch (s) {
      case 0: return "label-right";
      case 1: return "label-bottom-right";
      case 2: return "label-bottom";
      case 3: return "label-bottom-left";
      case 4: return "label-left";
      case 5: return "label-top-left";
      case 6: return "label-top";
      case 7: return "label-top-right";
      default: return "label-bottom";
    }
  }

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center p-4">
        {playerCardSeatNumber !== null && (
          <div className="fixed inset-0 z-60 flex items-center justify-center min-w-[100px] min-h-[200px]">
              <PlayerCard seatNumber={playerCardSeatNumber} playerCardRef={playerCardRef} dropdownRef={dropdownRef}/>
          </div>
        )}
          <ul role="list" style={ulStyle} className="relative rounded-full">
            {players.length === 0 ? (
              <li
                role="note"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  fontSize: "1rem", // text-xs
                  pointerEvents: "none",
                }}
              >
                No players to display
              </li>
            ) : (
            players.map((p, i) => {
              const cls = USE_PRESETS ? positionalClass(N, i) : null;
              const style = cls ? undefined : polarStyle(i, N, Rcenter, -90);

              const nameClass = labelClassFor(i, N, -90);

              return (
                <li key={p.id} className={cls ? `absolute ${cls}` : "absolute"} style={style}>
                  {cls ? (
                    <PlayerAvatar seatNumber={p.seat} nameClass={nameClass} setPlayerCardSeatNumber={setPlayerCardSeatNumber}/>
                  ) : (
                    <div style={{ transform: `rotate(${90 - (360 / Math.max(N, 1)) * i}deg)` }}>
                      <PlayerAvatar seatNumber={p.seat} nameClass={nameClass} setPlayerCardSeatNumber={setPlayerCardSeatNumber} />
                    </div>
                  )}
                </li>
              );
            })
            )}
          </ul>
    </div>
  );
}