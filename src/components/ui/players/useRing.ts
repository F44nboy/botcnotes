// ================================
// FILE: src/components/ui/players/useRing.ts
// Hook + helpers to compute ring geometry with a CSS-first scaling approach.
// ================================


import { useEffect, useState } from "react";


export type Panel = { w: number; h: number };


export type RingOptions = {
OUTER_PAD?: number;
BORDER_PX?: number;
CIRCLE_MAX_PX?: number; // hard cap for huge desktops
PER_SLOT_MAX?: number; // optional cap of center-to-center distance
angleOffsetDeg?: number; // default: -90 (12 o'clock)
};


const DEFAULTS: Required<RingOptions> = {
OUTER_PAD: 12,
BORDER_PX: 2,
CIRCLE_MAX_PX: 560,
PER_SLOT_MAX: 0,
angleOffsetDeg: -90,
};


export function usePanel(ref: React.RefObject<HTMLDivElement | null>) {
const [panel, setPanel] = useState<Panel>({ w: 0, h: 0 });


useEffect(() => {
if (!ref.current || typeof ResizeObserver === "undefined") return;
const el = ref.current;
const ro = new ResizeObserver((entries) => {
const rect = entries?.[0]?.contentRect ?? el.getBoundingClientRect();
setPanel({ w: Math.max(0, rect.width), h: Math.max(0, rect.height) });
});
ro.observe(el);
return () => ro.disconnect();
}, [ref]);


return panel;
}


export function computeCircle(panel: Panel, opts?: RingOptions) {
const O = { ...DEFAULTS, ...(opts || {}) };
const innerSide = Math.max(0, Math.min(panel.w, panel.h) - 2 * O.OUTER_PAD);
const raw = Math.max(0, innerSide - 2 * O.BORDER_PX);
const circleSize = Math.min(raw, O.CIRCLE_MAX_PX);
return { circleSize, Rcircle: circleSize / 2 };
}


export function polarStyle(
    i: number,
    N: number,
    Rcenter: number,
    angleOffsetDeg = -90
): React.CSSProperties {
    if (N <= 0) return {};
    const step = 360 / N;
    const angle = angleOffsetDeg + step * i;
    return {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${Rcenter}px)`,
        transformOrigin: "center center",
    };
}