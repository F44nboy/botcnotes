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
  const OUTER_PAD = 20;
  const ICON_BASE = 90;
  const GAP_BASE = 12;

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
  const perSlot = ICON_BASE + GAP_BASE;
  const scale = Math.min(1, Cmax / (N * perSlot));
  const iconSize = Math.max(28, ICON_BASE * scale);
  const icon_center = Math.max(0, Rcircle - iconSize / 2);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
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
