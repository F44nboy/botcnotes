// src/components/ui/players/PlayerList.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { Player } from "@/database/types/player";
import { getAllPlayers } from "@/database/player.utils"; // Pfad ggf. anpassen
import { PlayerAvatar } from "@/components/ui/players/PlayerAvatar";
import { positionalClass } from "@/components/ui/players/seat-presets";
import { usePanel, computeCircle, polarStyle } from "@/components/ui/players/useRing";
import "./ring.css";

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
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    async function load() {
      const list = await getAllPlayers();
      setPlayers(list);
    }
    load();
  }, []);

  const USE_PRESETS = false; // Polar-Fallback als Standard

  const containerRef = useRef<HTMLDivElement>(null);
  const panel = usePanel(containerRef);
  const N = players.length;

  // Kreisberechnung (Cap zur CSS-Obergrenze passend)
  const { circleSize, Rcircle } = useMemo(
    () => computeCircle(panel, { OUTER_PAD: 12, BORDER_PX: 2, CIRCLE_MAX_PX: 640, angleOffsetDeg: -90 }),
    [panel]
  );

  // ---------------- Adaptive Icon-Größe (ohne zusätzlichen Scalefactor) ----------------
  // Ziel: Auf großen Screens Icons spürbar größer + etwas kleinere Lücken.
  // Lösung: Parameter abhängig von der tatsächlichen Ringgröße wählen.
  const isLarge = circleSize >= 560; // Schwellwert für „großen“ Ring/Screen

  // Basiswerte (wie vorher) für kleine/mittlere Screens
  let ICON_MIN = 40;
  let ICON_MAX = 88;
  let GAP_PX   = 8;
  let iconBase = 80;

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

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <ul role="list" style={ulStyle} className="ring relative rounded-full border border-neutral-800">
        {players.length === 0 ? (
          <li className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs opacity-60">
            No players to display
          </li>
        ) : (
          players.map((p, i) => {
            const cls = USE_PRESETS ? positionalClass(N, i) : null;
            const style = cls ? undefined : polarStyle(i, N, Rcenter, -90);
            return (
              <li key={p.id} role="listitem" className={(cls ? `absolute ${cls}` : "absolute")} style={style}>
                {/* Gegenrotation nur im Polar-Fallback nötig */}
                {cls ? (
                  <PlayerAvatar player={p} />
                ) : (
                  <div style={{ transform: `rotate(${90 - (360 / Math.max(N, 1)) * i}deg)` }}>
                    <PlayerAvatar player={p} />
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