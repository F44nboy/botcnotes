// src/components/PlayerList.tsx
import { useEffect, useRef, useState, useCallback } from "react";
import { db } from "@/database/db";
import type { Player } from "@/database/types/player";
import { PlayerCard } from "./PlayerCard";

export function PlayerList() {
  const [players, setPlayers] = useState<Player[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState({ w: 300, h: 300 });

  // --- Größen (vereinfacht; nutze deine existierenden Berechnungen) ---
  const OUTER_PAD = 20;
  const BORDER_PX = 4;
  const ICON_BASE = 56;
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

  const refresh = useCallback(async () => {
    const list = await db.players.orderBy("seat").toArray();
    setPlayers(list);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const N = Math.max(1, players.length);
  const innerSide = Math.max(0, Math.min(panel.w, panel.h) - 2 * OUTER_PAD);
  const circleSize = Math.max(0, innerSide - 2 * BORDER_PX);
  const Rcircle = circleSize / 2;
  const Cmax = 2 * Math.PI * Rcircle;
  const perSlot = ICON_BASE + GAP_BASE;
  const scale = Math.min(1, Cmax / (N * perSlot));
  const iconSize = Math.max(28, ICON_BASE * scale);
  const radius = Math.max(0, Rcircle - iconSize / 2);

  // --- Mutationen: Player updaten ---
  const updatePlayer = useCallback(async (id: number, patch: Partial<Player>) => {
    await db.players.update(id, patch);
    await refresh();
  }, [refresh]);

  const handleToggleAlive = useCallback(
    (id: number, next: boolean) => updatePlayer(id, { alive: next }),
    [updatePlayer]
  );

  const handleOpenDetails = useCallback((p: Player) => {
    // z. B. Modal öffnen oder Sidebar füllen
    // openPlayerDetails(p)
    // Hier nur Platzhalter:
    console.debug("open details for", p);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <ul
        style={{ width: circleSize, height: circleSize }}
        className="relative rounded-full border-4 border-neutral-800"
      >
        {players.map((p, i) => {
          // robusten Sitz-Index ableiten
          const raw = typeof p.seat === "number" ? p.seat : parseInt(String(p.seat ?? ""), 10);
          const hasSeat = Number.isFinite(raw) && raw >= 1;

          // seat 1 → 0, seat 2 → 1, …; Fallback: map-Index
          const seatIdx = hasSeat ? (raw as number) - 1 : i;

          // zur Sicherheit bei Ausreißern clampen
          const k = Math.max(0, Math.min(N - 1, seatIdx));

          // 12-Uhr = -90°
          const angle = (360 / N) * k - 90;

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
                  translate(-${radius}px)
                  rotate(-${angle}deg)
                `,
                transformOrigin: "center center",
              }}
            >
              <PlayerCard player={p} size={iconSize} onToggleAlive={handleToggleAlive} onOpenDetails={handleOpenDetails} />
            </li>
          );
        })}

      </ul>
    </div>
  );
}
