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
        min-h-150
        grid gap-3 p-3
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-[1fr_1.2fr_1fr]
        auto-rows-min xl:auto-rows-fr
      "
    >
      {/* LEFT: Auf allen Größen sichtbar, aber Reihenfolge variiert */}
      <section
        className="
          rounded-xl border border-neutral-800/70 bg-neutral-900/40 backdrop-blur
          p-3 min-h-[280px] md:min-h-[360px] xl:min-h-0
          overflow-hidden
          flex flex-col
          order-3 md:order-1 xl:order-1
        "
      >
        <div className="flex-1 min-h-0">{left}</div>
      </section>

      {/* CENTER: 
          - small: ganz oben (order-1)
          - md: rechts in erster Reihe (order-2)
          - xl: Mitte zwischen left und right (order-2)
      */}
      <section
        className="
          rounded-xl border border-neutral-800/70 bg-neutral-900/40 backdrop-blur
          p-3 min-h-[280px] md:min-h-[360px] xl:min-h-0
          overflow-auto
          order-1 md:order-2 xl:order-2
        "
      >
        {center}
      </section>

      {/* RIGHT:
          - small: unter allem (order-2)
          - md: zweite Zeile, volle Breite (order-3, col-span-2)
          - xl: rechte Spalte (order-3, col-span-1)
      */}
      <section
        className="
          rounded-xl border border-neutral-800/70 bg-neutral-900/40 backdrop-blur
          p-3 min-h-60 xl:min-h-0
          overflow-auto
          order-2 md:order-3 xl:order-3
          md:col-span-2 xl:col-span-1
        "
      >
        {right}
      </section>
    </div>
  );
}
