import {type ReactNode } from "react";

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
        flex-1
        grid gap-3
        grid-cols-1
        md:grid-cols-2 md:grid-rows-[3fr_1fr]
        xl:grid-cols-[minmax(260px,1fr)_minmax(400px,1.5fr)_minmax(260px,1fr)] xl:grid-rows-1
        auto-rows-auto
      "
    >
      {/* LEFT */}
      <section
        className="
          overflow-hidden
          rounded-xl border border-neutral-800/70 bg-neutral-900/40 backdrop-blur
          p-3
          flex flex-col
          order-3 md:order-2 xl:order-1
        "
      >
        <div className="flex-1">{left}</div>
      </section>

      {/* CENTER (Townsquare) */}
      <section
        className="
          overflow-hidden
          rounded-xl border border-neutral-800/70 bg-neutral-900/40 backdrop-blur
          flex flex-col
          order-1 md:order-1 xl:order-2
          md:col-span-2 xl:col-span-1
        "
      >
        {/* Mindesthöhe für den Circle, nicht schrumpfbar auf < 320px Höhe */}
        <div className="flex-1 min-h-80">
          {center}
        </div>
      </section>

      {/* RIGHT */}
      <section
        className="
          overflow-hidden
          rounded-xl border border-neutral-800/70 bg-neutral-900/40 backdrop-blur
          p-3
          flex flex-col
          order-2 md:order-3 xl:order-3
        "
      >
        <div className="flex-1">
          {right}
        </div>
      </section>
    </div>
  );
}