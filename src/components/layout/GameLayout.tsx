import type { ReactNode } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

interface GameLayoutProps {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
}

export function GameLayout({ left, center, right }: GameLayoutProps) {
  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={30} minSize={10}>
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
  );
}
