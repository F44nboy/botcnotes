// ================================
// FILE: src/components/ui/players/seat-presets.ts
// Discrete compass-like presets for player counts 8–12.
// Fallback to polar transform when no preset is available.
// ================================


export type SeatClass =
| "top" | "right" | "bottom" | "left"
| "right top" | "right bottom" | "left top" | "left bottom"
| "top right" | "top left" | "bottom right" | "bottom left";


// Presets use compass-like positions to distribute players evenly around the circle.
const POS_8: SeatClass[] = [
"top",
"right top",
"right",
"right bottom",
"bottom",
"left bottom",
"left",
"left top",
];


const POS_9: SeatClass[] = [
"top",
"top right",
"right top",
"right",
"right bottom",
"bottom",
"left bottom",
"left",
"left top",
];


const POS_10: SeatClass[] = [
"top",
"top right",
"right top",
"right",
"right bottom",
"bottom right",
"bottom",
"left bottom",
"left",
"left top",
];


const POS_11: SeatClass[] = [
"top",
"top right",
"right top",
"right",
"right bottom",
"bottom right",
"bottom",
"bottom left",
"left bottom",
"left",
"left top",
];


const POS_12: SeatClass[] = [
"top",
"top right",
"right top",
"right",
"right bottom",
"bottom right",
"bottom",
"bottom left",
"left bottom",
"left",
"left top",
"top left",
];


// Map presets by player count.
const PRESETS: Record<number, SeatClass[]> = {
8: POS_8,
9: POS_9,
10: POS_10,
11: POS_11,
12: POS_12,
};


export function positionalClass(N: number, i: number): SeatClass | null {
const preset = PRESETS[N];
if (!preset) return null;
return preset[i % N] ?? null;
}