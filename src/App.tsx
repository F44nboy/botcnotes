// src/App.tsx
import { AppShell } from "./components/layout/AppShell";
import { GameLayout } from "./components/layout/GameLayout";
import { LeftPane } from "./components/layout/LeftPane";
import { CenterPane } from "./components/layout/CenterPane";
import { RightPane } from "./components/layout/RightPane";
import { PlayersProvider } from "./features/state/PlayersProvider";

export default function App() {


  return (
    <PlayersProvider>
        {/* AppShell is a pure layout component and renders any children passed in between. */}
        <AppShell>
            <GameLayout left={<LeftPane/>} center={<CenterPane />} right={<RightPane />} />
        </AppShell>
    </PlayersProvider>
  );
}