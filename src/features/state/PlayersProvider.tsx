// src/state/PlayersProvider.tsx
import { useEffect, useState } from "react";
import type { Player } from "@/database/types/player";
import { getAllPlayers, savePlayers } from "@/database/player.utils";
import { PlayersContext, type PlayersContextValue } from "./players-context";

export function PlayersProvider({ children }: React.PropsWithChildren) {
  const [players, setPlayersState] = useState<Player[]>([]);

  useEffect(() => {
    async function load() {
      const list = await getAllPlayers();
      setPlayersState(list);
    }
    load();
  }, []);

  async function setPlayers(next: Player[]) {
    setPlayersState(next);
    await savePlayers(next);
  }

  async function resetPlayers(next: Player[]) {
    setPlayersState(next);
    await savePlayers(next);
  }

  const value: PlayersContextValue = {
    players,
    setPlayers,
    resetPlayers,
  };

  return (
    <PlayersContext.Provider value={value}>
      {children}
    </PlayersContext.Provider>
  );
}