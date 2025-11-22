// src/state/PlayersProvider.tsx
import { useEffect, useState } from "react";
import type { Player } from "@/database/types/player";
import { deletePlayersFromDB, getAllPlayersFromDB, savePlayersToDB } from "@/database/db.player.utils";
import { PlayersContext, type PlayersContextValue } from "./players-context";

export function PlayersProvider({ children }: React.PropsWithChildren) {
  const [players, setPlayersState] = useState<Player[]>([]);

  
  useEffect(() => {
    async function load() {
      const list = await getAllPlayersFromDB();
      setPlayersState(list);
    }
    load();
  }, []);

  async function setPlayers(players: Player[]) {
    setPlayersState(players);
    await savePlayersToDB(players);
  }

  async function resetPlayers() {
    //setPlayersState(next);
    await deletePlayersFromDB();
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