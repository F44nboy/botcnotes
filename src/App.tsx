// src/App.tsx
import { AppShell } from "./components/layout/AppShell";
import { GameLayout } from "./components/layout/GameLayout";
import { LeftPane } from "./components/layout/LeftPane";
import { CenterPane } from "./components/layout/CenterPane";
import { RightPane } from "./components/layout/RightPane";

export default function App() {

  return (
    <AppShell>
        <GameLayout left={<LeftPane/>} center={<CenterPane />} right={<RightPane />} />
    </AppShell>
  );
}