// src/App.tsx
import { useState } from "react";
import { AppShell } from "./components/layout/AppShell";
import { GameLayout } from "./components/layout/GameLayout";
import { SetupLayout } from "./components/layout/SetupLayout";
import { LeftPane } from "./components/layout/LeftPane";
import { CenterPane } from "./components/layout/CenterPane";
import { RightPane } from "./components/layout/RightPane";

type View = "setup" | "game";

export default function App() {
  const [view, setView] = useState<View>("game");

  const header = (
    <div className="w-full flex items-center gap-3">
      <div className="font-semibold">BoTCT Notes</div>
      <div className="ml-auto flex items-center gap-2">
        <button
          className={`px-2 py-1 rounded-md text-sm border ${
            view === "setup" ? "bg-neutral-800" : "bg-neutral-900"
          }`}
          onClick={() => setView("setup")}
        >
          Setup
        </button>
        <button
          className={`px-2 py-1 rounded-md text-sm border ${
            view === "game" ? "bg-neutral-800" : "bg-neutral-900"
          }`}
          onClick={() => setView("game")}
        >
          Game
        </button>
      </div>
    </div>
  );

  return (
    <AppShell header={header}>
      {view === "game" ? (
        <GameLayout left={<LeftPane />} center={<CenterPane />} right={<RightPane />} />
      ) : (
        <SetupLayout
          sidebar={<div>Setup Steps / Edition / Seating</div>}
          content={<div>Formular zum Eintragen der Spieler, Edition, Startphase…</div>}
        />
      )}
    </AppShell>
  );
}
