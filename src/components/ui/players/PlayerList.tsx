// src/components/PlayerList.tsx
import { useEffect, useRef, useState } from "react";
import { db } from "@/database/db";
import type { Player } from "@/database/types/player";
import { PlayerAvatar } from "@/components/ui/players/PlayerAvatar";

export function PlayerList() {
  const [players, setPlayers] = useState<Player[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState({ w: 300, h: 300 });

  // --- Größen (vereinfacht; nutze deine existierenden Berechnungen) ---
  const OUTER_PAD = 10; // Freiraum zwischen Kreis und Pane-Rand
  const ICON_BASE = 80; // bevorzugte Icon-Größe, bevor Limits greifen
  const ICON_MIN = 60;  // kleinstmögliche Avatargröße
  const ICON_MAX = 120; // größtmögliche Avatargröße
  const GAP_MIN = 15;   // minimaler Abstand zwischen zwei Avataren
  const GAP_MAX = 32;   // maximaler Abstand zwischen zwei Avataren
  const MIN_CONTAINER_HEIGHT = 300; // bis zu dieser Höhe skalieren wir auch vertikal

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const obs = new ResizeObserver((entries) => {
      const entry = entries?.[0];
      if (!entry) return;
      const rect = entry.contentRect ?? el.getBoundingClientRect();
      setPanel({ w: rect.width, h: rect.height });
    });
    obs.observe(el);
    return () => {
      try {
        obs.unobserve(el);
        obs.disconnect();
      } catch {
        /* noop */
      }
    };
  }, []);

  function refresh() {
    db.players.orderBy("seat").toArray().then((list) => {
      setPlayers(list);
    });
  }

  useEffect(() => {
    refresh();
  }, []);


  const N = Math.max(1, players.length);
  const innerSide = Math.max(0, Math.min(panel.w, panel.h) - 2 * OUTER_PAD);
  const circleSize = Math.max(0, innerSide - 2);
  const Rcircle = circleSize / 2;
  const Cmax = 2 * Math.PI * Rcircle;
  const perSlot = N > 0 ? Cmax / N : 0;
  const slotLimit = Math.max(0, perSlot);

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  const effectiveMin = Math.min(ICON_MIN, ICON_MAX);
  const effectiveMax = Math.max(ICON_MIN, ICON_MAX);
  const baseIcon = clamp(ICON_BASE, effectiveMin, effectiveMax);

  const maxAllowedByGap =
    slotLimit > GAP_MIN ? Math.max(0, slotLimit - GAP_MIN) : slotLimit;
  const minAllowedByGap =
    slotLimit > GAP_MAX ? Math.max(0, slotLimit - GAP_MAX) : 0;

  const maxAllowed = Math.max(
    0,
    Math.min(effectiveMax, slotLimit, maxAllowedByGap)
  );

  const minAllowed = Math.min(
    maxAllowed,
    Math.max(0, Math.min(effectiveMin, slotLimit), minAllowedByGap)
  );

  const iconSize = clamp(baseIcon, minAllowed, maxAllowed);

  const icon_center = Math.max(0, Rcircle - iconSize / 2);

  return (
    <div
      ref={containerRef}
      style={{ minHeight: MIN_CONTAINER_HEIGHT }}
      className="w-full h-full flex items-center justify-center pb-6"
    >
      <ul
        style={{ width: circleSize, height: circleSize }}
        className="relative rounded-full border-neutral-800"
      >
      {players.map((p, i) => {
        const angle = -90 + (360 / N) * i;

        return (
          <li
            key={p.id}
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: `
                translate(-50%, -50%)
                rotate(${angle}deg)
                translate(${icon_center}px)
              `,
              transformOrigin: "center center",
            }}
          >
            {/* Gegenrotation nur auf dem Kind: */}
              <div style={{ transform: `rotate(${-angle}deg)` }}>
                <PlayerAvatar player={p} size={iconSize} />
              </div>
            </li>
          );
        })}

      </ul>
    </div>
  );
}
