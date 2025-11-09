/* import type { ReactNode } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

interface GameLayoutProps {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
}

export function GameLayout({ left, center, right }: GameLayoutProps) {
  return (
    <div className="flex-1 min-h-0 min-w-0">
      <PanelGroup direction="horizontal" className="flex-1 min-h-0">
        <Panel minSize={25} className="min-h-[800px]">
          {left}
        </Panel>
        <PanelResizeHandle className="panel-resize-handle" />
        <Panel minSize={10}>
          {center}
        </Panel>
        <PanelResizeHandle className="panel-resize-handle" />
        <Panel defaultSize={30} minSize={10}>
          {right}
        </Panel>
      </PanelGroup>
    </div>
  );
}
*/

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
        h-[calc(100vh-56px)]  /* passt zur Headerhöhe */
        min-h-0
        grid gap-3 p-3
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-[1fr_0.5fr_0.9fr]
        auto-rows-min
      "
    >
      {/* PLAYER: nimmt auf md eine Spalte, auf xl die erste Spalte */}
      <section
        className="
          rounded-xl border border-neutral-800/70 bg-neutral-900/40 backdrop-blur
          p-3 min-h-[280px] md:min-h-[360px] xl:min-h-0
          overflow-hidden
          order-1
        "
      >
        {/* Damit der Kreis immer sichtbar & zentriert bleibt: */}
        <div className="h-full w-full flex items-center justify-center">
          {/* PlayerList füllt elterlichen Quadrat-Container */}
          <div className="w-full max-w-[720px] aspect-square">
            {left}
          </div>
        </div>
      </section>

      {/* NOTES: rechts von Player (md), Mitte (xl) */}
      <section
        className="
          rounded-xl border border-neutral-800/70 bg-neutral-900/40 backdrop-blur
          p-3 min-h-[280px] md:min-h-[360px] xl:min-h-0
          overflow-auto
          order-3 md:order-2
        "
      >
        {center}
      </section>

      {/* TIMELINE: unter Player+Notes (md, col-span-2), rechts (xl) */}
      <section
        className="
          rounded-xl border border-neutral-800/70 bg-neutral-900/40 backdrop-blur
          p-3 min-h-60 xl:min-h-0
          overflow-auto
          order-2 md:order-3
          md:col-span-2 xl:col-span-1
        "
      >
        {right}
      </section>
    </div>
  );
}