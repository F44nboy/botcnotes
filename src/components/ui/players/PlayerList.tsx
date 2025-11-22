// src/components/ui/players/PlayerList.tsx
import {useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties } from "react";
import { usePlayers } from "@/features/state/players-context";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { PlayerAvatar } from "@/components/ui/players/PlayerAvatar";
import { positionalClass } from "@/components/ui/players/seat-presets";
import { usePanel, computeCircle, polarStyle } from "@/components/ui/players/useRing";
import "./ring.css";
import { PlayerCard } from "./PlayerCard";

type RingCSSVars = CSSProperties & {
  "--ring"?: string;
  "--unit"?: string;
  "--icon"?: string;
  "--r-center"?: string;
};

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
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  const playerCardRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    // Set portal node once on mount, where document is available
    setPortalNode(document.getElementById('player-card-portal-root'));
  }, []);

  useEffect(() => {
    if (playerCardSeatNumber === null) return;
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (playerCardRef.current?.contains(target)) return;
      if (dropdownRef.current?.contains(target)) return;
      setPlayerCardSeatNumber(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setPlayerCardSeatNumber, playerCardSeatNumber]);

  const USE_PRESETS = false;
  const N = players.length;

  const containerRef = useRef<HTMLDivElement>(null);
  const panel = usePanel(containerRef);
  const breakpoint = useBreakpoint();

  // --- Final Hybrid Sizing Logic ---

  // 1. Determine a DESIRED max circle size based on the viewport breakpoint.
  const { desiredCircleSize, mdIconSize } = useMemo(() => {
    let dcs = 700; // desiredCircleSize
    let mdis = 130; // mediumIconSize
    switch (breakpoint) {
      case 'lg': case 'xl': case '2xl':
        dcs = 600; break;
      case 'md':
        dcs = 700; mdis = 130; break;
      case 'sm':
        dcs = 450; break;
      case 'xs': default:
        dcs = 350; break;
    }
    return { desiredCircleSize: dcs, mdIconSize: mdis };
  }, [breakpoint]);

  // 2. Determine responsive padding and the AVAILABLE size from the actual container dimensions.
  let outerPad = 20; // Default padding for md, lg, xl
  if (['xs', 'sm'].includes(breakpoint)) {
    outerPad = 8; // Use smaller padding on small screens to maximize circle size
  }

  const { circleSize: availableCircleSize } = useMemo(
    () => computeCircle(panel, { OUTER_PAD: outerPad, CIRCLE_MAX_PX: 2000 }),
    [panel, outerPad]
  );

  // 3. The final circle size is the SMALLER of the desired and available sizes.
  const circleSize = Math.min(desiredCircleSize, availableCircleSize);
  const Rcircle = circleSize / 2;

  // 4. Determine the base icon size. For large screens, it's dynamic to fill space.
  let baseIconSize;
  const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

  switch (breakpoint) {
    case 'xl': case '2xl':
      baseIconSize = clamp(circleSize / 8, 100, 140); 
      break;
    case 'lg':
      baseIconSize = 140; // Large fixed size for iPad Pro
      break;
    case 'md':
      baseIconSize = mdIconSize; // Use fixed large size (130px)
      break;
    case 'sm': case 'xs': default:
      baseIconSize = 72;
      break;
  }

  // 5. Calculate the max icon size to prevent overlap, including a minimum gap.
  const GAP_PX = 8;
  const maxIconForOverlap = N > 0 ? (Math.PI * circleSize - N * GAP_PX) / (N + Math.PI) : Infinity;

  // 6. The final icon size is the smaller of the breakpoint-based size or the overlap-safe size.
  const icon = Math.min(baseIconSize, maxIconForOverlap);

  const Rcenter = Math.max(0, Rcircle - icon / 2);
  const rCenterPercent = circleSize > 0 ? `${(Rcenter / circleSize) * 100}%` : "47%";

  const ulStyle: RingCSSVars = {
    ...ringContainerStyle,
    width: circleSize,
    height: circleSize,
    "--icon": `${Math.round(icon)}px`,
    "--r-center": rCenterPercent,
  };

  const seatAngleDeg = (i: number, N: number, offsetDeg = -90) => offsetDeg + (360 / Math.max(N, 1)) * i;

  function sector8(i: number, N: number, offsetDeg = -90): number {
    const a = seatAngleDeg(i, N, offsetDeg);
    const norm = ((a % 360) + 360) % 360;
    return Math.round(norm / 45) % 8;
  }

  function labelClassFor(i: number, N: number, offsetDeg = -90): string {
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
      {playerCardSeatNumber !== null &&
        portalNode &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <PlayerCard setPlayerCardSeatNumber={setPlayerCardSeatNumber} seatNumber={playerCardSeatNumber} playerCardRef={playerCardRef} dropdownRef={dropdownRef}/>
          </div>,
          portalNode
      )}
      <ul role="list" style={ulStyle} className="relative rounded-full">
        {players.length === 0 ? (
          <li role="note" style={{ position: "absolute", left: "50%", top: "50%", fontSize: "1rem", pointerEvents: "none" }}>
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
