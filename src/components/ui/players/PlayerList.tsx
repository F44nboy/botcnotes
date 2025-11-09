import { useEffect, useRef, useState } from "react";
import { db } from "@/database/db";
import type { Player } from "@/database/types/player";

export function PlayerList() {
  const [players, setPlayers] = useState<Player[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState({ w: 300, h: 300 });

  // Baselines
  const ICON_BASE = 80;     // w-14/h-14
  const GAP_BASE  = 12;
  const OUTER_PAD = 20;     // Sicherheitsabstand zum Panel
  const BORDER_PX = 4;      // Tailwind border-4 = 4px

  // Panel messen
    useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const obs = new ResizeObserver((entriesList: ResizeObserverEntry[]) => {
        const entry = entriesList?.[0];
        if (!entry) return;

        // contentRect ist überall verfügbar; fallback nur zur Sicherheit
        const rect = entry.contentRect ?? el.getBoundingClientRect();
        setPanel({ w: rect.width, h: rect.height });
    });

    obs.observe(el);
    return () => {
        try { obs.unobserve(el); } catch {/* noop */}
        obs.disconnect();
    };
    }, []);

  // Spieler laden
  useEffect(() => {
    db.players.orderBy("seat").toArray().then(setPlayers);
  }, []);

  const N = Math.max(1, players.length);

  // Verfügbarer Innenraum (Quadrat) – ohne äußeres Padding
  const innerSide = Math.max(0, Math.min(panel.w, panel.h) - 5 * OUTER_PAD);

  // WICHTIG: Breite/Höhe des KREIS-ELEMENTS so wählen, dass
  // border (je Seite 4px) MIT in den verfügbaren Raum passt.
  // -> content-box: width/height + 2*border = tatsächliche Außenkante
  const circleSize = Math.max(0, innerSide - 2 * BORDER_PX);
  const Rcircle = circleSize / 2;                // sichtbarer Kreis-Radius bis Außenkante
  const Cmax    = 2 * Math.PI * Rcircle;         // Umfang, auf dem Avatare sitzen

  // Wunsch-Segment je Spieler, skaliere runter wenn zu eng
  const perSlot = ICON_BASE + GAP_BASE;
  const scale   = Math.min(1, Cmax / (N * perSlot));
  const icon    = Math.max(24, ICON_BASE * scale);   // Untergrenze 24px
  // Avatare vollständig innerhalb des Kreises:
  const radius  = Math.max(0, Rcircle - icon / 2);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <ul
        style={{ width: circleSize, height: circleSize }}
        className="relative rounded-full border-4 border-neutral-800"
      >
        {players.map((p, i) => {
          const angle = (360 / N) * i;
          return (
            <li
              key={p.id}
              className="absolute rounded-full bg-neutral-800 text-white flex items-center justify-center shadow"
              style={{
                width: icon,
                height: icon,
                top: "50%",
                left: "50%",
                transform: `
                  translate(-50%, -50%)
                  rotate(${angle}deg)
                  translate(${radius}px)
                  rotate(-${angle}deg)
                `,
                fontSize: Math.max(10, Math.min(14, 12 * scale)),
                padding: Math.max(2, icon * 0.08),
              }}
              title={p.name}
            >
              {p.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}