// src/components/ui/players/PlayerList.tsx
import {useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { usePlayers } from "@/features/state/players-context";
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
    () => computeCircle(panel, { OUTER_PAD: 12, CIRCLE_MAX_PX: 640, angleOffsetDeg: -90 }),
    [panel]
  );

  // ---------------- Adaptive Icon-Größe (ohne zusätzlichen Scalefactor) ----------------
  // Ziel: Auf großen Screens Icons spürbar größer + etwas kleinere Lücken.
  // Lösung: Parameter abhängig von der tatsächlichen Ringgröße wählen.
  const isLarge = circleSize >= 560; // Schwellwert für „großen“ Ring/Screen

  // Basiswerte (wie vorher) für kleine/mittlere Screens
  let ICON_MIN = 40;
  let ICON_MAX = 100;
  let GAP_PX   = 8;
  let iconBase = 90;

  // Für große Screens bewusst „größer & dichter“ setzen
  if (isLarge) {
    ICON_MIN = 36;  // leichte Anhebung der Untergrenze
    ICON_MAX = 110; // mehr Headroom nach oben
    GAP_PX   = 6;   // etwas enger zusammen
    iconBase = 100;  // größere Ziel-Icongröße
  }

  const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

  // Start mit gewünschter Basis, durch Min/Max begrenzt
  let icon = clamp(iconBase, ICON_MIN, ICON_MAX);

  // 2-Pass-Anpassung: Icongröße am Umfang deckeln, damit es nicht überlappt
  for (let pass = 0; pass < 2; pass++) {
    const RcenterTemp = Math.max(0, Rcircle - icon / 2);
    const C = 2 * Math.PI * RcenterTemp;
    const perSlotAvail = N > 0 ? C / N : Infinity;
    const iconMaxCirc = Math.max(ICON_MIN, perSlotAvail - GAP_PX);
    const next = clamp(Math.min(icon, iconMaxCirc), ICON_MIN, ICON_MAX);
    if (Math.abs(next - icon) < 0.5) { icon = next; break; }
    icon = next;
  }

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