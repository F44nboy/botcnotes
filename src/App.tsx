// src/App.tsx
import { AppShell } from "./components/layout/AppShell";
import { GameLayout } from "./components/layout/GameLayout";
import { LeftPane } from "./components/layout/LeftPane";
import { CenterPane } from "./components/layout/CenterPane";
import { RightPane } from "./components/layout/RightPane";

type Player = string;
const players: Player[] = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Heidi", "Ivan"];
export default function App() {

  return (
    <AppShell>
        <GameLayout left={<LeftPane players={players} />} center={<CenterPane />} right={<RightPane />} />
    </AppShell>
  );
}