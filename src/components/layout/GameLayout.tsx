import type { ReactNode } from "react";

interface GameLayoutProps {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
}

export function GameLayout({ left, center, right }: GameLayoutProps) {
  return (
    <div
      className="
        grid gap-3
        /* Mobile: stacked */
        grid-cols-1
        /* Ab md: 3 Spalten mit festen Rändern und flexiblem Zentrum */
        md:grid-cols-[280px_minmax(0,1fr)_420px]
      "
    >
      <section className="border border-neutral-800 rounded-lg p-2 overflow-y-auto">{left}</section>
      <section className="border border-neutral-800 rounded-lg p-2 overflow-y-auto">{center}</section>
      <section className="border border-neutral-800 rounded-lg p-2 overflow-y-auto">{right}</section>
    </div>
  );
}
